# imook

基于[immer](https://immerjs.github.io/immer/docs/introduction)和[React Hooks](https://reactjs.org/docs/hooks-intro.html)的轻量的局部状态管理。

<table>
  <thead>
    <tr>
      <th colspan="3">🎯 案例🎯</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://codesandbox.io/s/counter-lj3h5" rel="nofollow">Counter</a></td>
      <td><a href="https://codesandbox.io/s/i18n-ipcvd" rel="nofollow">I18n</a></td>
      <td><a href="https://codesandbox.io/s/todos-bmnnq" rel="nofollow">Todos</a></td>
    </tr>
  </tbody>
</table>
<br />

## ✨特性
+ 局部Store，全局单一实例，精准定位store作用区间
+ 轻量，API简单化，类型提示友好
+ 无this, 状态不可变
+ 支持异步action，修改状态简单化
+ 支持读写分离和定制更新(衍生数据)
+ 支持中断更新
+ 同步逻辑批量更新

## 📦 安装

```sh
npm i imook
```

```sh
yarn add imook
```

## ⚡快速开始

#### 1. 定义一个Store
```tsx
import createLocalStore from "imook";

const initialState = 0;

const counterStore = createLocalStore(
  initialState,
  ({ commit, get }) => ({
    inc(step: number = 1) {
      commit((draftStore) => {
        draftStore.state += step;
      });
    }
  }),
  "counterStore"
);

export default counterStore;
```

#### 2. 获取和修改状态

```tsx
import counterStore from "./counterStore";

function Counter() {
  // 通过useState API获取状态
  const count = counterStore.useState();
  return (
    <div>
      count:{count}
      <button
        onClick={() => {
          // 通过actions修改状态
          counterStore.actions.inc();
        }}
      >
        +
      </button>
    </div>
  );
}

export default Counter;

```

## 💡API
### ```createLocalStore(initialState, actionCreator, uniqueKey)```
createLocalStore接收初始状态initialState和actions的生成器[actionCreator](#actionCreator)，还有标识全局单一实例的uniqueKey，返回一个Store对象。

#### ```actionCreator```
action生成器函数，接收工具类对象```ActionUtils```作为参数，返回actions

```ts
const actionCreator = ({ commit, get }) => ({
  /**
   * get 用于获取当前的状态；
   * commit 用于修改状态, 接受一个函数updater作为参数,updater和immer中的produce的第二个参数保持一致,通过操作draftStore.state完成对state的修改
   */
  xxAction() {
    const {state} = get()
    commit((draftStore) => {
      // draftStore.state...
    });
  }
})
```

### ```localStore.useState(...overloads)```
调用Store对象返回的useState获取状态，通过**重载**支持多种形式获取，通过这种方式在状态变更会订阅更新，和React Hooks一样，该API必须在[Function Component](https://reactjs.org/docs/hooks-state.html#hooks-and-function-components)中使用。

+ ```const state = localStore.useState()```
  <p style="margin-bottom: .5em;"></p>

  + 不带参数，直接返回状态
  + 状态改变时直接更新

+ ```const state = localStore.useState(isDeepEqual)```
  <p style="margin-bottom: .5em;"></p>

  + 只有isDeepEqual（布尔值）一个参数，直接返回状态
  + isDeepEqual为false，状态改变时直接更新
  + isDeepEqual为true，状态改变时深比较前后两次状态，值不同时才更新

+ ```const derivedState = localStore.useState(mapStateFn)```
  <p style="margin-bottom: .5em;"></p>

  + 只有mapStateFn一个参数，mapStateFn以state作为参数，可自定义返回的状态
  + 状态改变时浅比较前后两次的衍生状态，值不同时才更新


+ ```const derivedState = localStore.useState(mapStateFn, isDeepEqual)```
  <p style="margin-bottom: .5em;"></p>

  + 第一个参数为mapStateFn，以state作为参数，可自定义返回的状态
  + 第二个参数为isDeepEqual，决定是否深比较前后两次的衍生状态，值不同时才更新
<br />

#### ```localStore.actions.xxx```
调用Store对象返回的actions来修改状态，修改状态不限制使用方式。

```tsx

/**
 * 直接在FC中使用
 */
function IncButton() {
  return (
      <button
        onClick={() => {
          counterStore.actions.inc();
        }}
      >
        +
      </button>
  );
}

/**
 * 基于actions自定义特定功能的actions
 */
const inc = counterStore.actions.inc

const inc10 = () => inc(10)

const dbInc = () => {
  inc()
  inc()
}

/**
 * 基于actions定义Custom Hooks
 */
const useVisibleTodos = () => {
  const todos = todosStore.useState()
  const filter = visibilityFilterStore.useState()
  const visibleTodos = getVisibleTodos(todos, filter)
    return {
    visibleTodos: visibleTodos as Todo[],
    toggleTodo: todosStore.actions.toggleTodo
  }
}

```
<br />

### ```localStore.getState()```
调用Store对象返回的getState获取当前的状态，值得注意的是这种方式**不会**订阅更新，它就像是一个内置的action，可在任何地方使用。

```tsx

function IncButton() {
  return (
      <button
        onClick={() => {
          // 获取当前的状态
          const currState = counterStore.getState();
          if(currState...) ...
          counterStore.actions.inc();
        }}
      >
        +
      </button>
  );
}

```



