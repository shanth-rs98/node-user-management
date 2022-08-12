const { totp } = require('node-otp')

const otpGenerator =()=>{
    return totp({
        secret: '12345678901234567890',
      });
}

module.exports = otpGenerator;




