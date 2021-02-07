import React, {FC} from 'react'
import Random from './Random'
import counterStore from './counterStore'

const layoutStyle = {border: '1px solid #CCC', padding: '1em'}

export const ResetBtn: FC = () => (
  <div style={layoutStyle}>
    <button onClick={counterStore.actions.reset}>reset</button>
    <Random />
  </div>
)

export const Counter: FC = () => {
  const [count] = counterStore.useStore()
  return (
    <div style={layoutStyle}>
      <h2>{count}</h2>
      <button onClick={() => counterStore.actions.inc()}>+</button>
      <button onClick={() => counterStore.actions.dec()}>-</button>
      <Random />
    </div>
  )
}
