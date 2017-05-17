var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	mongodb = require('mongodb').MongoClient;

module.exports = function(){
	//the fields are just the name of the input, not the ID
	passport.use(new LocalStrategy({
		usernameField : 'usr',
		passwordField : 'psw'
	},
	function(username, password, done){
		console.log('trying to find {'+username+', '+password+'}');


		//this is where we verify via going into the db
		var url = 'mongodb://localhost:27017/libraryApp';
		mongodb.connect(url, function(err, db){
			var collection = db.collection('users');

			collection.findOne({username: username}, function(err, results){
				if (err){ 
					return console.log(err);
				}


				if(results){
					if(results.password === password){
						var user = results;
						done(null, user);
					}else{
						//instead of this, we want to redirect to '/' as 'failureRedirect' in authRoutes.js
						//done('bad password', null);

						//we pass message and false as user
						done(null, false, {message:'Bad password'});
					}
				}else{
					//done(null, false, {message:'Bad user'});
					done('bad user',null);
				}

				
			});
		});
	}));
};