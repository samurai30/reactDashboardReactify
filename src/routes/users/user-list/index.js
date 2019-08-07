/**
 * User List
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Helmet } from "react-helmet";

// api
import {api} from 'Api';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import { RctCard } from 'Components/RctCard';
import {SERVER_PATH} from "Actions/types";
import CardImg from "reactstrap/es/CardImg";
import {ROLE_ADMIN, ROLE_CLIENT, ROLE_SUBADMIN, ROLE_SURVEYOR} from "Util/apiUtils";
import {NotificationManager} from "react-notifications";

export default class UserComponent extends Component {

   state = {
      users: null
   };

   componentDidMount() {
      this.getUsers();
   }

   // get users
   getUsers() {
      api.get('/users',true)
         .then(response => {
            this.setState({ users: response['hydra:member'] });
         })
         .catch(error => {
             if (error.message === 'Unauthorized'){
                 NotificationManager.error("Session Timed out");
                 this.props.dispatch(this.props.fetchUserError);
             }
             else {
                 NotificationManager.error(error.message);
             }
         })
   }

   render() {
      const { users } = this.state;
      return (
         <div className="user-list-wrapper">
            <Helmet>
               <title>Polucon | Users List</title>
               <meta name="description" content="Reactify Widgets" />
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.userList" />} match={this.props.match} />
            <div className="row">
               {users && users.map((user) => (
                  <RctCard customClasses="p-10" colClasses="col-sm-6 col-lg-4 col-xl-3" key={user.id}>
                     <div className="card-block-content">
                        <div className="d-flex justify-content-between mb-20">
                           <div className="d-flex align-items-start">
                              <div className="media">
                                 <div className="media-left mx-10">
                                     {(user.profilePic !== null) ? <img alt="user profile" src={`${SERVER_PATH}${user.profilePic.url}`} className="rounded-circle img-fluid" width="90" height="90" />
                                     :<img alt="user profile" src={require('Assets/img/profileLogo.png')} className="rounded-circle img-fluid" width="90" height="90" />
                                     }
                                 </div>
                                 <div className="media-body py-10">
                                    <p className="mb-0">{user.username}</p>
                                    <span className="text-muted fs-12"><i className="ti-world mr-5"></i>{user.countries.countryName}</span>
                                 </div>
                                  {/*{user.roles[0] === ROLE_ADMIN ?   <p className="mb-0">Admin</p> :*/}
                                  {/*    user.roles[0] === ROLE_SUBADMIN ?   <p className="mb-0">Sub-Admin</p> :*/}
                                  {/*        user.roles[0] === ROLE_CLIENT ?   <p className="mb-0">Client</p> :*/}
                                  {/*            user.roles[0] === ROLE_SURVEYOR &&  <p className="mb-0">Surveyor</p>}*/}
                              </div>
                           </div>
                           <div className="d-flex align-items-end card-action pt-15">
                              {/*{(user.socialLinks.length > 0 && user.socialLinks !== null) && user.socialLinks.map((link, subkey) => (*/}
                                 {/*<a key={subkey} href={link.url} className="mr-0"><i className={`ti-${link.icon}`}></i></a>*/}
                              {/*))}*/}
                           </div>
                        </div>

                        {user.enabled ?
                           <div className="d-flex justify-content-between">
                               {user.roles[0] === ROLE_SURVEYOR &&
                               <Button variant="contained" color="primary" className="text-white btn-xs">
                                   <i className="zmdi zmdi-assignment-o mr-10"></i>Assign Task
                               </Button>
                               }

                              <Button className="text-success btn-xs"><i className="zmdi zmdi-check-circle mr-10"></i> Activated</Button>
                           </div>
                           : <div className="d-flex justify-content-center">
                              <Button className="text-secondary btn-xs"><i className="zmdi zmdi-circle mr-10"></i> Not Activated yet</Button>
                           </div>
                        }
                     </div>
                  </RctCard>
               ))}
            </div>
         </div>
      );
   }
}
