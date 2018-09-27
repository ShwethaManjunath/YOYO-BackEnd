const userModel = require('../../models/userModel');
const  admin = require('firebase-admin');
const serviceAccount = require('./yoyogift-91b66-firebase-adminsdk-naoj1-052a427b6d.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://yoyogift-91b66.firebaseio.com"
});
// module.exports = {
//     auth: admin.auth()
// }

// Login Handler
exports.handler = (event, context, callback) => {

    const eventBody = JSON.parse(event.body);
    
    admin.auth().verifyIdToken(eventBody.firebaseIdToken)
    .then(user => {
        // console.log('User>>: ', user)
        userData = {
            email: user.email,
            userName: user.name,
            photo: user.picture
        }
        userModel.loginUser(userData)
        .then ( (loggedIn) => {
            if(loggedIn) {
                var response = {
                    "statusCode": 200,
                    "body": {
                        message: 'Successfully loggedin.'
                    },
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
                "body": err,
                "isBase64Encoded": false
            };
            callback(response, null);
        })
    })
    .catch(err => {
        var response = {
            "statusCode": 500,
            "body": JSON.stringify(err),
            "isBase64Encoded": false
        };
        callback(response, null);
    });
};