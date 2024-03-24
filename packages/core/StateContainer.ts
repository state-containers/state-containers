import { ReadOnlySubject, Subject } from './Subject'

export type StateContainer<TState, TActions extends object> = {
    state: ReadOnlySubject<TState> | Subject<TState>
    actions: TActions
    cleanup?: () => void
}

export type SC<TState, TActions extends object> = StateContainer<TState, TActions>

export type StateContainerConstructor<TState, TActions extends object, TProps extends Array<any>> = (
    ...props: TProps
) => StateContainer<TState, TActions>

export type SCConstructor<TState, TActions extends object, TProps extends Array<any>> = StateContainerConstructor<
    TState,
    TActions,
    TProps
>
