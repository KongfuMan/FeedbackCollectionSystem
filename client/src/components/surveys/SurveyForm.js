import React,{Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
// redux-form library exports lots of objects, functions, values ,etc.
// by curly braces, we only need 'reduxForm'
// reduxForm allows component to communicate with the redux store
// Field is used for rendering any traditional html form element
import { reduxForm , Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validataEmails';
import formFields from './formFields';

// 'name' a key for reduxForm to store your input data to redux store
// 'component' like a html tag
class SurveyForm extends Component{
    renderFields(){
        return _.map(formFields, ({label, name})=>{
            return(
                /*all the customer property defined here will be pass into SurveyField function automatically*/
                /*don't forget to define a unique key for each element in an array for react to reader*/
                <Field key={name} label={label} type='text' name={name} component={SurveyField} />
            )
        })
    };

    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat left white-text">
                        Cancel
                        <i className="material-icons right">close</i>
                    </Link>
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

//values object contains all the data coming from our form
function validate(values){
    const errors = {};   // add any invalid value into the error object
    errors.recipients = validateEmails(values.recipients || '');// because as client boots up, this validate will run automatically, the emails still not define yet

    _.each(formFields,({name})=>{
        if (!values[name]){
            errors[name] = 'You must provide a ' + name;  // redux will match errors.title with the fields name
        }
    });

    return errors; // if error has some value in it, the redux will stop the submission process
}

//the form key here correspond to the 'form' key in combineReducer
export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);