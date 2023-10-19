const app = require('./config/express');
const {PORT, DBURL} = require('./constants');

//Setting up router
require('./router')(app);

// Connecting to DB
require('./config/db')(DBURL)
    .then(() => console.log('Connected to DB!'))
    .catch((err) => console.log(err));

// Running the server
app.listen(PORT, console.log(`Listening on port ${PORT}...`));