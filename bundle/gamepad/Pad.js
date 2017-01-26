"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * An abstract Pad
 */
class Pad {
  /**
   * Constructor
   *
   * @param   {integer}   index   The gamepad index
   */
  constructor(index) {
    if (!(typeof index === 'number' && !isNaN(index) && index >= -128 && index <= 127 && index === Math.floor(index))) {
      throw new TypeError("Value of argument \"index\" violates contract.\n\nExpected:\nint8\n\nGot:\n" + _inspect(index));
    }

    this.padIndex = index;
  }

  /**
   * Constant of the state "pressed"
   */
  static get STATE_PRESSED() {
    return "pressed";
  }

  /**
   * Constant of the state "released"
   */
  static get STATE_RELEASED() {
    return "released";
  }

  /**
   * Constant of the state "pressedAndReleased"
   */
  static get STATE_PRESSED_AND_RELEASED() {
    return "pressedAndReleased";
  }

  /**
   * Connect the gamepad
   */
  *connect() {}

  /**
   * Disconnect the gamepad
   */
  *disconnect() {}

  /**
   * Execute an action on the direction
   *
   * @param   {string}    id      The identifier of the direction
   * @param   {string}    state   The state
   */
  *executeDirection(id, state) {
    if (!(typeof id === 'string')) {
      throw new TypeError("Value of argument \"id\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(id));
    }

    if (!(state === undefined || typeof state === 'string')) {
      throw new TypeError("Value of optional argument \"state\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(state));
    }
  }

  /**
   * Execute an action on a button
   *
   * @param   {string}    id      The identifier of the button
   * @param   {string}    state   The state
   */
  *executeButton(id, state) {
    if (!(typeof id === 'string')) {
      throw new TypeError("Value of argument \"id\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(id));
    }

    if (!(state === undefined || typeof state === 'string')) {
      throw new TypeError("Value of optional argument \"state\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(state));
    }
  }
}
exports.default = Pad;

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