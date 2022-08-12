const express = require('express');
const { sendOtpEmail } = require('../util/mail');
const otpGenerator = require('../util/otp');
const passwordValidator = require('../util/password');
const router = express.Router();

const pool = require('./../db/pool');

// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

router.post('/signup', async (req, res) => {


    const userDetails = req.body;
    // const result = await pool.query('select * from users');
    //logics
    //email id and username should be unique
    if(req.body.birthYear>2015){//todo move to constants
        return res.status(400).send({"error":"birth year cannot be greater than 2015"})
    } 

    if(!passwordValidator(req.body.password)){
        return res.status(400).send({"error":"password should be alphanumeric and should be 8-20 characters long"}); 
    }

 
    const result = await pool.query('select * from users where username=$1 or email = $2 ',[userDetails.userName,userDetails.email])
    
    if(result.rowCount>0){
        //there is already a user with matching username or mail
       return res.status(400).send({"error":"Username or email is already existing"});
    }

    const otp = otpGenerator();
    
    const user = await pool.query("INSERT INTO public.users(username, email, password,\"registrationDate\",month,birthyear,\"phoneNumber\",otp) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)", [
        req.body.userName,
        req.body.email,
        req.body.password,
        new Date(),
        new Date(),
        req.body.birthYear,
        req.body.phoneNumber,
        otp
    ]);

    await sendOtpEmail(req.body.userName,req.body.email,otp);
    // console.log(user.rows)

    res.send(req.body);

})

router.post('/verifyOtp',async (req, res) =>{

    let {email,otp} = req.body;
    const result = await pool.query('select otp from users where email=$1 and verified = false ',[email]);

    if(result.rowCount ==0){
        return res.status(400).send({"error":"OTP verification failed"});
    }

    const savedOTP = result.rows[0].otp;

    if(savedOTP!==otp){
        return res.status(400).send({"error":"OTP verification failed"});
    }

    await pool.query('update users set verified = true where email = $1 and otp = $2' , [email,otp]);

    return res.send({message:"User verified successfully"});

});

module.exports = router