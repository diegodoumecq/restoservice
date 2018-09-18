export const actionTypes = {
    fetchRequested: 'restaurants/FETCH_REQUESTED',
    fetchError: 'restaurants/FETCH_ERROR',
    fetchSuccess: 'restaurants/FETCH_SUCCESS'
};

const initialState = {
    list: [],
    loaded: false,
    fetching: false,
    error: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.fetchRequested:
        return {
            ...state,
            fetching: true
        };

    case actionTypes.fetchError:
        return {
            ...state,
            loaded: true,
            fetching: false,
            error: action.value
        };

    case actionTypes.fetchSuccess:
        return {
            ...state,
            list: action.value,
            loaded: true,
            fetching: false,
            error: ''
        };

    default:
        return state;
    }
};
