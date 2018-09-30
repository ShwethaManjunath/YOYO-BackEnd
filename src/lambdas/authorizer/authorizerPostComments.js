const AWS = require("aws-sdk");

let isAllowed = (token, email) => {
    return new Promise((resolve, reject) => {
        var params = {
            AccessToken: token
        };
        var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
        cognitoidentityserviceprovider.getUser(params, function(err, data) {
            if (err) {
                console.log(">>error", err);
                reject()
            }
            else {
                console.log('userData',data);
                const userData = parseUserData(data);
                if(userData.email === email) {
                    resolve(true);
                } else {
                    resolve(false)
                }
            }
        })
    })
}

var parseUserData = (data) => {
    const mappedData = {};
    data.UserAttributes.forEach(item => {
        const values = Object.values(item);
        mappedData[values[0]] = values[1]
    })
    userData = {
        email: mappedData.email,
        userName: mappedData.name,
        photo: mappedData.picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrSKKu7oCCmPKDSTU6aSsZMfnUxrVImzv42-DDnAgVBmG54Szz"
    }
    return userData
}

////////////////////////////////////


exports.handler = function(event, context, callback) {        
    console.log('Received event:', JSON.stringify(event, null, 2));

    var authResponse = {};
    var condition = {};
    condition.IpAddress = {};
    const token = event.headers.Authorization;
    const email = JSON.parse(event.body).email;
    isAllowed(token, email)
    .then(allowed => {
        if(allowed){
            callback(null, generateAllow('me', event.methodArn));
        }  else {
            callback("Unauthorized");
        }
    })
    .catch(err => {
        callback("Unauthorized");
    })
}
     
// Help function to generate an IAM policy
var generatePolicy = function(principalId, effect, resource) {
    // Required output:
    var authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; // default version
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; // default action
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    // Optional output with custom properties of the String, Number or Boolean type.
    authResponse.context = {};
    return authResponse;
}
     
var generateAllow = function(principalId, resource) {
    return generatePolicy(principalId, 'Allow', resource);
}
     
var generateDeny = function(principalId, resource) {
    return generatePolicy(principalId, 'Deny', resource);
}