import React from 'react'
import {FormGroup, Input, Label} from "reactstrap";

export const renderField = ({input,label,type,placeholder,spanIcon,meta:{error}})=>{
    return(<FormGroup className="has-wrapper">
        {/*<Label>{label}</Label>*/}
        <Input {...input} type={type} placeholder={placeholder}  className="has-input input-lg" required/>
        <span className="has-icon"><i className={spanIcon}></i></span>
    </FormGroup>)
}