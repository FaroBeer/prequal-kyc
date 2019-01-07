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
        Storage.vault.put('id1-' + this.props.userState.email + '.png', this.state.file1, {
            contentType: 'image/png'
        })
        .then (result => {
            console.log(result);
            this.setState({
                //file1: this.state.file1,
                file1name : 'id1-' + this.props.userState.email + '.png', 
                file1uploaded:true
            });
            console.log('submit file1\n'+ JSON.stringify(this.state));
            this.props._handleSubmitFile(this.state);
        })
        .catch(err => console.log(err));
    }

    onSubmitFile2() {             
        Storage.vault.put('id2-' + this.props.userState.email + '.png', this.state.file2, {
            contentType: 'image/png'
        })
        .then (result => {
            console.log(result);
            this.setState({
                //file2: this.state.file2,
                file2name : 'id2-' + this.props.userState.email + '.png', 
                file2uploaded:true
            });
            console.log('submit file2\n'+ JSON.stringify(this.state));
            this.props._handleSubmitFile(this.state);
        })
        .catch(err => console.log(err));  
    }

    
    componentDidMount() {
        
        Storage./*vault.*/get(this.props.userState.id1Doc.name, {level: 'private'} )
            .then(result => {
                console.log(result);
                this.setState({
                    file1name : this.props.userState.id1Doc.name, 
                    file1uploaded: this.props.userState.id1Doc.uploaded,
                    file2name : this.props.userState.id2Doc.name,
                    file2uploaded: this.props.userState.id2Doc.uploaded,
                });
                console.log('step 2 CompDidMount\n'+ JSON.stringify(this.state));
            })
            .catch(err => console.log(err))
    }
  
    render() {

        const userState = this.props.userState;
        const classes = this.props.classes;
   //     console.log('S3:\n'+S3Image + '\n with props: \n' + S3Image);
    const NavBarCustom = {
        position: 'relative',
        border: '1px solid ',
        borderColor: '#d447e7'
        }
    const containerCustom = {
        fontFamily: `-apple-system,
                    BlinkMacSystemFont,
                    "Segoe UI",
                    Roboto,
                    "Helvetica Neue",
                    Arial,
                    sans-serif,
                    "Apple Color Emoji",
                    "Segoe UI Emoji",
                    "Segoe UI Symbol"`,
        fontWeight: '100',
        lineHeight: '1.5',
        color: '#11111',
        textAlign: 'right',
        paddingLeft: '15px',
        paddingRight: '0px'
    }
    const inputCustom = {
        display: 'block',
        width: '100%',
        height: '34px',
        padding: '6px 12px',
        fontSize: '20px',
        lineHeight: '1.42857143',
        color: '#555',
        backgroundColor: '#1111',
        backgroundImage: 'none',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
        boxSizing: 'border-box',
        transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s'
    };
        return (
            
            <Card className={classes.card}>
                <CardContent>    
                    
                <S3Image level='private' 
                    imgKey={'id1-'+ this.props.userState.email+'.png'} 
                    picker 
                    path={this.props.userState.bucketName}
                    theme={{ photoImg: { 
                                width: '300px', 
                                height: '300px' },
                            container: containerCustom,
                            input: inputCustom,
                            
                        }}
                    />
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
                        onClick={(e) => this.props._handleSubmitStep2(e, this.state)}>
                        SUBMIT
                    </Button>
                </CardContent>
            </Card>






        )
    }
}

export default Step2UploadID;