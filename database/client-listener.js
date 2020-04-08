const context = require('../context/context');
const jwt = require('jsonwebtoken');

const dbArray = {
    basis: 'mongodb://localhost:27017/basis'     
}

module.exports = function clientlistener() {
   return function (req, res, next) {
 
       let cur_tenant = 'basis';
 
       req.session.name = cur_tenant;
       req.session.Client = dbArray['basis'];
       return next();
 
   }
}
