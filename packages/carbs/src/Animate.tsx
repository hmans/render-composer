import { GroupProps, RootState, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group } from "three"
import { useOnUpdate } from "./OnUpdate"

export type AnimateCallback = (
  group: Group,
  dt: number,
  state: RootState
) => void

export type AnimateProps = GroupProps & {
  update?: AnimateCallback
}

export const Animate = ({ update, ...props }: AnimateProps) => {
  const group = useRef<Group>(null!)

  useOnUpdate((dt, state) => {
    update?.(group.current, dt, state)
  })

  return <group ref={group} {...props} />
}
