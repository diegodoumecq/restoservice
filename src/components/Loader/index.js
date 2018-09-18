import React from 'react';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';

// TODO show "fake" content wile loading
const Loader = ({ loading, children }) => (
    !loading ? children : <LinearProgress />
);

Loader.displayName = 'Loader';
Loader.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.node
};

export default Loader;
