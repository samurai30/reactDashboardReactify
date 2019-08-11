/* eslint-disable */
import React ,{Component} from 'react';
import {Helmet} from "react-helmet";

import IntlMessages from "Util/IntlMessages";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {addCategory, addTask, getCategoryData, getFormData, getTaskData} from "Actions/CreateTaskAction";
import {connect} from 'react-redux';
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {
    Alert,
    Form,
    FormGroup,
    Modal,
    ModalBody,
    ModalHeader,
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";
import SweetAlert from 'react-bootstrap-sweetalert'
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import {Field, reduxForm, reset} from "redux-form";
import {renderField} from "../../../forms/ComonForm";
import Button from "@material-ui/core/Button";
import {NotificationContainer} from "react-notifications";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {SERVER_PATH} from "Actions/types";
import Avatar from "@material-ui/core/Avatar";
import {
    ROLE_ADMIN,
    ROLE_ADMIN_BADGE,
    ROLE_CLIENT,
    ROLE_CLIENT_BADGE,
    ROLE_SUBADMIN,
    ROLE_SUBADMIN_BADGE, ROLE_SURVEYOR, ROLE_SURVEYOR_BADGE
} from "Util/apiUtils";
import Moment from "react-moment";
import classNames from "classnames";
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
    componentDidMount(){
        this.getForms('/forms');
        this.getCategory('/task_categories');
        this.props.getTaskData();
    }

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

    onSelectTask(task){

    }
    onReload(){
        return this.props.getTaskData()
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
                        <table className="table table-middle table-hover mb-0">
                            <thead>
                            <tr>
                                {/*<th className="w-5">*/}
                                {/*    <FormControlLabel*/}
                                {/*        control={*/}
                                {/*            <Checkbox*/}
                                {/*                indeterminate={selectedUsers > 0 && selectedUsers < users.length}*/}
                                {/*                checked={selectedUsers > 0}*/}
                                {/*                onChange={(e) => this.onSelectAllUser(e)}*/}
                                {/*                value="all"*/}
                                {/*                color="primary"*/}
                                {/*            />*/}
                                {/*        }*/}
                                {/*        label="All"*/}
                                {/*    />*/}
                                {/*</th>*/}
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Category</th>
                                <th>Date Created</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {taskData && (taskData.length !==0 ) ? taskData.map((task) => (
                                    <tr key={task.id}>
                                        {/*<td>*/}
                                        {/*    <FormControlLabel*/}
                                        {/*        control={*/}
                                        {/*            <Checkbox*/}
                                        {/*                onChange={() => this.onSelectTask(task)}*/}
                                        {/*                color="primary"*/}
                                        {/*            />*/}
                                        {/*        }*/}
                                        {/*    />*/}
                                        {/*</td>*/}
                                        <td>
                                            {task.Title}
                                        </td>
                                        <td>{task.description}</td>
                                        <td className="d-flex justify-content-start">
                                            <span className="d-block text-uppercase text-yellow">{task.status}</span>
                                        </td>
                                        <td>
                                            {task.category.catagoryName}
                                        </td>

                                        <td>  <Moment format="YYYY/MM/DD">
                                            {task.createdDate}
                                        </Moment></td>
                                        <td className="list-action">
                                            <a href="javascript:void(0)" onClick={() => null}><i className="ti-eye"></i></a>
                                            <a href="javascript:void(0)" onClick={() => null}><i className="ti-pencil"></i></a>
                                            <a href="javascript:void(0)" onClick={() => null}><i className="ti-close"></i></a>
                                        </td>
                                    </tr>
                                )):
                                <tr>
                                    <td>Nothing Found</td>
                                </tr>
                            }

                            </tbody>
                            <tfoot className="border-top">
                            {/*{(paginationHydra && HydraPageCount && CurrentPage !== null) && <tr>*/}

                            {/*    <td colSpan="100%">*/}
                            {/*        /!* eslint-disable-next-line radix *!/*/}
                            {/*        <Pagination className="mb-0 py-10 px-10">*/}

                            {/*            <PaginationItem>*/}
                            {/*                <PaginationLink previous href="#"/>*/}
                            {/*                /!*<Button onClick={(e) => this.getUsers('/users/all-users?page=2')}>Next</Button>*!/*/}
                            {/*            </PaginationItem>*/}
                            {/*            {*/}
                            {/*                range.map(page => {*/}
                            {/*                    return(*/}
                            {/*                        // eslint-disable-next-line radix*/}
                            {/*                        <PaginationItem key={page} className={classNames({active: parseInt(CurrentPage) === page})}>*/}
                            {/*                            <PaginationLink href="javascript:void(0)">{page}</PaginationLink>*/}
                            {/*                        </PaginationItem>*/}
                            {/*                    )*/}
                            {/*                })*/}
                            {/*            }*/}

                            {/*            <PaginationItem>*/}
                            {/*                <PaginationLink next href="javascript:void(0)" />*/}
                            {/*            </PaginationItem>*/}
                            {/*        </Pagination>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {/*}*/}

                            </tfoot>
                        </table>
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
