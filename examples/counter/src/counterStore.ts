import createLocalStore from 'imook'

const initialState = 0

const counterStore = createLocalStore(initialState, ({commit, get}) => ({
  inc: (step = 1) => {
    commit(draftStore => {
      draftStore.state += step
    })
  },
  dec: (step = 1) => {
    commit(draftStore => {
      draftStore.state -= step
    })
  },
  reset: () => {
    const {state} = get()
    if (state === initialState) return
    commit(draftStore => {
      draftStore.state = initialState
    })
  },
}))

export default counterStore
