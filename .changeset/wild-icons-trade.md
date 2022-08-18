---
"render-composer": minor
---

`RenderComposer` has been replaced with `RenderCanvas`, which now only wraps R3F's `Canvas`. Apps using Render Composer are now expected to declare both:

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
