import {ADD_REQUEST, REQUEST_FAILED, DELETE_REQUEST} from '../actions/actionTypes';
const INITIAL_STATE = {
    error:null,
    message:null, 
    data:null
}
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case ADD_REQUEST:
            return{...state, message:action.payload.msg, error:null, data:null}
        case REQUEST_FAILED:
            return{...state, message:null, error:action.payload.error, data:null}
        case DELETE_REQUEST:
            return{...state, message:null, error:action.payload.error, data:null}
        default:
            return state
    }
}