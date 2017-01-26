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
 * The access points of the audio configuration
 */
class Audio {
  /**
   * Get the audio settings
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getAudio(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    yield ControllerUtil.getMainConfigurationParameters(/^audio\./, request, response);
  }

  /**
   * Get the audio "device" setting
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getAudioDevice(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.getMainConfigurationParameterValue("audio.device", request, response);
  }

  /**
   * Set the audio "device" setting
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setAudioDevice(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.setMainConfigurationParameterValue("audio.device", request, response);

    // Display the new value
    yield this.getAudioDevice(request, response);
  }

  /**
   * Get the volume
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getAudioVolume(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.getMainConfigurationParameterValue("audio.volume", request, response);
  }

  /**
   * Set the volume
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setAudioVolume(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.setMainConfigurationParameterValue("audio.volume", request, response);

    // Display the new value
    yield this.getAudioVolume(request, response);
  }

  /**
   * Indicates if the background music is enabled
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *getAudioBackgroundMusic(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.getMainConfigurationParameterValue("audio.bgmusic", request, response);
  }

  /**
   * Enable/disable the background music
   *
   * @public
   * @param   {solfege.bundle.server.Request}     request     The request
   * @param   {solfege.bundle.server.Response}    response    The response
   */
  *setAudioBackgroundMusic(request, response) {
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
    yield ControllerUtil.setMainConfigurationParameterValue("audio.bgmusic", request, response);

    // Display the new value
    yield this.getAudioBackgroundMusic(request, response);
  }

}
exports.default = Audio;
module.exports = exports['default'];