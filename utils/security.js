const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

module.exports = {
    encryptPassword: function(password){
        let hash = crypto.createHash('md5').update(password).digest("hex");
        return hash;
    },
    generateAccessToken: function(data){
        const token = jwt.sign(data, JWT_SECRET, { expiresIn: '2m' });
        return token;
    },
    validateAccessToken: function(token){
        const strategy = 'Bearer';
        if(!token.includes(strategy)){
            throw {message: 'Invalid token'};
        }
        token = token.replace(strategy, '');
        token = token.trim();
        return jwt.verify(token, JWT_SECRET);
    }
}