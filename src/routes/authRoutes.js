var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function(){
	authRouter.route('/signUp')
		.post(function(req, res){
			console.log(req.body);

			var url = 'mongodb://localhost:27017/libraryApp';
			mongodb.connect(url, function(err, db){
				var collection = db.collection('users');
				var user = {
					username : req.body.username,
					password : req.body.password 
				};

				//typically you do a select first, if you find a user, throw an error.
				collection.insert(user, function(err, results){

					//passport will add things to the request for us to use (ie: login function)
					//usually passport will handle it themselves, but we dont want the user to
					//login again after they signup, so we log in for them

					//when we login, we added the req.body obj into the session
					//console log results to see why we chose ops[0]
					req.login(results.ops[0], function(){
						res.redirect('/auth/profile');
					});
				});
			});
		});


	//instead of function , we use passport local strategy for handling
	authRouter.route('/signIn')
		.post(passport.authenticate('local', {
			failureRedirect : '/'
		}), function(req, res){
			res.redirect('/auth/profile');
		});


	authRouter.route('/profile')
		.all(function(req, res, next){
			//if tried to access /auth/profile without a user logged in
			if(!req.user){
				res.redirect('/');
			}
			next();//do the next thing
		})
		.get(function(req, res){
			res.json(req.user);
		});

	return  authRouter;
};

module.exports = router;