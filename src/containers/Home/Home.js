import React from 'react';
import PropTypes from 'prop-types';
import { map, sortBy, filter } from 'lodash/fp';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

import Loader from '../../components/Loader';

const ORDER_DESC = 'desc';
const ORDER_ASC = 'asc';

function getRootElement() {
    return document.querySelector('main');
}

function scrollPage(value) {
    getRootElement().scrollTop = value;
}

export default class Home extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        fetching: PropTypes.bool,
        restaurants: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            logo: PropTypes.string,
            commercialName: PropTypes.string,
            commercialEmail: PropTypes.string,
            address: PropTypes.string,
            location: PropTypes.string,
            rating: PropTypes.number,
            reviewCount: PropTypes.number
        })),
        goToOrder: PropTypes.func.isRequired
    }

    state = {
        orderBy: ORDER_DESC,
        search: ''
    }

    getRestaurants = () => {
        const { search, orderBy } = this.state;
        let { restaurants } = this.props;

        if (search) {
            restaurants = filter(r => (
                r.commercialName.toLowerCase().includes(search.toLowerCase()) ||
                r.address.toLowerCase().includes(search.toLowerCase())
            ), restaurants);
        }

        if (orderBy === ORDER_ASC) {
            return sortBy('rating', restaurants);
        }

        return sortBy('rating', restaurants).reverse();
    }

    handleSortChange = () => {
        if (this.state.orderBy === ORDER_DESC) {
            this.setState({ orderBy: ORDER_ASC });
        } else {
            this.setState({ orderBy: ORDER_DESC });
        }
    }

    handleSearchChange = e => {
        this.setState({ search: e.target.value });
    }

    makeOrderClickHandler = id => e => {
        // TODO review why scrolling to top is even needed
        scrollPage(0);
        this.props.goToOrder(id);
    }

    renderCard = restaurant => (
        <Grid key={restaurant.id} item lg={2} md={4} sm={6} xs={12}>
            <Paper className={this.props.classes.paper}>
                <img
                    className={this.props.classes.logo}
                    src={restaurant.logo}
                    alt={restaurant.commercialName}
                />
                <p className={this.props.classes.name}>
                    {restaurant.commercialName}
                </p>
                <p>{restaurant.commercialEmail}</p>
                <p>{restaurant.location}, {restaurant.address}</p>
                <p>Rating: {Math.round(restaurant.rating * 10) / 10}/10</p>
                <p>Number of reviews: {restaurant.reviewCount}</p>
                <Button
                    onClick={this.makeOrderClickHandler(restaurant.id)}
                    color="default"
                    variant="contained"
                >
                    Place Order
                </Button>
            </Paper>
        </Grid>
    )

    render() {
        const { classes, fetching } = this.props;
        const { orderBy } = this.state;
        const restaurants = this.getRestaurants();

        return (
            <>
                <AppBar position="static">
                    <Toolbar classes={{ root: classes.toolbar }}>
                        <Typography
                            className={classes.title}
                            variant="title"
                            color="inherit"
                            noWrap
                        >
                            List of restaurants
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <Input
                                placeholder="Search…"
                                disableUnderline
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                onChange={this.handleSearchChange}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <Loader loading={fetching}>
                    <Toolbar>
                        <Button
                            onClick={this.handleSortChange}
                            color="secondary"
                            variant="contained"
                        >
                            Order by Rating {orderBy === ORDER_DESC ? '↓' : '↑'}
                        </Button>
                    </Toolbar>
                    <Grid className={classes.row} container spacing={6} justify="center">
                        {map(this.renderCard, restaurants)}
                    </Grid>
                </Loader>
            </>
        );
    }
}
