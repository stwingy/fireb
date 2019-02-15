import * as ActionTypes from './actionTypes';

export const storeUser =(state={},action)=>{
switch(action.type){
    case ActionTypes.STORE_USER  :
    return{
        ...state,
        user:action.payload
    }
    default:
    return state
}


}