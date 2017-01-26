"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _solfegejs = require("solfegejs");

var _solfegejs2 = _interopRequireDefault(_solfegejs);

var _ini = require("ini");

var _ini2 = _interopRequireDefault(_ini);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An util class to manipulate INI file
 */
class IniFile {
    /**
     * Constructor
     *
     * @param   {string}    filePath    The INI file path
     */
    constructor(filePath) {
        if (!(typeof filePath === 'string')) {
            throw new TypeError("Value of argument \"filePath\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(filePath));
        }

        // Save the file path
        this.filePath = filePath;

        // The default values
        this.defaultValues = {};
    }

    /**
     * Set the optional default values
     *
     * @param   {object}    values  the default values
     */
    setDefaultValues(values) {
        this.defaultValues = values;
    }

    /**
     * Get the file content
     *
     * @public
     * @return  {string}    The content
     */
    *getContent() {
        let content = yield _solfegejs2.default.util.Node.fs.readFile(this.filePath);
        content = content.toString("utf8");

        return content;
    }

    /**
     * Set the new file content
     *
     * @public
     * @param   {string}    content     The new content
     */
    *setContent(content) {
        yield _solfegejs2.default.util.Node.fs.writeFile(this.filePath, content);
    }

    /**
     * Extract parameters from the file
     *
     * @public
     * @param   {RegExp}    regexp  The pattern of the parameter name
     * @return  {object}            The parameters
     */
    *getParameters(regexp) {
        // Build the parameters based on the default values and the values from the INI file
        let content = yield this.getContent();
        let iniParameters = _ini2.default.parse(content);
        let parameters = Object.assign(this.defaultValues, iniParameters);

        // Filter the parameters if the regexp is provided
        if (regexp instanceof RegExp) {
            let filteredParameters = {};
            for (let key in parameters) {
                if (key.match(regexp)) {
                    filteredParameters[key] = parameters[key];
                }
            }
            return filteredParameters;
        }

        return parameters;
    }

    /**
     * Get a parameter value
     *
     * @param   {string}        name            The parameter name
     * @param   {string|number} defaultValue    The default value
     * @return  {string|number}                 The value
     */
    *getParameterValue(name, defaultValue) {
        if (!(typeof name === 'string')) {
            throw new TypeError("Value of argument \"name\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(name));
        }

        // Extract the value from the main configuration
        let parameters = yield this.getParameters();
        if (parameters.hasOwnProperty(name)) {
            return parameters[name];
        }

        return defaultValue;
    }

    /**
     * Set a parameter value
     *
     * @param   {string}        name    The parameter name
     * @param   {string|number} value   The new value
     */
    *setParameterValue(name, value) {
        if (!(typeof name === 'string')) {
            throw new TypeError("Value of argument \"name\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(name));
        }

        // Get the content
        let content = yield this.getContent();

        // The pattern to find the parameter line
        let regexp = new RegExp(`;?${ name } *=.*`, "im");

        // Create the parameter if it doesn't exist
        if (content.search(regexp) === -1) {
            content += `\n;${ name }=`;
        }

        // If the value is not a number,
        // then wrap the value with double quotes
        if (isNaN(value)) {
            value = _ini2.default.safe(value);
            content = content.replace(regexp, `${ name }="${ value }"`);
        } else {
            content = content.replace(regexp, `${ name }=${ value }`);
        }

        // Update the content
        yield this.setContent(content);
    }
}
exports.default = IniFile;

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

module.exports = exports['default'];