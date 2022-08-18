import { Environment } from "@react-three/drei"
import { Animate } from "carbs"
import { RenderCanvas, RenderPipeline } from "render-composer"
import { Object3D } from "three"

const rotate = (o: Object3D, dt: number) => {
  o.rotation.x += dt * 0.7
  o.rotation.y += dt * 0.5
}

function App() {
  return (
    <RenderCanvas>
      <RenderPipeline vignette bloom antiAliasing>
        <color attach="background" args={["#264653"]} />
        <Environment preset="sunset" />

        <directionalLight position={[30, 10, 10]} intensity={1.5} />

        <Animate update={rotate}>
          <mesh>
            <icosahedronGeometry />
            <meshStandardMaterial color="#E9C46A" metalness={0.5} roughness={0.5} />
          </mesh>
        </Animate>
      </RenderPipeline>
    </RenderCanvas>
  )
}

export default App
