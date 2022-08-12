const passwordValidator = (password)=>{
    if(!password) return false;
    if(password.length < 8 || password.length>20 ) return false; //TODO move to constants

    let alphaNumericRegex =  RegExp(/^[a-z0-9\W]+$/i);

    return alphaNumericRegex.test(password);
}

module.exports = passwordValidator;