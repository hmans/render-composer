import { RootState, useFrame } from "@react-three/fiber"

export type UpdateCallback = (dt: number, state: RootState) => void

export type OnUpdateProps = {
  update: UpdateCallback
  priority?: number
}

export const useOnUpdate = (update: UpdateCallback, priority?: number) => {
  useFrame((state, dt) => {
    update?.(dt, state)
  }, priority)
}

export const OnUpdate = ({ update, priority }: OnUpdateProps) => {
  useOnUpdate(update, priority)
  return null
}
