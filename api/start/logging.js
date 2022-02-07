require('express-async-errors');

const winston = require('winston');

module.exports = function ex() {
    process.on('uncaughtException', (ex) => {
        winston.error(ex.message, ex);
        process.exit(1)
    });
}

module.exports = function re() {
    process.on('unhandledRejection', (ex) => {
        winston.error(ex.message, ex);
        process.exit(1)
    })
}
