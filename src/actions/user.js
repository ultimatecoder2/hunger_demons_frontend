import {record, authRecord} from '../apis/feed_needy';
import {UPDATE_FORM, UPDATE_FAILED, FETCH_PROFILE, FETCH_PROFILE_FAILED} from './actionTypes'
import history from '../history';

export const updateProfile = (data) => async (dispatch,getState) =>{
    let token = getState().auth.token;
    const updates = Object.keys({...data});
    let formData = new FormData();
    updates.forEach((update) => {
        console.log(data[update]);
        formData.append(update, data[update])
    } );

    try{
        for (var value of formData.values()) {
            console.log(value);
         }
        const response = await authRecord(token).patch('/users/me', 
            formData, {
                headers:{
                    "Content-type":"multipart/form-data"
                }
            }
        );

        dispatch({type:UPDATE_FORM,payload:{msg:"Your request has been registered"}});
    }catch(e){
        console.log("Error",e);
        dispatch({type:UPDATE_FAILED, payload:{error:"Your request can't be recorded. Please try again later."}})
    }
}

export const updateAddress = (data) => async (dispatch,getState) =>{
    let token = getState().auth.token;
    console.log(data);
    try{
        const response = await authRecord(token).patch('/users/me/address', data);

        dispatch({type:UPDATE_FORM,payload:{msg:"Your request has been registered"}});
    }catch(e){
        console.log("Error",e);
        dispatch({type:UPDATE_FAILED, payload:{error:"Your request can't be recorded. Please try again later."}})
    }
}
export const fetchProfile = (id)=>async(dispatch, getState)=>{
    const url = '/users/'+id;
    console.log("Got",id, "Url:",url);
    try{
        const response = await record.get(url);
        console.log(response.data);
        dispatch({type:FETCH_PROFILE,payload:{profile:response.data}});
    }catch(e){
        console.log(e);
        dispatch({type:FETCH_PROFILE_FAILED, payload:{error:e}})
    }
}
