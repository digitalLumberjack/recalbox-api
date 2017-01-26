"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _solfegejs = require("solfegejs");

var _solfegejs2 = _interopRequireDefault(_solfegejs);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _config = require("../../config/config");

var _config2 = _interopRequireDefault(_config);

var _ControllerUtil = require("../utils/ControllerUtil");

var ControllerUtil = _interopRequireWildcard(_ControllerUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The access points of the BIOS
 */
class Bios {
    /**
     * List the bios
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *listBios(request, response) {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS");

        yield ControllerUtil.listDirectory(_config2.default.api.biosDirectoryPath, "bios", null, request, response);
    }

    /**
     * Add a bios
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *addBios(request, response) {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS");

        yield ControllerUtil.uploadFile(_config2.default.api.biosDirectoryPath, request, response);
    }

    /**
     * Get a file informations
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getBiosFile(request, response) {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");

        let fileName = request.getParameter("fileName");
        yield ControllerUtil.getFileMetadata(_config2.default.api.biosDirectoryPath + "/" + fileName, request, response);
    }

    /**
     * Download a file
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *downloadBiosFile(request, response) {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, DELETE, OPTIONS");

        let fileName = request.getParameter("fileName");
        let filePath = _config2.default.api.biosDirectoryPath + "/" + fileName;
        let exists = yield _solfegejs2.default.util.Node.fs.exists(filePath);

        if (!exists) {
            response.statusCode = 404;
            return;
        }

        response.statusCode = 200;
        response.setHeader("Content-disposition", `attachment; filename=${ fileName }`);
        let fileStream = _fs2.default.createReadStream(filePath);
        response.body = fileStream;
    }

    /**
     * Delete a file
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *deleteBiosFile(request, response) {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, DELETE, OPTIONS");

        let fileName = request.getParameter("fileName");
        yield ControllerUtil.deleteFile(_config2.default.api.biosDirectoryPath + "/" + fileName, request, response);
    }
}
exports.default = Bios;
module.exports = exports['default'];