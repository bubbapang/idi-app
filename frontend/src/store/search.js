// search.js
const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS';

export const updateSearchResults = (items) => {
    return {
        type: UPDATE_SEARCH_RESULTS,
        payload: items,
    };
};

export default function searchReducer(state = [], action) {
    switch (action.type) {
        case UPDATE_SEARCH_RESULTS:
            return action.payload;
        default:
            return state;
    }
}
