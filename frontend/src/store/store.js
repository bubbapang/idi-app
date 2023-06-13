// Action types
const GET_STORES = 'stores/GET_STORES';


// Action creators
export const getStores = (stores) => ({
    type: GET_STORES,
    stores
});


// Thunks
export const getStoresThunk = () => async (dispatch) => {
    const response = await fetch('/api/stores/');
    if (response.ok) {
        const stores = await response.json();
        dispatch(getStores(stores));
    }
};

// Reducer
export default function storesReducer(state = {}, action) {
    switch (action.type) {
        case GET_STORES: {
            return {
                ...state,
                ...action.stores
            }
        }
        default:
            return state;
    }
}
