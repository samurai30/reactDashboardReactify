import React from 'react'
import {FormGroup, Input, Label} from "reactstrap";
import classNames from 'classnames'


export const renderField = ({selectItems,input,label,type,placeholder,spanIcon,meta:{error}})=>{
    const classes = classNames(
        'form-control',
        {
            'is-invalid':error
        }
    );
    return(<FormGroup className="has-wrapper">
        {label !== null && label !== '' && <Label>{label}</Label>}
        {type !== 'select' && <Input {...input} type={type} placeholder={placeholder}  className={classes} required/>}
        {type === 'select' && <Input {...input} type={type} required>
            <option value="">Select {label}</option>
            {selectItems && selectItems.map(item =><option key={item.id} value={item.URI}>{item.value}</option>)}
        </Input>}
        {spanIcon !== '' && spanIcon !== null && <span className="has-icon"><i className={spanIcon}></i></span>}
        {error && <small className="form-text text-danger">{error}</small>}
    </FormGroup>)
};

{/*{type === 'dropdown' && <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>*/}
{/*<DropdownToggle caret> {dropDownTitle}</DropdownToggle>*/}
{/*<DropdownMenu right>*/}
{/*{dropDownItems && dropDownItems.map(item => {*/}
{/*<DropdownItem key={item.id}>{item.value}</DropdownItem>*/}
{/*})}*/}
{/*</DropdownMenu>*/}
{/*</Dropdown>}*/}