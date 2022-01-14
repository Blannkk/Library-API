require('dotenv').config()
const mongoose = require('mongoose');


mongoose.connect(process.env.DB)
    .then(() => {
        const connection = mongoose.createConnection(process.env.DB);

        autoIncrement.initialize(connection);

        return console.log('Connected to MongoDB...')

    }

    )
    .catch(err => console.error('Could not connect to MongoDB...'));




const http = require('http');
const app = require('./app');

const server = http.createServer(app);



const port = process.env.PORT || 8080;


server.listen(port, () => console.log(`Listening on port ${port}`));
