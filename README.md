# imook

基于immer 和react hooks的轻量的局部状态管理，类比custom hook，imook强调基于功能设计store。

<table>
  <thead>
    <tr>
      <th colspan="3">🎯 案例🎯 </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://codesandbox.io/s/counter-41wuk" rel="nofollow">Counter</a></td>
      <td><a href="https://codesandbox.io/s/i18n-3t08r" rel="nofollow">I18n</a></td>
      <td><a href="https://codesandbox.io/s/todos-unjoe" rel="nofollow">Todos</a></td>
    </tr>
  </tbody>
</table>



## 📦 安装

```sh
npm i co-store
```

```sh
yarn add co-store
```

## ⚡快速开始

#### 1. 定义一个local store
```jsx
import React from "react"
import { createLocalStore, ActUtil } from "imook";

// 创建counterStore
const initialState: number = 0
type CounterActUtil = ActUtil<number>;

export default createLocalStore(initialState, {
  inc({ commit }: CounterActUtil, step = 1) {
    commit((draftStore) => {
      draftStore.state += step;
    });
  },
});
```

#### 2. 使用和修改状态

```jsx
import counterSotre from "./counterStore"

function Counter() {
  // 返回[state, actions]
  const [count, { inc, dec }] = counterStore.useStore()
  return (
    <div>
      count:{count}
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
    </div>
  )
}

export default function Counter() {
  return (
    <counterStore.Provider>
      <Counter />
    </counterStore.Provider>
  )
}
```


