import React, {FC} from 'react'
import {Counter, ResetBtn} from './Counter'
const App: FC = () => (
  <>
    <h1>Counter</h1>
    <Counter />
    <br />
    <ResetBtn />
  </>
)

export default App
