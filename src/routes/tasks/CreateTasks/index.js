/* eslint-disable */
import React ,{Component} from 'react';
import {Helmet} from "react-helmet";

import IntlMessages from "Util/IntlMessages";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";




export default class CreateTask extends Component{

    state = {
        all: false,
        tasks: null, // initial task data
        users:null,
        selectedTask: null, // selected user to perform operations
        loading: false, // loading activity
        addNewTaskModal: false, // add new user form modal
        profilePicUploaded: false,
        openViewUserDialog: false, // view user dialog box
        editUser: null,
        allSelected: false,
        selectedUsers: 0,
        paginationHydra: null,
        hydraTotalItem: null
    };
    render(){
        const{match} = this.props;
        return(
            <div className="user-management">
                <Helmet>
                    <title>Polucon | Create Task</title>
                    <meta name="description" content="Create Tasks" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.createTask" />} match={match} />
                <RctCollapsibleCard>
                    <div className="table-responsive">
                        <div className="d-flex justify-content-between py-20 px-10 border-bottom">
                            <div>
                                <a href="javascript:void(0)" onClick={() => this.onReload()} className="btn-outline-default mr-10"><i className="ti-reload"></i></a>
                            </div>
                            <div>
                                <a href="javascript:void(0)" onClick={() => this.opnAddNewTaskModal()} color="primary" className="caret btn-sm mr-10">Add New Task <i className="zmdi zmdi-plus"></i></a>
                            </div>
                        </div>
                    </div>

                </RctCollapsibleCard>
            </div>
        );
    }
}



