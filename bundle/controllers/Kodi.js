"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _solfegejs = require("solfegejs");

var _solfegejs2 = _interopRequireDefault(_solfegejs);

var _ControllerUtil = require("../utils/ControllerUtil");

var ControllerUtil = _interopRequireWildcard(_ControllerUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The access points of the Kodi configuration
 */
class Kodi {
  /**
   * Get the Kodi settings
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getKodi(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");

    yield ControllerUtil.getMainConfigurationParameters(/^kodi\./, request, response);
  }

  /**
   * Get the Kodi "enabled" setting
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getKodiEnabled(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");

    yield ControllerUtil.getMainConfigurationParameterValue("kodi.enabled", request, response);
  }

  /**
   * Set the Kodi "enabled" setting
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setKodiEnabled(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");

    yield ControllerUtil.setMainConfigurationParameterValue("kodi.enabled", request, response);

    // Display the new value
    yield this.getKodiEnabled(request, response);
  }

  /**
   * Get the Kodi "atstartup" setting
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getKodiAtstartup(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");

    yield ControllerUtil.getMainConfigurationParameterValue("kodi.atstartup", request, response);
  }

  /**
   * Set the Kodi "atstartup" setting
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setKodiAtstartup(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");

    yield ControllerUtil.setMainConfigurationParameterValue("kodi.atstartup", request, response);

    // Display the new value
    yield this.getKodiAtstartup(request, response);
  }

  /**
   * Get the Kodi "xbutton" setting
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getKodiXbutton(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");

    yield ControllerUtil.getMainConfigurationParameterValue("kodi.xbutton", request, response);
  }

  /**
   * Set the Kodi "xbutton" setting
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setKodiXbutton(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");

    yield ControllerUtil.setMainConfigurationParameterValue("kodi.xbutton", request, response);

    // Display the new value
    yield this.getKodiXbutton(request, response);
  }

}
exports.default = Kodi;
module.exports = exports['default'];