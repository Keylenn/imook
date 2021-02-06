type Listener = () => void

class StateContainer<S> {
  constructor(initialState: S) {
    this.state = initialState
  }

  state: S
  listeners = new Set<Listener>()

  notify(): void {
    for (const listener of this.listeners) {
      listener()
    }
  }
}

export default StateContainer
