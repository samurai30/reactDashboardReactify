import React from 'react';
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import CardImg from "reactstrap/es/CardImg";
import {SERVER_PATH} from "Actions/types";

class ProfilePicBrowser extends React.Component{

    render() {
        const {ProfilePic} = this.props;
        return(<div>
            {ProfilePic &&  <Card>
                <CardBody>
                    <CardImg src={`${SERVER_PATH}${ProfilePic.url}`} top width="100%" alt="Profile Pic"/>
                </CardBody>
            </Card>}
        </div>)
    }
}

export default ProfilePicBrowser;