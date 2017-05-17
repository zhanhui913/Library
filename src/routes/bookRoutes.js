var express = require('express');
var bookRouter = express.Router();

//function so that app.js can insert the nav into this router
var router = function(nav){
	var bookService = require('../services/goodreadsService')();
	var bookController = require('../controllers/bookController')(bookService, nav);

	//Here if we dont want anyone to be able to acess bookRouter unless they are signed in
	bookRouter.use(bookController.middleware);

	bookRouter.route('/').get(bookController.getIndex);

	bookRouter.route('/:id').get(bookController.getById);

	//need to return bookRouter for app.js
	return bookRouter;
};

//export this function that will create a router
module.exports = router;