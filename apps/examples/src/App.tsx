import { Environment, OrbitControls } from "@react-three/drei"
import { RenderComposer } from "render-composer"

function App() {
	return (
		<RenderComposer vignette bloom antiAliasing>
			<color attach="background" args={["#264653"]} />
			<Environment preset="sunset" />
			<OrbitControls />

			<mesh>
				<icosahedronGeometry />
				<meshStandardMaterial color="#E9C46A" />
			</mesh>
		</RenderComposer>
	)
}

export default App
