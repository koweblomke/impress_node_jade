var fs  = require('fs'); 

exports.render = function (request, response) {
  var template = __dirname + '/../views/partials/' + request.params.name + '.jade';

  fs.exists(template, function(exists) {
  	if (exists) {
	  response.render('partials/' + request.params.name);
  	} else {
	  console.log('Unable to locate template: ' + template + ', sending 404.' );
	  response.send(404, {status: '404', message: 'Unable to locate template: ' + request.params.name + '.'});
  	}
  });
};