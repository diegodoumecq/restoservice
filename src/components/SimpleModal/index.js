import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 4,
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%'
    }
});

const SimpleModal = ({
    classes,
    isOpen,
    children,
    onClose,
    title,
    ...props
}) => (
    <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpen}
        onClose={onClose}
        {...props}
    >
        <Card className={classes.paper}>
            <Typography variant="title" id="modal-title">
                {title}
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
                {children}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={onClose}
            >
                Close
            </Button>
        </Card>
    </Modal>
);

SimpleModal.displayName = 'SimpleModal';
SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
};

export default withStyles(styles)(SimpleModal);
