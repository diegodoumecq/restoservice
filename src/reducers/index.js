import { combineReducers } from 'redux';
import restaurants from './restaurants';
import order from './order';

export default combineReducers({ restaurants, order });
