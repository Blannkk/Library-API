const express = require('express');
const app = express();

require('./api/db/connect');
require('./api/start/routes')(app);
require('./api/start/logging');
require('./api/start/prod')(app)



const port = process.env.PORT || 8080;


app.listen(port, () => console.log(`Listening on port ${port}`));


