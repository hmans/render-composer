import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas, GroupProps, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { RenderComposer, RenderPipeline } from "render-composer"
import { Group } from "three"

const AutoRotate = (props: GroupProps) => {
	const group = useRef<Group>(null!)

	useFrame((_, dt) => {
		group.current.rotation.x += dt * 0.7
		group.current.rotation.y += dt * 0.5
	})

	return <group ref={group} {...props} />
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

				<AutoRotate>
					<mesh>
						<icosahedronGeometry />
						<meshStandardMaterial color="#E9C46A" metalness={0.5} roughness={0.5} />
					</mesh>
				</AutoRotate>
			</RenderPipeline>
		</Canvas>
	)
}

export default App
