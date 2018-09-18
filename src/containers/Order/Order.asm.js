import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { find, flowRight } from 'lodash/fp';

import { withStyles } from '@material-ui/core/styles';

import { changeForm, submit } from '../../actions/order';
import styles from './OrderStyles';

const mapStateToProps = ({ restaurants, order }, props) => ({
    restaurant: find({ id: props.match.params.restaurantId }, restaurants.list),
    fetching: restaurants.fetching,
    formValues: order.formValues,
    submitting: order.submitting
});

const mapDispatchToProps = {
    goBackHome: id => push('/'),
    changeForm,
    submit
};

export default flowRight(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles)
);
