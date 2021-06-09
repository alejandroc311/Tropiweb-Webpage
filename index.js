const AWS = require('aws-sdk');
const validator = require("validator");
//const mysql = require("mysql");
const ses = new AWS.SES({ region: 'us-east-1' });
//const pool = mysql.createPool({
//  connectionLimit: 100,
//  host     : process.env.RDS_HOST,
//  user     : process.env.RDS_USER,
//  password : process.env.RDS_PASSWORD,
//  port     : process.env.RDS_PORT,
//  database : "messages"
//});

module.exports.handler = async function(event, context, callback) {
  var response = {
    isBase64Encoded: false,
    statusCode:200,
    headers:{
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Credentials': "true",
      "Content-Type":"application/json"
    },
    body: JSON.stringify({"body":event})
  };
  var errorResponse = {
    isBase64Encoded: false,
    statusCode:500,
    headers:{
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': "true",
        "Content-Type":"application/json"
      },
    body: JSON.stringify({"Event":event})
  };
    console.log("Before calling the custom sendEmail function");
    console.log(event.body);
    var body = JSON.parse(event.body);
    var email = body.email;
    var comment = body.comment;
    console.log(email);
    console.log(comment);
    const emailParams = getParams(email, comment);
    console.log(emailParams);
    const data = await ses.sendEmail(emailParams).promise();
    callback(null, response, data);
};
function getParams (email, comment) {
  console.log(email);
  console.log(comment);
    console.log("Inside the formatting of the email.");
    var params = {
        Destination: {
            ToAddresses: [
                "tropiwebpr2020@gmail.com"
            ]
        },
        Message: {
            Body: {
              Text:{
                Data: 'Client Email: ' + email + '\nMessage: ' + comment,
                Charset: 'UTF-8'
              }
            },
            Subject: {
                Data: 'Website Form',
                Charset: 'UTF-8'
            }
        },
        Source: "tropiwebpr2020@gmail.com"
    };
    console.log(params);
    return params;
  }
