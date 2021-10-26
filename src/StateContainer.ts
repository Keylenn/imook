type Listener = (...args: any) => void

class StateContainer<S> {
  constructor(initialState: S) {
    this.state = initialState
  }

  state: S
  listeners = new Set<Listener>()

  notify(...args: any[]): void {
    for (const listener of this.listeners) {
      listener(...args)
    }
  }
}

export default StateContainer
