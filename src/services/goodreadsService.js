var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray:false});

var goodreadsService = function(){

	var getBookById = function(id, cb){
		var options = {
			host : 'www.goodreads.com',
			path : '/book/show/' + id + '?format=xml&key=geqdKxL797f1QWIu1v47g'
		};

		var callback = function(response){
			var str = '';
			response.on('data', function(chunk){
				str += chunk;
			});
			response.on('end', function(){
				//console.log(str);

				parser.parseString(str, function(err, result){
					//now we have the json results
					cb(null, {
						description: result.GoodreadsResponse.book.description, 
						img_url : result.GoodreadsResponse.book.image_url
					});
				});
			});
		};

		http.request(options, callback).end();
	};

	var getAuthorById = function(id, cb){
		var options = {
			host : 'www.goodreads.com',
			path : '/author/show/' + id + '?format=xml&key=geqdKxL797f1QWIu1v47g'
		};

		var callback = function(response){
			var str = '';
			response.on('data', function(chunk){
				str += chunk;
			});
			response.on('end', function(){
				//console.log(str);

				parser.parseString(str, function(err, result){
					//now we have the json results
					cb(null, {
						name: result.GoodreadsResponse.author.name,
						hometown : result.GoodreadsResponse.author.hometown,
						born_at : result.GoodreadsResponse.author.born_at,
						died_at : result.GoodreadsResponse.author.died_at,
						about: result.GoodreadsResponse.author.about, 
						img_url : result.GoodreadsResponse.author.image_url
					});
				});
			});
		};

		http.request(options, callback).end();
	};

	return {
		getBookById : getBookById,
		getAuthorById : getAuthorById
	};
};

module.exports = goodreadsService;