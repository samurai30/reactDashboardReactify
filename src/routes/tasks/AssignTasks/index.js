/* eslint-disable */
import React, {Component, createRef} from 'react';
import {Helmet} from "react-helmet";

import IntlMessages from "Util/IntlMessages";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {connect} from 'react-redux';
import {getDepartmentNames, getTaskToAssign, removeSelected, setSelected} from "Actions/AssignTaskAction";
import {Alert} from "reactstrap";
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router-dom';
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import Dropdown from "reactstrap/es/Dropdown";
import {Scrollbars} from "react-custom-scrollbars";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import {SERVER_PATH} from "Actions/types";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/es/TextField";
import Chip from "@material-ui/core/es/Chip";
const mapStateToProps = state =>({
...state.assignTask
});

const mapDispatchToProps = {
    getTaskToAssign,
    getDepartmentNames,
    setSelected,
    removeSelected
};

class AssignTask extends Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    state ={
        dropdownOpen: false,
    };
    componentDidMount(){
        this.props.getTaskToAssign('/tasks');
        this.props.getDepartmentNames('/departments');
    }
    reloadDept(){
        return this.props.getDepartmentNames('/departments');
    }
    onSelectDept(dept){
        return this.props.setSelected(dept);
    }

    onRemoveSelect(){
        return this.props.removeSelected();
    }
    search_dept = createRef();
    onSearchDept(){
        return this.props.getDepartmentNames(`/departments?DepartmentName=${this.search_dept.current.value}`)
    }
    render(){
        const{match,tasksData,loading,departmentData,deptLoading,surveyorData,selectedDept} = this.props;

        return(
            <div className="ecom-dashboard-wrapper">
                <Helmet>
                    <title>Polucon | Assign Task</title>
                    <meta name="description" content="Assign Tasks" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.assignTask" />} match={match} />
                <RctCollapsibleCard
                    heading={<IntlMessages id="assignment.assignTask" />}
                    collapsible
                    reloadable
                    fullBlock>
                    <div className="d-flex justify-content-center">
                        <a href="javascript:void(0)" onClick={() => this.reloadDept()} className="btn-outline-default mr-10"><i className="ti-reload"></i></a>
                    </div>
                    <br/>
                    {tasksData && (tasksData.length !== 0)
                        ?
                        <div className="container">
                            {
                                departmentData &&
                                (departmentData.length !== 0) ? selectedDept ?
                                    <div>

                                        <div className="d-flex justify-content-center">
                                            <Chip className="bg-info text-white mr-10 mb-10"
                                                  label={selectedDept.DepartmentName}
                                                  onDelete={() => this.onRemoveSelect()} />
                                        </div>
                                        <br/>
                                        <Divider/>
                                        <br/>
                                        <div className="d-flex justify-content-center">
                                            <h4>Select Tasks</h4>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <h4 className="text-yellow">Select Department to continue</h4>
                                        <br/>
                                        <div className="search-bar">
                                            <TextField
                                                id="standard-with-placeholder"
                                                inputRef={this.search_dept}
                                                placeholder="Search Department"
                                            />
                                            {' '}
                                            <Button variant="contained" color="primary" className="mx-sm-15" onClick={() => this.onSearchDept()}>
                                                Search
                                            </Button>
                                        </div>
                                        <br/>
                                        <Scrollbars className="rct-scroll" autoHeight>
                                            <List className="p-0">
                                                {departmentData.map(dept=>(
                                                    <div key={dept.id}>
                                                        <ListItem button onClick={() => this.onSelectDept(dept)}>
                                                            <ListItemText primary={dept.DepartmentName} secondary="Select Department" />
                                                        </ListItem>
                                                        <Divider variant="inset" />
                                                    </div>
                                                )) }
                                            </List>
                                        </Scrollbars>
                                        <br/>
                                    </div>
                                    :
                                    <div className="container">
                                        <br/>
                                        <div className="search-bar">
                                            <TextField
                                                id="standard-with-placeholder"
                                                inputRef={this.search_dept}
                                                placeholder="Search Department"
                                            />
                                            {' '}
                                            <Button variant="contained" color="primary" className="mx-sm-15" onClick={() => this.onSearchDept()}>
                                                Search
                                            </Button>
                                        </div>
                                        <br/>
                                        <Alert color="warning">
                                            Sorry no department found for {this.search_dept.current && `${this.search_dept.current.value}`}
                                        </Alert>
                                        <br/>
                                    </div>

                            }
                        </div>
                        :
                        <div>
                            <div className="container">
                                <br></br>
                                <Alert color="warning">
                                    No Tasks found
                                </Alert>
                                <div className="d-flex justify-content-center">
                                    <Button onClick={() => this.props.history.push('/app/tasks/create-task')} color="primary">ADD HERE</Button>
                                </div>
                                <br></br>
                            </div>

                        </div>
                    }
                    {loading && <RctSectionLoader/>}
                    {deptLoading && <RctSectionLoader/>}
                </RctCollapsibleCard>
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AssignTask));


