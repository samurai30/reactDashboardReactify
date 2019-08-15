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
import {NotificationContainer, NotificationManager} from "react-notifications";
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
import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {api} from "Api/index";
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
        tasks: null, // initial task data
        selectedTask: null, // selected user to perform operations
        addNewTaskModal: false, // add new user form modal
        addNewCategoryModal: false,
        openViewTaskDialog: false, // view user dialog box
        editTask: null,
        deleteLoader:false,
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
        this.setState({addNewTaskModal:false,editTask:null})
    }

    onReload(){
        return this.props.getTaskData()
    }

    //Delete Task
    onDelete(data) {
        this.refs.deleteConfirmationDialog.open();
        this.setState({ selectedTask: data });
    }

    deleteTaskPermanently(){
        const { selectedTask } = this.state;
        let task = this.props.taskData;
        let indexOfDeleteTask = task.indexOf(selectedTask);
        this.setState({deleteLoader:true});
        api.delete(`/tasks/${selectedTask['id']}`).then(response =>{
            task.splice(indexOfDeleteTask, 1);
            this.refs.deleteConfirmationDialog.close();
            this.setState({deleteLoader:false, selectedTask: null });
            NotificationManager.success('Task Deleted!');
            return this.props.getTaskData();
        }).catch(error =>{
            this.setState({deleteLoader:false,selectedTask: null });
            if (error.message === 'Unauthorized'){
                NotificationManager.error("Session Timed out");
                this.props.dispatch(this.props.fetchUserError);
            }
            else {
                NotificationManager.error('Something Went Wrong');
            }
        });
    }
    //View Details
    viewTaskDetail(data) {
        this.setState({ openViewTaskDialog: true, selectedTask: data });
    }
    //edit Task
    onTaskUser(task) {
        this.setState({ addNewTaskModal: true, editTask: task });
    }
    render(){
        const{match,taskLoading,formData,categoryData,handleSubmit,formSelectData,catSelectDat,taskData} = this.props;
        const { withDes,addNewCategoryModal,addNewTaskModal,editTask,openViewTaskDialog,selectedTask,deleteLoader} = this.state;

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

                                        <td>
                                            <Moment format="YYYY/MM/DD">
                                                     {task.createdDate}
                                            </Moment>
                                        </td>
                                        <td className="list-action">
                                            <a href="javascript:void(0)" onClick={() => this.viewTaskDetail(task)}><i className="ti-eye"></i></a>
                                            <a href="javascript:void(0)" onClick={() => this.onTaskUser(task)}><i className="ti-pencil"></i></a>
                                            <a href="javascript:void(0)" onClick={() => this.onDelete(task)}><i className="ti-close"></i></a>
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
                <DeleteConfirmationDialog
                    ref="deleteConfirmationDialog"
                    title="Are You Sure Want To Delete?"
                    message="This will delete user permanently."
                    onConfirm={() => this.deleteTaskPermanently()}
                />
                {(deleteLoader) &&
                    <RctSectionLoader/>}
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
                        {editTask === null ?'Add Task':
                         'Update Task'}
                    </ModalHeader>
                    <ModalBody>
                        {editTask === null ?
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
                            :
                            <Form onSubmit={handleSubmit(this.onSubmitTask.bind(this))}>
                                <Field name="Title" values={editTask.Title} label="Title" type="text" placeholder="Enter Title" component={renderField}/>
                                <Field name="description" values={editTask.description} label="Description" type="text" placeholder="Enter Description" component={renderField}/>

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
                        }
                    </ModalBody>
                </Modal>
                <Dialog
                    onClose={() => this.setState({ openViewTaskDialog: false })}
                    open={openViewTaskDialog}
                >
                    <DialogContent>
                        {selectedTask !== null &&
                        <div>
                            <div className="clearfix d-flex">
                                <div className="media pull-left">

                                    <div className="media-body">
                                        <p>Title: <span className="fw-bold">{selectedTask.Title}</span></p>
                                        <p>Category: <span className="fw-bold">{selectedTask.category.catagoryName}</span></p>
                                        <p>Description: <span className="fw-bold">{selectedTask.description}</span></p>
                                        <p>Status:{' '}
                                            {selectedTask.status === 'Pending' ?    <span className={`badge badge-warning badge-pill`}>Pending</span> :
                                                selectedTask.status === 'Completed' ?    <span className={`badge badge-success badge-pill`}>Completed</span>  :
                                                    selectedTask.status === 'Rejected' ?   <span className={`badge badge-danger badge-pill`}>Rejected</span>  :
                                                        selectedTask.status === 'Approved' ?   <span className={`badge badge-info badge-pill`}>Approved</span>  :
                                                        selectedTask.status === 'InProgress' &&  <span className={`badge badge-primary badge-pill`}>In Progress</span> }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}


export default reduxForm({form:'createTaskForm'})(connect(mapStateToProps,mapDispatchToProps)(CreateTask));
