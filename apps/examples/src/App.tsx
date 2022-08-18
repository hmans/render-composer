import { Environment } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Animate } from "carbs"
import { RenderPipeline } from "render-composer"
import { Object3D } from "three"

const rotate = (o: Object3D, dt: number) => {
	o.rotation.x += dt * 0.7
	o.rotation.y += dt * 0.5
}

function App() {
	return (
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
		>
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
		</Canvas>
	)
}

export default App
