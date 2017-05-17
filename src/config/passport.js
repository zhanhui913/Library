var passport = require('passport');




module.exports = function(app){
	app.use(passport.initialize());
	app.use(passport.session());

	//its going to pass a user obj and a callback, here we package the user obj up for serialization
	//we can just serialize the user.id, user.email, etc.
	passport.serializeUser(function(user, done){
		console.log('serializing user :');
		console.log(user);
		done(null, user);
	});

	//here we can fetch whatever is stored in the session (user.id, user.email, etc)
	passport.deserializeUser(function(user, done){
		console.log('deserializing user :');
		console.log(user);
		done(null, user);
	});

	//strategy?? (passport-local => check user in our db)
	//theres passport-google, passport-facebook => o-auth logins
	// we are going to break up passport-locals so that we dont have all the different strategies here in 1 code.
	require('./strategies/local.strategy')();
};