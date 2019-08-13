/**
 * User Management Page
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Button from '@material-ui/core/Button';
import {
   Modal,
   ModalHeader,
   ModalBody,
   Form, FormGroup, PaginationItem, PaginationLink, Pagination
} from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { NotificationManager } from 'react-notifications';
import Avatar from '@material-ui/core/Avatar';

// api
import {api} from 'Api';

// delete confirmation dialog
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages


// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';
import IntlMessages from "Util/IntlMessages";
import {Field, reduxForm,reset} from "redux-form";
import {renderField} from "../../../../forms/ComonForm";
import {connect} from "react-redux";
import {AddUserRequest, getUsersManage, setUserProp, updateUser} from "Actions/AddUserActions";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {NotificationContainer} from "react-notifications";
import {fetchUserError} from "Actions";
import UserProfilePic from "Components/ImageUploader/UserProfilePic";
import ProfilePicBrowser from "Components/ImageUploader/ProfilePicBrowser";
import {SERVER_PATH} from "Actions/types";
import Moment from 'react-moment';
import {
   ROLE_ADMIN,
   ROLE_ADMIN_BADGE,
   ROLE_CLIENT, ROLE_CLIENT_BADGE,
   ROLE_SUBADMIN,
   ROLE_SUBADMIN_BADGE,
   ROLE_SURVEYOR, ROLE_SURVEYOR_BADGE
} from "Util/apiUtils";
import Menu from "@material-ui/core/es/Menu";
import MenuItem from "@material-ui/core/es/MenuItem";
import classNames from "classnames";



const mapStateToProps = state => ({
   ...state.addUser
});
const mapDispatchToProps = {
   AddUserRequest,
   fetchUserError,
   getUsersManage,
   setUserProp,
   updateUser
};
class UserProfile extends Component {

   state = {
      all: false,
      selectedUser: null, // selected user to perform operations
      addNewUserModal: false, // add new user form modal
      countries: {},
      roles:[
         {
            id:1,
            value:'ADMIN',
            URI: 'ROLE_ADMIN'
         },
         {
            id:2,
            value:'SUB-ADMIN',
            URI: 'ROLE_SUBADMIN'
         },
         {
            id:3,
            value:'CLIENT',
            URI: 'ROLE_CLIENT'
         },
         {
            id:4,
            value:'SURVEYOR',
            URI: 'ROLE_SURVEYOR'
         }
      ],
      rolesApi:['ROLE_ADMIN','ROLE_SUBADMIN','ROLE_SURVEYOR','ROLE_CLIENT'],
      profilePicUploaded: false,
      openViewUserDialog: false, // view user dialog box
      editUser: null,
      allSelected: false,
      selectedUsers: 0,
      anchorEl: null,
      selectedIndex: 1,
      addFieldDepartment:false,


   };

   getUsers(url){
      return this.props.getUsersManage(url);
   }

   componentDidMount() {
      this.setState({loading:true});
      api.get('/user_countries',true)
         .then(response => {
            const valueList = [];
            response['hydra:member'].map(country => {
               valueList.push({id:country.id,URI:country['@id'],value:country.countryName});
               this.setState({countries:valueList});
                });
            this.setState({loading:false});
         })
         .catch(error => {
            if (error.message === 'Unauthorized'){
               NotificationManager.error("Session Timed out");
               this.props.dispatch(this.props.fetchUserError);
            }
         });
         this.getUsers('/users/all-users');

   }
   // Menu Functions
   handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
   };
   handleClickListItem = (event, index) => {
      this.getUsers(`/users/all-users?roles=${this.state.rolesApi[index]}`);
      this.setState({ anchorEl: event });
   };
   handleClose = () => {
      this.setState({ anchorEl: null });
   };
	/**
	 * On Delete
	 */
   onDelete(data) {
      this.refs.deleteConfirmationDialog.open();
      this.setState({ selectedUser: data });
   }

	/**
	 * Delete User Permanently
	 */
   deleteUserPermanently() {
      const { selectedUser } = this.state;
      let users = this.props.users;
      let indexOfDeleteUser = users.indexOf(selectedUser);
      this.setState({ loading: true });
      const url = `/users/${selectedUser['id']}`;

      api.delete(url).then(response =>{
         users.splice(indexOfDeleteUser, 1);
         this.refs.deleteConfirmationDialog.close();
         this.setState({ selectedUser: null });
         NotificationManager.success('User Deleted!');
         return this.props.getUsersManage('/users/all-users');
      }).catch(error =>{
         this.setState({ loading: false, selectedUser: null });
         if (error.message === 'Unauthorized'){
            NotificationManager.error("Session Timed out");
            this.props.dispatch(this.props.fetchUserError);
         }
         else {
            NotificationManager.error('Something Went Wrong');
         }
      });

   }

	/**
	 * Open Add New User Modal
	 */
   opnAddNewUserModal() {
      this.setState({ addNewUserModal: true });
   }

	/**
	 * On Reload
	 */
   onReload() {
       this.getUsers('/users/all-users');
   }


	/**
	 * View User Detail Hanlder
	 */
   viewUserDetail(data) {
      this.setState({ openViewUserDialog: true, selectedUser: data });
   }



	/**
	 * On Add & Update User Modal Close
	 */
   onAddUpdateUserModalClose() {
      this.props.dispatch(reset('addUserForm'));
      this.setState({ addNewUserModal: false, editUser: null })
   }

   onSubmit(values){
      if(this.props.profilePicUploaded){
         if(Array.isArray(values.roles)){
            let temp = values.roles[0];
            values.roles = [];
            values.roles[0] = temp
         }else {
            values.roles = [values.roles]
         }
         const {profilePicImage} = this.props;
         values.profilePic = `/api/images/${profilePicImage['id']}`;
         return this.props.AddUserRequest(values,this);
      }else{
         NotificationManager.error("Please upload the image.");
      }

   }
   /**
    * On Edit User
    */
   onEditUser(user) {
      this.setState({ addNewUserModal: true, editUser: user });
   }
   /**
    * Update User
    */
   updateUser(value) {
      const {editUser} = this.state;
      return this.props.updateUser(value,editUser)
   }
   handleValueChange = e =>{

      const name = e.target.name;
      const value = e.target.value;
      var editUser2 = {...this.state.editUser, [name]: value};
      this.setState({editUser:editUser2});
   };

   //add Department
   departmentFunction(value){

      if ('ROLE_SURVEYOR' === value.currentTarget.value){
         this.setState({addFieldDepartment:true})
      }
      else {
         this.setState({addFieldDepartment:false})
      }
   }

   render() {
      const { selectedUser, editUser, countries ,anchorEl,addFieldDepartment } = this.state;
      const {users, loading, handleSubmit,error,addUserLoader,profilePicImage,profilePicUploaded,paginationHydra,HydraPageCount,CurrentPage} = this.props;
      let range = [];
      if(HydraPageCount){
         for(let i =1; i<= HydraPageCount; i++){
             range.push(i);
         }
      }
      return (

          <div className="user-management">
             <NotificationContainer />
             <Helmet>
                <title>Polucon | Users Management</title>
                <meta name="description" content="Polucon User Management" />
             </Helmet>
             <PageTitleBar
                 title={<IntlMessages id="sidebar.userManagement" />}
                 match={this.props.match}
             />

             <RctCollapsibleCard fullBlock>
                <div className="table-responsive">
                   <div className="d-flex justify-content-between py-20 px-10 border-bottom">
                      <div>
                         <a href="javascript:void(0)" onClick={() => this.onReload()} className="btn-outline-default mr-10"><i className="ti-reload"></i></a>
                      </div>
                      <div>
                         <Button variant="contained" color="primary" className="text-white" aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleClick} >
                            Select Role
                         </Button>
                         <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} >
                            <MenuItem onClick={(e) => this.handleClickListItem(e.target,0)}>Admin</MenuItem>
                            <MenuItem onClick={(e) => this.handleClickListItem(e.target,1)}>Sub-Admin</MenuItem>
                            <MenuItem onClick={(e) => this.handleClickListItem(e.target,2)}>Surveyor</MenuItem>
                            <MenuItem onClick={(e) => this.handleClickListItem(e.target,3)}>Client</MenuItem>
                         </Menu>
                      </div>
                      <div>
                         <a href="javascript:void(0)" onClick={() => this.opnAddNewUserModal()} color="primary" className="caret btn-sm mr-10">Add New User <i className="zmdi zmdi-plus"></i></a>
                      </div>

                   </div>
                   <table className="table table-middle table-hover mb-0">
                      <thead>
                      <tr>
                         <th>User</th>
                         <th>Email Address</th>
                         <th>Status</th>
                         <th>Roles</th>
                         <th>Date Created</th>
                         <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>

                      {users && (users.length !==0 ) ? users.map((user) => (
                          <tr key={user.id}>
                             <td>
                                <div className="media">
                                   {(user.profilePic !== null) ?
                                       <img src={`${SERVER_PATH}${user.profilePic.url}`} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                                       : <Avatar className="mr-15">{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</Avatar>
                                   }
                                   <div className="media-body">
                                      <h5 className="mb-5 fw-bold">{user.firstName}</h5>
                                   </div>
                                </div>
                             </td>
                             <td>{user.email}</td>
                             <td className="d-flex justify-content-start">
                                {user.enabled ?  <span className={`badge badge-xs badge-success mr-10 mt-10 position-relative`}>&nbsp;</span>
                                    :
                                    <span className={`badge badge-xs badge-warning mr-10 mt-10 position-relative`}>&nbsp;</span>}
                                <div className="status">
                                   {user.enabled ?  <span className="d-block text-uppercase">Activated</span>:
                                       <span className="d-block text-uppercase text-yellow">Not Activated</span>}

                                </div>
                             </td>
                             <td> {user.roles[0] === ROLE_ADMIN ?    <span className={`badge ${ROLE_ADMIN_BADGE} badge-pill`}>Admin</span> :
                                 user.roles[0] === ROLE_SUBADMIN ?    <span className={`badge ${ROLE_SUBADMIN_BADGE}  badge-pill`}>Sub-Admin</span>  :
                                     user.roles[0] === ROLE_CLIENT ?   <span className={`badge ${ROLE_CLIENT_BADGE}  badge-pill`}>Client</span>  :
                                         user.roles[0] === ROLE_SURVEYOR &&  <span className={`badge ${ROLE_SURVEYOR_BADGE}  badge-pill`}>Surveyor</span> }
                                        </td>

                             <td>  <Moment format="YYYY/MM/DD">
                                {user.createdDate}
                             </Moment></td>
                             <td className="list-action">
                                <a href="javascript:void(0)" onClick={() =>  this.viewUserDetail(user) }><i className="ti-eye"></i></a>
                                <a href="javascript:void(0)" onClick={() => this.onEditUser(user)}><i className="ti-pencil"></i></a>
                                <a href="javascript:void(0)" onClick={() => this.onDelete(user)}><i className="ti-close"></i></a>
                             </td>
                          </tr>
                      )):
                         <tr>
                            <td>Nothing Found</td>
                         </tr>
                      }

                      </tbody>
                      <tfoot className="border-top">
                      {(paginationHydra && HydraPageCount && CurrentPage !== null) && <tr>

                         <td colSpan="100%">
                            {/* eslint-disable-next-line radix */}
                            <Pagination className="mb-0 py-10 px-10">

                               <PaginationItem>
                                  <PaginationLink previous href="#"/>
                                    {/*<Button onClick={(e) => this.getUsers('/users/all-users?page=2')}>Next</Button>*/}
                               </PaginationItem>
                               {
                                  range.map(page => {
                                     return(
                                         // eslint-disable-next-line radix
                                         <PaginationItem key={page} className={classNames({active: parseInt(CurrentPage) === page})}>
                                            <PaginationLink href="javascript:void(0)">{page}</PaginationLink>
                                         </PaginationItem>
                                     )
                                  })
                               }

                               <PaginationItem>
                                  <PaginationLink next href="javascript:void(0)" />
                               </PaginationItem>
                            </Pagination>
                         </td>
                      </tr>
                      }

                      </tfoot>
                   </table>
                </div>
                {(loading) &&
                <RctSectionLoader />
                }
             </RctCollapsibleCard>
             <DeleteConfirmationDialog
                 ref="deleteConfirmationDialog"
                 title="Are You Sure Want To Delete?"
                 message="This will delete user permanently."
                 onConfirm={() => this.deleteUserPermanently()}
             />
             <Modal isOpen={this.state.addNewUserModal} toggle={() => this.onAddUpdateUserModalClose()}>
                <ModalHeader toggle={() => this.onAddUpdateUserModalClose()}>
                   {editUser === null ?
                       'Add New User' : 'Update User'
                   }
                </ModalHeader>
                <ModalBody>
                   {editUser === null ?
                       <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                          {error && <div className="alert alert-danger">{error}</div>}
                          <Field name="firstName" label="First Name" type="text" placeholder="First Name" component={renderField}/>
                          <Field name="lastName" label="Last Name" type="text" placeholder="Last Name" component={renderField}/>
                          <Field name="username" label="Username" type="text" placeholder="Username" component={renderField}/>
                          <Field name="password"  label="Password" type="password" placeholder="Password" component={renderField}/>
                          <Field name="retypePassword"  label="Confirm Password" type="password" placeholder="Confirm Password" component={renderField}/>
                          <Field name="email" label="Email" type="email" placeholder="Email" component={renderField}/>
                          <Field name="roles" label="Role" onChange={this.departmentFunction.bind(this)} type="select" selectItems={this.state.roles} component={renderField}/>
                          <Field name="countries" label="Country" type="select" selectItems={countries} component={renderField}/>
                          {addFieldDepartment && <Field name="department"  label="Department" type="text" placeholder="Department" component={renderField}/> }
                          <hr/>
                          {profilePicUploaded ?  <ProfilePicBrowser ProfilePic={profilePicImage}/>:
                              <UserProfilePic/> }
                           <hr/>
                          <FormGroup className="mb-15">
                             {addUserLoader?
                                 <RctPageLoader/>
                                 :
                                 <div>
                                    <Button variant="contained" className="text-white btn-success" type="submit">Add</Button>
                                    {' '}
                                    <Button variant="contained" className="text-white btn-danger" onClick={() => this.onAddUpdateUserModalClose()}>Cancel</Button>
                                 </div>
                             }


                          </FormGroup>
                       </Form>

                       :
                       <Form onSubmit={handleSubmit(this.updateUser.bind(this))} >

                         <Field name="firstName" onChange={ (e) =>this.handleValueChange(e)} values={editUser.firstName} label="First Name" type="text" placeholder="First Name" component={renderField}/>
                         <Field name="lastName" onChange={ (e) =>this.handleValueChange(e)}  values={editUser.lastName} label="Last Name" type="text" placeholder="Last Name" component={renderField}/>
                         <Field name="username" onChange={  (e) =>this.handleValueChange(e)}  values={editUser.username} label="Username" type="text" placeholder="Username" component={renderField}/>
                         <Field name="email" onChange={  (e) =>this.handleValueChange(e)}  values={editUser.email} label="Email" type="email" placeholder="Email" component={renderField}/>
                         <hr/>
                         <FormGroup className="mb-15">
                         {addUserLoader?
                            <RctPageLoader/>
                            :
                            <div>
                            <Button variant="contained" className="text-white btn-success" type="submit">Update</Button>
                            {' '}
                            <Button variant="contained" className="text-white btn-danger" onClick={() => this.onAddUpdateUserModalClose()}>Cancel</Button>
                            </div>
                         }
                         </FormGroup>
                      </Form>
                   }
                </ModalBody>

             </Modal>
             <Dialog
                 onClose={() => this.setState({ openViewUserDialog: false })}
                 open={this.state.openViewUserDialog}
             >
                <DialogContent>
                   {selectedUser !== null &&
                   <div>
                      <div className="clearfix d-flex">
                         <div className="media pull-left">
                            <img src={`${SERVER_PATH}${selectedUser.profilePic.url}`} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                            <div className="media-body">
                               <p>Name: <span className="fw-bold">{selectedUser.firstName}</span></p>
                               <p>Email: <span className="fw-bold">{selectedUser.email}</span></p>
                               <p>Account Type:{' '}
                                  {selectedUser.roles[0] === ROLE_ADMIN ?    <span className={`badge ${ROLE_ADMIN_BADGE} badge-pill`}>Admin</span> :
                                      selectedUser.roles[0] === ROLE_SUBADMIN ?    <span className={`badge ${ROLE_SUBADMIN_BADGE}  badge-pill`}>Sub-Admin</span>  :
                                          selectedUser.roles[0] === ROLE_CLIENT ?   <span className={`badge ${ROLE_CLIENT_BADGE}  badge-pill`}>Client</span>  :
                                              selectedUser.roles[0] === ROLE_SURVEYOR &&  <span className={`badge ${ROLE_SURVEYOR_BADGE}  badge-pill`}>Surveyor</span> }
                               </p>
                               <p>Status:
                                  {selectedUser.enabled ?  <span className="d-block text-uppercase">Activated</span>:
                                      <span className="d-block text-uppercase text-yellow">Not Activated</span>}
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




export default reduxForm({form:'addUserForm'})(connect(mapStateToProps,mapDispatchToProps)(UserProfile))
