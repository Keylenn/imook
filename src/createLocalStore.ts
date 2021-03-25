import produce from 'immer'
import StateContainer from './StateContainer'
import useCheckForUpdateStore from './hooks/useCheckForUpdateStore'
import {ActionCreator, Actions, MapStateFn} from './types/store'
import rootStoreMap from './rootStoreMap'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function createLocalStore<S, C extends ActionCreator<S>>(
  initialState: S,
  actionCreator: C,
  uniqueKey: string,
) {
  const localStoreCache = rootStoreMap?.get(uniqueKey)
  if (localStoreCache) return localStoreCache

  const stateContainer = new StateContainer(initialState)

  const actions = actionCreator({
    commit: updater => {
      const {state} = produce({state: stateContainer.state}, updater)
      stateContainer.state = state
      stateContainer.notify()
      return state
    },
    get: () => ({
      state: stateContainer.state,
    }),
  }) as Actions<C>

  function useStore(): [S, Actions<C>]
  function useStore(isDeepEqual: boolean): [S, Actions<C>]
  function useStore<M extends MapStateFn<S>>(mapStateFn: M): [ReturnType<M>, Actions<C>]
  function useStore<M extends MapStateFn<S>>(mapStateFn: M, isDeepEqual: boolean): [ReturnType<M>, Actions<C>]
  function useStore(arg_0?: any, arg_1?: any) {
    const mapStateFn = typeof arg_0 === 'function' ? arg_0 : void 0
    const isDeepEqual = arg_0 === true || arg_1 === true ? true : false
    const state = mapStateFn ? mapStateFn(stateContainer.state) : stateContainer.state
    useCheckForUpdateStore<S>(stateContainer, mapStateFn, isDeepEqual)
    return [state, actions]
  }
  const localStore = {
    actions,
    useStore,
  }
  rootStoreMap?.set(uniqueKey, localStore)
  return localStore
}

export type TlocalStore = ReturnType<typeof createLocalStore>
