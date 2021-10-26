import {Draft} from 'immer'
import StateContainer from '../StateContainer'

export type AnyFn = (...args: any) => any

export type DraftStore<S = any> = Draft<{state: S}>

export type Updater<S = any> = (dratfStore: DraftStore<S>) => void

export type UpdateStore<S = any> = (updater: Updater<S>) => S

export interface ActionUtils<S> {
  commit: UpdateStore<S>
  get: () => {
    state: S
  }
}

export type ActionCreator<S> = (utils: ActionUtils<S>) => Record<string, AnyFn>

export type Actions<C extends AnyFn> = ReturnType<C>

export type MapStateFn<S> = (state: S) => any

export interface StoreOption<S> {
  uniqueKey: string
  shareProvider?: (container: StateContainer<S>) => void
  shareConsumer?: () => StateContainer<S>
  commitEnhancer?: () => void
}
