import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import Button from "@material-ui/core/Button";

//import './FileUpload.css';


class Step2UploadID extends Component {
state = {
    file: ''
}
    onChange(e) {
        this.setState({file : e.target.files[0]})
    }
    onSubmit() {
        const user = this.props.userState.email;
        Storage.vault.put(user + '.png', this.state.file, {
            contentType: 'image/png'
        })
        .then (result => console.log(result))
        .catch(err => console.log(err));
    }
  
    render() {
        return (
            <form>
                <input
                    type="file" accept='image/png'
                    onChange={(e)=> this.onChange(e)}
                />
                <Button onClick={(e) => this.onSubmit(e)}>Submit</Button>
            </form>
        )
    }
}

export default Step2UploadID;