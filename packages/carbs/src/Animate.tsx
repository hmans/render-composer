import { GroupProps, RootState, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group } from "three"

export type AnimateProps = GroupProps & {
  update?: (group: Group, dt: number, state: RootState) => void
}

export const Animate = ({ update, ...props }: AnimateProps) => {
  const group = useRef<Group>(null!)

  useFrame((state, dt) => {
    update?.(group.current, dt, state)
  })

  return <group ref={group} {...props} />
}
