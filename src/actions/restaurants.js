import restaurantAPI from '../api/restaurants';
import { actionTypes } from '../reducers/restaurants';

export const get = () => async dispatch => {
    dispatch({ type: actionTypes.fetchRequested });
    try {
        const value = await restaurantAPI.get();
        dispatch({ type: actionTypes.fetchSuccess, value });
        return value;
    } catch (error) {
        dispatch({ type: actionTypes.fetchError, value: error });
        return error;
    }
};
