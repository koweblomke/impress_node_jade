module.exports = nconf = require('nconf');

// ===============================================
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at '/software/tooling/configuration/environment_config.conf'
// ===============================================

nconf.argv().env();


// ===============================================
//  Load config files
// ===============================================

if (nconf.get('NODE_ENV') == 'test') {
  nconf.file({ file: 'test/demo.conf' });
} else {
  nconf.file({ file: '/software/tooling/configuration/demo.conf' });
}

// ===============================================
//  Defaults
// ===============================================

nconf.defaults({
  'port'                                    : '3002',
  'app.title'                               : 'ImpressJS Demo',
  'log.file'                                : 'impress.log',
  'accesslog.file'                          : 'impress-access.log',
  'log.level'                               : 'info',
});
