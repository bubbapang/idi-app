// action types
const SET_CURRENT_STORE = 'stores/SET_CURRENT_STORE'; // new action type

// action creators
export const setCurrentStore = (store) => ({ // new action creator
    type: SET_CURRENT_STORE,
    store
});

// reducer
export default function currentStoreReducer(state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_STORE: { // new case
            return action.store
        }

        default:
            return state;
    }
}