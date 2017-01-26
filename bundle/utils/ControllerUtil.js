"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMainConfigurationParameterValue = getMainConfigurationParameterValue;
exports.getMainConfigurationParameters = getMainConfigurationParameters;
exports.setMainConfigurationParameterValue = setMainConfigurationParameterValue;
exports.listDirectory = listDirectory;
exports.uploadFile = uploadFile;
exports.getFileMetadata = getFileMetadata;
exports.deleteFile = deleteFile;

var _solfegejs = require("solfegejs");

var _solfegejs2 = _interopRequireDefault(_solfegejs);

var _IniFile = require("./IniFile");

var _IniFile2 = _interopRequireDefault(_IniFile);

var _recalboxDefaultValues = require("../../config/recalboxDefaultValues.json");

var _recalboxDefaultValues2 = _interopRequireDefault(_recalboxDefaultValues);

var _Pagination = require("./Pagination");

var _Pagination2 = _interopRequireDefault(_Pagination);

var _FileInfo = require("./FileInfo");

var _FileInfo2 = _interopRequireDefault(_FileInfo);

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Helpers for the controllers
 */

/**
 * Move a file
 *
 * @param   {string}    source      The source path
 * @param   {string}    destination The destination path
 */
let moveFile = function* (source, destination) {
    if (!(typeof source === 'string')) {
        throw new TypeError("Value of argument \"source\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(source));
    }

    if (!(typeof destination === 'string')) {
        throw new TypeError("Value of argument \"destination\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(destination));
    }

    return new Promise(function (resolve, reject) {
        let command = `mv "${ source }" "${ destination }"`;
        (0, _child_process.exec)(command, function (error) {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
};

/**
 * Get a parameter value from the main configuration
 *
 * @public
 * @param   {string}                            name        The parameter name
 * @param   {solfege.bundle.server.Request}     request     The request
 * @param   {solfege.bundle.server.Response}    response    The response
 * @param   {string}                            fallback    The fallback parameter name
 */
function* getMainConfigurationParameterValue(name, request, response, fallback) {
    if (!(typeof name === 'string')) {
        throw new TypeError("Value of argument \"name\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(name));
    }

    if (!(fallback === undefined || typeof fallback === 'string')) {
        throw new TypeError("Value of optional argument \"fallback\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(fallback));
    }

    // The request is a verification
    if (request.method === "OPTIONS") {
        return;
    }

    // Get the last part of the parameter name
    let nameParts = name.split(".");
    let nameLastPart = nameParts.pop();

    // Get the value
    let iniFile = new _IniFile2.default(request.configuration.mainConfigurationFilePath);
    iniFile.setDefaultValues(_recalboxDefaultValues2.default);
    let value = yield iniFile.getParameterValue(name);

    // Build the response with a fallback
    let settings = {};
    if (fallback) {
        let defaultValue = yield iniFile.getParameterValue(fallback);
        settings[nameLastPart] = defaultValue;
    }
    if (value) {
        settings[nameLastPart] = value;
    }

    // Render
    response.statusCode = 200;
    response.parameters = settings;
    response.body = value;
}

/**
 * Get parameters from the main configuration
 *
 * @public
 * @param   {RegExp}                            pattern     The pattern of the parameter name
 * @param   {solfege.bundle.server.Request}     request     The request
 * @param   {solfege.bundle.server.Response}    response    The response
 */
function* getMainConfigurationParameters(pattern, request, response) {
    if (!(pattern instanceof RegExp)) {
        throw new TypeError("Value of argument \"pattern\" violates contract.\n\nExpected:\nRegExp\n\nGot:\n" + _inspect(pattern));
    }

    // The request is a verification
    if (request.method === "OPTIONS") {
        return;
    }

    // Extract the settings from the main configuration
    let iniFile = new _IniFile2.default(request.configuration.mainConfigurationFilePath);
    iniFile.setDefaultValues(_recalboxDefaultValues2.default);
    let parameters = yield iniFile.getParameters(pattern);

    // Sanitize the parameter names
    let sanitizedParameters = {};
    for (let name in parameters) {
        // Get the last part of the parameter name
        let nameParts = name.split(".");
        let nameLastPart = nameParts.pop();

        sanitizedParameters[nameLastPart] = parameters[name];
    }

    // Render
    response.statusCode = 200;
    response.parameters = sanitizedParameters;
}

/**
 * Set a parameter value of the main configuration
 *
 * @public
 * @param   {string}                            name        The parameter name
 * @param   {solfege.bundle.server.Request}     request     The request
 * @param   {solfege.bundle.server.Response}    response    The response
 */
function* setMainConfigurationParameterValue(name, request, response) {
    if (!(typeof name === 'string')) {
        throw new TypeError("Value of argument \"name\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(name));
    }

    // The request is a verification
    if (request.method === "OPTIONS") {
        return;
    }

    // Get the raw body from the request
    let iniFile = new _IniFile2.default(request.configuration.mainConfigurationFilePath);
    let body = yield request.getRawBody();

    // Normalize the new value
    let newValue = body.toString();
    if (!isNaN(newValue)) {
        body = new Number(body);
    }

    // Update the parameter
    yield iniFile.setParameterValue(name, newValue);
}

/**
 * List files in a directory
 *
 * @public
 * @param   {string}                            path        The directory path
 * @param   {string}                            itemName    The item name found in the directory
 * @param   {object}                            options     The options
 * @param   {solfege.bundle.server.Request}     request     The request
 * @param   {solfege.bundle.server.Response}    response    The response
 */
function* listDirectory(path, itemName, options, request, response) {
    if (!(typeof path === 'string')) {
        throw new TypeError("Value of argument \"path\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(path));
    }

    if (!(typeof itemName === 'string')) {
        throw new TypeError("Value of argument \"itemName\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(itemName));
    }

    if (!(options == null || options instanceof Object)) {
        throw new TypeError("Value of argument \"options\" violates contract.\n\nExpected:\n?Object\n\nGot:\n" + _inspect(options));
    }

    let max = 50;

    // Check if the directory exists
    let exists = yield _solfegejs2.default.util.Node.fs.exists(path);
    if (!exists) {
        response.statusCode = 404;
        response.parameters = {
            error: `Directory not found: ${ path }`
        };
        return;
    }

    // The request is a verification
    if (request.method === "OPTIONS") {
        return;
    }

    // Get the files
    let files = yield _solfegejs2.default.util.Node.fs.readdir(path);
    let total = files.length;

    // Pagination
    let pagination = new _Pagination2.default(files, max, request);
    let list = pagination.getList();
    let offset = pagination.offset;
    let limit = pagination.limit;

    // Get file informations
    let listWithMetadata = [];

    if (!(list && (typeof list[Symbol.iterator] === 'function' || Array.isArray(list)))) {
        throw new TypeError("Expected list to be iterable, got " + _inspect(list));
    }

    for (let fileName of list) {
        let fileInfo = new _FileInfo2.default(`${ path }/${ fileName }`);
        let metadata = yield fileInfo.getMetadata();
        listWithMetadata.push(metadata);
    }

    let statusCode = 200;
    if (listWithMetadata.length < total) {
        // Partial content
        statusCode = 206;
    }
    response.statusCode = statusCode;
    response.setHeader("Content-Range", `${ offset }-${ limit }/${ total }`);
    response.setHeader("Accept-Range", `${ itemName } ${ max }`);
    response.parameters = listWithMetadata;
}

/**
 * Upload a file
 *
 * @public
 * @param   {string}                            directoryPath   The directory path
 * @param   {solfege.bundle.server.Request}     request         The request
 * @param   {solfege.bundle.server.Response}    response        The response
 */
function* uploadFile(directoryPath, request, response) {
    if (!(typeof directoryPath === 'string')) {
        throw new TypeError("Value of argument \"directoryPath\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(directoryPath));
    }

    // Check if the directory exists
    let exists = yield _solfegejs2.default.util.Node.fs.exists(directoryPath);
    if (!exists) {
        response.statusCode = 404;
        response.parameters = {
            error: `Directory not found: ${ directoryPath }`
        };
        return;
    }

    // The request is a verification
    if (request.method === "OPTIONS") {
        return;
    }

    // Get the uploaded file
    let files = yield request.getFiles();
    let createdFiles = [];
    for (let field in files) {
        let file = files[field];
        let size = file.size;
        let name = file.name;
        let path = file.path;

        // Move the file to the directory
        let newPath = directoryPath + "/" + name;
        yield moveFile(path, newPath);
        createdFiles.push(name);
    }

    response.statusCode = 201;
    response.parameters = createdFiles;
}

/**
 * Get file metadata
 *
 * @public
 * @param   {string}                            filePath    The file path
 * @param   {solfege.bundle.server.Request}     request     The request
 * @param   {solfege.bundle.server.Response}    response    The response
 */
function* getFileMetadata(filePath, request, response) {
    if (!(typeof filePath === 'string')) {
        throw new TypeError("Value of argument \"filePath\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(filePath));
    }

    // Normalize file path
    filePath = decodeURIComponent(filePath);

    // Check if the file exists
    let exists = yield _solfegejs2.default.util.Node.fs.exists(filePath);
    if (!exists) {
        response.statusCode = 404;
        response.parameters = {
            error: `File not found: ${ filePath }`
        };
        return;
    }

    // The request is a verification
    if (request.method === "OPTIONS") {
        return;
    }

    // Get file metadata
    try {
        let fileInfo = new _FileInfo2.default(filePath);
        let metadata = yield fileInfo.getMetadata();

        response.statusCode = 200;
        response.parameters = metadata;
    } catch (error) {
        response.statusCode = 500;
        response.parameters = {
            error: error.message
        };
    }
}

/**
 * Delete a file
 *
 * @public
 * @param   {string}                            filePath    The file path
 * @param   {solfege.bundle.server.Request}     request     The request
 * @param   {solfege.bundle.server.Response}    response    The response
 */
function* deleteFile(filePath, request, response) {
    if (!(typeof filePath === 'string')) {
        throw new TypeError("Value of argument \"filePath\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(filePath));
    }

    // Normalize file path
    filePath = decodeURIComponent(filePath);

    // Check if the file exists
    let exists = yield _solfegejs2.default.util.Node.fs.exists(filePath);
    if (!exists) {
        response.statusCode = 404;
        response.parameters = {
            error: `File not found: ${ filePath }`
        };
        return;
    }

    // The request is a verification
    if (request.method === "OPTIONS") {
        return;
    }

    // Delete the file
    try {
        yield _solfegejs2.default.util.Node.fs.unlink(filePath);

        response.statusCode = 204;
        response.parameters = {
            success: true
        };
    } catch (error) {
        response.statusCode = 500;
        response.parameters = {
            error: error.message
        };
    }
}

function _inspect(input) {
    function _ref2(key) {
        return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key]) + ';';
    }

    function _ref(item) {
        return _inspect(item) === first;
    }

    if (input === null) {
        return 'null';
    } else if (input === undefined) {
        return 'void';
    } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
        return typeof input;
    } else if (Array.isArray(input)) {
        if (input.length > 0) {
            var first = _inspect(input[0]);

            if (input.every(_ref)) {
                return first.trim() + '[]';
            } else {
                return '[' + input.map(_inspect).join(', ') + ']';
            }
        } else {
            return 'Array';
        }
    } else {
        var keys = Object.keys(input);

        if (!keys.length) {
            if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
                return input.constructor.name;
            } else {
                return 'Object';
            }
        }

        var entries = keys.map(_ref2).join('\n  ');

        if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
            return input.constructor.name + ' {\n  ' + entries + '\n}';
        } else {
            return '{ ' + entries + '\n}';
        }
    }
}