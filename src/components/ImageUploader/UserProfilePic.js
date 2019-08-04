import React from 'react';
import "../../assets/ImageUpload.css"
import {connect} from "react-redux";
import {profilePicUpload} from "Actions/AddUserActions";
import Cropper from 'react-cropper';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import IntlMessages from "Util/IntlMessages";
import {Button} from "reactstrap";

const mapDispatchToProps={
    profilePicUpload
};

class UserProfilePic extends React.Component{
    state = {
        src : null,
        cropResult: null
    };
    onChange(e){
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({ src: reader.result });
        };
        reader.readAsDataURL(files[0]);
    }
    cropImage() {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            cropResult: this.cropper.getCroppedCanvas().toDataURL(),
        });
    }
    render() {
        return(<div className="form-group input-image-upload">
            {this.state.src &&  <div>
                <Cropper
                    style={{ height: 400, width: '100%' }}
                    guides={true}
                    aspectRatio={1}
                    src={this.state.src}
                    ref={cropper => { this.cropper = cropper; }}
                />
                <div className="d-flex align-items-center justify-content-center mb-10">
                    <Button onClick={this.cropImage.bind(this)} variant="contained" className="bg-success text-white w-100">
                        <IntlMessages id="button.cropImage" />
                    </Button>
                </div>
            </div>}
            <input type="file" className="form-control-file text-primary font-weight-bold"
                   data-title="Click me or Drag & Drop file"
                   onChange={this.onChange.bind(this)} accept="image/*"/>

            {this.state.cropResult &&
            <RctCollapsibleCard
                colClasses="col-sm-12 col-md-12 col-lg-6"
                heading={<IntlMessages id="widgets.croppedImage" />}
            >
                <img style={{ width: '100%' }} src={this.state.cropResult} alt="cropped_img" />
            </RctCollapsibleCard>
            }

        </div>)
    }
}

export default connect(null,mapDispatchToProps)(UserProfilePic)