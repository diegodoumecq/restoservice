import orderAPI from '../api/order';
import { actionTypes } from '../reducers/order';

export const changeForm = formValues => ({
    type: actionTypes.changeForm,
    value: formValues
});

export const clearForm = () => ({ type: actionTypes.clearForm });

export const submit = formValues => async dispatch => {
    dispatch({ type: actionTypes.createRequested });
    try {
        const response = await orderAPI.post(formValues);
        dispatch({ type: actionTypes.createSuccess });
        dispatch(clearForm());
        return response;
    } catch (error) {
        dispatch({ type: actionTypes.createError, value: error });
        return error;
    }
};

export default { submit, changeForm, clearForm };
