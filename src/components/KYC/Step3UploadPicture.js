import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {  FormControlLabel } from "@material-ui/core";
import { PhotoPicker } from 'aws-amplify-react';
import { S3Image } from 'aws-amplify-react';

//import './FileUpload.css';

class Step3UploadPicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file1: '', file1name: '', file1uploaded: false
    }}

    onChange(e) {
        this.setState({file1 : e.target.files[0]});
    }

    deleteFile() {          
        Storage.vault.remove('pic-' + this.props.userState.email + '.png', this.state.file1, {
                            level: 'protected'})
        .then (result => console.log(result))
        .catch(err => console.log(err))
    }

    
    componentDidMount() {
        
        Storage./*vault.*/get(this.props.userState.picDoc.name, {level: 'private'} )
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err))
    }
  
    render() {

        const userState = this.props.userState;
        const classes = this.props.classes;
   //     console.log('S3:\n'+S3Image + '\n with props: \n' + S3Image);

        return (
            
            <Card className={classes.card}>
                <CardContent>    
                    
                <form>
                        
                    <div>   

                        <div> 
                        <S3Image level='private' 
                            imgKey={'pic-'+ userState.email+'.png'} 
                        //      picker 
                            path={userState.bucketName}
                            theme={{ photoImg: { 
                                        width: '300px'
                                    },
                          
                                }}
                            
                            />
                            <input
                                type="file" accept='image/png'
                                onChange={(e)=> this.onChange(e)}
                            />
                            <Button onClick={(e) => {
                                        this.setState({
                                            file1name : 'pic-' + userState.email + '.png', 
                                            file1uploaded:true
                                        });
                                        this.props.handleSubmitFile(this.state);
                            }}>
                            Upload</Button> 
                            <Button onClick={(e) => this.deleteFile(e)}>Delete</Button> 
                        </div> 
                    </div>    
  
                    </form>


        
                    <Button className="submitButton" 
                        variant="contained"
                        component="span"
                        onClick={(e) => this.props._handleSubmitStep3(e, this.state)}>
                        SUBMIT
                    </Button>
                </CardContent>
            </Card>






        )
    }
}

export default Step3UploadPicture;