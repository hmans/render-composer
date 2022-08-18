import { Animate } from "@hmans/r3f-animate"
import { Environment } from "@react-three/drei"
import { RootState } from "@react-three/fiber"
import { RenderCanvas, RenderPipeline } from "render-composer"
import { Object3D } from "three"

const rotate = (o: Object3D, dt: number) => {
  o.rotation.x += dt * 0.7
  o.rotation.y += dt * 0.5
}

function App() {
  return (
    <RenderCanvas>
      <RenderPipeline
        vignette
        bloom={{ intensity: 20 }}
        antiAliasing
        effectResolutionFactor={1}
      >
        <color attach="background" args={["#264653"]} />
        <Environment preset="sunset" />

        <directionalLight position={[30, 10, 10]} intensity={1.5} />

        <Animate
          fun={(o, _, { clock }) => {
            o.position.x = Math.sin(clock.getElapsedTime() * 0.7) * 2
            o.position.y = Math.sin(clock.getElapsedTime() * 1.1)
            o.position.z = Math.cos(clock.getElapsedTime() * 0.5)
          }}
        >
          <Animate fun={rotate}>
            <mesh>
              <icosahedronGeometry />
              <meshStandardMaterial
                color="#E9C46A"
                metalness={0.5}
                roughness={0.5}
              />
            </mesh>
          </Animate>
        </Animate>
      </RenderPipeline>
    </RenderCanvas>
  )
}

export default App
