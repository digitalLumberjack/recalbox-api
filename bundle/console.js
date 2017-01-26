"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _solfegejs = require("solfegejs");

var _solfegejs2 = _interopRequireDefault(_solfegejs);

var _solfegejsCli = require("solfegejs-cli");

var _solfegejsCli2 = _interopRequireDefault(_solfegejsCli);

var _solfegejsServer = require("solfegejs-server");

var _solfegejsServer2 = _interopRequireDefault(_solfegejsServer);

var _solfegejsServerRouter = require("solfegejs-server-router");

var _solfegejsServerRouter2 = _interopRequireDefault(_solfegejsServerRouter);

var _Api = require("./Api");

var _Api2 = _interopRequireDefault(_Api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize the application
let application = new _solfegejs2.default.kernel.Application(__dirname);

// Add the external bundles
application.addBundle("console", new _solfegejsCli2.default.Console());
application.addBundle("server", new _solfegejsServer2.default.HttpServer());
application.addBundle("router", new _solfegejsServerRouter2.default.Router());

// Add the internal bundle
application.addBundle("api", new _Api2.default());

// Get the configuration
let configuration = require(__dirname + "/../config/config");

// Override the application configuration
application.overrideConfiguration(configuration);

// Start the application
application.start();