import React, {Component}from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
// components
import { SessionSlider } from 'Components/Widgets';

// app config
import AppConfig from 'Constants/AppConfig';
import {userLoginAttempt} from "Actions";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../../forms/form";


const mapStateToProps = state =>({
   ...state.auth
});

const mapDispatchToProps = {
    userLoginAttempt
};

class AdminLoginPage extends Component{


    onSubmit(values){
        this.props.userLoginAttempt(
            values.username,
            values.password
        );
    }
    render(){
        const {loading} = this.props;
        const {handleSubmit,error} = this.props;
        console.log(error);
        return(
            <QueueAnim type="bottom" duration={2000}>
                <div className="rct-session-wrapper">
                    {loading &&
                    <LinearProgress />
                    }
                    <AppBar position="static" className="session-header">
                        <Toolbar>
                            <div className="container">
                                <div className="d-flex justify-content-between">
                                    <div className="session-logo">
                                        <Link to="/">
                                            <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div className="session-inner-wrapper">
                        <div className="container">
                            <div className="row row-eq-height">
                                <div className="col-sm-7 col-md-7 col-lg-8">
                                    <div className="session-body text-center">
                                        <div className="session-head mb-30">
                                            <h2 className="font-weight-bold">Polucon Admin-Dashboard Login</h2>
                                            <p className="mb-0">Please provide details to authenticate</p>
                                        </div>
                                        <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                            {error && <div className="alert alert-danger">{error}</div>}
                                            <Field name="username" label="Username" type="text" placeholder="Username" spanIcon="ti-email" component={renderField}/>
                                            <Field name="password" label="Password" type="Password" placeholder="Password" spanIcon="ti-lock" component={renderField}/>
                                            <FormGroup className="mb-15">
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    className="btn-block text-white w-100"
                                                    variant="contained"
                                                    size="large">
                                                    Sign In
                                                </Button>
                                            </FormGroup>
                                        </Form>
                                        <p className="text-muted">If you are a client please login through client portal</p>
                                        <p><a target="_blank" href="#/terms-condition" className="text-muted">Terms of Service</a></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}

export default reduxForm({form:'adminLoginForm'})(connect(mapStateToProps,mapDispatchToProps)(AdminLoginPage));