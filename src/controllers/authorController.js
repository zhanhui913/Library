var mongodb = require('mongodb').MongoClient;

//used to find a single book whos property __id is actually an object
var ObjectId = require('mongodb').ObjectID;

//dont need authorRouter and express as we are just building the functions that will be used by bookRoutes.js

var authorController = function(authorService, nav){
	var middleware = function(req, res, next){
		/*if(!req.user){
			res.redirect('/');
		}*/
		next();
	};

	var getIndex = function(req, res){
		var url = 'mongodb://localhost:27017/libraryApp';

		mongodb.connect(url, function(err, db){
			var collection = db.collection('books');
			collection.distinct('author', function(err, results){
				if(err){
					return console.log(err);
				}
				res.render('authorListView', {
					title:'Author', 
					nav: nav,
					authors:results
				});
			});
		});
	};

	var getById = function(req, res){

		console.log(req.params.id);

		var url = 'mongodb://localhost:27017/libraryApp';

		//mongodb.connect(url, function(err, db){

			authorService.getAuthorById(req.params.id, function(err, authorResult){
				if(err){
					return console.log(err);
				}
										
				//include the book return into results obj
				//results.author = author;

				res.render('authorView', {
					title:'Author', 
					nav: nav,
					author:authorResult
				});
			});

			/*
			collection.findOne({_id:id}, function(err, results){
				console.log(results);
				if(err){
					return console.log(err);
				}

				if(results.bookId){
					bookService.getBookById(results.bookId, function(err, book){
						//include the book return into results obj
						results.book = book;

						res.render('bookView', {
							title:'Book', 
							nav: nav,
							book:results
						});
					});
				}else{
					res.render('bookView', {
						title:'Book', 
						nav: nav,
						book:results
					});
				}
			});*/
		//});
	};

	//This return is what we expose to the caller to call, almost like a public function
	return {
		middleware : middleware,
		getIndex : getIndex,
		getById : getById
	};
};

module.exports = authorController;