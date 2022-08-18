import { RootState, useThree } from "@react-three/fiber"
import { useEffect } from "react"

export type OnDestroyCallback = (root: RootState) => void

export const useOnDestroy = (callback: OnDestroyCallback) => {
  const state = useThree()
  useEffect(() => () => callback(state), [])
}

export const OnDestroy = ({ callback }: { callback: OnDestroyCallback }) => {
  useOnDestroy(callback)
  return null
}
