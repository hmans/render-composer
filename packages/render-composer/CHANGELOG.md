# render-composer

## 0.1.1

### Patch Changes

- da3bcca: Fix React JSX integration.

## 0.1.0

### Minor Changes

- 02443d7: `RenderComposer` has been replaced with `RenderCanvas`, which now only wraps R3F's `Canvas`. Apps using Render Composer are now expected to declare both:

  ```tsx
  function App() {
    return (
      <RenderCanvas>
        <RenderPipeline vignette bloom antiAliasing>
          {/* etc. */}
        </RenderPipeline>
      </RenderCanvas>
    )
  }
  ```

### Patch Changes

- 7cbb6d3: First version of Render Composer, hooray!
