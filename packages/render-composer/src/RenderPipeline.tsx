import { useFrame, useThree } from "@react-three/fiber"
import {
  BlendFunction,
  BloomEffectOptions,
  CopyPass,
  DepthCopyPass,
  Effect,
  EffectComposer,
  EffectPass,
  RenderPass,
  SelectiveBloomEffect,
  SMAAEffect,
  VignetteEffect
} from "postprocessing"
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useLayoutEffect,
  useMemo
} from "react"
import * as THREE from "three"
import { BasicDepthPacking } from "three"
import { LayerRenderPass } from "./LayerRenderPass"

export const Layers = {
  Default: 0,
  TransparentFX: 1
}

const RenderPipelineContext = createContext<{
  depth: THREE.Texture
  scene: THREE.Texture
}>(null!)

export const useRenderPipeline = () => useContext(RenderPipelineContext)

export type RenderPipelineProps = {
  children?: ReactNode
  bloom?: boolean | BloomEffectOptions
  vignette?: boolean
  antiAliasing?: boolean
  effectResolutionFactor?: number
}

export const RenderPipeline: FC<RenderPipelineProps> = ({
  children,
  bloom,
  vignette,
  antiAliasing,
  effectResolutionFactor = 0.5
}) => {
  const { gl, scene, camera, size } = useThree()

  const { composer, effects, passes } = useMemo(() => {
    const composer = new EffectComposer(gl, {
      frameBufferType: THREE.HalfFloatType
    })

    const effects = {
      vignette: new VignetteEffect(),
      smaa: new SMAAEffect(),
      bloom: new SelectiveBloomEffect(scene, camera, {
        blendFunction: BlendFunction.ADD,
        mipmapBlur: true,
        luminanceThreshold: 1,
        luminanceSmoothing: 0.2,
        intensity: 2,
        ...(typeof bloom === "object" ? bloom : {})
      } as any)
    }

    effects.bloom.inverted = true

    const passes = {
      preRenderPass: new LayerRenderPass(
        scene,
        camera,
        undefined,
        camera.layers.mask & ~(1 << Layers.TransparentFX)
      ),
      copyPass: new CopyPass(),
      depthCopyPass: new DepthCopyPass({ depthPacking: BasicDepthPacking }),
      fullScenePass: new RenderPass(scene, camera),
      effects: new EffectPass(
        camera,
        ...([
          bloom && effects.bloom,
          vignette && effects.vignette,
          antiAliasing && effects.smaa
        ].filter((e) => e) as Effect[])
      )
    }

    composer.addPass(passes.preRenderPass)
    composer.addPass(passes.depthCopyPass)
    composer.addPass(passes.copyPass)
    composer.addPass(passes.fullScenePass)
    composer.addPass(passes.effects)

    return {
      composer,
      effects,
      passes
    }
  }, [])

  useLayoutEffect(() => {
    return () => composer.removeAllPasses()
  }, [composer])

  useLayoutEffect(() => {
    composer.setSize(size.width, size.height)

    effects.bloom.setSize(
      size.width * effectResolutionFactor,
      size.height * effectResolutionFactor
    )
  }, [size.width, size.height, effectResolutionFactor])

  useFrame(() => {
    composer.render()
  }, 1)

  return (
    <RenderPipelineContext.Provider
      value={{
        depth: passes.depthCopyPass.texture,
        scene: passes.copyPass.texture
      }}
    >
      {children}
    </RenderPipelineContext.Provider>
  )
}
