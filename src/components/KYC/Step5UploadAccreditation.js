import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { S3Image } from 'aws-amplify-react';

//import './FileUpload.css';

class Step5UploadAccreditation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 5,
            file5: '', file5name: '', file5uploaded: false, 
        }
    }
    
    onChange(e, what) {
        this.setState({file5 : e.target.files[0]});
    }

    onSubmitfile5() { 

        this.deleteFile(this.state.file5name, this.state.file5);
        let fileName = 'accr-' + Math.random().toString().replace('0.','') + '-' + this.props.userState.email + '.png';        
        Storage.vault.put(fileName, this.state.file5, {
            contentType: 'image/png'
        })
        .then (result => {
            console.log(result);
            this.setState({
                file5: this.state.file5,
                file5name : fileName, 
                file5uploaded:true,
            });
            //console.log('submit file5\n'+ JSON.stringify(this.state));
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
        this.deleteFile(what, this.state.file5name, this.state.file5);
        this.setState({
            file5: null,
            file5name : '', 
            file5uploaded:false,
        });
    }

    componentDidMount() {
        //this.setState({
            //file5name : this.props.userState.accrDoc.name, 
            //file5uploaded: this.props.userState.accrDoc.uploaded,
        //});
        console.log('step 5 CompDidMount\n'+ JSON.stringify(this.state));
    }
  
    render() {
        const userState = this.props.userState;
        const classes = this.props.classes;

        return (         
            <Card className={classes.card}>
                <CardContent>    
                 
                    <form>                      
                        <div>                          
                            <div>ACCREDITATION</div>
                            <br />
                            <div>
                                { this.state.file5uploaded ? (
                                    <S3Image level='private' 
                                        imgKey={this.state.file5name} 
                                        path={this.props.userState.bucketName}
                                        theme={{ photoImg: { 
                                                    width: '300px' },
                                                
                                            }}
                                        onClick={(e) => this.removeFile(e, 'accr')}
                                        />
                                ) : null }
                            </div>
                            <br />                    
                            <input
                                type="file" accept='image/png'
                                onChange={(e)=> this.onChange(e, 'accr')}
                            />
                            <br /><br />
                            <Button onClick={(e) => this.onSubmitfile5(e)}>Upload accreditation</Button> 
                        </div>                     
                    </form>
                    <br /><br /><br /><br />       
                    <Button className="submitButton" 
                        variant="contained"
                        component="span"
                        onClick={(e) => this.props._handleSubmitStep5(e)}>
                        SUBMIT
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

export default Step5UploadAccreditation;