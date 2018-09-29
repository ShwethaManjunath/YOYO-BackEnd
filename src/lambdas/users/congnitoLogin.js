const userModel = require('../../models/userModel');
const AWS = require("aws-sdk");

exports.handler =  (event, context, callback) => {
    const eventBody = JSON.parse(event.body);
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
        const userData = {};
        const mappedData = {};
        data.forEach(item => {
            const values = Object.values(item);
            mappedData[values[0]] = values[1]
        })
        userData = {
            email: mappedData.email,
            userName: mappedData.name,
            photo: mappedData.picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrSKKu7oCCmPKDSTU6aSsZMfnUxrVImzv42-DDnAgVBmG54Szz"
        }

        userModel.loginUser(userData)
        .then ( (loggedIn) => {
            if(loggedIn) {
                var response = {
                    "statusCode": 200,
                    "headers": {
                        "content-type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    },
                    "body": JSON.stringify(userData),
                    "isBase64Encoded": false
                };
                callback(null, response);
            } else {
                throw new Error('Failed to login');
            }
        })
        .catch ( err => {
            var response = {
                "statusCode": 500,
                "headers": {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(response, null);
        })
    }
    });
};
