"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _solfegejs = require("solfegejs");

var _solfegejs2 = _interopRequireDefault(_solfegejs);

var _IniFile = require("../utils/IniFile");

var _IniFile2 = _interopRequireDefault(_IniFile);

var _config = require("../../config/config");

var _config2 = _interopRequireDefault(_config);

var _recalboxDefaultValues = require("../../config/recalboxDefaultValues.json");

var _recalboxDefaultValues2 = _interopRequireDefault(_recalboxDefaultValues);

var _ControllerUtil = require("../utils/ControllerUtil");

var ControllerUtil = _interopRequireWildcard(_ControllerUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The access points of the configuration
 */
class Configuration {
  /**
   * Get the main configuration file
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getConfiguration(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");

    let iniFile = new _IniFile2.default(_config2.default.api.mainConfigurationFilePath);
    iniFile.setDefaultValues(_recalboxDefaultValues2.default);

    let content = yield iniFile.getContent();
    let parameters = yield iniFile.getParameters();

    response.statusCode = 200;
    response.body = content;
    response.parameters = parameters;
  }

  /**
   * Set the main configuration file
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setConfiguration(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");

    // Get the raw body from the request
    let iniFile = new _IniFile2.default(_config2.default.api.mainConfigurationFilePath);
    let body = yield request.getRawBody();

    // Update the file
    let newContent = body.toString();
    yield iniFile.setContent(newContent);

    // Display the new content
    yield this.getConfiguration(request, response);
  }

  /**
   * Get the hostname
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getHostname(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.getMainConfigurationParameterValue("system.hostname", request, response);
  }

  /**
   * Set the hostname
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setHostname(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.setMainConfigurationParameterValue("system.hostname", request, response);

    // Display the new value
    yield this.getHostname(request, response);
  }

  /**
   * Get the locale
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getLocale(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.getMainConfigurationParameterValue("system.language", request, response);

    // Rename the parameter
    response.parameters = { "locale": response.parameters.language };
  }

  /**
   * Set the locale
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setLocale(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.setMainConfigurationParameterValue("system.language", request, response);

    // Display the new value
    yield this.getLocale(request, response);
  }

  /**
   * Get the keyboard layout
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getKeyboardLayout(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.getMainConfigurationParameterValue("system.kblayout", request, response);

    // Rename the parameter
    response.parameters = { "keyboardlayout": response.parameters.kblayout };
  }

  /**
   * Set the keyboard layout
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setKeyboardLayout(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.setMainConfigurationParameterValue("system.kblayout", request, response);

    // Display the new value
    yield this.getKeyboardLayout(request, response);
  }

  /**
   * Get the timezone
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getTimezone(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.getMainConfigurationParameterValue("system.timezone", request, response);
  }

  /**
   * Set the timezone
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setTimezone(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.setMainConfigurationParameterValue("system.timezone", request, response);

    // Display the new value
    yield this.getTimezone(request, response);
  }

  /**
   * Indicates if the updates are enabled
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getUpdatesEnabled(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.getMainConfigurationParameterValue("updates.enabled", request, response);
  }

  /**
   * Enable/disable the updates
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setUpdatesEnabled(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.setMainConfigurationParameterValue("updates.enabled", request, response);

    // Display the new value
    yield this.getUpdatesEnabled(request, response);
  }

}
exports.default = Configuration;
module.exports = exports['default'];