var express = require('express');
var authorRouter = express.Router();

//function so that app.js can insert the nav into this router
var router = function(nav){
	var authorService = require('../services/goodreadsService')();
	var authorController = require('../controllers/authorController')(authorService, nav);

	//Here if we dont want anyone to be able to acess authorRouter unless they are signed in
	authorRouter.use(authorController.middleware);

	authorRouter.route('/').get(authorController.getIndex);

	authorRouter.route('/:id').get(authorController.getById);

	//need to return authorRouter for app.js
	return authorRouter;
};

//export this function that will create a router
module.exports = router;