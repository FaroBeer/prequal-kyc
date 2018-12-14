import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Filter1 from '@material-ui/icons/Filter1'
import axios from 'axios';
import './FileUpload.css'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  input: {
    display: 'none',
  },
  card: {
    marginTop: 25,
    minWidth: 275,
    minHeight: 650,
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500
  },
  dense: {
    marginTop: 19
  }
});

class TextFields extends Component {

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }


  state = {
    file: '',
    imagePreviewUrl: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    let $frontPreview = null;
    let $backPreview = null;
    let $facePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
      $frontPreview = (<img src={imagePreviewUrl} />);
      $backPreview = (<img src={imagePreviewUrl} />);
      $facePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an image</div>);
      $frontPreview = (<div className="previewText">Please select an image</div>);
      $backPreview = (<div className="previewText">Please select an image</div>);
      $facePreview = (<div className="previewText">Please select an image</div>);
    }

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item xs={6}>
            <Card className={classes.card}>
              <CardContent>
                <Filter1 /><h2>Personal Details</h2>
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    placeholder="First Name"
                    id="first-name"
                    label="Given Name"
                    className={classes.textField}
                    value={this.state.firstName}
                    onChange={this.handleChange("name")}
                    margin="normal"
                  />
                  <TextField
                    placeholder="Middle Name"
                    id="middle-name"
                    label="Middle Name"
                    className={classes.textField}
                    value={this.state.middleName}
                    onChange={this.handleChange("name")}
                    margin="normal"
                  />
                  <TextField
                    placeholder="Last Name"
                    id="last-name"
                    label="Surname"
                    className={classes.textField}
                    value={this.state.lastName}
                    onChange={this.handleChange("name")}
                    margin="normal"
                  />

                  <TextField
                    placeholder="Street Address"
                    id="physical-address"
                    label="Physical Address"
                    className={classes.textField}
                    value={this.state.physicalAddress}
                    onChange={this.handleChange("name")}
                    margin="normal"
                  />

                  <TextField
                    placeholder="Unit/Apt."
                    id="continued-address"
                    label="Unit/Apt."
                    className={classes.textField}
                    value={this.state.secondAddress}
                    onChange={this.handleChange("name")}
                    margin="normal"
                  />

                  <TextField
                    placeholder="City"
                    id="city"
                    label="City"
                    className={classes.textField}
                    value={this.state.city}
                    onChange={this.handleChange("name")}
                    margin="normal"
                  />

                  <TextField
                    placeholder="Country"
                    id="country"
                    label="Country"
                    className={classes.textField}
                    value={this.state.country}
                    onChange={this.handleChange("name")}
                    margin="normal"
                  />

                  <TextField
                    placeholder="Region/State"
                    id="region"
                    label="Region"
                    className={classes.textField}
                    value={this.state.region}
                    onChange={this.handleChange("name")}
                    margin="normal"
                  />

                  <TextField
                    placeholder="Zip Code"
                    id="zip-code"
                    label="Zip Code"
                    className={classes.textField}
                    value={this.state.zipCode}
                    onChange={this.handleChange("name")}
                    margin="normal"
                  />

                  <TextField
                    placeholder="Date of Birth"
                    id="dob"
                    label="Date of Birth"
                    className={classes.textField}
                    value={this.state.dob}
                    onChange={this.handleChange("name")}
                    margin="normal"
                  />

                  <TextField
                    placeholder="Occupation"
                    id="occupation"
                    label="Occupation"
                    className={classes.textField}
                    value={this.state.occupation}
                    onChange={this.handleChange("name")}
                    margin="normal"
                  />

                  <TextField
                    placeholder="Investment Amount"
                    id="investment-amount"
                    label="Investment Amount"
                    className={classes.textField}
                    value={this.state.investAmount}
                    onChange={this.handleChange("name")}
                    margin="normal"
                  />

                </form>
              </CardContent>
        <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput"
            id="contained-button-uploadfront" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
          <label htmlFor="contained-button-uploadfront">
          <Button className="submitButton" 
            variant="contained"
            component="span"
            onChange={(e)=>this._handleImageChange(e)}>
            Upload Front ID Image
            </Button>
            </label>
        </form>
        <div className="imgPreview">
          {$frontPreview}
        </div>
      </div>
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput"
            id="contained-button-uploadback" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
          <label htmlFor="contained-button-uploadback">
          <Button className="submitButton" 
            variant="contained"
            component="span"
            onChange={(e)=>this._handleImageChange(e)}>
            Upload Back ID Image
            </Button>
            </label>
        </form>
        <div className="imgPreview">
          {$backPreview}
        </div>
      </div>
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput"
            id="contained-button-uploadface" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
          <label htmlFor="contained-button-uploadface">
          <Button className="submitButton" 
            variant="contained"
            component="span"
            onChange={(e)=>this._handleImageChange(e)}>
            Upload Face Image
            </Button>
            </label>
        </form>
        <div className="imgPreview">
          {$facePreview}
        </div>
      </div>
            </Card>
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);