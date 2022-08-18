---
"carbs": patch
---

Added the `<Animate>` component:

```tsx
<Animate
  update={(o: Object3D, dt: number) => {
    o.rotation.x += dt * 0.7
    o.rotation.y += dt * 0.5
  }}
>
  <mesh>
    <icosahedronGeometry />
    <meshStandardMaterial color="#E9C46A" metalness={0.5} roughness={0.5} />
  </mesh>
</Animate>
```
