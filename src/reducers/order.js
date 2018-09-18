export const actionTypes = {
    createRequested: 'order/CREATE_REQUESTED',
    createError: 'order/CREATE_ERROR',
    createSuccess: 'order/CREATE_SUCCESS',
    changeForm: 'order/CHANGE_FORM',
    clearForm: 'order/CLEAR_FORM'
};

const initialState = {
    submitting: false,
    dirty: false,
    error: '',
    formValues: {
        quantities: {},
        firstName: '',
        lastName: '',
        phone: '',
        deliveryAddress: ''
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.createRequested:
        return {
            ...state,
            submitting: true
        };

    case actionTypes.createError:
        return {
            ...state,
            submitting: false,
            error: action.value
        };

    case actionTypes.createSuccess:
        return {
            ...state,
            submitting: false,
            error: ''
        };

    case actionTypes.changeForm:
        return {
            ...state,
            formValues: { ...state.formValues, ...action.value },
            dirty: true
        };

    case actionTypes.clearForm:
        return {
            ...state,
            formValues: initialState.formValues,
            dirty: false
        };

    default:
        return state;
    }
};
