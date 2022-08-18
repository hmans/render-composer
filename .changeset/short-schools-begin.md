---
"render-composer": patch
---

`<RenderPipeline>` now accepts a new `effectResolutionFactor` prop, defaulting to 0.5, that determines the resolution scale of all full-screen effects (like the bloom). Reduce this further to improve performance, or move it closer to 1 for increased fidelity.
