import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router-dom';

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
    const reviewFields = _.map(formFields, ({label, name})=>{
        return(
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    })
    return(
        <div>
            <h5>Please confirm your entries</h5>
            <div>{reviewFields}</div>
            <button className="yellow btn-flat darken-3 left white-text" onClick={onCancel}>
                Back
            </button>
            <button className="green btn-flat right white-text" onClick={()=>submitSurvey(formValues,history)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
};

//map the redux state to props,
//then pass props to SurveyFormReview component
function mapStateToProps(state){
    return { formValues: state.form.surveyForm.values }
}

export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview));