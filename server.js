const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MemoryStore = require('session-memory-store')(session);
const passport = require('passport');
const favicon = require('express-favicon');
const express = require('express');
require('dotenv').config();

mongoose.connection.openUri(process.env.MONGODB_URI || 'mongodb://localhost/NBEC');

require('./config/index')(passport);

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    name: 'user_sid',
    secret: process.env.SESSION_SECRET,
    store: new MemoryStore(),
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'html');
app.engine('html', (path, options, callback) => {
    fs.readFile(path, 'utf-8', callback)
});
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname));

app.use(favicon(__dirname + '/images/logo.png'));

require('./apis/google_news_api')(app);
require('./routes/newsletter')(app);
require('./routes/register')(app);
require('./routes/login')(app, passport);
require('./routes/user')(app);
require('./routes/profile')(app);
require('./routes/forums')(app);
require('./mail/cron');
require('./routes/logout')(app);
require('./routes/authentication_required')(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
});

app.listen(process.env.PORT || 3000);