# State Containers 📦

State Containers is simple, framework agnostic state management.

### Why State Containers?

The foundational principle behind state containers, is that state is better handled outside of the specific UI library you use. This way you don't have to keep in mind the different quirks of each UI library in your business logic/state management.

The goal when building this was to make a state management library that is easy to use for simple use cases and doesn't get in your way when you need to build something more complex. On top of that it also neatly encapsulates both state, updates and side-effects in a way that feels very natural to someone familiar with JavaScript.

### Why You’ll Love State Containers ❤️

-   **Decoupled from UI**: Focus purely on your state logic without worrying about the specific behaviors of any UI framework. It’s all about the state, not the UI 🚀
-   **Framework Agnostic**: Designed to work across any framework, State Containers lets you write your state once and use it everywhere—increasing code reuse and reducing headaches 🌍
-   **Simplicity and Power**: State Containers is easy for basic use cases and powerful enough to handle complex scenarios without getting in your way ✨
-   **React Integration, and Beyond**: Seamless integration for React developers, and support for more UI frameworks coming in the future 🛠

## At a glance

```tsx
import { createRoot } from 'react-dom/client'
import { Subject } from '@state-containers/core'
import { useStateContainer } from '@state-containers/react'

// Define a simple counter state container
const CounterState = () => {
    const state = new Subject<number>(0)

    const actions = {
        increment: () => state.value++,
    }

    console.log('The body of the function runs once 👷')

    return { state, actions }
}

const Counter = () => {
    // Use the state container in your component
    // This "connects" it to React, making sure the UI 
    // updates whenever the state updates
    const counter = useStateContainer(CounterState)

    return (
        <div>
            <button onClick={counter.actions.increment}>+</button>
            <p>Count: {counter.state}</p>
        </div>
    )
}
```

## Installation 🛠️

To get started with State Containers, install the core package and, if you're using React, the React-specific integration:

```bash
# With npm
npm install @state-containers/core
npm install @state-containers/react

# With yarn
yarn add @state-containers/core
yarn add @state-containers/react

# With bun
bun add @state-containers/core
bun add @state-containers/react
```
