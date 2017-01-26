"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _child_process = require("child_process");

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
 * The access points of the device
 */
class Device {
    /**
     * Reboot the device
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *requestReboot(request, response) {
        response.setHeader("Access-Control-Allow-Methods", "POST, HEAD, OPTIONS");

        let command = (0, _child_process.spawn)("reboot");

        response.statusCode = 200;
        response.parameters = {
            success: true
        };
    }

    /**
     * Shutdown the device
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *requestShutdown(request, response) {
        response.setHeader("Access-Control-Allow-Methods", "POST, HEAD, OPTIONS");

        let command = (0, _child_process.spawn)("shutdown");

        response.statusCode = 200;
        response.parameters = {
            success: true
        };
    }
}
exports.default = Device;
module.exports = exports['default'];