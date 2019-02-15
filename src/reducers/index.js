import { combineReducers } from 'redux';
import { storeUser } from './storeUser_reducer';
import { isAuth } from './isAuth_reducer';

const RootReducer = combineReducers({
	user: storeUser,
	auth: isAuth
});
export default RootReducer;
