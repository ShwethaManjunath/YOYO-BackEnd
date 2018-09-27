const loginUser = require('../src/lambdas/users/loginUser');

describe("LoginTest test suites", () => {
    it("loginUser", (done) => {
        const body = {
            firebaseIdToken: ""
        }
        loginData = {
            body: JSON.stringify(body)   
        }
        loginUser.handler(loginData, {}, function(err, result) {
           console.log('Error ', err);
           console.log('Result ', result);
           done()
       })
   })
})
