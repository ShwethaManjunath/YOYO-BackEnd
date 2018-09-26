const loginUser = require('../src/lambdas/users/loginUser');

describe("LoginTest test suites", () => {
    it("loginUser", (done) => {
        loginData = {
            body: {
                firebaseIdToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzMjJiNjhiY2U0MzExZTg2OTYzOTUzM2QzYTFhMjU1MWQ1ZTc0YzYifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20veW95b2dpZnQtOTFiNjYiLCJuYW1lIjoiU3ViaGFzaXMgRGVic2hhcm1hIiwicGljdHVyZSI6Imh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLzExOTUyMDQzMzcyODQ2NjAvcGljdHVyZSIsImF1ZCI6InlveW9naWZ0LTkxYjY2IiwiYXV0aF90aW1lIjoxNTM3OTY1NjkxLCJ1c2VyX2lkIjoia2VXUTljTlpySlF6aDkzYzZQcDZsNTdHdWk1MiIsInN1YiI6ImtlV1E5Y05ackpRemg5M2M2UHA2bDU3R3VpNTIiLCJpYXQiOjE1Mzc5NjU2OTEsImV4cCI6MTUzNzk2OTI5MSwiZW1haWwiOiJkZWJzaGFybWFzdWJoYXNpczFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImZhY2Vib29rLmNvbSI6WyIxMTk1MjA0MzM3Mjg0NjYwIl0sImVtYWlsIjpbImRlYnNoYXJtYXN1Ymhhc2lzMUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJmYWNlYm9vay5jb20ifX0.db9GCZEU1IC-mpYXnjmsVkdSS-FfBrgLQ2YcV00QTsbHb-pKYMNurxr7hHMva-QR19uswyB0tVtzBmylhdZxHWGZ9IAjLYTmgS4F8TzKV4kPk1_ZkgVrLz53wdX9_mns57HxwYMNmTq-jsaBrYoeP9kK7_atcxEEIHb_b8sbQ2WO1qmpfUXSNQJTmcLoXzbO1wIam3djf_6owCi3CNvVzWnn0KJTjzkuU9GLdxqqvMAmVl86KMwDRzlTc-EyiYxtYC6Ekotv5QkqBKJRPzRJizi8CDo688u9AZ6xXHcGPaklKGmUK5yj4Fz3oCEqRntjspgt9LHI9oyGYpGMgP6w5g"
            }
        }
        loginUser.handler(loginData, {}, function(err, result) {
           console.log('Error ', err);
           console.log('Result ', result);
           done()
       })
   })
})
