import axios from 'axios';  //Promise based HTTP client for the browser and node.js
import {FETCH_USER, FETCH_SURVEYS } from "./types";

// these are action creater functions
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

export const submitSurvey = (values, history)=>
    async (dispatch) => {
        const res = await axios.post('/api/surveys',values);
        history.push('/surveys');
        dispatch({type:FETCH_USER, payload:res.data});
    };

export const fetchSurveys = ()=>
    async (dispatch) => {
        console.log('action creator fetchSurveyList');
        const surveys = await axios.get('/api/surveys');
        console.log(surveys.data);
        dispatch({type:FETCH_SURVEYS, payload: surveys.data});
    };