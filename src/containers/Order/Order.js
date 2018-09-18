import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import SimpleModal from '../../components/SimpleModal';
import Loader from '../../components/Loader';

import Meals from './Meals';

// TODO validations

export default class Order extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        fetching: PropTypes.bool,
        submitting: PropTypes.bool,
        restaurant: PropTypes.shape({
            id: PropTypes.string,
            logo: PropTypes.string,
            commercialName: PropTypes.string,
            reviews: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string,
                review: PropTypes.string,
                rating: PropTypes.number
            })),
            meals: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string,
                description: PropTypes.string,
                price: PropTypes.number
            })),
            commercialEmail: PropTypes.string,
            adminNumber: PropTypes.string,
            address: PropTypes.string,
            location: PropTypes.string
        }),
        formValues: PropTypes.shape({
            quantities: PropTypes.object,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            phone: PropTypes.string,
            deliveryAddress: PropTypes.string
        }).isRequired,
        goBackHome: PropTypes.func.isRequired,
        changeForm: PropTypes.func.isRequired,
        submit: PropTypes.func.isRequired
    }

    state = {
        isModalOpen: false,
        message: ''
    }

    makeChangeHandler = fieldName => e => this.props.changeForm({
        [fieldName]: e.target.value
    })

    handleSubmit = async () => {
        const response = await this.props.submit(this.props.formValues);
        this.setState({
            isModalOpen: true,
            message: response
        });
    }

    handleCloseModal = () => this.setState({ isModalOpen: false })

    renderFields = (formValues, classes) => (
        <Grid
            item
            spacing={6}
            className={classes.userData}
        >
            <TextField
                id="firstName"
                label="First Name"
                className={classes.textField}
                onChange={this.makeChangeHandler('firstName')}
                value={formValues.firstName}
                margin="normal"
                fullWidth
                required
            />
            <TextField
                id="lastName"
                label="Last Name"
                className={classes.textField}
                onChange={this.makeChangeHandler('lastName')}
                value={formValues.lastName}
                margin="normal"
                fullWidth
                required
            />
            <TextField
                id="phone"
                label="Phone"
                className={classes.textField}
                onChange={this.makeChangeHandler('phone')}
                value={formValues.phone}
                margin="normal"
                fullWidth
                required
            />
            <TextField
                id="deliveryAddress"
                label="Delivery Address"
                className={classes.textField}
                onChange={this.makeChangeHandler('deliveryAddress')}
                value={formValues.deliveryAddress}
                margin="normal"
                fullWidth
                required
            />
            <Button
                type="button"
                color="primary"
                variant="contained"
                onClick={this.handleSubmit}
                disabled={this.props.submitting}
            >
                Submit
            </Button>
        </Grid>
    )

    render() {
        const {
            restaurant,
            fetching,
            classes,
            formValues,
            goBackHome,
            changeForm
        } = this.props;

        return (
            <>
                <SimpleModal
                    title="Order received"
                    isOpen={this.state.isModalOpen}
                    onClose={this.handleCloseModal}
                >
                    <div className={classes.modalContent}>
                        {this.state.message}
                    </div>
                </SimpleModal>
                <AppBar position="static">
                    <Toolbar classes={{ root: classes.toolbar }}>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={goBackHome}
                        >
                            <KeyboardBackspaceIcon />
                        </IconButton>
                        <Typography
                            className={classes.title}
                            variant="title"
                            color="inherit"
                            noWrap
                        >
                            Order
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Loader loading={fetching}>
                    {!restaurant && (
                        <div>
                            Restaurant id not found
                        </div>
                    )}
                    {restaurant && (
                        <Grid container spacing={12} justify="center">
                            <Grid item spacing={6}>
                                <img
                                    className={classes.logo}
                                    src={restaurant.logo}
                                    alt={restaurant.commercialName}
                                />
                            </Grid>
                            <Grid
                                item
                                spacing={6}
                                className={classes.description}
                            >
                                <p
                                    className={classes.name}
                                >
                                    {restaurant.commercialName}
                                </p>
                                <p>{restaurant.commercialEmail}</p>
                                <p>{restaurant.address}</p>
                                <p>{restaurant.location}</p>
                                <p>Admin Number: {restaurant.adminNumber}</p>
                            </Grid>
                            <Grid container spacing={12}>
                                <form>
                                    <Meals
                                        list={restaurant.meals}
                                        quantities={formValues.quantities}
                                        changeForm={changeForm}
                                    />
                                    <Grid
                                        container
                                        spacing={12}
                                        justify="center"
                                    >
                                        {this.renderFields(formValues, classes)}
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    )}
                </Loader>
            </>
        );
    }
}
