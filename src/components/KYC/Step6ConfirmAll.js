import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class Step6ConfirmAll extends Component {

    render() {

        return (         
            <Card className={this.props.classes.card}>
                <CardContent>    
                 
                    <div>CONFIRM ALL?</div>
                                          
                    <br /><br />       
                    
                    <Button className="submitButton" 
                        variant="contained"
                        component="span"
                        onClick={(e) => this.props._handleSubmitStep6(e)}>
                        CONFIRM
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

export default Step6ConfirmAll;