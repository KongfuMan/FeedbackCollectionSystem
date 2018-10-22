import axios from 'axios';
import {FETCH_USER} from "./types";

//action creater
export const fetchUser = ()=>
    async dispatch =>{
    const res = await axios.get('/api/current_user');
    // automatically dispatch payload to reducer of 'FETCH_USER' type,
    // in this case is authReducer
    dispatch({type:FETCH_USER, payload:res.data});
    };

export const handleToken = (token)=>
    async (dispatch) => {
        const res = await axios.post('/api/stripe',token);
        dispatch({type:FETCH_USER, payload:res.data});
    };