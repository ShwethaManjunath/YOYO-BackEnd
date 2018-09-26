const loginUser = require('../src/lambdas/users/loginUser');

describe("LoginTest test suites", () => {
    it("loginUser", (done) => {
        body = JSON.stringify({
            firebaseIdToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzMjJiNjhiY2U0MzExZTg2OTYzOTUzM2QzYTFhMjU1MWQ1ZTc0YzYifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20veW95b2dpZnQtOTFiNjYiLCJuYW1lIjoiU3ViaGFzaXMgRGVic2hhcm1hIiwicGljdHVyZSI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tdFI2eFUzUHpSNjgvQUFBQUFBQUFBQUkvQUFBQUFBQUFCUU0vQWxXQXpSNXRUdmcvcGhvdG8uanBnIiwiYXVkIjoieW95b2dpZnQtOTFiNjYiLCJhdXRoX3RpbWUiOjE1Mzc5Mzc2MzIsInVzZXJfaWQiOiJZdHVIejJvMFU5UTNRQXMwaThoUUl2OXhaR0kzIiwic3ViIjoiWXR1SHoybzBVOVEzUUFzMGk4aFFJdjl4WkdJMyIsImlhdCI6MTUzNzk0NjE5OCwiZXhwIjoxNTM3OTQ5Nzk4LCJlbWFpbCI6InN1Ymhhc2lzZGVic2hhcm1hMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMjc2MzA0MzMyMjU2NDU1NTc5MiJdLCJlbWFpbCI6WyJzdWJoYXNpc2RlYnNoYXJtYTFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.VN2OiHud50D8ZnoG5QxSAO9ucwg6HmdlNrMW1z2TgpHGrYaE918mdzSLT5fY_y7CXrJgQ-yb8dRfFGFE4ZpBX2FGYMgUiyerpP48GvaZEjp-PP6Ld--7KScpcelUeVb5wFu_OUFh9Cg2csqhypqzLzgQ57RcsHT6SXKydXuBPP3fnvot5UpXfSsFa6FJixrIPdhRMQblRqwORtZw-GxtjwOs5woKJZeXkoaOFuo_Axj4WhKBMVHC5631A9-eeTe8ytyemelhcucXLr7zTUUW_aIvB4-aqNOhsnmzPGrhxL7YaDYVHG1Bpy_w3iGL_g2Xp_m8Wux5dbbt7a0_UHMtRA"
        })
        loginData = {
            body: body
        }
        loginUser.handler(loginData, {}, function(err, result) {
           console.log('Error ', err);
           console.log('Result ', result);
           done()
       })
   })
})
