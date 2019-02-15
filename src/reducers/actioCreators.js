import * as ActionTypes from './actionTypes';

export const storeUser = (user) => ({
	type: ActionTypes.STORE_USER,
	payload: user
});

export const isAuth = (aut = false) => ({
	type: ActionTypes.IS_AUTH,
	payload: aut
});
