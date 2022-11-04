const express = require('express');
const bodyParser = require('body-parser');
const viewEngine = require('./app/config/viewEngine');
const initwebRoutes = require('./app/routes/initwebRoutes');
const morgan = require('morgan');

// Call biến toàn cầu
require('dotenv').config();

let app = express();

// Templating Engine
viewEngine(app);
// Router
initwebRoutes(app);
// Http Logger
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, () => {
	console.log(`App listening on port ${process.env.PORT}`);
});
