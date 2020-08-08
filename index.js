const AWS = require('aws-sdk');
const validator = require("validator");
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100,
  host     : process.env.RDS_HOST,
  user     : process.env.RDS_USER,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : "messages"
});

module.exports.handler = function(event, context, callback) {
  var response = {
    statusCode:200,
    headers:{
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Credentials': "true",
      "Content-Type":"application/json"
    },
    body: JSON.stringify({"body":event})
  }
  try{
    console.log("inside the try loop", null, 2);
    console.log("before parsing the json from the post method", null, 2);
    var data = JSON.parse(event.body);
    console.log(data);
    console.log("after parsing the json from the post method", null, 2);
    var email = data.email;
    var comment = data.comment;
    if(validator.isEmail(email) == "false" || validator.isEmpty(comment) == "false"){
      callback(new Error("The email or comment were defectous."));
      return;
    }
    email = validator.escape(email);
    comment = validator.escape(comment);
    console.log("Before querying the DB.", null, 2);
    var sql = "INSERT INTO messages (email, message) VALUES ('"+email+"','"+comment+"')";
    pool.getConnection((error, connection) => {
      if (error) throw error;
      connection.query(sql, function(err, result){
        console.log("Enters query...");
        console.log("Before checking for errors...")
        connection.on('error', function(err) {
          connection.destroy();
          console.log("[mysql error]",err);
          callback(new Error(err));
        });
        console.log("Inserted data into DB...");
        console.log(err);
        console.log(result);
        connection.destroy();
        callback(null, response);
        return;
      });
    });

    callback(null, response);
    return;

  } catch(error){
    console.log("inside the error loop", null, 2);
    console.log(error);
    console.log(error.description);
    callback(null, response);
    return;
  }

};
