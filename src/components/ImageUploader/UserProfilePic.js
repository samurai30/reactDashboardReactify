import React from 'react';
import "../../assets/ImageUpload.css"
import {connect} from "react-redux";
import {profilePicUpload} from "Actions/AddUserActions";

const mapDispatchToProps={
    profilePicUpload
};

class UserProfilePic extends React.Component{


    onChange(e){
        const file = e.target.files[0];
         this.props.profilePicUpload(file);
    }
    render() {
        return(<div className="form-group input-image-upload">
            <input type="file" className="form-control-file text-primary font-weight-bold"
                   data-title="Click me or Drag & Drop file"
                   onChange={this.onChange.bind(this)} accept="image/*"/>
        </div>)
    }
}

export default connect(null,mapDispatchToProps)(UserProfilePic)