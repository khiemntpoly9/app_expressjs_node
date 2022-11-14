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

// Http Logger
// Cần dùng dòng này check log
app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Router
initwebRoutes(app);

app.listen(process.env.PORT || 3000, () => {
	console.log(`App listening on port ${process.env.PORT}`);
});
