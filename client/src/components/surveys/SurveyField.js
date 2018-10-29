import React from 'react';

//meta:{} nested destructure of es6
export default ({input, label, meta:{touched, error}})=>{
    return(
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: "5px"}}/>
            <div className="red-text" style={{marginBottom: "20px",fontStyle: "italic"}} >
            {touched && error}
            </div>
        </div>
    );

}