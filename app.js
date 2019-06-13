const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');

const init_router = require('./routes/init');

const port = 8080;

const app = express();

app.use(favicon(path.join(__dirname, 'views/style', 'favicon.png')));
app.use(logger('dev'));
app.use(express.static(__dirname + '/views/style'));
app.use(express.urlencoded({ extended: true }));

app.use('/', init_router);

app.listen(port, () => {
    console.log('Waiting for port 8080');
});