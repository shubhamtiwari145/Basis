var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var tokens = require('../security/token');

//context
const context = require('../context/context')
const {Principal} = require('../security/principal');
var getPrincipal = function (  payload, token) {
    return new Principal(payload, token);
}

passport.use(new BearerStrategy(function (token, cb) {
    try {
        let payload = tokens.Validate(token);
        var principal = getPrincipal(payload, token);
        if (principal != null) {
            context.put(principal);
            return cb(null, principal);
        } else
            return cb(null, false);

    } catch (err) {
        return cb(err);
    }
}));

var handler = passport.authenticate('bearer', {
    session: false
});

exports.Handler = handler;