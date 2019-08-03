import React from 'react';
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import CardImg from "reactstrap/es/CardImg";
import {SERVER_PATH} from "Actions/types";
import {Button} from "reactstrap";

class ProfilePicBrowser extends React.Component{
    onDelete(){
        alert('delete')
    }
    componentWillUnmount() {

    }

    render() {
        const {ProfilePic} = this.props;
        return(<div>
            {ProfilePic &&  <Card>
                <CardBody>
                    <CardImg src={`${SERVER_PATH}${ProfilePic.url}`} top width="100%" alt="Profile Pic"/>
                </CardBody>
                <Button onClick={this.onDelete} className="btn btn-warning">Remove</Button>
            </Card>}
        </div>)
    }
}

export default ProfilePicBrowser;