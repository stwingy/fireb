import * as ActionTypes from './actionTypes';

export const isAuth = (state = {}, action) => {
	switch (action.type) {
		case ActionTypes.IS_AUTH:
			return {
				...state,
				auth: action.payload
			};
		default:
			return state;
	}
};
