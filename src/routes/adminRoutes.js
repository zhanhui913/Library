var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

	var books = [{
		title:'War and Peace',
		genre:'Historical Fiction',
		author:{
			name:'Lev Nikolayevich Tolstoy',
			authorId:128382
		},
		read:false,
		bookId: 656
	},
	{
		title:'Les Miserables',
		genre:'Historical Fiction',
		author:{
			name:'Victor Hugo',
			authorId:13661
		},
		read:false,
		bookId: 24280
	}];

var router = function(nav){
	adminRouter.route('/addBooks')
	.get(function(req, res){

		//res.send('inserting books');


		var url = 'mongodb://localhost:27017/libraryApp';

		mongodb.connect(url, function(err, db){
			var collection = db.collection('books');
			collection.insertMany(books, function(err, results){
				res.send(results);
				db.close();	
			});


		});
	});


	return adminRouter;
};

module.exports = router;