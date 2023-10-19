const app = require('./config/express');
const PORT = 3000;

// Running the server
app.listen(PORT, console.log(`Listening on port ${PORT}...`));