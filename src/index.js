import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'sanitize.css/sanitize.css';
import classnames from 'classnames/bind';

import store, { history } from './store';
import Home from './containers/Home';
import Order from './containers/Order';
import { get } from './actions/restaurants';

// TODO investigate if material-ui is enough to avoid stylus/css files altogether
import styles from './main.styl';

const cx = classnames.bind(styles);

// TODO change the GET call to only get all restaurant on Home
// when loading the page into Ordering, just GET that restaurant
store.dispatch(get());

// TODO consider other aternatives to redux-thunk like redux-sagas, especially for validation & better controllers
// TODO consider flow-type for replacing propTypes
// TODO consider using a PWA configuration (manually adding the webworker? seems like it needs webpack config changes)

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <main className={cx('root')}>
                <Route exact path="/" component={Home} />
                <Route exact path="/order/:restaurantId" component={Order} />
            </main>
        </ConnectedRouter>
    </Provider>,
    document.querySelector('#app')
);
