import { useEffect, useMemo, useState } from 'react'
import { type StateContainerConstructor } from '@state-containers/core'

export const useStateContainer = <TState, TActions extends object, TProps extends Array<any>>(
    stateContainerConstructor: StateContainerConstructor<TState, TActions, TProps>,
    ...props: TProps
) => {
    const stateContainer = useMemo(() => stateContainerConstructor(...props), [])
    const [state, setState] = useState(stateContainer.state.value)

    useEffect(() => {
        stateContainer.state.subscribe(setState)
        return () => {
            stateContainer.state.unsubscribe(setState)
            if (stateContainer.cleanup) stateContainer.cleanup()
        }
    }, [stateContainer, setState])

    return { state, actions: stateContainer.actions }
}
