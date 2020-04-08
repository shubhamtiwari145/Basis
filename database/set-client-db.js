const mongoose = require('mongoose');
const Sequelize = require('sequelize');
//var dynamicConnection = require('../models/dynamicMongoose');
global.clientDbConn = [];
global.sqlClientDbConn = [];

function setclientdb() {
    return function (req, res, next) {

        //Check for existing connection
        if(global.clientDbConn.indexOf(req.session.name) > -1) {
            global.activeDbConn = global.clientDbConn[req.session.name];
            console.log('Using existing DB connection for ' + req.session.Client);
            return next();
        }
        //Else create new connection
        else {
            if (global.clientDbConn.indexOf(req.session.name) > -1) {
                createSqlConn(req);
            }  else {
                createMongodbConn(req);
            }
            return next();
        }
    }
}

const createMongodbConn = (req) => {
    client = mongoose.createConnection(req.session.Client /*, dbconfigoptions*/);
    console.log(req.session.Client)

    client.on('connected', function () {
        console.log('Mongoose default connection open to  ' + req.session.Client);
    });
    // When the connection is disconnected
    client.on('disconnected', function () {
        console.log('Mongoose ' + req.session.Client + ' connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function () {
        client.close(function () {
            console.log(req.session.Client + ' connection disconnected through app termination');
            process.exit(0);
        });
    });
    global.clientDbConn.push(req.session.name);
    let activeDb = global.clientDbConn[req.session.name] = client;
    global.activeDbConn = activeDb;
}

module.exports = setclientdb;