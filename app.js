  
var express = require('express'),
    http = require('http'),
    path = require('path'),
    config = require('./util/config'),
    logger = require('winston'),
    index = require('./routes'),
    expressWinston = require('express-winston');

var app = express();

// ===============================================
//  Configure Application
// ===============================================

app.configure(function() {
  // Initialize logger
  logger.add(logger.transports.File, { filename: config.get('log.file'), level: config.get('log.level') });  

  logger.info('Starting ' + config.get('app.title') + '....');

  app.set('port', config.get('port'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.locals.pretty = true;
  app.use(express.favicon(__dirname + '/public/img/favicon.png'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.cookieParser('~!odem!-Rene~'));
  app.use(express.session({ secret: '~!odem!-Rene~', key: 'demo' }))

  app.use(expressWinston.logger({
    transports: [
      new logger.transports.File({
        json: true,
        filename: config.get('accesslog.file'), 
        level: config.get('log.level')
      })
    ]
  }));

  app.use(app.router);

  app.use(expressWinston.errorLogger({
    transports: [
      new logger.transports.File({
        json: true,
        filename: config.get('log.file'), 
        level: config.get('log.level')
      })
    ]
  }));
});

var server = http.createServer(app).listen(app.get('port'), function(){
  logger.info('Started ' + config.get('app.title') + ' listening on http port ' + app.get('port'));
});

// ===============================================
//  Routing
// ===============================================

app.get('*', index.index);


exports.instance = app;