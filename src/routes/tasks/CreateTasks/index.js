/* eslint-disable */
import React ,{Component} from 'react';
import {Helmet} from "react-helmet";

import IntlMessages from "Util/IntlMessages";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {addCategory, addTask, getCategoryData, getFormData, getTaskData} from "Actions/CreateTaskAction";
import {connect} from 'react-redux';
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {Alert, Form, FormGroup, Modal, ModalBody, ModalHeader} from "reactstrap";
import SweetAlert from 'react-bootstrap-sweetalert'
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import {Field, reduxForm, reset} from "redux-form";
import {renderField} from "../../../forms/ComonForm";
import ProfilePicBrowser from "Components/ImageUploader/ProfilePicBrowser";
import UserProfilePic from "Components/ImageUploader/UserProfilePic";
import Button from "@material-ui/core/Button";
import {NotificationContainer} from "react-notifications";
const mapDispatchToProps = {
    getFormData,
    getCategoryData,
    addCategory,
    addTask,
    getTaskData
};

const mapStateToProps =  state => ({
    ...state.createTaskReducer
});

class CreateTask extends Component{

    state = {
        withDes: false,
        all: false,
        tasks: null, // initial task data
        users:null,
        selectedTask: null, // selected user to perform operations
        addNewTaskModal: false, // add new user form modal
        addNewCategoryModal: false,
        profilePicUploaded: false,
        openViewUserDialog: false, // view user dialog box
        editUser: null,
        allSelected: false,
        selectedUsers: 0,
        status:[
            {
                id:1,
                value:'Pending',
                URI: 'Pending'
            },
            {
                id:2,
                value:'In Progress',
                URI: 'InProgress'
            },
            {
                id:3,
                value:'Completed',
                URI: 'Completed'
            },
            {
                id:4,
                value:'Rejected',
                URI: 'Rejected'
            }
        ],
    };

    /**
     * On Confirm dialog
     * @param {string} key
     */
    onConfirm(key) {
        this.setState({ [key]: false })
    }

    /**
     * Open Alert
     * @param {key} key
     */
    openAlert(key) {
        this.setState({ [key]: true });
    }

    getForms(url){
        return this.props.getFormData(url);
    }
    getCategory(url){
        return this.props.getCategoryData(url);
    }
    componentDidMount(){
        this.getForms('/forms');
        this.getCategory('/task_categories');
        this.props.getTaskData();
    }
    opnAddNewTaskModal(){
        this.setState({addNewTaskModal:true})
    }
    opnAddNewCategoryModal(){
        this.setState({addNewCategoryModal:true})
    }

    onSubmitCat(values){
         return this.props.addCategory(values);
    }
    onSubmitTask(values){
        return this.props.addTask(values);
    }
    onCategoryModalClose(){
        this.props.dispatch(reset('createTaskForm'));
        this.setState({addNewCategoryModal:false})
    }
    onTaskModalClose(){
        this.props.dispatch(reset('createTaskForm'));
        this.setState({addNewTaskModal:false})
    }

    render(){
        const{match,taskLoading,formData,categoryData,handleSubmit,formSelectData,catSelectDat,taskData} = this.props;
        const { withDes,addNewCategoryModal,addNewTaskModal} = this.state;

        return(
            <div className="user-management">
                <NotificationContainer />
                <Helmet>
                    <title>Polucon | Create Task</title>
                    <meta name="description" content="Create Tasks" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.createTask" />} match={match} />
                <SweetAlert
                    show={withDes}
                    title="Opps!"
                    btnSize="sm"
                    onConfirm={() => this.onConfirm('withDes')}
                >
                   Please fix the warnings to continue.
                </SweetAlert>
                <RctCollapsibleCard>
                    {categoryData && (categoryData.length === 0) &&
                        <Alert color="warning">
                            Please add category. None found
                        </Alert>
                    }
                    {formData && (formData.length === 0) &&
                    <Alert color="warning">
                        No forms found please click create forms to add.
                    </Alert>
                    }
                    <div className="table-responsive">
                        <div className="d-flex justify-content-between py-20 px-10 border-bottom">
                            <div>
                                <a href="javascript:void(0)" onClick={() => this.onReload()} className="btn-outline-default mr-10"><i className="ti-reload"></i></a>
                            </div>
                            <div>
                                <a href="/app/form-builder/create-form" color="primary" className="caret btn-sm mr-10">Create Forms <i className="zmdi zmdi-plus"></i></a>
                            </div>
                            <div>
                                <a href="javascript:void(0)" onClick={() => this.opnAddNewCategoryModal()} color="primary" className="caret btn-sm mr-10">Add Category<i className="zmdi zmdi-plus"></i></a>
                            </div>
                            <div>
                                <a href="javascript:void(0)" onClick={() => {
                                    if ((categoryData.length !== 0) && (formData.length !== 0)){
                                        return this.opnAddNewTaskModal();
                                    }
                                    else {
                                        return this.openAlert('withDes');
                                    }
                                }} color="primary" className="caret btn-sm mr-10">Add New Task <i className="zmdi zmdi-plus"></i></a>
                            </div>

                        </div>
                    </div>
                    {(taskLoading) &&
                        <RctSectionLoader/>}

                </RctCollapsibleCard>
                <Modal isOpen={addNewCategoryModal} toggle={() => this.onCategoryModalClose()}>
                    <ModalHeader toggle={() => this.onCategoryModalClose()}>
                            Add Category
                    </ModalHeader>
                    <ModalBody>
                            <Form onSubmit={handleSubmit(this.onSubmitCat.bind(this))}>
                                <Field name="catagoryName" label="Category Name" type="text" placeholder="Enter here" component={renderField}/>
                                <hr/>
                                <FormGroup className="mb-15">
                                    {taskLoading?
                                        <RctPageLoader/>
                                        :
                                        <div>
                                            <Button variant="contained" className="text-white btn-success" type="submit">Add</Button>
                                            {' '}
                                            <Button variant="contained" className="text-white btn-danger" onClick={() => this.onCategoryModalClose()}>Cancel</Button>
                                        </div>
                                    }
                                </FormGroup>
                            </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={addNewTaskModal} toggle={() => this.onTaskModalClose()}>
                    <ModalHeader toggle={() => this.onTaskModalClose()}>
                        Add Task
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit(this.onSubmitTask.bind(this))}>
                            <Field name="Title" label="Title" type="text" placeholder="Enter Title" component={renderField}/>
                            <Field name="description" label="Description" type="text" placeholder="Enter Description" component={renderField}/>
                            <Field name="category" label="Category" type="select" selectItems={(catSelectDat) && catSelectDat} component={renderField}/>
                            <Field name="form" label="Forms" type="select_multiple" selectItems={(formSelectData) && formSelectData} component={renderField}/>

                            <hr/>
                            <FormGroup className="mb-15">
                                {taskLoading?
                                    <RctPageLoader/>
                                    :
                                    <div>
                                        <Button variant="contained" className="text-white btn-success" type="submit">Add</Button>
                                        {' '}
                                        <Button variant="contained" className="text-white btn-danger" onClick={() => this.onTaskModalClose()}>Cancel</Button>
                                    </div>
                                }
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


export default reduxForm({form:'createTaskForm'})(connect(mapStateToProps,mapDispatchToProps)(CreateTask));
