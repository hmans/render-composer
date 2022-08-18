import { GroupProps, RootState } from "@react-three/fiber"
import { useRef } from "react"
import { Group } from "three"
import { useOnUpdate } from "./OnUpdate"

export type AnimateUpdateCallback = (
  group: Group,
  dt: number,
  state: RootState
) => void

export type AnimateProps = GroupProps & {
  update?: AnimateUpdateCallback
}

export const Animate = ({ update, ...props }: AnimateProps) => {
  const group = useRef<Group>(null!)

  useOnUpdate((dt, state) => {
    update?.(group.current, dt, state)
  })

  return <group ref={group} {...props} />
}
