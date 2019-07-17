import React from 'react'
import {FormGroup, Input, Label} from "reactstrap";
import {Field} from "redux-form";

export const renderField = ({input,label,type,placeholder,spanIcon,meta:{error}})=>{
    return(<FormGroup className="has-wrapper">
        {/*<Label>{label}</Label>*/}
        <Input {...input} type={type} placeholder={placeholder}  className="has-input input-lg"/>
        <span className="has-icon"><i className={spanIcon}></i></span>
    </FormGroup>)
}