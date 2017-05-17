var express = require('express');
var bodyParser = require('body-parser');


// for passport middleware
var cookieParser = require('cookie-parser'); //use to parse the cookie for the session
var passport = require('passport'); //for passport 
var session = require('express-session'); //for express session


//gives us an instance of that express
var app = express();

//try to pull out PORT obj from env (located in gulpfile.js)
var port = process.env.PORT || 5000;

var nav = [{
				link:'/books',
				text:'Books'
			},{
				link:'/authors',
				text:'Authors'
			}
		];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var authorRouter = require('./src/routes/authorRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

//use middleware 'static'
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret:'library'})); //session takes a secret (anything we want it to be)

//separated the passport stuffs into another js
//pass in app variable into passport so that we 
//still have access to app variable in passport.js
require('./src/config/passport')(app);


app.set('views', './src/views');
app.set('view engine', 'ejs');


app.listen(port, function(err){
	console.log('running server on port '+port);
});

app.get('/', function(req, res){
	res.render('index', {
		title:'Books', 
		nav: [{
				link:'/books',
				text:'Books'
			},{
				link:'/authors',
				text:'Authors'
			}
		]
	});
});

app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);