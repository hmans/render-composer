# Render Composer

A pre-configured render pipeline for your react-three-fiber games. It is meant to provide some sane defaults for rendering your game, making it easy to make it look fancy, but also providing some tooling like a pre-render pass providing render and depth textures to shaders that need them.

## Roadmap

- [x] A `RenderPipeline` component that implements a basic render pipeline using `postprocessing` and provides its data through a context.
- [x] A `useRenderPipeline` hook that accessess the render pipeline's context.
- [x] Implement a pre-render pass and make both the render and depth textures available through context.
- [x] Provide a bunch of preconfigured post-processing effects and make them toggleable through props.
- [ ] Make the different post-processing effects configurable beyond just being able to turn them on and off. (eg. allow the user to provide the individual effect's instantiation arguments as a prop.)
- [ ] Allow the user to configure their own post-processing effects.
