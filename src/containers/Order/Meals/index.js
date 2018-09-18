import React from 'react';
import PropTypes from 'prop-types';
import { map, reduce } from 'lodash/fp';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// TODO validations
// TODO replace table with something prettier and more modern

const styles = theme => ({
    rowPrice: {
        minWidth: '9rem'
    },
    rowName: {
        minWidth: '14rem'
    },
    quantityField: {
        textAlign: 'right',
        width: '8rem'
    },
    total: {
        fontWeight: 'bold',
        fontSize: '1rem'
    }
});

class Meals extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        list: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string,
            price: PropTypes.number
        })),
        quantities: PropTypes.object,
        changeForm: PropTypes.func.isRequired
    }

    static defaultProps = {
        quantities: {},
        list: []
    }

    makeChangeHandler = id => e => this.props.changeForm({
        quantities: { ...this.props.quantities, [id]: e.target.value }
    })

    render() {
        const {
            list,
            classes,
            quantities
        } = this.props;

        const totalSum = reduce(
            (acc, curr) => acc + (curr.price * (parseFloat(quantities[curr.id]) || 0)),
            0,
            list
        ).toFixed(2);

        return (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.rowName}>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell numeric className={classes.rowPrice}>
                            Price
                        </TableCell>
                        <TableCell numeric>Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {map(meal => (
                        <TableRow key={meal.id}>
                            <TableCell component="th" scope="row">
                                {meal.name}
                            </TableCell>
                            <TableCell>{meal.description}</TableCell>
                            <TableCell numeric>{`$${meal.price}`}</TableCell>
                            <TableCell numeric>
                                <Input
                                    id={`${meal.id}_number`}
                                    type="number"
                                    placeholder="Quantity"
                                    classes={{ input: classes.quantityField }}
                                    onChange={this.makeChangeHandler(meal.id)}
                                    value={quantities[meal.id] || 0}
                                    inputProps={{ min: 0 }}
                                    margin="normal"
                                />
                            </TableCell>
                        </TableRow>
                    ), list)}
                    <TableRow>
                        <TableCell component="th" scope="row" />
                        <TableCell />
                        <TableCell />
                        <TableCell className={classes.total} numeric>
                            Total ${totalSum}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

export default withStyles(styles)(Meals);
export const UndecoratedMeals = Meals;
