import {combineReducers} from 'redux';
import authReducer from './authReducer';
import {reducer as reduxForm } from 'redux-form';
import surveysReducer from './surveysReducer'

//this is where we wire together all the reducers inside our application
//not only the reducers we write,but also reducers that third party modules need
export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys:surveysReducer
})