import React from 'react'
import {FormGroup, Input, Label} from "reactstrap";
import classNames from 'classnames'


export const renderForm = ({input,type,placeholder,spanIcon,meta:{error}})=>{
    return(<FormGroup className="has-wrapper">
        <Input {...input} type={type} placeholder={placeholder}  className="has-input input-lg" required/>
        <span className="has-icon"><i className={spanIcon}></i></span>
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