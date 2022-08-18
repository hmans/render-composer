import { Canvas, Props } from "@react-three/fiber"
import React from "react"
import { RenderPipeline, RenderPipelineProps } from "./RenderPipeline"

export type RenderComposerProps = Props & RenderPipelineProps

export const RenderComposer = ({
  children,
  bloom,
  antiAliasing,
  vignette,
  ...props
}: RenderComposerProps) => (
  <Canvas
    shadows
    flat
    gl={{
      powerPreference: "high-performance",
      alpha: false,
      depth: true,
      stencil: false,
      antialias: false
    }}
    {...props}
  >
    <RenderPipeline bloom={bloom} antiAliasing={antiAliasing} vignette={vignette}>
      {children}
    </RenderPipeline>
  </Canvas>
)
