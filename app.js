const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');
const uuid = require('uuid/v4');
const favicon = require('serve-favicon');
const session = require('express-session');
const fileStore = require('connect-mongodb-session')(session);
const app = express();

const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const registerRouter = require('./routes/register');
const mainRouter = require('./routes/main');
const ezamemagRouter = require('./routes/ezamemag');
const tictactoeRouter = require('./routes/tictactoe');
const randomNumberRouter = require('./routes/random-number');
const rankingRouter = require('./routes/ranking');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.png')));

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', './views/');

app.use(session({
    generateID: req => {
        console.log('Inside the session middleware');
        console.log(req.sessionID);
        return uuid();
    },
    store: new fileStore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'Delightable',
        collection: 'session'
    }),
    cookie: {
        maxAge: 3600000
    },
    secret: 'Literally Secret.',
    resave: false,
    saveUninitialized: true
}));

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/main', mainRouter);
app.use('/play/ezamemag', ezamemagRouter);
app.use('/play/tic-tac-toe', tictactoeRouter);
app.use('/play/random-number', randomNumberRouter);
app.use('/main/ranking', rankingRouter);

module.exports = app;
