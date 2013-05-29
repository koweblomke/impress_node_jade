var http = require('http'),
    _ =require('underscore'),
    logger = require('winston');


exports.handle = function(error, request, response, next) {
	logger.error(error);

	next(error, request, response);
}

