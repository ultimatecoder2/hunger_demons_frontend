import {record, authRecord} from '../apis/feed_needy';
import {ADD_REQUEST, REQUEST_FAILED, DELETE_REQUEST, FETCH_DONATE_REQUEST, FETCH_NEED_REQUEST} from './actionTypes'
import history from '../history';

export const addRequest = (requestDetails) => async (dispatch,getState) =>{
    let token = getState().auth.token;
    try{
        const response = await authRecord(token).post('/foodrequests', requestDetails);
        dispatch({type:ADD_REQUEST,payload:{msg:"Your request has been registered"}});
    }catch(e){
        let error = e;
        dispatch({type:REQUEST_FAILED, payload:{error:"Your request can't be recorded. Please try again later."}})
    }
}

export const fetchRequests = (data) => async (dispatch,getState) =>{
    let token = getState().auth.token;
    const {Limit, Skip, requestType, city, state, country, postalCode} = data;
    try{
        const response = await authRecord(token).get('/foodrequests',{
            params:{
                Limit,Skip,requestType, city, state, country, postalCode
            }
        });
        if(requestType==="Donate")
            dispatch({type:FETCH_DONATE_REQUEST,payload:response.data});
        else if(requestType==="Need")
            dispatch({type:FETCH_NEED_REQUEST,payload:response.data});
        
    }catch(e){
        let error = e;
        dispatch({type:REQUEST_FAILED, payload:{error:"Loading failed. Make sure that you are logged In."}})
    }
}

export const fetchUserRequests = (data) => async (dispatch,getState) =>{
    let token = getState().auth.token;
    const {Limit, Skip, requestType, city, state, country, postalCode,owner} = data;
    console.log("Hi",data);
    try{
        const response = await authRecord(token).get('/foodrequests/me',{
            params:{
                Limit,Skip,requestType, city, state, country, postalCode,owner
            }
        });
        if(requestType==="Donate")
            dispatch({type:FETCH_DONATE_REQUEST,payload:response.data});
        else if(requestType==="Need")
            dispatch({type:FETCH_NEED_REQUEST,payload:response.data});
        
    }catch(e){
        let error = e;
        dispatch({type:REQUEST_FAILED, payload:{error:"Loading failed. Make sure that you are logged In."}})
    }
}