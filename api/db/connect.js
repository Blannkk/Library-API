require('dotenv').config()
const mongoose = require('mongoose');
const winston = require('winston');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const connection = mongoose.createConnection(process.env.MONGO_URI);

        autoIncrement.initialize(connection);

        return winston.info('Connected to MongoDB...')
    }
)