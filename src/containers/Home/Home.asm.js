import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import {
    map,
    pick,
    reduce,
    flowRight
} from 'lodash/fp';

import { withStyles } from '@material-ui/core/styles';
import styles from './HomeStyles';

const mapStateToProps = ({ restaurants }) => ({
    restaurants: map(restaurant => ({
        ...pick(['id', 'logo', 'commercialName', 'commercialEmail', 'address', 'location'], restaurant),
        rating: reduce((acc, review) => acc + review.rating, 0, restaurant.reviews) / restaurant.reviews.length,
        reviewCount: restaurant.reviews.length
    }), restaurants.list),
    fetching: restaurants.fetching
});

const mapDispatchToProps = {
    goToOrder: id => push(`/order/${id}`)
};

export default flowRight(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles)
);
