const loginUser = require('../loginUser');

describe("LoginTest test suites", () => {
    it("loginUser", (done) => {
        body = JSON.stringify({
            firebaseIdToken: ''
        })
        loginData = {
            body: body
        }
        loginUser.handler(JSON.stringify, {}, function(err, result) {
           console.log('Error ', err);
           console.log('Result ', result);
           done()
       })
   })
})
