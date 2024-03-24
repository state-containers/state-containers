import { createRoot } from 'react-dom/client'
import { Subject } from '@state-containers/core'
import { useStateContainer } from '@state-containers/react'

// An example of a state container that counts up or down
// where the increment is increased every 5 seconds.
// This is just to show more of the functionality of state containers.
const CounterState = (initialValue: number, initialIncrement = 1) => {
    // All state that the ui needs to listen to should be in the Subject
    const state = new Subject(initialValue)

    // If the ui does not need to listen to a specific state change,
    // we can use regular variables
    let increment = initialIncrement

    // An example of how one can set up a side effect
    const interval = setInterval(() => {
        increment++
    }, 5000)

    // Set up actions that can be called from the ui code
    const actions = {
        increment: () => {
            state.value += increment
        },
        decrement: () => {
            state.value -= increment
        },
    }

    // An example of how to clean up a side effect
    const cleanup = () => {
        clearInterval(interval)
    }

    return { state, actions, cleanup }
}

const App = () => {
    // This is how to use the state container in a React component
    // The first argument is the state container constructor
    // The rest of the arguments are the arguments defined by the state container constructor
    const counter = useStateContainer(CounterState, 0, 10)

    return (
        <div>
            <button onClick={counter.actions.increment}>Increment</button>{' '}
            <button onClick={counter.actions.decrement}>Decrement</button>
            <div>Count: {counter.state}</div>
        </div>
    )
}

const root = createRoot(document.getElementById('root')!)

if (root) {
    root.render(<App />)
}
