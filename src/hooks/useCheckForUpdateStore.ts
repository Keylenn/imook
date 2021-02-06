import {useReducer, useRef} from 'react'
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect'
import isArrayEqual from '../utils/isArrayEqual'
import StateContainer from '../StateContainer'
import {MapStateFn} from '../types/store'

const getDepsFromMapState = (mapState: any) =>
  Object.prototype.toString.call(mapState) === '[object Object]' ? Object.values(mapState) : [mapState]

const getDeps = <S>(stateContainer: StateContainer<S>, mapStateFn?: MapStateFn<S>) =>
  mapStateFn ? getDepsFromMapState(mapStateFn?.(stateContainer.state)) : [stateContainer.state]

export default function useCheckForUpdateStore<S>(
  stateContainer: StateContainer<S>,
  mapStateFn?: MapStateFn<S>,
  isDeepEqual = false,
): void {
  const [, forceRender] = useReducer(s => s + 1, 0)
  const depsRef = useRef<any[]>(getDeps(stateContainer, mapStateFn))

  useIsomorphicLayoutEffect(() => {
    const listener = () => {
      if (!mapStateFn && !isDeepEqual) {
        forceRender()
        return
      }

      const newDeps = getDeps(stateContainer, mapStateFn)
      if (!isArrayEqual(depsRef.current, newDeps, isDeepEqual)) {
        forceRender()
      }
      depsRef.current = newDeps
    }
    stateContainer.listeners.add(listener)
    return () => {
      stateContainer.listeners.delete(listener)
    }
  }, [])
}
