
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var schedule = require('./routes/schedule');
var profile = require('./routes/profile');
var login = require('./routes/login');
var add = require('./routes/add');
var data = require('./routes/data');
var username = require('./routes/username');
// Example route
// var user = require('./routes/user');

var app = express();
var hbs = handlebars.create({
    helpers: {
        lookup: function (obj, field) { return obj && obj[field]; }
    }
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', login.viewLogin);
app.get('/schedule', schedule.viewSchedule);
app.get('/profile', profile.viewProfile);
app.get('/homepage', index.view);
app.post('/add', add.addSchedule);
app.get('/data', data.dataInfo);
app.post('/login', username.login);
app.post('/logoff', username.logoff);
app.get('/profile/:username', profile.viewUserProfile);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
