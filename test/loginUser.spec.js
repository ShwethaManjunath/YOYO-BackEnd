const loginUser = require('../src/lambdas/users/loginUser');

describe("LoginTest test suites", () => {
    it("loginUser", (done) => {
        const body = {
            userName: "Subhasis",
            email: "subhasis1@gmail.com",
            photo: "test"
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
