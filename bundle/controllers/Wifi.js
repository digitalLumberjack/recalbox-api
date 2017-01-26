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
 * The access points of the Wifi configuration
 */
class Wifi {
  /**
   * Get the Wifi settings
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getWifi(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    yield ControllerUtil.getMainConfigurationParameters(/^wifi\./, request, response);
  }

  /**
   * Get the Wifi "enabled" setting
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getWifiEnabled(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.getMainConfigurationParameterValue("wifi.enabled", request, response);
  }

  /**
   * Set the Wifi "enabled" setting
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setWifiEnabled(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.setMainConfigurationParameterValue("wifi.enabled", request, response);

    // Display the new value
    yield this.getWifiEnabled(request, response);
  }

  /**
   * Get the Wifi "ssid" setting
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getWifiSsid(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.getMainConfigurationParameterValue("wifi.ssid", request, response);
  }

  /**
   * Set the Wifi "ssid" setting
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setWifiSsid(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.setMainConfigurationParameterValue("wifi.ssid", request, response);

    // Display the new value
    yield this.getWifiSsid(request, response);
  }

  /**
   * Get the Wifi "key" setting
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getWifiKey(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.getMainConfigurationParameterValue("wifi.key", request, response);
  }

  /**
   * Set the Wifi "key" setting
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setWifiKey(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.setMainConfigurationParameterValue("wifi.key", request, response);

    // Display the new value
    yield this.getWifiKey(request, response);
  }

}
exports.default = Wifi;
module.exports = exports['default'];