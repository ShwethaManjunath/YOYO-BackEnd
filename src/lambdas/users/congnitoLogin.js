const userModel = require('../../models/userModel');
const AWS = require("aws-sdk");

exports.handler =  (event, context, callback) => {
    const eventBody = JSON.stringify(event.body);
    var params = {
        AccessToken: eventBody.accessToken
    };

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    cognitoidentityserviceprovider.getUser(params, function(err, data) {
    if (err) {
        console.log(err, err.stack); // an error occurred
        const response = {
                    statusCode: 500,
                    body: JSON.stringify(err)
                };
        callback(null, response)
    }
    else {
        console.log(data);           // successful response
        const response = {
                    statusCode: 200,
                    body: JSON.stringify(data)
                };
        callback(null, response)
    }
    });
};
