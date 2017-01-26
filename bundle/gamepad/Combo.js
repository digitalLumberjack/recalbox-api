"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Pad = require("./Pad");

var _Pad2 = _interopRequireDefault(_Pad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A chain of actions for a gamepad
 */
class Combo {
    /**
     * Constructor
     *
     * @param   {Pad}   pad     A gamepad
     */
    constructor(pad) {
        if (!(pad instanceof _Pad2.default)) {
            throw new TypeError("Value of argument \"pad\" violates contract.\n\nExpected:\nPad\n\nGot:\n" + _inspect(pad));
        }

        this.pad = pad;
        this.actions = [];
    }

    /**
     * Parse a combo content in JSON
     *
     * @param   {string}    json    Combo content
     */
    *parseJson(json) {
        if (!(typeof json === 'string')) {
            throw new TypeError("Value of argument \"json\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(json));
        }

        // Convert JSON to object
        let actions = JSON.parse(json);
        if (!Array.isArray(actions)) {
            throw new Error("The content is not an array");
        }

        this.actions = actions;
    }

    /**
     * Execute actions
     */
    *execute() {
        _actions = this.actions;

        if (!(_actions && (typeof _actions[Symbol.iterator] === 'function' || Array.isArray(_actions)))) {
            throw new TypeError("Expected _actions to be iterable, got " + _inspect(_actions));
        }

        for (let action of _actions) {
            var _actions;

            if (typeof action !== "object") {
                continue;
            }
            if (!action.hasOwnProperty("type")) {
                continue;
            }

            switch (action.type) {
                case "direction":
                    yield this.executeDirection(action);
                    break;
                case "button":
                    yield this.executeButton(action);
                    break;
                case "wait":
                    yield this.executeWait(action);
                    break;
            }
        }
    }

    /**
     * Execute a direction
     *
     * @param   {Object}    action  The parameters
     */
    *executeDirection(action) {
        if (!(action instanceof Object)) {
            throw new TypeError("Value of argument \"action\" violates contract.\n\nExpected:\nObject\n\nGot:\n" + _inspect(action));
        }

        if (!action.hasOwnProperty("id")) {
            return;
        }
        if (!action.hasOwnProperty("state")) {
            return;
        }

        let id = action.id;
        let state = action.state;

        yield this.pad.executeDirection(id, state);
    }

    /**
     * Execute a button
     *
     * @param   {Object}    action  The parameters
     */
    *executeButton(action) {
        if (!(action instanceof Object)) {
            throw new TypeError("Value of argument \"action\" violates contract.\n\nExpected:\nObject\n\nGot:\n" + _inspect(action));
        }

        if (!action.hasOwnProperty("id")) {
            return;
        }
        if (!action.hasOwnProperty("state")) {
            return;
        }

        let id = action.id;
        let state = action.state;

        yield this.pad.executeButton(id, state);
    }

    /**
     * Execute a wait
     *
     * @param   {Object}    action  The parameters
     */
    *executeWait(action) {
        if (!(action instanceof Object)) {
            throw new TypeError("Value of argument \"action\" violates contract.\n\nExpected:\nObject\n\nGot:\n" + _inspect(action));
        }

        if (!action.hasOwnProperty("value")) {
            return;
        }

        let value = parseInt(action.value);

        yield this.wait(value);
    }

    /**
     * The generator version of setTimeout
     *
     * @param   {integer}   milliseconds    The milliseconds to wait
     */
    wait(milliseconds) {
        if (!(typeof milliseconds === 'number' && !isNaN(milliseconds) && milliseconds >= 0 && milliseconds <= 4294967295 && milliseconds === Math.floor(milliseconds))) {
            throw new TypeError("Value of argument \"milliseconds\" violates contract.\n\nExpected:\nuint32\n\nGot:\n" + _inspect(milliseconds));
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    }

}
exports.default = Combo;

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