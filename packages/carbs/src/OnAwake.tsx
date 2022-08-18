import { RootState, useThree } from "@react-three/fiber"
import { useEffect } from "react"

export type OnAwakeCallback = (state: RootState) => void

export const useOnAwake = (callback: OnAwakeCallback) => {
  const state = useThree()
  useEffect(() => callback(state), [])
}

export const OnAwake = ({ callback }: { callback: OnAwakeCallback }) => {
  useOnAwake(callback)
  return null
}
