import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { S3Image } from 'aws-amplify-react';

//import './FileUpload.css';

class Step3UploadPicture extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 3,
            file3: '', file3name: '', file3uploaded: false, 
        }
    }
    
    onChange(e, what) {
        this.setState({file3 : e.target.files[0]});
    }

    onSubmitfile3() { 

        this.deleteFile(this.state.file3name, this.state.file3);
        let fileName = 'pic-' + Math.random().toString().replace('0.','') + '-' + this.props.userState.email + '.png';        
        Storage.vault.put(fileName, this.state.file3, {
            contentType: 'image/png'
        })
        .then (result => {
            console.log(result);
            this.setState({
                file3: this.state.file3,
                file3name : fileName, 
                file3uploaded:true,
            });
            //console.log('submit file3\n'+ JSON.stringify(this.state));
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
        this.deleteFile(what, this.state.file3name, this.state.file3);
        this.setState({
            file3: null,
            file3name : '', 
            file3uploaded:false,
        });
    }

    componentDidMount() {
        //this.setState({
            //file3name : this.props.userState.picDoc.name, 
            //file3uploaded: this.props.userState.picDoc.uploaded,
        //});
        console.log('step 3 CompDidMount\n'+ JSON.stringify(this.state));
    }
  
    render() {
        const userState = this.props.userState;
        const classes = this.props.classes;

        return (         
            <Card className={classes.card}>
                <CardContent>    
                 
                    <form>                      
                        <div>                          
                            <div>PICTURE</div>
                            <br />
                            <div>
                                { this.state.file3uploaded ? (
                                    <S3Image level='private' 
                                        imgKey={this.state.file3name} 
                                        path={this.props.userState.bucketName}
                                        theme={{ photoImg: { 
                                                    width: '300px' },
                                                
                                            }}
                                        onClick={(e) => this.removeFile(e, 'pic')}
                                        />
                                ) : null }
                            </div>
                            <br />                    
                            <input
                                type="file" accept='image/png'
                                onChange={(e)=> this.onChange(e, 'pic')}
                            />
                            <br /><br />
                            <Button onClick={(e) => this.onSubmitfile3(e)}>Upload picture</Button> 
                        </div>                     
                    </form>
                    <br /><br /><br /><br />       
                    <Button className="submitButton" 
                        variant="contained"
                        component="span"
                        onClick={(e) => this.props._handleSubmitStep3(e)}>
                        SUBMIT
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

export default Step3UploadPicture;