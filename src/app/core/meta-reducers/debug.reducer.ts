import { ActionReducer } from '@ngrx/store';
import { AppState } from '../core.state';

export function debug(
    reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
    // tslint:disable-next-line: only-arrow-functions
    return function(state, action) {
        const newState = reducer(state, action);
        console.log(`[DEBUG] action: ${action.type}`, {
            payload: (action as any).payload,
            oldState: state,
            newState
        });
        return newState;
    };
}
