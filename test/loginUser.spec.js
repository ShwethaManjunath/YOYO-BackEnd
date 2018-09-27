const loginUser = require('../src/lambdas/users/loginUser');

describe("LoginTest test suites", () => {
    it("loginUser", (done) => {
        loginData = {
            body: {
                firebaseIdToken: ""
            }
        }
        loginUser.handler(loginData, {}, function(err, result) {
           console.log('Error ', err);
           console.log('Result ', result);
           done()
       })
   })
})
