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
    /*constructor(props) {
        super(props);
        this.state = {
            step: 2,
            file1: '', file1name: '', file1uploaded: false, 
            file2: '', file2name: '', file2uploaded: false, 
        }
    }*/
    

    onChange(e, what) {
        if(what === 'id1') this.setState({file1 : e.target.files[0]});
        else if(what === 'id2') this.setState({file2 : e.target.files[0]});
        console.log('selecting file...\n'+ JSON.stringify(this.state));
    }

    onSubmitFile1() {      
        this.setState({
            //file1: this.state.file1,
            file1name : 'id1-' + this.props.userState.email + '.png', 
            file1uploaded:true
        });
        console.log('submit file1\n'+ JSON.stringify(this.state));
        Storage.vault.put('id1-' + this.props.userState.email + '.png', this.state.file1, {
            contentType: 'image/png'
        })
        .then (result => console.log(result))
        .catch(err => console.log(err));

        this.props._handleSubmitSingolUpload(this.state);

    }

    onSubmitFile2() {
        this.setState({
            file2: this.state.file2,
            file2name : 'id1-' + this.props.userState.email + '.png', 
            file2uploaded:true
        });
        console.log('submit file2\n'+ JSON.stringify(this.state));
        Storage.vault.put('id2-' + this.props.userState.email + '.png', this.state.file2, {
            contentType: 'image/png'
        })
        .then (result => console.log(result))
        .catch(err => console.log(err));
    }

    
    componentDidMount() {
        
        Storage./*vault.*/get(this.props.userState.id1Doc.name, {level: 'private'} )
            .then(result => console.log(result))
            .catch(err => console.log(err))
        
        // check as soon as it is possible to save in the state    
        this.setState({
            file1name : this.props.userState.id1Doc.name, 
            file1uploaded: this.props.userState.id1Doc.uploaded,
            file2name : this.props.userState.id2Doc.name,
            file2uploaded: this.props.userState.id2Doc.uploaded,
        });

        console.log('step 2 CompDidMount\n'+ JSON.stringify(this.state));
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
                                onChange={(e)=> this.onChange(e, 'id1')}
                            />
                            <Button onClick={(e) => this.onSubmitFile1(e)}>Upload passport</Button> 
                        </div>

                    ) : (
                        <div>
                            <input
                                type="file" accept='image/png'
                                onChange={(e)=> this.onChange(e, 'id1')}
                            />
                            <Button onClick={(e) => this.onSubmitFile1(e)}>Upload front ID</Button> 

                            <input
                            type="file" accept='image/png'
                            onChange={(e)=> this.onChange(e, 'id2')}
                            />
                            <Button onClick={(e) => this.onSubmitFile2(e)}>Upload back ID</Button>
                        </div>
                    )}    
                    </div>    
  
                    </form>


        
                    <Button className="submitButton" 
                        variant="contained"
                        component="span"
                        onClick={(e) => this.props._handleSubmitSingleUpload(e, this.state)}>
                        SUBMIT
                    </Button>
                </CardContent>
            </Card>






        )
    }
}

export default Step2UploadID;