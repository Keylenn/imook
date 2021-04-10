/*
 * @Description:
 * @Author: hejilun
 * @Date: 2021-03-27 20:38:49
 * @LastEditors: hejilun
 * @LastEditTime: 2021-04-10 15:40:26
 */
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

  const stateContainer = (localStoreCache
    ? localStoreCache?.stateContainer
    : new StateContainer(initialState)) as StateContainer<S>
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

  if (localStoreCache) {
    // Actions need to be updated When creating local stores every time
    localStoreCache.instance.actions = actions
    rootStoreMap?.set(uniqueKey, localStoreCache)
    return localStoreCache?.instance as {
      actions: Actions<C>
      useState: typeof useState
    }
  }

  const getState = () => stateContainer.state

  // Keep the single responsibility of the API
  function useState(): S
  function useState(isDeepEqual: boolean): S
  function useState<M extends MapStateFn<S>>(mapStateFn: M): ReturnType<M>
  function useState<M extends MapStateFn<S>>(mapStateFn: M, isDeepEqual: boolean): ReturnType<M>
  function useState(arg_0?: any, arg_1?: any) {
    const mapStateFn = typeof arg_0 === 'function' ? arg_0 : void 0
    const isDeepEqual = arg_0 === true || arg_1 === true ? true : false
    useCheckForUpdateStore<S>(stateContainer, mapStateFn, isDeepEqual)
    return mapStateFn ? mapStateFn(stateContainer.state) : stateContainer.state
  }
  const localStore = {
    instance: {
      actions,
      useState,
      getState,
    },
    stateContainer,
  }
  rootStoreMap?.set(uniqueKey, localStore)
  return localStore.instance
}

export type TlocalStore = ReturnType<typeof createLocalStore>
