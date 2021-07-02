import {GET_USER_PROFILE, GET_USER_PROFILE_FAILED} from '../actions/actionTypes';
const INITIAL_STATE = {
    error:null,
    message:null, 
    profile:null
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case GET_USER_PROFILE_FAILED:
            return{...state, message:null, error:action.payload.error, data:null}
        case GET_USER_PROFILE:
            return {...state, message:"Success", error:null, profile:action.payload.profile}
        default:
            return state
    }
}