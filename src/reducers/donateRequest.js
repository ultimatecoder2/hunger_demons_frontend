import {REQUEST_FAILED, FETCH_DONATE_REQUEST} from '../actions/actionTypes';
const INITIAL_STATE = {
    error:null,
    message:null, 
    data:null
}
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case REQUEST_FAILED:
            return{...state, message:null, error:action.payload.error, data:null}
        case FETCH_DONATE_REQUEST:
            return {...state, message:"Success", error:null, data:action.payload}
        default:
            return state
    }
}