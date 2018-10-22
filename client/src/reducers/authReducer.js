import {FETCH_USER} from "../actions/types";

export default function(state = null, action){ //set default state value to be null
    switch (action.type){
        case(FETCH_USER):
            return action.payload || false; // if payload is empty, return false
        default:
            return state;
    }

}