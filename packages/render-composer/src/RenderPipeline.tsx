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

  const composer = useMemo(() => {
    return new EffectComposer(gl, { frameBufferType: THREE.HalfFloatType })
  }, [])

  const preRenderPass = useMemo(() => {
    return new LayerRenderPass(
      scene,
      camera,
      undefined,
      camera.layers.mask & ~(1 << Layers.TransparentFX)
    )
  }, [scene, camera])

  const copyPass = useMemo(() => {
    return new CopyPass()
  }, [])

  const copyDepthPass = useMemo(() => {
    return new DepthCopyPass({ depthPacking: BasicDepthPacking })
  }, [])

  const fullScenePass = useMemo(() => {
    return new RenderPass(scene, camera)
  }, [camera, scene])

  const vignetteEffect = useMemo(() => {
    return new VignetteEffect()
  }, [])

  const smaaEffect = useMemo(() => {
    return new SMAAEffect()
  }, [])

  const selectiveBloomEffect = useMemo(() => {
    const bloomEffect = new SelectiveBloomEffect(scene, camera, {
      blendFunction: BlendFunction.ADD,
      mipmapBlur: true,
      luminanceThreshold: 1,
      luminanceSmoothing: 0.2,
      intensity: 2,
      ...(typeof bloom === "object" ? bloom : {})
    } as any)

    bloomEffect.inverted = true

    return bloomEffect
  }, [bloom, scene, camera])

  useLayoutEffect(() => {
    composer.addPass(preRenderPass)
    composer.addPass(copyDepthPass)
    composer.addPass(copyPass)
    composer.addPass(fullScenePass)

    const effects = [
      bloom && selectiveBloomEffect,
      vignette && vignetteEffect,
      antiAliasing && smaaEffect
    ].filter((e) => e) as Effect[]

    const effectPass = new EffectPass(camera, ...effects)
    composer.addPass(effectPass)

    return () => composer.removeAllPasses()
  }, [
    composer,
    scene,
    camera,
    preRenderPass,
    copyDepthPass,
    fullScenePass,
    selectiveBloomEffect,
    vignetteEffect,
    smaaEffect,
    bloom,
    vignette,
    antiAliasing
  ])

  useLayoutEffect(() => {
    composer.setSize(size.width, size.height)

    for (const effect of [vignetteEffect, selectiveBloomEffect]) {
      effect.setSize(
        size.width * effectResolutionFactor,
        size.height * effectResolutionFactor
      )
    }
  }, [
    size.width,
    size.height,
    effectResolutionFactor,
    vignetteEffect,
    selectiveBloomEffect
  ])

  useFrame(() => {
    composer.render()
  }, 1)

  return (
    <RenderPipelineContext.Provider
      value={{
        depth: copyDepthPass.texture,
        scene: copyPass.texture
      }}
    >
      {children}
    </RenderPipelineContext.Provider>
  )
}
