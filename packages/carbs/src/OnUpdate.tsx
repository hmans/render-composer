import { RootState, useFrame } from "@react-three/fiber"

export type UpdateCallback = (dt: number, state: RootState) => void

export type OnUpdateProps = {
  callback: UpdateCallback
  priority?: number
}

export const useOnUpdate = (callback: UpdateCallback, priority?: number) => {
  useFrame((state, dt) => {
    callback?.(dt, state)
  }, priority)
}

export const OnUpdate = ({ callback, priority }: OnUpdateProps) => {
  useOnUpdate(callback, priority)
  return null
}
