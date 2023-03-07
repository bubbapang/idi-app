// Action types
const GET_STORES = 'stores/GET_STORES';

// Action creators
export const getStores = (stores) => ({
    type: GET_STORES,
    stores
});

// Async action creator (thunk)
export const getStoresThunk = () => async (dispatch) => {
    const res = await fetch('/api/stores');
    if (res.ok) {
        const stores = await res.json();
        dispatch(getStores(stores));
    }
}

// Reducer
export default function storesReducer(state = {}, action) {
    switch (action.type) {
        case GET_STORES: {
            return action.stores
        }
        default:
            return state;
    }
}
