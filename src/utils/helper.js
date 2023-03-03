const bcrypt = require ("bcryptjs");

function hashPassword(password){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password,salt);
}

function comparePassword(raw,hash){
return bcrypt.compareSync(raw,hash) 
//if this returns true that means passwords are the same
}

module.exports = {
    hashPassword,
    comparePassword
}