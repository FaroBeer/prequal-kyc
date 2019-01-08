import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {  FormControlLabel } from "@material-ui/core";
import { S3Image } from 'aws-amplify-react';

//import './FileUpload.css';

class Step2UploadID extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 2,
            file1: '', file1name: '', file1uploaded: false, 
            file2: '', file2name: '', file2uploaded: false, 
        }
    }
    

    onChange(e, what) {
        if(what === 'id1') this.setState({file1 : e.target.files[0]});
        else if(what === 'id2') this.setState({file2 : e.target.files[0]});
    }

    onSubmitFile1() { 

        this.deleteFile(this.state.file1name, this.state.file1);

        let fileName = 'id1-' + Math.random().toString().replace('0.','') + '-' + this.props.userState.email + '.png';        
        Storage.vault.put(fileName, this.state.file1, {
            contentType: 'image/png'
        })
        .then (result => {
            console.log(result);
            this.setState({
                file1: this.state.file1,
                file1name : fileName, 
                file1uploaded:true,
            });
            //console.log('submit file1\n'+ JSON.stringify(this.state));
            this.props.handleSubmitFile(this.state);
        })
        .catch(err => console.log(err));
    }

    onSubmitFile2() { 
        
        this.deleteFile('id2',this.props.userState.id2Doc.name, this.state.file2);

        let fileName = 'id2-' + Math.random().toString().replace('0.','') + '-' + this.props.userState.email + '.png';    
        Storage.vault.put(fileName, this.state.file2, {
            contentType: 'image/png'
        })
        .then (result => {
            console.log(result);
            this.setState({
                file2: this.state.file2,
                file2name : fileName, 
                file2uploaded:true,
            });
            //console.log('submit file2\n'+ JSON.stringify(this.state));
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
        if(what === 'id1'){ 
            this.deleteFile(what, this.state.file1name, this.state.file1);
            this.setState({
                file1: null,
                file1name : '', 
                file1uploaded:false,
            });
        } else if(what === 'id2'){ 
            this.deleteFile(what, this.state.file2name, this.state.file2);
            this.setState({
                file2: null,
                file2name : '', 
                file2uploaded:false,
            });
        }
    }

    
  
    render() {

        const userState = this.props.userState;
        const classes = this.props.classes;

        return (
            
            <Card className={classes.card}>
                <CardContent>    
                 
                    <form>
                        
                        <div>Which document do you prefer to upload?</div>

                        <RadioGroup
                            aria-label="typeOfID"
                            name="typeOfID"
                            placeholder="Which document do you prefer to upload?"
                            className={classes.group}
                            value={userState.typeOfID}
                            onChange={this.props.handleChange("typeOfID")}
                        >
                            <FormControlLabel value="passport" control={<Radio />} label="Passport" />
                            <FormControlLabel value="id" control={<Radio />} label="ID" />
                        </RadioGroup>
                    
                    <br />
                    <hr />
                    <br />
                    <div>   
                    {userState.typeOfID === 'passport' ? (
                        <div> 
                            
                            <div>PASSPORT</div>
                            <br />
                            <div>
                                { userState.id1Doc.uploaded ? (
                                    <S3Image level='private' 
                                        imgKey={userState.id1Doc.name} 
                                        path={userState.bucketName}
                                        theme={{ photoImg: { 
                                                    width: '300px' },
                                                
                                            }}
                                        onClick={(e) => this.removeFile(e, 'id1')}
                                        />
                                ) : null }
                            </div>
                            <br />                    
                            <input
                                type="file" accept='image/png,image/jpeg'
                                onChange={(e)=> this.onChange(e, 'id1')}
                            />
                            <br /><br />
                            <Button onClick={(e) => this.onSubmitFile1(e)}>Upload passport</Button> 
                        </div>

                    ) : (
                        <div>

                            <div>FRONT ID</div>
                            <br />
                            <div>
                                { userState.id1Doc.uploaded ? (
                                    <S3Image level='private' 
                                        imgKey={userState.id1Doc.name} 
                                        path={userState.bucketName}
                                        theme={{ photoImg: { 
                                                    width: '300px' },
                                                
                                            }}
                                        onClick={(e) => this.removeFile(e, 'id1')}
                                        />
                                ) : null }
                            </div>
                            <br />
                            <input
                                type="file" accept='image/png'
                                onChange={(e)=> this.onChange(e, 'id1')}
                            />

                            <br /><br />
                            <Button onClick={(e) => this.onSubmitFile1(e)}>Upload front ID</Button> 


                            <br /><br /><br />
                            <div>BACK ID</div>
                            <br />
                            <div>
                                { userState.id2Doc.uploaded ? (
                                    <S3Image level='private' 
                                        imgKey={userState.id2Doc.name} 
                                        path={userState.bucketName}
                                        theme={{ photoImg: { 
                                                    width: '300px' },
                                                
                                            }}
                                        onClick={(e) => this.removeFile(e, 'id2')}
                                        />
                                ) : null }
                            </div>
                            <br />
                            <input
                            type="file" accept='image/png'
                            onChange={(e)=> this.onChange(e, 'id2')}
                            />
                            <br /><br />
                            <Button onClick={(e) => this.onSubmitFile2(e)}>Upload back ID</Button>
                        </div>
                    )}    
                    </div>    
  
                    </form>

                    <br /><br /><br /><br />
        
                    <Button className="submitButton" 
                        variant="contained"
                        component="span"
                        onClick={(e) => this.props._handleSubmitStep2(e)}>
                        SUBMIT
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

export default Step2UploadID;