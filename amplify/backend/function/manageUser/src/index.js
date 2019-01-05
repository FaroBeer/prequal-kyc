'use strict';

console.log('starting function');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-west-2"});
const uuid = require('uuid');

exports.handler = (event, context, callback) => {


    if(event.step=='needToApprove'){
        /*
        Possible flags:
            approvingAddress
            approvingIdentity
            ...
        */
            var params = {
                TableName: "tbl_kyc_users",
                Key: {"email": event.email,},
                UpdateExpression: "set " + event.varToSet + " = :d1",
                ExpressionAttributeValues:{
                    ":d1":event.valToSet,
                },
                ReturnValues:"UPDATED_NEW"
            };
            
    } else if(event.step==2){
        /*
        possible inputs for step2
        1) var element, pictureUploaded=true, pictureName=?, pictureDateUpload=date
        2) var element, pictureUploaded=false, pictureName='', pictureDateUpload=''
        3) var element, idUploaded=true, idName=?, idDateUpload=date'
        4) var element, idUploaded=false, idName='', idDateUpload=''
        element could be "picture" or "id" (now added also "pdf")
        
        conclusion:
        variables:   element=string&elementUploaded=bool&elementName=string&elementDate=date
    */
            var params = {
                TableName: "tbl_kyc_users",
                Key: {"email": event.email,},
                UpdateExpression: "set "+event.element+"Uploaded = :d1, "+event.element+"Name=:d2, "+event.element+"DateUpload=:d3",
                ExpressionAttributeValues:{
                    ":d1":event.elementUploaded,
                    ":d2":event.elementName,
                    ":d3":event.elementDate,
                },
                ReturnValues:"UPDATED_NEW"
            };
            
    } else if(event.step==3){
            var params = {
                TableName: "tbl_kyc_users",
                Key: {"email": event.email,},
                UpdateExpression: "set walletAddress = :d1",
                ExpressionAttributeValues:{ ":d1":event.walletAddress, },
                ReturnValues:"UPDATED_NEW"
            };
    }
    
    docClient.update(params, function(err,data) {
       if(err) callback(err, null);
       else {
            let queryParams = {
                TableName: "tbl_kyc_users",
                Key: {'email': event.email}
            }
            docClient.get(queryParams, function(err,data) {
               if(err) callback(err, null);
               else callback(null, data);
            });
                   
       }
    });
    
};

