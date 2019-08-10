/* eslint-disable */
import React ,{Component} from 'react';
import {Helmet} from "react-helmet";

import IntlMessages from "Util/IntlMessages";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {getFormData} from "Actions/CreateTaskAction";
import {connect} from 'react-redux';
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

const mapDispatchToProps = {
    getFormData
};

const mapStateToProps =  state => ({
    ...state.createTaskReducer
});

class CreateTask extends Component{

    state = {
        all: false,
        tasks: null, // initial task data
        users:null,
        selectedTask: null, // selected user to perform operations
        addNewTaskModal: false, // add new user form modal
        profilePicUploaded: false,
        openViewUserDialog: false, // view user dialog box
        editUser: null,
        allSelected: false,
        selectedUsers: 0,

    };
    getForms(url){
        return this.props.getFormData(url);
    }
    getCategory(url){

    }
    componentDidMount(){
        this.getForms('/forms');
    }
    opnAddNewTaskModal(){

    }
    render(){
        const{match,taskLoading,formData} = this.props;

        return(
            <div className="user-management">
                <Helmet>
                    <title>Polucon | Create Task</title>
                    <meta name="description" content="Create Tasks" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.createTask" />} match={match} />
                <RctCollapsibleCard>
                    {taskLoading ?
                        <RctPageLoader/>:

                        <div className="table-responsive">
                            <div className="d-flex justify-content-between py-20 px-10 border-bottom">
                                <div>
                                    <a href="javascript:void(0)" onClick={() => this.onReload()} className="btn-outline-default mr-10"><i className="ti-reload"></i></a>
                                </div>
                                {formData && (formData.length !== 0)  ? <div>
                                    <a href="javascript:void(0)" onClick={() => this.opnAddNewTaskModal()} color="primary" className="caret btn-sm mr-10">Add New Task <i className="zmdi zmdi-plus"></i></a>
                                </div>:
                                    <div>
                                        <a href="/app/form-builder/create-form" color="primary" className="caret btn-sm mr-10">Create Forms <i className="zmdi zmdi-plus"></i></a>
                                    </div>}

                            </div>
                        </div>}

                </RctCollapsibleCard>
            </div>
        );
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CreateTask);
