/**
 * User Management Page
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import {
   Pagination,
   PaginationItem,
   PaginationLink,
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Badge, Form, FormGroup, Input
} from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { NotificationManager } from 'react-notifications';
import Avatar from '@material-ui/core/Avatar';

// api
import {api} from 'Api';

// delete confirmation dialog
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';

// add new user form
// update user form
import UpdateUserForm from './UpdateUserForm';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages


// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';
import IntlMessages from "Util/IntlMessages";
import {Field, reduxForm, SubmissionError} from "redux-form";
import {renderField} from "../../../../forms/LoginForm";
import {connect} from "react-redux";
import {parseApiErrors} from "Util/apiUtils";
import {AddUserRequest} from "Actions/AddUserActions";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";


const valueList = [];
class UserProfile extends Component {

   state = {
      all: false,
      users: null, // initial user data
      selectedUser: null, // selected user to perform operations
      loading: false, // loading activity
      addNewUserModal: false, // add new user form modal
      countries: {},
      addNewUserDetail: {
         id: '',
         firstName: '',
         lastName: '',
         username:'',
         password:'',
         retypePassword:'',
         roles: [],
         email: '',
         countries: ""
      },
      roles:[
         {
            id:1,
            value:'ADMIN',
            URI: 'ROLE_ADMIN'
         },
         {
            id:2,
            value:'SUB-ADMIN',
            URI: 'ROLE_ADMIN'
         },
         {
            id:3,
            value:'CLIENT',
            URI: 'ROLE_ADMIN'
         },
         {
            id:4,
            value:'SURVEYOR',
            URI: 'ROLE_SURVEYOR'
         }
      ],
      openViewUserDialog: false, // view user dialog box
      editUser: null,
      allSelected: false,
      selectedUsers: 0
   };

   componentDidMount() {
      this.setState({loading:true});
      api.get('/user_countries',true)
         .then(response => {
            response['hydra:member'].map(country =>{
               valueList.push({id:country.id,URI:country['@id'],value:country.countryName});
               this.setState({countries:valueList});
                })
            this.setState({loading:false});
         })
         .catch(error => {
            // error hanlding
         })
   }

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
      let users = this.state.users;
      let indexOfDeleteUser = users.indexOf(selectedUser);
      users.splice(indexOfDeleteUser, 1);
      this.refs.deleteConfirmationDialog.close();
      this.setState({ loading: true });
      let self = this;
      setTimeout(() => {
         self.setState({ loading: false, users, selectedUser: null });
         NotificationManager.success('User Deleted!');
      }, 2000);
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
      this.setState({ loading: true });
      let self = this;
      setTimeout(() => {
         self.setState({ loading: false });
      }, 2000);
   }

	/**
	 * On Select User
	 */
   onSelectUser(user) {
      user.checked = !user.checked;
      let selectedUsers = 0;
      let users = this.state.users.map(userData => {
         if (userData.checked) {
            selectedUsers++;
         }
         if (userData.id === user.id) {
            if (userData.checked) {
               selectedUsers++;
            }
            return user;
         } else {
            return userData;
         }
      });
      this.setState({ users, selectedUsers });
   }

	/**
	 * On Change Add New User Details
	 */
   onChangeAddNewUserDetails(key, value) {
      this.setState({
         addNewUserDetail: {
            ...this.state.addNewUserDetail,
            [key]: value
         }
      });
   }

	/**
	 * Add New User
	 */
   addNewUser() {
      const { name, emailAddress } = this.state.addNewUserDetail;
      if (name !== '' && emailAddress !== '') {
         let users = this.state.users;
         let newUser = {
            ...this.state.addNewUserDetail,
            id: new Date().getTime()
         };
         users.push(newUser);
         this.setState({ addNewUserModal: false, loading: true });
         let self = this;
         setTimeout(() => {
            self.setState({ loading: false, users });
            NotificationManager.success('User Created!');
         }, 2000);
      }
   }

	/**
	 * View User Detail Hanlder
	 */
   viewUserDetail(data) {
      this.setState({ openViewUserDialog: true, selectedUser: data });
   }

	/**
	 * On Edit User
	 */
   onEditUser(user) {
      this.setState({ addNewUserModal: true, editUser: user });
   }

	/**
	 * On Add & Update User Modal Close
	 */
   onAddUpdateUserModalClose() {
      this.setState({ addNewUserModal: false, editUser: null })
   }

	/**
	 * On Update User Details
	 */
   onUpdateUserDetails(key, value) {
      this.setState({
         editUser: {
            ...this.state.editUser,
            [key]: value
         }
      });
   }

	/**
	 * Update User
	 */
   updateUser() {
      const { editUser } = this.state;
      let indexOfUpdateUser = '';
      let users = this.state.users;
      for (let i = 0; i < users.length; i++) {
         const user = users[i];
         if (user.id === editUser.id) {
            indexOfUpdateUser = i
         }
      }
      users[indexOfUpdateUser] = editUser;
      this.setState({ loading: true, editUser: null, addNewUserModal: false });
      let self = this;
      setTimeout(() => {
         self.setState({ users, loading: false });
         NotificationManager.success('User Updated!');
      }, 2000);
   }

   //Select All user
   onSelectAllUser(e) {
      const { selectedUsers, users } = this.state;
      let selectAll = selectedUsers < users.length;
      if (selectAll) {
         let selectAllUsers = users.map(user => {
            user.checked = true
            return user
         });
         this.setState({ users: selectAllUsers, selectedUsers: selectAllUsers.length })
      } else {
         let unselectedUsers = users.map(user => {
            user.checked = false
            return user;
         });
         this.setState({ selectedUsers: 0, users: unselectedUsers });
      }
   }
   onSubmit(values){
      values.roles = [values.roles];
      return this.props.AddUserRequest(values);
   }

   render() {
      const { users, loading, selectedUser, editUser, countries , selectedUsers } = this.state;
      const {handleSubmit,error,addUserLoader,userAdded} = this.props;
      return (
          <div className="user-management">
             <Helmet>
                <title>Polucon | Users Management</title>
                <meta name="description" content="Reactify Widgets" />
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
                         <a href="javascript:void(0)" onClick={() => this.opnAddNewUserModal()} color="primary" className="caret btn-sm mr-10">Add New User <i className="zmdi zmdi-plus"></i></a>
                      </div>
                   </div>
                   <table className="table table-middle table-hover mb-0">
                      <thead>
                      <tr>
                         <th className="w-5">
                            <FormControlLabel
                                control={
                                   <Checkbox
                                       indeterminate={selectedUsers > 0 && selectedUsers < users.length}
                                       checked={selectedUsers > 0}
                                       onChange={(e) => this.onSelectAllUser(e)}
                                       value="all"
                                       color="primary"
                                   />
                                }
                                label="All"
                            />
                         </th>
                         <th>User</th>
                         <th>Email Address</th>
                         <th>Status</th>
                         <th>Roles</th>
                         <th>Date Created</th>
                         <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      {users && users.map((user, key) => (
                          <tr key={key}>
                             <td>
                                <FormControlLabel
                                    control={
                                       <Checkbox
                                           checked={user.checked}
                                           onChange={() => this.onSelectUser(user)}
                                           color="primary"
                                       />
                                    }
                                />
                             </td>
                             <td>
                                <div className="media">
                                   {user.avatar !== '' ?
                                       <img src={user.avatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                                       : <Avatar className="mr-15">{user.name.charAt(0)}</Avatar>
                                   }
                                   <div className="media-body">
                                      <h5 className="mb-5 fw-bold">{user.name}</h5>
                                      <Badge color="warning">{user.type}</Badge>
                                   </div>
                                </div>
                             </td>
                             <td>{user.emailAddress}</td>
                             <td className="d-flex justify-content-start">
                                <span className={`badge badge-xs ${user.badgeClass} mr-10 mt-10 position-relative`}>&nbsp;</span>
                                <div className="status">
                                   <span className="d-block">{user.status}</span>
                                   <span className="small">{user.lastSeen}</span>
                                </div>
                             </td>
                             <td><span className={`badge ${user.badgeClass} badge-pill`}>{user.accountType}</span></td>
                             <td>{user.dateCreated}</td>
                             <td className="list-action">
                                <a href="javascript:void(0)" onClick={() => this.viewUserDetail(user)}><i className="ti-eye"></i></a>
                                <a href="javascript:void(0)" onClick={() => this.onEditUser(user)}><i className="ti-pencil"></i></a>
                                <a href="javascript:void(0)" onClick={() => this.onDelete(user)}><i className="ti-close"></i></a>
                             </td>
                          </tr>
                      ))}
                      </tbody>
                      <tfoot className="border-top">
                      <tr>
                         <td colSpan="100%">
                            <Pagination className="mb-0 py-10 px-10">
                               <PaginationItem>
                                  <PaginationLink previous href="#" />
                               </PaginationItem>
                               <PaginationItem active>
                                  <PaginationLink href="javascript:void(0)">1</PaginationLink>
                               </PaginationItem>
                               <PaginationItem>
                                  <PaginationLink href="javascript:void(0)">2</PaginationLink>
                               </PaginationItem>
                               <PaginationItem>
                                  <PaginationLink href="javascript:void(0)">3</PaginationLink>
                               </PaginationItem>
                               <PaginationItem>
                                  <PaginationLink next href="javascript:void(0)" />
                               </PaginationItem>
                            </Pagination>
                         </td>
                      </tr>
                      </tfoot>
                   </table>
                </div>
                {loading &&
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
                          <Field name="roles" label="Role" type="select" selectItems={this.state.roles} component={renderField}/>
                          <Field name="countries" label="Country" type="select" selectItems={countries} component={renderField}/>
                          <FormGroup className="mb-15">
                             {addUserLoader?
                                 <RctPageLoader/>
                                 :
                                 <Button variant="contained" className="text-white btn-success" type="submit">Add</Button>
                             }

                             {' '}
                             <Button variant="contained" className="text-white btn-danger" onClick={() => this.onAddUpdateUserModalClose()}>Cancel</Button>
                          </FormGroup>
                       </Form>

                       : <UpdateUserForm user={editUser} onUpdateUserDetail={this.onUpdateUserDetails.bind(this)} />
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
                            <img src={selectedUser.avatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                            <div className="media-body">
                               <p>Name: <span className="fw-bold">{selectedUser.name}</span></p>
                               <p>Email: <span className="fw-bold">{selectedUser.emailAddress}</span></p>
                               <p>Type: <span className="badge badge-warning">{selectedUser.type}</span></p>
                               <p>Account Type: <span className={`badge ${selectedUser.badgeClass} badge-pill`}>{selectedUser.accountType}</span></p>
                               <p>Status: {selectedUser.status}</p>
                               <p>Last Seen: {selectedUser.lastSeen}</p>
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

const mapStateToProps = state=>({
   ...state.addUser
});

const mapDispatchToProps = {
   AddUserRequest
};

export default reduxForm({form:'addUserForm'})(connect(mapStateToProps,mapDispatchToProps)(UserProfile))
