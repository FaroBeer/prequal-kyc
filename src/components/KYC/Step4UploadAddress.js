import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { S3Image } from 'aws-amplify-react';

//import './FileUpload.css';

class Step4UploadAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 4,
            file4: '', file4name: '', file4uploaded: false, 
        }
    }
    
    onChange(e, what) {
        this.setState({file4 : e.target.files[0]});
    }

    onSubmitfile4() { 

        this.deleteFile(this.state.file4name, this.state.file4);
        let fileName = 'addr-' + Math.random().toString().replace('0.','') + '-' + this.props.userState.email + '.png';        
        Storage.vault.put(fileName, this.state.file4, {
            contentType: 'image/png'
        })
        .then (result => {
            console.log(result);
            this.setState({
                file4: this.state.file4,
                file4name : fileName, 
                file4uploaded:true,
            });
            //console.log('submit file4\n'+ JSON.stringify(this.state));
            this.props.handleSubmitFile(this.state);
        })
        .catch(err => console.log(err));
    }

    deleteFile(what, fileName, fileObj) {          
        Storage.vault.remove(fileName, fileObj, {
                            level: 'protected'})
        .then (result => console.log(result))
        .catch(err => console.log(err));

        this.props.handleDeleteFile(this.state, what);
    }

    removeFile(e, what){
        this.deleteFile(what, this.state.file4name, this.state.file4);
        this.setState({
            file4: null,
            file4name : '', 
            file4uploaded:false,
        });
    }

 
    render() {
        const userState = this.props.userState;
        const classes = this.props.classes;

        return (         
            <Card className={classes.card}>
                <CardContent>    
                 
                    <form>                      
                        <div>                          
                            <div>ADDRESS</div>
                            <br />
                            <div>
                                { userState.addrDoc.uploaded ? (
                                    <S3Image level='private' 
                                        imgKey={userState.addrDoc.name} 
                                        path={userState.bucketName}
                                        theme={{ photoImg: { 
                                                    width: '300px' },
                                                
                                            }}
                                        onClick={(e) => this.removeFile(e, 'addr')}
                                        />
                                ) : null }
                            </div>
                            <br />                    
                            <input
                                type="file" accept='image/png,image/jpeg'
                                onChange={(e)=> this.onChange(e, 'addr')}
                            />
                            <br /><br />
                            <Button onClick={(e) => this.onSubmitfile4(e)}>Upload address</Button> 
                        </div>                     
                    </form>
                    <br /><br /><br /><br />       
                    <Button className="submitButton" 
                        variant="contained"
                        component="span"
                        onClick={(e) => this.props._handleSubmitStep4(e)}>
                        SUBMIT
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

export default Step4UploadAddress;