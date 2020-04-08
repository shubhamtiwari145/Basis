var jwt = require('jsonwebtoken');
var httperror = require('http-errors');

var validate = function (token) {
    try {
        let secret = process.env.AUTHSECRET || 'jwt_secret_key';
        let payload =  jwt.verify(token, secret);
        return {userId: payload.id, name: payload.first_name, email: payload.email, expires: payload.expires, tenant: payload.tenant}
    } catch (err) {
        throw new httperror(401, err.message);
    }
}

exports.Validate = validate;