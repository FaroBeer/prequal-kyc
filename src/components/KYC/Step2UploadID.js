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


class Step2UploadID extends Component {
    state = {
        step: 2,
        file1: '', file1name: '', file1uploaded: false, 
        file2: '', file2name: '', file2uploaded: false, 
    }
    
    onChange(e, what) {
        if(what === 'id1') this.setState({file1 : e.target.files[0]})
        else if(what === 'id2') this.setState({file2 : e.target.files[0]})
        console.log('selecting file...\n'+ JSON.stringify(e.target.files[0]));
    }

    onSubmitPassport() {      
        this.setState({
            file1name : 'id1-' + this.props.userState.email + '.png', 
            file1uploaded:true
        });
        console.log('submit passport\n'+ JSON.stringify(this.state));
        Storage.vault.put('id1-' + this.props.userState.email + '.png', this.state.file1, {
            contentType: 'image/png'
        })
        .then (result => console.log(result))
        .catch(err => console.log(err));
    }

    onSubmitFront() {
        this.setState({
            file1name : 'id1-' + this.props.userState.email + '.png', 
            file1uploaded:true
        });
        console.log('submit front\n'+ JSON.stringify(this.state));
        Storage.vault.put('id1-' + this.props.userState.email + '.png', this.state.file1, {
            contentType: 'image/png'
        })
        .then (result => console.log(result))
        .catch(err => console.log(err));
    }

    onSubmitBack() {
        this.setState({
            file2name : 'id1-' + this.props.userState.email + '.png', 
            file2uploaded:true
        });
        console.log('submit back\n'+ JSON.stringify(this.state));
        Storage.vault.put('id2-' + this.props.userState.email + '.png', this.state.file2, {
            contentType: 'image/png'
        })
        .then (result => console.log(result))
        .catch(err => console.log(err));
    }

    
    componentDidMount() {
        Storage.get(this.state.file1name, {level: 'private'} )
            .then(result => console.log(result))
            .catch(err => console.log(err))
                          
        console.log('file 1 in CompDidMount\n'+ JSON.stringify(this.state));
      
    }
  
    render() {

        const userState = this.props.userState;
        const classes = this.props.classes;

        return (
            
            <Card className={classes.card}>
                <CardContent>    

                    <img src={userState.id1Doc.file1} />
                 
                    <form>
                        
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
                    <div>   
                    {userState.typeOfID === 'passport' ? (
                        <div> 
                            <input
                                type="file" accept='image/png'
                                onChange={(e, what)=> this.onChange(e, 'id1')}
                            />
                            <Button onClick={(e) => this.onSubmitPassport(e)}>Upload passport</Button> 
                        </div>

                    ) : (
                        <div>
                            <input
                                type="file" accept='image/png'
                                onChange={(e, what)=> this.onChange(e, 'id1')}
                            />
                            <Button onClick={(e) => this.onSubmitFront(e)}>Upload front ID</Button> 

                            <input
                            type="file" accept='image/png'
                            onChange={(e)=> this.onChange(e, 'id2')}
                            />
                            <Button onClick={(e, what) => this.onSubmitBack(e)}>Upload back ID</Button>
                        </div>
                    )}    
                    </div>    
  
                    </form>


        
                    <Button className="submitButton" 
                        variant="contained"
                        component="span"
                        onClick={(e)=>this.props._handleSubmitSingolUpload(e, this.state)}>
                        SUBMIT
                    </Button>
                </CardContent>
            </Card>






        )
    }
}

export default Step2UploadID;