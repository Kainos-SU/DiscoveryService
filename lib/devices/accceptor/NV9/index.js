"use strict";

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.regexp.exec.js");

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _sliceInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/slice");

var _Array$from = require("@babel/runtime-corejs3/core-js-stable/array/from");

var _Symbol = require("@babel/runtime-corejs3/core-js-stable/symbol");

var _getIteratorMethod = require("@babel/runtime-corejs3/core-js/get-iterator-method");

var _Array$isArray = require("@babel/runtime-corejs3/core-js-stable/array/is-array");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/reduce"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _get2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _IAcceptor = require("../../model/IAcceptor");

var _logger = require("../../../helpers/logger");

var _typed_constants = require("./typed_constants");

var _formatMessage = require("./formatMessage");

var _parseCurrencyTable = _interopRequireDefault(require("./parseCurrencyTable"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context13; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty2(_context13 = Object.prototype.toString.call(o)).call(_context13, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var log = new _logger.Logger("[NV9]");
var portParams = {
  baudRate: 9600,
  dataBit: 8,
  stopBits: 2
};

var NV9 = /*#__PURE__*/function (_BaseAcceptor) {
  (0, _inherits2.default)(NV9, _BaseAcceptor);

  var _super = _createSuper(NV9);

  function NV9(port) {
    var _this;

    (0, _classCallCheck2.default)(this, NV9);
    _this = _super.call(this, port);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "holding", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "command", _typed_constants.HOST_COMMANDS.NO_COMMAND);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "countryCode", "");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "rejecting", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "ok", true);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "lastRawResponse", []);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "currencyTable", []);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "channel", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "escrow", false);
    _this.deviceType = "NV9";
    return _this;
  }

  (0, _createClass2.default)(NV9, [{
    key: "checkStatus",
    value: function checkStatus() {
      return _promise.default.resolve({
        ok: this.ok,
        connected: this.connected,
        status: this.lastStatus,
        enabled: this.enable,
        rawResponse: this.lastRawResponse
      });
    }
  }, {
    key: "getAcceptorStatus",
    value: function getAcceptorStatus() {
      return {
        ok: this.ok,
        status: this.lastStatus,
        isFull: this.isFull,
        type: this.deviceType
      };
    }
  }, {
    key: "enabled",
    value: function enabled(_enabled) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(NV9.prototype), "enabled", this).call(this, _enabled);

      if (this.enable) {
        this.command = _typed_constants.HOST_COMMANDS.ENABLE;
      } else {
        this.command = _typed_constants.HOST_COMMANDS.DISABLE;
      }
    }
  }, {
    key: "sync",
    value: function () {
      var _sync = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var answer;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                log.debug("Try to sync acceptor:");
                answer = [];
                _context.prev = 2;
                _context.next = 5;
                return this.send((0, _formatMessage.formatMessage)(_typed_constants.HOST_COMMANDS.SYNC, [], true));

              case 5:
                answer = _context.sent;
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](2);
                throw new Error("Error while SYNC acceptor!\n  ".concat(_context.t0.message));

              case 11:
                log.debug("SYNC answer: ", answer, "\Device is ok: ", answer[3] === 0xF0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 8]]);
      }));

      function sync() {
        return _sync.apply(this, arguments);
      }

      return sync;
    }()
  }, {
    key: "reset",
    value: function reset() {
      this.command = _typed_constants.HOST_COMMANDS.RESET;
    }
  }, {
    key: "resetDevice",
    value: function () {
      var _resetDevice = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var answer;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                log.debug("Try to reset device");
                answer = [];
                _context2.prev = 2;
                _context2.next = 5;
                return this.send((0, _formatMessage.formatMessage)(_typed_constants.HOST_COMMANDS.RESET), 6000);

              case 5:
                answer = _context2.sent;
                log.debug("RESET answer: ", answer);
                _context2.next = 9;
                return new _promise.default(function (resolve) {
                  return (0, _setTimeout2.default)(resolve, 7500);
                });

              case 9:
                _context2.next = 11;
                return this.sync();

              case 11:
                _context2.next = 16;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](2);
                throw new Error("Error while resetting acceptor:\n ".concat(_context2.t0.message));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 13]]);
      }));

      function resetDevice() {
        return _resetDevice.apply(this, arguments);
      }

      return resetDevice;
    }()
  }, {
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var answer, _context3, parsedSetup;

        return _regenerator.default.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this.port) {
                  _context4.next = 3;
                  break;
                }

                log.debug("Port Not Found");
                return _context4.abrupt("return", false);

              case 3:
                log.info("Searching NV9 acceptor on: ", this.port.port);
                log.info("Send cash acceptor init command!");
                _context4.prev = 5;
                _context4.next = 8;
                return this.port.open(portParams);

              case 8:
                _context4.next = 10;
                return this.sync();

              case 10:
                _context4.next = 12;
                return this.send((0, _formatMessage.formatMessage)(_typed_constants.HOST_COMMANDS.POLL));

              case 12:
                answer = _context4.sent;
                log.debug("POLL response: ", answer, "\nIs correct CRC: ", (0, _formatMessage.checkCrc)(answer));
                _context4.next = 16;
                return this.send((0, _formatMessage.formatMessage)(_typed_constants.HOST_COMMANDS.SETUP_REQUEST));

              case 16:
                answer = _context4.sent;
                log.debug("SETUP_REQUEST response: ", answer, "\nIs correct CRC: ", (0, _formatMessage.checkCrc)(answer));
                parsedSetup = (0, _parseCurrencyTable.default)(answer);
                log.debug("Parsed setup: ", parsedSetup);

                if (parsedSetup.currencyTable && parsedSetup.currencyTable.length) {
                  this.countryCode = parsedSetup.countryCode;
                  this.currencyTable = parsedSetup.currencyTable;
                  log.info("NV9 currency table: ", this.currencyTable);
                }

                _context4.next = 23;
                return this.send((0, _formatMessage.formatMessage)(_typed_constants.HOST_COMMANDS.SET_INHIBITS, [0xFF, 0xFF]));

              case 23:
                answer = _context4.sent;
                log.debug("SET_INHIBIT response: ", answer, "\nIs correct CRC: ", (0, _formatMessage.checkCrc)(answer));
                _context4.next = 27;
                return this.send((0, _formatMessage.formatMessage)(_typed_constants.HOST_COMMANDS.GET_SERIAL_NUMBER));

              case 27:
                answer = _context4.sent;
                log.debug("SERIAL NUMBER of acceptor: ", (0, _map.default)(answer).call(answer, function (number) {
                  return "0x" + number.toString(16);
                }));
                this.deviceType += ". Serial Number: " + (0, _reduce.default)(_context3 = (0, _slice.default)(answer).call(answer, 4, 8)).call(_context3, function (acc, current) {
                  return acc = acc << 8 | current;
                });

                if (answer) {
                  _context4.next = 40;
                  break;
                }

                log.debugError("Error initialize NV9 Acceptor. No response!");
                _context4.prev = 32;
                _context4.next = 35;
                return this.port.close();

              case 35:
                _context4.next = 40;
                break;

              case 37:
                _context4.prev = 37;
                _context4.t0 = _context4["catch"](32);
                return _context4.abrupt("return", false);

              case 40:
                _context4.next = 42;
                return this.pollAcceptor();

              case 42:
                this.initLoop(150);
                log.debug("NV9 device found on port: ", this.port.port);
                return _context4.abrupt("return", true);

              case 47:
                _context4.prev = 47;
                _context4.t1 = _context4["catch"](5);
                log.debugError("Error while try to initialize NV9 acceptor: ", _context4.t1);
                _context4.prev = 50;
                _context4.next = 53;
                return this.port.close();

              case 53:
                _context4.next = 58;
                break;

              case 55:
                _context4.prev = 55;
                _context4.t2 = _context4["catch"](50);
                log.debug("Error while closing port!");

              case 58:
                return _context4.abrupt("return", false);

              case 59:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, this, [[5, 47], [32, 37], [50, 55]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "getLastReject",
    value: function () {
      var _getLastReject = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var response;
        return _regenerator.default.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.send((0, _formatMessage.formatMessage)(_typed_constants.HOST_COMMANDS.LAST_REJECT_CODE));

              case 3:
                response = _context5.sent;
                log.debug("Last reject response: ", response);
                log.info("Bill rejected: ", _typed_constants.REJECT_REASONS.get(response[4]));
                this.fireEvent("returned", response[5]);
                _context5.next = 12;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, this, [[0, 9]]);
      }));

      function getLastReject() {
        return _getLastReject.apply(this, arguments);
      }

      return getLastReject;
    }()
  }, {
    key: "pollAcceptor",
    value: function () {
      var _pollAcceptor = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var _this2 = this,
            _context8;

        var response, _context6, enumEntries, command, pollCommand, genericResponse, slaveResponse, _context7, _response, status;

        return _regenerator.default.wrap(function _callee5$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (this.port) {
                  _context9.next = 2;
                  break;
                }

                return _context9.abrupt("return");

              case 2:
                response = [];
                _context9.prev = 3;

                if (!(this.command !== _typed_constants.HOST_COMMANDS.NO_COMMAND)) {
                  _context9.next = 26;
                  break;
                }

                if (!(this.command === _typed_constants.HOST_COMMANDS.RESET)) {
                  _context9.next = 11;
                  break;
                }

                log.debug("Got RESET command!");
                _context9.next = 9;
                return this.resetDevice();

              case 9:
                _context9.next = 23;
                break;

              case 11:
                if (!(this.command === _typed_constants.HOST_COMMANDS.LAST_REJECT_CODE)) {
                  _context9.next = 16;
                  break;
                }

                _context9.next = 14;
                return this.getLastReject();

              case 14:
                _context9.next = 23;
                break;

              case 16:
                enumEntries = (0, _find.default)(_context6 = (0, _entries.default)(_typed_constants.HOST_COMMANDS)).call(_context6, function (_ref) {
                  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
                      _ = _ref2[0],
                      value = _ref2[1];

                  return value === _this2.command;
                });
                command = enumEntries ? enumEntries[0] : "Unknown";
                log.debug("Got ".concat(command, " command!"));
                _context9.next = 21;
                return this.send((0, _formatMessage.formatMessage)(this.command));

              case 21:
                response = _context9.sent;
                log.debug("Response of ".concat(command, ": "), (0, _map.default)(response).call(response, function (element) {
                  return element.toString(16);
                }));

              case 23:
                this.command = _typed_constants.HOST_COMMANDS.NO_COMMAND;
                _context9.next = 26;
                return new _promise.default(function (resolve) {
                  return (0, _setTimeout2.default)(resolve, 100);
                });

              case 26:
                pollCommand = _typed_constants.HOST_COMMANDS.POLL;

                if (this.holding) {
                  pollCommand = _typed_constants.HOST_COMMANDS.HOLD;
                }

                _context9.next = 30;
                return this.send((0, _formatMessage.formatMessage)(pollCommand));

              case 30:
                response = _context9.sent;
                _context9.next = 42;
                break;

              case 33:
                _context9.prev = 33;
                _context9.t0 = _context9["catch"](3);
                this.command = _typed_constants.HOST_COMMANDS.NO_COMMAND;
                log.error("Error fire error while polling device. Probably disconnected.\n", _context9.t0.message);
                this.lastRawResponse = [];
                this.connected = false;
                this.ok = false;
                this.lastStatus = "Disconnected";
                return _context9.abrupt("return");

              case 42:
                this.connected = true;
                this.lastRawResponse = response;
                this.ok = true;
                this.isFull = false;
                genericResponse = response[3];
                slaveResponse = response.length <= 6 ? [] : (0, _slice.default)(response).call(response, 4, response.length - 2);

                if (!(genericResponse !== _typed_constants.GENERIC_RESPONSES.OK)) {
                  _context9.next = 54;
                  break;
                }

                this.ok = false;
                _response = (0, _find.default)(_context7 = (0, _entries.default)(_typed_constants.GENERIC_RESPONSES)).call(_context7, function (_ref3) {
                  var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
                      _ = _ref4[0],
                      value = _ref4[1];

                  return value === genericResponse;
                });
                this.lastStatus = _response ? _response[0] : "Unknown";
                this.fireEvent("onError");
                return _context9.abrupt("return");

              case 54:
                if (!slaveResponse.length || slaveResponse[0] !== _typed_constants.ACCEPTOR_EVENTS.REJECTING) {
                  if (this.rejecting) {
                    this.command = _typed_constants.HOST_COMMANDS.LAST_REJECT_CODE;
                    this.rejecting = false;
                  }
                }

                if (slaveResponse.length) {
                  _context9.next = 59;
                  break;
                }

                log.debug("OK", (0, _map.default)(response).call(response, function (number) {
                  return number.toString(16);
                }), slaveResponse);
                this.lastStatus = "OK";
                return _context9.abrupt("return");

              case 59:
                _context9.t1 = slaveResponse[0];
                _context9.next = _context9.t1 === _typed_constants.ACCEPTOR_EVENTS.READ ? 62 : _context9.t1 === _typed_constants.ACCEPTOR_EVENTS.STACKING ? 73 : _context9.t1 === _typed_constants.ACCEPTOR_EVENTS.REJECTING ? 78 : _context9.t1 === _typed_constants.ACCEPTOR_EVENTS.STACKER_FULL ? 83 : _context9.t1 === _typed_constants.ACCEPTOR_EVENTS.UNSAFE_JAM ? 89 : _context9.t1 === _typed_constants.ACCEPTOR_EVENTS.FRAUD_ATTEMPTS ? 90 : 93;
                break;

              case 62:
                this.channel = slaveResponse[1];
                this.escrow = true;
                log.debug("Reading note: ", this.channel);
                this.lastStatus = "Reading note";

                if (!(this.channel === 0)) {
                  _context9.next = 68;
                  break;
                }

                return _context9.abrupt("break", 100);

              case 68:
                this.holding = true;
                log.debug("Got bill from channel: ", this.channel);
                this.fireEvent("billIn", this.channel);
                (0, _setTimeout2.default)(function () {
                  if (!_this2.holding) {
                    return;
                  }

                  _this2.escrow = false;
                  _this2.holding = false;

                  if (_this2.command !== _typed_constants.HOST_COMMANDS.POLL && _this2.command !== _typed_constants.HOST_COMMANDS.REJECT) {
                    _this2.command = _typed_constants.HOST_COMMANDS.REJECT;
                  }

                  log.debug("Bill returned because of Timeout!");
                }, 10000);
                return _context9.abrupt("break", 100);

              case 73:
                log.debug("Escrow: ", this.escrow);

                if (this.escrow) {
                  this.escrow = false;
                  this.fireEvent("billStacked");
                }

                this.lastStatus = "STACKING!";
                log.debug("STACKING bill from channel: ", this.channel);
                return _context9.abrupt("break", 100);

              case 78:
                this.escrow = false;
                this.lastStatus = "Rejecting";
                this.rejecting = true;
                log.debug("REJECTING");
                return _context9.abrupt("break", 100);

              case 83:
                this.isFull = true;
                this.ok = false;
                this.lastStatus = "STACKER IS FULL";
                log.debug("Stacker is full!");
                this.fireEvent("onError");
                return _context9.abrupt("break", 100);

              case 89:
                this.lastStatus = "UNSAFE JAM";

              case 90:
                this.lastStatus = "FRAUD ATTEMPTS";
                this.ok = false;
                return _context9.abrupt("break", 100);

              case 93:
                status = (0, _find.default)(_context8 = (0, _entries.default)(_typed_constants.ACCEPTOR_EVENTS)).call(_context8, function (entrie) {
                  return entrie[1] === slaveResponse[0];
                });

                if (status) {
                  _context9.next = 98;
                  break;
                }

                this.lastStatus = "OK";
                log.debug("OK");
                return _context9.abrupt("break", 100);

              case 98:
                this.lastStatus = status[0];
                log.debug(this.lastStatus);

              case 100:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee5, this, [[3, 33]]);
      }));

      function pollAcceptor() {
        return _pollAcceptor.apply(this, arguments);
      }

      return pollAcceptor;
    }()
  }, {
    key: "accept",
    value: function accept() {
      this.rejecting = false;
      this.command = _typed_constants.HOST_COMMANDS.POLL;
      this.holding = false;
    }
  }, {
    key: "reject",
    value: function reject() {
      this.escrow = false;
      this.rejecting = false;
      this.command = _typed_constants.HOST_COMMANDS.REJECT;
      this.holding = false;
    }
  }, {
    key: "fireEvent",
    value: function fireEvent(event, data) {
      var _this3 = this;

      if (!this.events.has(event)) {
        return;
      }

      if (event === "returned") {
        var _this$events$get;

        this.ok = true;
        (_this$events$get = this.events.get("rejected")) === null || _this$events$get === void 0 ? void 0 : (0, _forEach.default)(_this$events$get).call(_this$events$get, function (handler) {
          handler({
            reason: data ? _typed_constants.REJECT_REASONS.get(+data) || "" : "Unknown",
            codeOfReject: data ? +data : NaN
          });
        });
      }

      log.debug("Fired Event: " + event);

      var _iterator = _createForOfIteratorHelper(this.events.get(event) || []),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var handler = _step.value;

          switch (event) {
            case "returned":
              this.ok = true;
              handler({
                reason: data ? _typed_constants.REJECT_REASONS.get(+data) || "" : "Unknown",
                codeOfReject: data ? +data : NaN
              });
              break;

            case "billStacked":
            case "billIn":
              this.ok = true;
              var value = 0;
              var currency = "";

              var reject = function reject() {
                return _this3.reject();
              };

              var accept = function accept() {
                return _this3.accept();
              };

              if (this.currencyTable.length) {
                var _context10;

                var row = (0, _find.default)(_context10 = this.currencyTable).call(_context10, function (_ref5) {
                  var denominator = _ref5.denominator;
                  return _this3.channel === denominator;
                });
                value = (row === null || row === void 0 ? void 0 : row.value) || 0;
                currency = (this === null || this === void 0 ? void 0 : this.countryCode) || "";
              }

              handler({
                denominator: this.channel,
                value: value,
                currency: currency,
                reject: reject,
                accept: accept
              });
              break;

            case "onError":
              this.ok = false;

              var reset = function reset() {
                return _this3.reset();
              };

              handler({
                error: this.lastStatus,
                description: this.lastStatus,
                reset: reset
              });
              break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "loop",
    value: function () {
      var _loop = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.pollAcceptor();

              case 2:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee6, this);
      }));

      function loop() {
        return _loop.apply(this, arguments);
      }

      return loop;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(message) {
        var timeout,
            answer,
            _answer,
            bytes,
            _args7 = arguments;

        return _regenerator.default.wrap(function _callee7$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                timeout = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 200;

                if (this.port) {
                  _context12.next = 3;
                  break;
                }

                throw new Error("[NV9] Port not Defined");

              case 3:
                _context12.prev = 3;
                _context12.next = 6;
                return this.port.writeAndRead(message, timeout);

              case 6:
                answer = _context12.sent;
                _context12.next = 12;
                break;

              case 9:
                _context12.prev = 9;
                _context12.t0 = _context12["catch"](3);
                throw _context12.t0;

              case 12:
                if (!true) {
                  _context12.next = 25;
                  break;
                }

                _context12.prev = 13;
                _context12.next = 16;
                return this.port.redBytes();

              case 16:
                bytes = _context12.sent;

                (_answer = answer).push.apply(_answer, (0, _toConsumableArray2.default)(bytes));

                _context12.next = 23;
                break;

              case 20:
                _context12.prev = 20;
                _context12.t1 = _context12["catch"](13);
                return _context12.abrupt("break", 25);

              case 23:
                _context12.next = 12;
                break;

              case 25:
                return _context12.abrupt("return", answer);

              case 26:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee7, this, [[3, 9], [13, 20]]);
      }));

      function send(_x) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }]);
  return NV9;
}(_IAcceptor.BaseAcceptor);

exports.default = NV9;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZXZpY2VzL2FjY2NlcHRvci9OVjkvaW5kZXgudHMiXSwibmFtZXMiOlsibG9nIiwiTG9nZ2VyIiwicG9ydFBhcmFtcyIsImJhdWRSYXRlIiwiZGF0YUJpdCIsInN0b3BCaXRzIiwiTlY5IiwicG9ydCIsIkhPU1RfQ09NTUFORFMiLCJOT19DT01NQU5EIiwiZGV2aWNlVHlwZSIsInJlc29sdmUiLCJvayIsImNvbm5lY3RlZCIsInN0YXR1cyIsImxhc3RTdGF0dXMiLCJlbmFibGVkIiwiZW5hYmxlIiwicmF3UmVzcG9uc2UiLCJsYXN0UmF3UmVzcG9uc2UiLCJpc0Z1bGwiLCJ0eXBlIiwiY29tbWFuZCIsIkVOQUJMRSIsIkRJU0FCTEUiLCJkZWJ1ZyIsImFuc3dlciIsInNlbmQiLCJTWU5DIiwiRXJyb3IiLCJtZXNzYWdlIiwiUkVTRVQiLCJzeW5jIiwiaW5mbyIsIm9wZW4iLCJQT0xMIiwiU0VUVVBfUkVRVUVTVCIsInBhcnNlZFNldHVwIiwiY3VycmVuY3lUYWJsZSIsImxlbmd0aCIsImNvdW50cnlDb2RlIiwiU0VUX0lOSElCSVRTIiwiR0VUX1NFUklBTF9OVU1CRVIiLCJudW1iZXIiLCJ0b1N0cmluZyIsImFjYyIsImN1cnJlbnQiLCJkZWJ1Z0Vycm9yIiwiY2xvc2UiLCJwb2xsQWNjZXB0b3IiLCJpbml0TG9vcCIsIkxBU1RfUkVKRUNUX0NPREUiLCJyZXNwb25zZSIsIlJFSkVDVF9SRUFTT05TIiwiZ2V0IiwiZmlyZUV2ZW50IiwicmVzZXREZXZpY2UiLCJnZXRMYXN0UmVqZWN0IiwiZW51bUVudHJpZXMiLCJfIiwidmFsdWUiLCJlbGVtZW50IiwicG9sbENvbW1hbmQiLCJob2xkaW5nIiwiSE9MRCIsImVycm9yIiwiZ2VuZXJpY1Jlc3BvbnNlIiwic2xhdmVSZXNwb25zZSIsIkdFTkVSSUNfUkVTUE9OU0VTIiwiT0siLCJBQ0NFUFRPUl9FVkVOVFMiLCJSRUpFQ1RJTkciLCJyZWplY3RpbmciLCJSRUFEIiwiU1RBQ0tJTkciLCJTVEFDS0VSX0ZVTEwiLCJVTlNBRkVfSkFNIiwiRlJBVURfQVRURU1QVFMiLCJjaGFubmVsIiwiZXNjcm93IiwiUkVKRUNUIiwiZW50cmllIiwiZXZlbnQiLCJkYXRhIiwiZXZlbnRzIiwiaGFzIiwiaGFuZGxlciIsInJlYXNvbiIsImNvZGVPZlJlamVjdCIsIk5hTiIsImN1cnJlbmN5IiwicmVqZWN0IiwiYWNjZXB0Iiwicm93IiwiZGVub21pbmF0b3IiLCJyZXNldCIsImRlc2NyaXB0aW9uIiwidGltZW91dCIsIndyaXRlQW5kUmVhZCIsInJlZEJ5dGVzIiwiYnl0ZXMiLCJwdXNoIiwiQmFzZUFjY2VwdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsR0FBRyxHQUFHLElBQUlDLGNBQUosQ0FBVyxPQUFYLENBQVo7QUFFQSxJQUFNQyxVQUFVLEdBQUc7QUFDakJDLEVBQUFBLFFBQVEsRUFBRSxJQURPO0FBRWpCQyxFQUFBQSxPQUFPLEVBQUUsQ0FGUTtBQUdqQkMsRUFBQUEsUUFBUSxFQUFFO0FBSE8sQ0FBbkI7O0lBTXFCQyxHOzs7OztBQU9uQixlQUFtQkMsSUFBbkIsRUFBc0M7QUFBQTs7QUFBQTtBQUNwQyw4QkFBTUEsSUFBTjtBQURvQywwRkFMWCxLQUtXO0FBQUEsMEZBSkxDLCtCQUFjQyxVQUlUO0FBQUEsOEZBSFIsRUFHUTtBQUFBLDRGQUZsQixLQUVrQjtBQUFBLHFGQUtoQixJQUxnQjtBQUFBLGtHQU1HLEVBTkg7QUFBQSxnR0FPSSxFQVBKO0FBQUEsMEZBUVosQ0FSWTtBQUFBLHlGQVNaLEtBVFk7QUFFcEMsVUFBS0MsVUFBTCxHQUFrQixLQUFsQjtBQUZvQztBQUdyQzs7OztXQVNELHVCQUF1QztBQUNyQyxhQUFPLGlCQUFRQyxPQUFSLENBQTBCO0FBQy9CQyxRQUFBQSxFQUFFLEVBQUUsS0FBS0EsRUFEc0I7QUFFL0JDLFFBQUFBLFNBQVMsRUFBRSxLQUFLQSxTQUZlO0FBRy9CQyxRQUFBQSxNQUFNLEVBQUUsS0FBS0MsVUFIa0I7QUFJL0JDLFFBQUFBLE9BQU8sRUFBRSxLQUFLQyxNQUppQjtBQUsvQkMsUUFBQUEsV0FBVyxFQUFFLEtBQUtDO0FBTGEsT0FBMUIsQ0FBUDtBQU9EOzs7V0FFRCw2QkFBNEM7QUFDMUMsYUFBTztBQUNMUCxRQUFBQSxFQUFFLEVBQUUsS0FBS0EsRUFESjtBQUVMRSxRQUFBQSxNQUFNLEVBQUUsS0FBS0MsVUFGUjtBQUdMSyxRQUFBQSxNQUFNLEVBQUUsS0FBS0EsTUFIUjtBQUlMQyxRQUFBQSxJQUFJLEVBQUUsS0FBS1g7QUFKTixPQUFQO0FBTUQ7OztXQUVELGlCQUFlTSxRQUFmLEVBQWlDO0FBQy9CLG1HQUFjQSxRQUFkOztBQUVBLFVBQUksS0FBS0MsTUFBVCxFQUFpQjtBQUNmLGFBQUtLLE9BQUwsR0FBZWQsK0JBQWNlLE1BQTdCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBS0QsT0FBTCxHQUFlZCwrQkFBY2dCLE9BQTdCO0FBQ0Q7QUFDRjs7OzswRkFFRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDRXhCLGdCQUFBQSxHQUFHLENBQUN5QixLQUFKLENBQVUsdUJBQVY7QUFDSUMsZ0JBQUFBLE1BRk4sR0FFOEIsRUFGOUI7QUFBQTtBQUFBO0FBQUEsdUJBSW1CLEtBQUtDLElBQUwsQ0FBVSxrQ0FBY25CLCtCQUFjb0IsSUFBNUIsRUFBa0MsRUFBbEMsRUFBc0MsSUFBdEMsQ0FBVixDQUpuQjs7QUFBQTtBQUlJRixnQkFBQUEsTUFKSjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBTVUsSUFBSUcsS0FBSix5Q0FBMkMsWUFBTUMsT0FBakQsRUFOVjs7QUFBQTtBQVFFOUIsZ0JBQUFBLEdBQUcsQ0FBQ3lCLEtBQUosQ0FBVSxlQUFWLEVBQTJCQyxNQUEzQixFQUFtQyxpQkFBbkMsRUFBc0RBLE1BQU0sQ0FBQyxDQUFELENBQU4sS0FBYyxJQUFwRTs7QUFSRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7O1dBV0EsaUJBQXFCO0FBQ25CLFdBQUtKLE9BQUwsR0FBZWQsK0JBQWN1QixLQUE3QjtBQUNEOzs7O2lHQUVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNFL0IsZ0JBQUFBLEdBQUcsQ0FBQ3lCLEtBQUosQ0FBVSxxQkFBVjtBQUNJQyxnQkFBQUEsTUFGTixHQUU4QixFQUY5QjtBQUFBO0FBQUE7QUFBQSx1QkFJbUIsS0FBS0MsSUFBTCxDQUFVLGtDQUFjbkIsK0JBQWN1QixLQUE1QixDQUFWLEVBQThDLElBQTlDLENBSm5COztBQUFBO0FBSUlMLGdCQUFBQSxNQUpKO0FBS0kxQixnQkFBQUEsR0FBRyxDQUFDeUIsS0FBSixDQUFVLGdCQUFWLEVBQTRCQyxNQUE1QjtBQUxKO0FBQUEsdUJBTVUscUJBQVksVUFBQWYsT0FBTztBQUFBLHlCQUFJLDBCQUFXQSxPQUFYLEVBQW9CLElBQXBCLENBQUo7QUFBQSxpQkFBbkIsQ0FOVjs7QUFBQTtBQUFBO0FBQUEsdUJBT1UsS0FBS3FCLElBQUwsRUFQVjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBU1UsSUFBSUgsS0FBSiw2Q0FBK0MsYUFBTUMsT0FBckQsRUFUVjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7OzswRkFhQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBQ08sS0FBS3ZCLElBRFo7QUFBQTtBQUFBO0FBQUE7O0FBRUlQLGdCQUFBQSxHQUFHLENBQUN5QixLQUFKLENBQVUsZ0JBQVY7QUFGSixrREFHVyxLQUhYOztBQUFBO0FBS0V6QixnQkFBQUEsR0FBRyxDQUFDaUMsSUFBSixDQUFTLDZCQUFULEVBQXdDLEtBQUsxQixJQUFMLENBQVVBLElBQWxEO0FBQ0FQLGdCQUFBQSxHQUFHLENBQUNpQyxJQUFKLENBQVMsa0NBQVQ7QUFORjtBQUFBO0FBQUEsdUJBU1UsS0FBSzFCLElBQUwsQ0FBVTJCLElBQVYsQ0FBZWhDLFVBQWYsQ0FUVjs7QUFBQTtBQUFBO0FBQUEsdUJBVVUsS0FBSzhCLElBQUwsRUFWVjs7QUFBQTtBQUFBO0FBQUEsdUJBWW1CLEtBQUtMLElBQUwsQ0FBVSxrQ0FBY25CLCtCQUFjMkIsSUFBNUIsQ0FBVixDQVpuQjs7QUFBQTtBQVlJVCxnQkFBQUEsTUFaSjtBQWFJMUIsZ0JBQUFBLEdBQUcsQ0FBQ3lCLEtBQUosQ0FBVSxpQkFBVixFQUE2QkMsTUFBN0IsRUFBcUMsb0JBQXJDLEVBQTJELDZCQUFTQSxNQUFULENBQTNEO0FBYko7QUFBQSx1QkFjbUIsS0FBS0MsSUFBTCxDQUFVLGtDQUFjbkIsK0JBQWM0QixhQUE1QixDQUFWLENBZG5COztBQUFBO0FBY0lWLGdCQUFBQSxNQWRKO0FBZUkxQixnQkFBQUEsR0FBRyxDQUFDeUIsS0FBSixDQUFVLDBCQUFWLEVBQXNDQyxNQUF0QyxFQUE4QyxvQkFBOUMsRUFBb0UsNkJBQVNBLE1BQVQsQ0FBcEU7QUFDTVcsZ0JBQUFBLFdBaEJWLEdBZ0J3QixpQ0FBV1gsTUFBWCxDQWhCeEI7QUFpQkkxQixnQkFBQUEsR0FBRyxDQUFDeUIsS0FBSixDQUFVLGdCQUFWLEVBQTRCWSxXQUE1Qjs7QUFDQSxvQkFBSUEsV0FBVyxDQUFDQyxhQUFaLElBQTZCRCxXQUFXLENBQUNDLGFBQVosQ0FBMEJDLE1BQTNELEVBQW1FO0FBQ2pFLHVCQUFLQyxXQUFMLEdBQW1CSCxXQUFXLENBQUNHLFdBQS9CO0FBQ0EsdUJBQUtGLGFBQUwsR0FBcUJELFdBQVcsQ0FBQ0MsYUFBakM7QUFDQXRDLGtCQUFBQSxHQUFHLENBQUNpQyxJQUFKLENBQVMsc0JBQVQsRUFBaUMsS0FBS0ssYUFBdEM7QUFDRDs7QUF0Qkw7QUFBQSx1QkF1Qm1CLEtBQUtYLElBQUwsQ0FBVSxrQ0FBY25CLCtCQUFjaUMsWUFBNUIsRUFBMEMsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUExQyxDQUFWLENBdkJuQjs7QUFBQTtBQXVCSWYsZ0JBQUFBLE1BdkJKO0FBd0JJMUIsZ0JBQUFBLEdBQUcsQ0FBQ3lCLEtBQUosQ0FBVSx3QkFBVixFQUFvQ0MsTUFBcEMsRUFBNEMsb0JBQTVDLEVBQWtFLDZCQUFTQSxNQUFULENBQWxFO0FBeEJKO0FBQUEsdUJBeUJtQixLQUFLQyxJQUFMLENBQVUsa0NBQWNuQiwrQkFBY2tDLGlCQUE1QixDQUFWLENBekJuQjs7QUFBQTtBQXlCSWhCLGdCQUFBQSxNQXpCSjtBQTBCSTFCLGdCQUFBQSxHQUFHLENBQUN5QixLQUFKLENBQVUsNkJBQVYsRUFBeUMsa0JBQUFDLE1BQU0sTUFBTixDQUFBQSxNQUFNLEVBQUssVUFBQ2lCLE1BQUQ7QUFBQSx5QkFBWSxPQUFPQSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0IsRUFBaEIsQ0FBbkI7QUFBQSxpQkFBTCxDQUEvQztBQUNBLHFCQUFLbEMsVUFBTCxJQUFtQixzQkFBc0IscURBQUFnQixNQUFNLE1BQU4sQ0FBQUEsTUFBTSxFQUFPLENBQVAsRUFBVSxDQUFWLENBQU4sa0JBQTBCLFVBQUNtQixHQUFELEVBQU1DLE9BQU47QUFBQSx5QkFBa0JELEdBQUcsR0FBSUEsR0FBRyxJQUFJLENBQVIsR0FBYUMsT0FBckM7QUFBQSxpQkFBMUIsQ0FBekM7O0FBM0JKLG9CQTRCU3BCLE1BNUJUO0FBQUE7QUFBQTtBQUFBOztBQTZCTTFCLGdCQUFBQSxHQUFHLENBQUMrQyxVQUFKLENBQWUsNkNBQWY7QUE3Qk47QUFBQTtBQUFBLHVCQStCYyxLQUFLeEMsSUFBTCxDQUFVeUMsS0FBVixFQS9CZDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsa0RBaUNlLEtBakNmOztBQUFBO0FBQUE7QUFBQSx1QkFvQ1UsS0FBS0MsWUFBTCxFQXBDVjs7QUFBQTtBQXFDSSxxQkFBS0MsUUFBTCxDQUFjLEdBQWQ7QUFDQWxELGdCQUFBQSxHQUFHLENBQUN5QixLQUFKLENBQVUsNEJBQVYsRUFBd0MsS0FBS2xCLElBQUwsQ0FBVUEsSUFBbEQ7QUF0Q0osa0RBdUNXLElBdkNYOztBQUFBO0FBQUE7QUFBQTtBQXlDSVAsZ0JBQUFBLEdBQUcsQ0FBQytDLFVBQUosQ0FBZSw4Q0FBZjtBQXpDSjtBQUFBO0FBQUEsdUJBMkNZLEtBQUt4QyxJQUFMLENBQVV5QyxLQUFWLEVBM0NaOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUE2Q01oRCxnQkFBQUEsR0FBRyxDQUFDeUIsS0FBSixDQUFVLDJCQUFWOztBQTdDTjtBQUFBLGtEQStDVyxLQS9DWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7OzttR0FtREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUUwQyxLQUFLRSxJQUFMLENBQVUsa0NBQWNuQiwrQkFBYzJDLGdCQUE1QixDQUFWLENBRjFDOztBQUFBO0FBRVVDLGdCQUFBQSxRQUZWO0FBR0lwRCxnQkFBQUEsR0FBRyxDQUFDeUIsS0FBSixDQUFVLHdCQUFWLEVBQW9DMkIsUUFBcEM7QUFDQXBELGdCQUFBQSxHQUFHLENBQUNpQyxJQUFKLENBQVMsaUJBQVQsRUFBNEJvQixnQ0FBZUMsR0FBZixDQUFtQkYsUUFBUSxDQUFDLENBQUQsQ0FBM0IsQ0FBNUI7QUFDQSxxQkFBS0csU0FBTCxDQUFlLFVBQWYsRUFBMkJILFFBQVEsQ0FBQyxDQUFELENBQW5DO0FBTEo7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7OztrR0FXQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFDTyxLQUFLN0MsSUFEWjtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUlNNkMsZ0JBQUFBLFFBSk4sR0FJZ0MsRUFKaEM7QUFBQTs7QUFBQSxzQkFNUSxLQUFLOUIsT0FBTCxLQUFpQmQsK0JBQWNDLFVBTnZDO0FBQUE7QUFBQTtBQUFBOztBQUFBLHNCQU9VLEtBQUthLE9BQUwsS0FBaUJkLCtCQUFjdUIsS0FQekM7QUFBQTtBQUFBO0FBQUE7O0FBUVEvQixnQkFBQUEsR0FBRyxDQUFDeUIsS0FBSixDQUFVLG9CQUFWO0FBUlI7QUFBQSx1QkFTYyxLQUFLK0IsV0FBTCxFQVRkOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHNCQVVpQixLQUFLbEMsT0FBTCxLQUFpQmQsK0JBQWMyQyxnQkFWaEQ7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSx1QkFXYyxLQUFLTSxhQUFMLEVBWGQ7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBYWNDLGdCQUFBQSxXQWJkLEdBYTRCLHFEQUFlbEQsOEJBQWYsbUJBQW1DO0FBQUE7QUFBQSxzQkFBR21ELENBQUg7QUFBQSxzQkFBTUMsS0FBTjs7QUFBQSx5QkFBa0JBLEtBQUssS0FBSyxNQUFJLENBQUN0QyxPQUFqQztBQUFBLGlCQUFuQyxDQWI1QjtBQWNjQSxnQkFBQUEsT0FkZCxHQWNnQ29DLFdBQVcsR0FBR0EsV0FBVyxDQUFDLENBQUQsQ0FBZCxHQUFvQixTQWQvRDtBQWVRMUQsZ0JBQUFBLEdBQUcsQ0FBQ3lCLEtBQUosZUFBaUJILE9BQWpCO0FBZlI7QUFBQSx1QkFnQnlCLEtBQUtLLElBQUwsQ0FBVSxrQ0FBYyxLQUFLTCxPQUFuQixDQUFWLENBaEJ6Qjs7QUFBQTtBQWdCUThCLGdCQUFBQSxRQWhCUjtBQWlCUXBELGdCQUFBQSxHQUFHLENBQUN5QixLQUFKLHVCQUF5QkgsT0FBekIsU0FBc0Msa0JBQUE4QixRQUFRLE1BQVIsQ0FBQUEsUUFBUSxFQUFLLFVBQUNTLE9BQUQ7QUFBQSx5QkFBYUEsT0FBTyxDQUFDakIsUUFBUixDQUFpQixFQUFqQixDQUFiO0FBQUEsaUJBQUwsQ0FBOUM7O0FBakJSO0FBbUJNLHFCQUFLdEIsT0FBTCxHQUFlZCwrQkFBY0MsVUFBN0I7QUFuQk47QUFBQSx1QkFvQlkscUJBQVksVUFBQUUsT0FBTztBQUFBLHlCQUFJLDBCQUFXQSxPQUFYLEVBQW9CLEdBQXBCLENBQUo7QUFBQSxpQkFBbkIsQ0FwQlo7O0FBQUE7QUFzQlFtRCxnQkFBQUEsV0F0QlIsR0FzQnFDdEQsK0JBQWMyQixJQXRCbkQ7O0FBdUJJLG9CQUFJLEtBQUs0QixPQUFULEVBQWtCO0FBQ2hCRCxrQkFBQUEsV0FBVyxHQUFHdEQsK0JBQWN3RCxJQUE1QjtBQUNEOztBQXpCTDtBQUFBLHVCQTBCcUIsS0FBS3JDLElBQUwsQ0FBVSxrQ0FBY21DLFdBQWQsQ0FBVixDQTFCckI7O0FBQUE7QUEwQklWLGdCQUFBQSxRQTFCSjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBNEJJLHFCQUFLOUIsT0FBTCxHQUFlZCwrQkFBY0MsVUFBN0I7QUFDQVQsZ0JBQUFBLEdBQUcsQ0FBQ2lFLEtBQUosQ0FBVSxpRUFBVixFQUE2RSxhQUFNbkMsT0FBbkY7QUFDQSxxQkFBS1gsZUFBTCxHQUF1QixFQUF2QjtBQUNBLHFCQUFLTixTQUFMLEdBQWlCLEtBQWpCO0FBQ0EscUJBQUtELEVBQUwsR0FBVSxLQUFWO0FBQ0EscUJBQUtHLFVBQUwsR0FBa0IsY0FBbEI7QUFqQ0o7O0FBQUE7QUFvQ0UscUJBQUtGLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxxQkFBS00sZUFBTCxHQUF1QmlDLFFBQXZCO0FBQ0EscUJBQUt4QyxFQUFMLEdBQVUsSUFBVjtBQUNBLHFCQUFLUSxNQUFMLEdBQWMsS0FBZDtBQUNNOEMsZ0JBQUFBLGVBeENSLEdBd0MwQmQsUUFBUSxDQUFDLENBQUQsQ0F4Q2xDO0FBeUNRZSxnQkFBQUEsYUF6Q1IsR0F5Q3VDZixRQUFRLENBQUNiLE1BQVQsSUFBbUIsQ0FBbkIsR0FBdUIsRUFBdkIsR0FBNEIsb0JBQUFhLFFBQVEsTUFBUixDQUFBQSxRQUFRLEVBQU8sQ0FBUCxFQUFVQSxRQUFRLENBQUNiLE1BQVQsR0FBa0IsQ0FBNUIsQ0F6QzNFOztBQUFBLHNCQTBDTTJCLGVBQWUsS0FBS0UsbUNBQWtCQyxFQTFDNUM7QUFBQTtBQUFBO0FBQUE7O0FBMkNJLHFCQUFLekQsRUFBTCxHQUFVLEtBQVY7QUFDTXdDLGdCQUFBQSxTQTVDVixHQTRDbUQscURBQWVnQixrQ0FBZixtQkFBdUM7QUFBQTtBQUFBLHNCQUFFVCxDQUFGO0FBQUEsc0JBQUtDLEtBQUw7O0FBQUEseUJBQWdCQSxLQUFLLEtBQUtNLGVBQTFCO0FBQUEsaUJBQXZDLENBNUNuRDtBQTZDSSxxQkFBS25ELFVBQUwsR0FBa0JxQyxTQUFRLEdBQUdBLFNBQVEsQ0FBQyxDQUFELENBQVgsR0FBaUIsU0FBM0M7QUFDQSxxQkFBS0csU0FBTCxDQUFlLFNBQWY7QUE5Q0o7O0FBQUE7QUFrREUsb0JBQUksQ0FBQ1ksYUFBYSxDQUFDNUIsTUFBZixJQUF5QjRCLGFBQWEsQ0FBQyxDQUFELENBQWIsS0FBcUJHLGlDQUFnQkMsU0FBbEUsRUFBNkU7QUFDM0Usc0JBQUksS0FBS0MsU0FBVCxFQUFvQjtBQUNsQix5QkFBS2xELE9BQUwsR0FBZWQsK0JBQWMyQyxnQkFBN0I7QUFDQSx5QkFBS3FCLFNBQUwsR0FBaUIsS0FBakI7QUFDRDtBQUNGOztBQXZESCxvQkF5RE9MLGFBQWEsQ0FBQzVCLE1BekRyQjtBQUFBO0FBQUE7QUFBQTs7QUEwREl2QyxnQkFBQUEsR0FBRyxDQUFDeUIsS0FBSixDQUFVLElBQVYsRUFBZ0Isa0JBQUEyQixRQUFRLE1BQVIsQ0FBQUEsUUFBUSxFQUFLLFVBQUNULE1BQUQ7QUFBQSx5QkFBWUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCLEVBQWhCLENBQVo7QUFBQSxpQkFBTCxDQUF4QixFQUErRHVCLGFBQS9EO0FBQ0EscUJBQUtwRCxVQUFMLEdBQWtCLElBQWxCO0FBM0RKOztBQUFBO0FBQUEsK0JBK0RVb0QsYUFBYSxDQUFDLENBQUQsQ0EvRHZCO0FBQUEsa0RBZ0VTRyxpQ0FBZ0JHLElBaEV6Qix5QkF1RlNILGlDQUFnQkksUUF2RnpCLHlCQWdHU0osaUNBQWdCQyxTQWhHekIseUJBc0dTRCxpQ0FBZ0JLLFlBdEd6Qix5QkE2R1NMLGlDQUFnQk0sVUE3R3pCLHlCQStHU04saUNBQWdCTyxjQS9HekI7QUFBQTs7QUFBQTtBQWlFTSxxQkFBS0MsT0FBTCxHQUFlWCxhQUFhLENBQUMsQ0FBRCxDQUE1QjtBQUNBLHFCQUFLWSxNQUFMLEdBQWMsSUFBZDtBQUNBL0UsZ0JBQUFBLEdBQUcsQ0FBQ3lCLEtBQUosQ0FBVSxnQkFBVixFQUE0QixLQUFLcUQsT0FBakM7QUFDQSxxQkFBSy9ELFVBQUwsR0FBa0IsY0FBbEI7O0FBcEVOLHNCQXFFVSxLQUFLK0QsT0FBTCxLQUFpQixDQXJFM0I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUF3RU0scUJBQUtmLE9BQUwsR0FBZSxJQUFmO0FBQ0EvRCxnQkFBQUEsR0FBRyxDQUFDeUIsS0FBSixDQUFVLHlCQUFWLEVBQXFDLEtBQUtxRCxPQUExQztBQUNBLHFCQUFLdkIsU0FBTCxDQUFlLFFBQWYsRUFBeUIsS0FBS3VCLE9BQTlCO0FBQ0EsMENBQVcsWUFBTTtBQUNmLHNCQUFJLENBQUMsTUFBSSxDQUFDZixPQUFWLEVBQW1CO0FBQ2pCO0FBQ0Q7O0FBQ0Qsa0JBQUEsTUFBSSxDQUFDZ0IsTUFBTCxHQUFjLEtBQWQ7QUFDQSxrQkFBQSxNQUFJLENBQUNoQixPQUFMLEdBQWUsS0FBZjs7QUFDQSxzQkFBSyxNQUFJLENBQUN6QyxPQUFMLEtBQWlCZCwrQkFBYzJCLElBQWhDLElBQTBDLE1BQUksQ0FBQ2IsT0FBTCxLQUFpQmQsK0JBQWN3RSxNQUE3RSxFQUFzRjtBQUNwRixvQkFBQSxNQUFJLENBQUMxRCxPQUFMLEdBQWVkLCtCQUFjd0UsTUFBN0I7QUFDRDs7QUFDRGhGLGtCQUFBQSxHQUFHLENBQUN5QixLQUFKLENBQVUsbUNBQVY7QUFDRCxpQkFWRCxFQVVHLEtBVkg7QUEzRU47O0FBQUE7QUF3Rk16QixnQkFBQUEsR0FBRyxDQUFDeUIsS0FBSixDQUFVLFVBQVYsRUFBc0IsS0FBS3NELE1BQTNCOztBQUNBLG9CQUFJLEtBQUtBLE1BQVQsRUFBaUI7QUFDZix1QkFBS0EsTUFBTCxHQUFjLEtBQWQ7QUFDQSx1QkFBS3hCLFNBQUwsQ0FBZSxhQUFmO0FBQ0Q7O0FBQ0QscUJBQUt4QyxVQUFMLEdBQWtCLFdBQWxCO0FBQ0FmLGdCQUFBQSxHQUFHLENBQUN5QixLQUFKLENBQVUsOEJBQVYsRUFBMEMsS0FBS3FELE9BQS9DO0FBOUZOOztBQUFBO0FBaUdNLHFCQUFLQyxNQUFMLEdBQWMsS0FBZDtBQUNBLHFCQUFLaEUsVUFBTCxHQUFrQixXQUFsQjtBQUNBLHFCQUFLeUQsU0FBTCxHQUFpQixJQUFqQjtBQUNBeEUsZ0JBQUFBLEdBQUcsQ0FBQ3lCLEtBQUosQ0FBVSxXQUFWO0FBcEdOOztBQUFBO0FBdUdNLHFCQUFLTCxNQUFMLEdBQWMsSUFBZDtBQUNBLHFCQUFLUixFQUFMLEdBQVUsS0FBVjtBQUNBLHFCQUFLRyxVQUFMLEdBQWtCLGlCQUFsQjtBQUNBZixnQkFBQUEsR0FBRyxDQUFDeUIsS0FBSixDQUFVLGtCQUFWO0FBQ0EscUJBQUs4QixTQUFMLENBQWUsU0FBZjtBQTNHTjs7QUFBQTtBQThHTSxxQkFBS3hDLFVBQUwsR0FBa0IsWUFBbEI7O0FBOUdOO0FBZ0hNLHFCQUFLQSxVQUFMLEdBQWtCLGdCQUFsQjtBQUNBLHFCQUFLSCxFQUFMLEdBQVUsS0FBVjtBQWpITjs7QUFBQTtBQW9IWUUsZ0JBQUFBLE1BcEhaLEdBb0htRCxxREFBdUJ3RCxnQ0FBdkIsbUJBQTZDLFVBQUNXLE1BQUQ7QUFBQSx5QkFBOEJBLE1BQU0sQ0FBQyxDQUFELENBQU4sS0FBY2QsYUFBYSxDQUFDLENBQUQsQ0FBekQ7QUFBQSxpQkFBN0MsQ0FwSG5EOztBQUFBLG9CQXFIV3JELE1BckhYO0FBQUE7QUFBQTtBQUFBOztBQXNIUSxxQkFBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBZixnQkFBQUEsR0FBRyxDQUFDeUIsS0FBSixDQUFVLElBQVY7QUF2SFI7O0FBQUE7QUEwSE0scUJBQUtWLFVBQUwsR0FBa0JELE1BQU0sQ0FBQyxDQUFELENBQXhCO0FBQ0FkLGdCQUFBQSxHQUFHLENBQUN5QixLQUFKLENBQVUsS0FBS1YsVUFBZjs7QUEzSE47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7OztXQStIQSxrQkFBaUI7QUFDZixXQUFLeUQsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFdBQUtsRCxPQUFMLEdBQWVkLCtCQUFjMkIsSUFBN0I7QUFDQSxXQUFLNEIsT0FBTCxHQUFlLEtBQWY7QUFDRDs7O1dBRUQsa0JBQWlCO0FBQ2YsV0FBS2dCLE1BQUwsR0FBYyxLQUFkO0FBQ0EsV0FBS1AsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFdBQUtsRCxPQUFMLEdBQWVkLCtCQUFjd0UsTUFBN0I7QUFDQSxXQUFLakIsT0FBTCxHQUFlLEtBQWY7QUFDRDs7O1dBRUQsbUJBQW1CbUIsS0FBbkIsRUFBa0NDLElBQWxDLEVBQTBEO0FBQUE7O0FBQ3hELFVBQUksQ0FBQyxLQUFLQyxNQUFMLENBQVlDLEdBQVosQ0FBZ0JILEtBQWhCLENBQUwsRUFBNkI7QUFDM0I7QUFDRDs7QUFDRCxVQUFJQSxLQUFLLEtBQUssVUFBZCxFQUEwQjtBQUFBOztBQUN4QixhQUFLdEUsRUFBTCxHQUFVLElBQVY7QUFDQSxpQ0FBS3dFLE1BQUwsQ0FBWTlCLEdBQVosQ0FBZ0IsVUFBaEIscUhBQXFDLFVBQUNnQyxPQUFELEVBQWE7QUFDaERBLFVBQUFBLE9BQU8sQ0FBQztBQUNOQyxZQUFBQSxNQUFNLEVBQUVKLElBQUksR0FBRzlCLGdDQUFlQyxHQUFmLENBQW1CLENBQUU2QixJQUFyQixLQUE4QixFQUFqQyxHQUFzQyxTQUQ1QztBQUVOSyxZQUFBQSxZQUFZLEVBQUVMLElBQUksR0FBRyxDQUFFQSxJQUFMLEdBQVlNO0FBRnhCLFdBQUQsQ0FBUDtBQUlELFNBTEQ7QUFNRDs7QUFDRHpGLE1BQUFBLEdBQUcsQ0FBQ3lCLEtBQUosQ0FBVSxrQkFBa0J5RCxLQUE1Qjs7QUFid0QsaURBY2xDLEtBQUtFLE1BQUwsQ0FBWTlCLEdBQVosQ0FBZ0I0QixLQUFoQixLQUEwQixFQWRRO0FBQUE7O0FBQUE7QUFjeEQsNERBQW9EO0FBQUEsY0FBekNJLE9BQXlDOztBQUNsRCxrQkFBUUosS0FBUjtBQUNFLGlCQUFLLFVBQUw7QUFDRSxtQkFBS3RFLEVBQUwsR0FBVSxJQUFWO0FBQ0EwRSxjQUFBQSxPQUFPLENBQUM7QUFDTkMsZ0JBQUFBLE1BQU0sRUFBRUosSUFBSSxHQUFHOUIsZ0NBQWVDLEdBQWYsQ0FBbUIsQ0FBRTZCLElBQXJCLEtBQThCLEVBQWpDLEdBQXNDLFNBRDVDO0FBRU5LLGdCQUFBQSxZQUFZLEVBQUVMLElBQUksR0FBRyxDQUFFQSxJQUFMLEdBQVlNO0FBRnhCLGVBQUQsQ0FBUDtBQUlBOztBQUNGLGlCQUFLLGFBQUw7QUFDQSxpQkFBSyxRQUFMO0FBQ0UsbUJBQUs3RSxFQUFMLEdBQVUsSUFBVjtBQUNBLGtCQUFJZ0QsS0FBYSxHQUFHLENBQXBCO0FBQ0Esa0JBQUk4QixRQUFnQixHQUFHLEVBQXZCOztBQUNBLGtCQUFNQyxNQUFNLEdBQUcsU0FBVEEsTUFBUztBQUFBLHVCQUFNLE1BQUksQ0FBQ0EsTUFBTCxFQUFOO0FBQUEsZUFBZjs7QUFDQSxrQkFBTUMsTUFBTSxHQUFHLFNBQVRBLE1BQVM7QUFBQSx1QkFBTSxNQUFJLENBQUNBLE1BQUwsRUFBTjtBQUFBLGVBQWY7O0FBQ0Esa0JBQUksS0FBS3RELGFBQUwsQ0FBbUJDLE1BQXZCLEVBQStCO0FBQUE7O0FBQzdCLG9CQUFNc0QsR0FBRyxHQUFHLHFDQUFLdkQsYUFBTCxtQkFBd0I7QUFBQSxzQkFBR3dELFdBQUgsU0FBR0EsV0FBSDtBQUFBLHlCQUFzQixNQUFJLENBQUNoQixPQUFOLEtBQW1CZ0IsV0FBeEM7QUFBQSxpQkFBeEIsQ0FBWjtBQUNBbEMsZ0JBQUFBLEtBQUssR0FBRyxDQUFBaUMsR0FBRyxTQUFILElBQUFBLEdBQUcsV0FBSCxZQUFBQSxHQUFHLENBQUVqQyxLQUFMLEtBQWMsQ0FBdEI7QUFDQThCLGdCQUFBQSxRQUFRLEdBQUcsa0RBQU1sRCxXQUFOLEtBQXFCLEVBQWhDO0FBQ0Q7O0FBQ0Q4QyxjQUFBQSxPQUFPLENBQUM7QUFDTlEsZ0JBQUFBLFdBQVcsRUFBRSxLQUFLaEIsT0FEWjtBQUVObEIsZ0JBQUFBLEtBQUssRUFBTEEsS0FGTTtBQUdOOEIsZ0JBQUFBLFFBQVEsRUFBUkEsUUFITTtBQUlOQyxnQkFBQUEsTUFBTSxFQUFOQSxNQUpNO0FBS05DLGdCQUFBQSxNQUFNLEVBQU5BO0FBTE0sZUFBRCxDQUFQO0FBT0E7O0FBQ0YsaUJBQUssU0FBTDtBQUNFLG1CQUFLaEYsRUFBTCxHQUFVLEtBQVY7O0FBQ0Esa0JBQU1tRixLQUFLLEdBQUcsU0FBUkEsS0FBUTtBQUFBLHVCQUFNLE1BQUksQ0FBQ0EsS0FBTCxFQUFOO0FBQUEsZUFBZDs7QUFDQVQsY0FBQUEsT0FBTyxDQUFDO0FBQ05yQixnQkFBQUEsS0FBSyxFQUFFLEtBQUtsRCxVQUROO0FBRU5pRixnQkFBQUEsV0FBVyxFQUFFLEtBQUtqRixVQUZaO0FBR05nRixnQkFBQUEsS0FBSyxFQUFMQTtBQUhNLGVBQUQsQ0FBUDtBQUtBO0FBcENKO0FBc0NEO0FBckR1RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBc0R6RDs7OzswRkFFRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDUSxLQUFLOUMsWUFBTCxFQURSOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7OzBGQUlBLGtCQUFtQm5CLE9BQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEyQ21FLGdCQUFBQSxPQUEzQyw4REFBcUQsR0FBckQ7O0FBQUEsb0JBQ08sS0FBSzFGLElBRFo7QUFBQTtBQUFBO0FBQUE7O0FBQUEsc0JBRVUsSUFBSXNCLEtBQUosQ0FBVSx3QkFBVixDQUZWOztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQU9tQixLQUFLdEIsSUFBTCxDQUFVMkYsWUFBVixDQUF1QnBFLE9BQXZCLEVBQWdDbUUsT0FBaEMsQ0FQbkI7O0FBQUE7QUFPSXZFLGdCQUFBQSxNQVBKO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHFCQVdTLElBWFQ7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHVCQWF5QyxLQUFLbkIsSUFBTCxDQUFVNEYsUUFBVixFQWJ6Qzs7QUFBQTtBQWFZQyxnQkFBQUEsS0FiWjs7QUFjTSwyQkFBQTFFLE1BQU0sRUFBQzJFLElBQVAsaURBQWVELEtBQWY7O0FBZE47QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxtREFtQlMxRSxNQW5CVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7O0VBbFYrQjRFLHVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUFjY2VwdG9yLCBJQWNjZXB0b3JTdGF0dXMgfSBmcm9tIFwiLi4vLi4vbW9kZWwvSUFjY2VwdG9yXCI7XG5pbXBvcnQgeyBJU3RhdHVzIH0gZnJvbSBcIi4uLy4uL21vZGVsL0lTdGF0dXNcIjtcbmltcG9ydCB7IElTZXJpYWxQb3J0LCBTZXJpYWxQb3J0T3B0aW9uIH0gZnJvbSBcIi4uLy4uL3NlcmlhbC90eXBlc1wiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL2hlbHBlcnMvbG9nZ2VyXCI7XG5pbXBvcnQgeyBBQ0NFUFRPUl9FVkVOVFMsIEdFTkVSSUNfUkVTUE9OU0VTLCBIT1NUX0NPTU1BTkRTLCBSRUpFQ1RfUkVBU09OUyB9IGZyb20gXCIuL3R5cGVkX2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgY2hlY2tDcmMsIGZvcm1hdE1lc3NhZ2UgfSBmcm9tIFwiLi9mb3JtYXRNZXNzYWdlXCI7XG5pbXBvcnQgcGFyc2VTZXR1cCwgeyBTU1BDdXJyZW5jeVRhYmxlIH0gZnJvbSBcIi4vcGFyc2VDdXJyZW5jeVRhYmxlXCI7XG5cbmNvbnN0IGxvZyA9IG5ldyBMb2dnZXIoXCJbTlY5XVwiKTtcblxuY29uc3QgcG9ydFBhcmFtcyA9IHtcbiAgYmF1ZFJhdGU6IDk2MDAsXG4gIGRhdGFCaXQ6IDgsXG4gIHN0b3BCaXRzOiAyXG59IGFzIFNlcmlhbFBvcnRPcHRpb247XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5WOSBleHRlbmRzIEJhc2VBY2NlcHRvciB7XG5cbiAgcHJpdmF0ZSBob2xkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgY29tbWFuZDogSE9TVF9DT01NQU5EUyA9IEhPU1RfQ09NTUFORFMuTk9fQ09NTUFORDtcbiAgcHJpdmF0ZSBjb3VudHJ5Q29kZTogc3RyaW5nID0gXCJcIjtcbiAgcHJpdmF0ZSByZWplY3RpbmcgPSBmYWxzZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocG9ydDogSVNlcmlhbFBvcnQpIHtcbiAgICBzdXBlcihwb3J0KTtcbiAgICB0aGlzLmRldmljZVR5cGUgPSBcIk5WOVwiO1xuICB9XG5cbiAgcHJpdmF0ZSBvazogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgbGFzdFJhd1Jlc3BvbnNlOiBBcnJheTxudW1iZXI+ID0gW107XG4gIHByaXZhdGUgY3VycmVuY3lUYWJsZTogU1NQQ3VycmVuY3lUYWJsZSA9IFtdO1xuICBwcml2YXRlIGNoYW5uZWw6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgZXNjcm93OiBib29sZWFuID0gZmFsc2U7XG5cblxuICBwdWJsaWMgY2hlY2tTdGF0dXMoKTogUHJvbWlzZTxJU3RhdHVzPiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZTxJU3RhdHVzPigge1xuICAgICAgb2s6IHRoaXMub2ssXG4gICAgICBjb25uZWN0ZWQ6IHRoaXMuY29ubmVjdGVkLFxuICAgICAgc3RhdHVzOiB0aGlzLmxhc3RTdGF0dXMsXG4gICAgICBlbmFibGVkOiB0aGlzLmVuYWJsZSxcbiAgICAgIHJhd1Jlc3BvbnNlOiB0aGlzLmxhc3RSYXdSZXNwb25zZVxuICAgIH0gYXMgSVN0YXR1cylcbiAgfVxuXG4gIHB1YmxpYyBnZXRBY2NlcHRvclN0YXR1cygpOiBJQWNjZXB0b3JTdGF0dXMge1xuICAgIHJldHVybiB7XG4gICAgICBvazogdGhpcy5vayxcbiAgICAgIHN0YXR1czogdGhpcy5sYXN0U3RhdHVzLFxuICAgICAgaXNGdWxsOiB0aGlzLmlzRnVsbCxcbiAgICAgIHR5cGU6IHRoaXMuZGV2aWNlVHlwZVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBlbmFibGVkKGVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICBzdXBlci5lbmFibGVkKGVuYWJsZWQpO1xuXG4gICAgaWYgKHRoaXMuZW5hYmxlKSB7XG4gICAgICB0aGlzLmNvbW1hbmQgPSBIT1NUX0NPTU1BTkRTLkVOQUJMRTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb21tYW5kID0gSE9TVF9DT01NQU5EUy5ESVNBQkxFO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc3luYygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2cuZGVidWcoXCJUcnkgdG8gc3luYyBhY2NlcHRvcjpcIik7XG4gICAgbGV0IGFuc3dlcjogQXJyYXk8bnVtYmVyPiA9IFtdO1xuICAgIHRyeSB7XG4gICAgICBhbnN3ZXIgPSBhd2FpdCB0aGlzLnNlbmQoZm9ybWF0TWVzc2FnZShIT1NUX0NPTU1BTkRTLlNZTkMsIFtdLCB0cnVlKSk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aGlsZSBTWU5DIGFjY2VwdG9yIVxcbiAgJHtlcnJvci5tZXNzYWdlfWApO1xuICAgIH1cbiAgICBsb2cuZGVidWcoXCJTWU5DIGFuc3dlcjogXCIsIGFuc3dlciwgXCJcXERldmljZSBpcyBvazogXCIsIGFuc3dlclszXSA9PT0gMHhGMCk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb21tYW5kID0gSE9TVF9DT01NQU5EUy5SRVNFVDtcbiAgfTtcblxuICBwcml2YXRlIGFzeW5jIHJlc2V0RGV2aWNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5kZWJ1ZyhcIlRyeSB0byByZXNldCBkZXZpY2VcIik7XG4gICAgbGV0IGFuc3dlcjogQXJyYXk8bnVtYmVyPiA9IFtdO1xuICAgIHRyeSB7XG4gICAgICBhbnN3ZXIgPSBhd2FpdCB0aGlzLnNlbmQoZm9ybWF0TWVzc2FnZShIT1NUX0NPTU1BTkRTLlJFU0VUKSwgNjAwMCk7XG4gICAgICBsb2cuZGVidWcoXCJSRVNFVCBhbnN3ZXI6IFwiLCBhbnN3ZXIpO1xuICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDc1MDApKTtcbiAgICAgIGF3YWl0IHRoaXMuc3luYygpO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2hpbGUgcmVzZXR0aW5nIGFjY2VwdG9yOlxcbiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBhc3luYyBpbml0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICghdGhpcy5wb3J0KSB7XG4gICAgICBsb2cuZGVidWcoXCJQb3J0IE5vdCBGb3VuZFwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbG9nLmluZm8oXCJTZWFyY2hpbmcgTlY5IGFjY2VwdG9yIG9uOiBcIiwgdGhpcy5wb3J0LnBvcnQpO1xuICAgIGxvZy5pbmZvKFwiU2VuZCBjYXNoIGFjY2VwdG9yIGluaXQgY29tbWFuZCFcIik7XG4gICAgbGV0IGFuc3dlcjogQXJyYXk8bnVtYmVyPjtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5wb3J0Lm9wZW4ocG9ydFBhcmFtcyk7XG4gICAgICBhd2FpdCB0aGlzLnN5bmMoKTtcbiAgICAgIC8vIGF3YWl0IHRoaXMucmVzZXREZXZpY2UoKTtcbiAgICAgIGFuc3dlciA9IGF3YWl0IHRoaXMuc2VuZChmb3JtYXRNZXNzYWdlKEhPU1RfQ09NTUFORFMuUE9MTCkpO1xuICAgICAgbG9nLmRlYnVnKFwiUE9MTCByZXNwb25zZTogXCIsIGFuc3dlciwgXCJcXG5JcyBjb3JyZWN0IENSQzogXCIsIGNoZWNrQ3JjKGFuc3dlcikpO1xuICAgICAgYW5zd2VyID0gYXdhaXQgdGhpcy5zZW5kKGZvcm1hdE1lc3NhZ2UoSE9TVF9DT01NQU5EUy5TRVRVUF9SRVFVRVNUKSk7XG4gICAgICBsb2cuZGVidWcoXCJTRVRVUF9SRVFVRVNUIHJlc3BvbnNlOiBcIiwgYW5zd2VyLCBcIlxcbklzIGNvcnJlY3QgQ1JDOiBcIiwgY2hlY2tDcmMoYW5zd2VyKSk7XG4gICAgICBjb25zdCBwYXJzZWRTZXR1cCA9IHBhcnNlU2V0dXAoYW5zd2VyKTtcbiAgICAgIGxvZy5kZWJ1ZyhcIlBhcnNlZCBzZXR1cDogXCIsIHBhcnNlZFNldHVwKTtcbiAgICAgIGlmIChwYXJzZWRTZXR1cC5jdXJyZW5jeVRhYmxlICYmIHBhcnNlZFNldHVwLmN1cnJlbmN5VGFibGUubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuY291bnRyeUNvZGUgPSBwYXJzZWRTZXR1cC5jb3VudHJ5Q29kZTtcbiAgICAgICAgdGhpcy5jdXJyZW5jeVRhYmxlID0gcGFyc2VkU2V0dXAuY3VycmVuY3lUYWJsZTtcbiAgICAgICAgbG9nLmluZm8oXCJOVjkgY3VycmVuY3kgdGFibGU6IFwiLCB0aGlzLmN1cnJlbmN5VGFibGUpO1xuICAgICAgfVxuICAgICAgYW5zd2VyID0gYXdhaXQgdGhpcy5zZW5kKGZvcm1hdE1lc3NhZ2UoSE9TVF9DT01NQU5EUy5TRVRfSU5ISUJJVFMsIFsweEZGLCAweEZGXSkpO1xuICAgICAgbG9nLmRlYnVnKFwiU0VUX0lOSElCSVQgcmVzcG9uc2U6IFwiLCBhbnN3ZXIsIFwiXFxuSXMgY29ycmVjdCBDUkM6IFwiLCBjaGVja0NyYyhhbnN3ZXIpKTtcbiAgICAgIGFuc3dlciA9IGF3YWl0IHRoaXMuc2VuZChmb3JtYXRNZXNzYWdlKEhPU1RfQ09NTUFORFMuR0VUX1NFUklBTF9OVU1CRVIpKTtcbiAgICAgIGxvZy5kZWJ1ZyhcIlNFUklBTCBOVU1CRVIgb2YgYWNjZXB0b3I6IFwiLCBhbnN3ZXIubWFwKChudW1iZXIpID0+IFwiMHhcIiArIG51bWJlci50b1N0cmluZygxNikpKTtcbiAgICAgIHRoaXMuZGV2aWNlVHlwZSArPSBcIi4gU2VyaWFsIE51bWJlcjogXCIgKyBhbnN3ZXIuc2xpY2UoNCwgOCkucmVkdWNlKChhY2MsIGN1cnJlbnQpID0+IGFjYyA9IChhY2MgPDwgOCkgfCBjdXJyZW50KTtcbiAgICAgIGlmICghYW5zd2VyKSB7XG4gICAgICAgIGxvZy5kZWJ1Z0Vycm9yKFwiRXJyb3IgaW5pdGlhbGl6ZSBOVjkgQWNjZXB0b3IuIE5vIHJlc3BvbnNlIVwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBvcnQuY2xvc2UoKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhd2FpdCB0aGlzLnBvbGxBY2NlcHRvcigpO1xuICAgICAgdGhpcy5pbml0TG9vcCgxNTApO1xuICAgICAgbG9nLmRlYnVnKFwiTlY5IGRldmljZSBmb3VuZCBvbiBwb3J0OiBcIiwgdGhpcy5wb3J0LnBvcnQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5kZWJ1Z0Vycm9yKFwiRXJyb3Igd2hpbGUgdHJ5IHRvIGluaXRpYWxpemUgTlY5IGFjY2VwdG9yOiBcIiwgZXJyb3IpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5wb3J0LmNsb3NlKCk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgbG9nLmRlYnVnKFwiRXJyb3Igd2hpbGUgY2xvc2luZyBwb3J0IVwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldExhc3RSZWplY3QoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBBcnJheTxudW1iZXI+ID0gYXdhaXQgdGhpcy5zZW5kKGZvcm1hdE1lc3NhZ2UoSE9TVF9DT01NQU5EUy5MQVNUX1JFSkVDVF9DT0RFKSk7XG4gICAgICBsb2cuZGVidWcoXCJMYXN0IHJlamVjdCByZXNwb25zZTogXCIsIHJlc3BvbnNlKTtcbiAgICAgIGxvZy5pbmZvKFwiQmlsbCByZWplY3RlZDogXCIsIFJFSkVDVF9SRUFTT05TLmdldChyZXNwb25zZVs0XSkpO1xuICAgICAgdGhpcy5maXJlRXZlbnQoXCJyZXR1cm5lZFwiLCByZXNwb25zZVs1XSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcG9sbEFjY2VwdG9yKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy5wb3J0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCByZXNwb25zZTogQXJyYXk8bnVtYmVyPiA9IFtdO1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5jb21tYW5kICE9PSBIT1NUX0NPTU1BTkRTLk5PX0NPTU1BTkQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29tbWFuZCA9PT0gSE9TVF9DT01NQU5EUy5SRVNFVCkge1xuICAgICAgICAgIGxvZy5kZWJ1ZyhcIkdvdCBSRVNFVCBjb21tYW5kIVwiKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnJlc2V0RGV2aWNlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb21tYW5kID09PSBIT1NUX0NPTU1BTkRTLkxBU1RfUkVKRUNUX0NPREUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldExhc3RSZWplY3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBlbnVtRW50cmllcyA9IE9iamVjdC5lbnRyaWVzKEhPU1RfQ09NTUFORFMpLmZpbmQoKFsgXywgdmFsdWUgXSkgPT4gdmFsdWUgPT09IHRoaXMuY29tbWFuZCk7XG4gICAgICAgICAgY29uc3QgY29tbWFuZDogc3RyaW5nID0gZW51bUVudHJpZXMgPyBlbnVtRW50cmllc1swXSA6IFwiVW5rbm93blwiO1xuICAgICAgICAgIGxvZy5kZWJ1ZyhgR290ICR7Y29tbWFuZH0gY29tbWFuZCFgKTtcbiAgICAgICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZChmb3JtYXRNZXNzYWdlKHRoaXMuY29tbWFuZCkpO1xuICAgICAgICAgIGxvZy5kZWJ1ZyhgUmVzcG9uc2Ugb2YgJHtjb21tYW5kfTogYCwgcmVzcG9uc2UubWFwKChlbGVtZW50KSA9PiBlbGVtZW50LnRvU3RyaW5nKDE2KSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tbWFuZCA9IEhPU1RfQ09NTUFORFMuTk9fQ09NTUFORDtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMCkpO1xuICAgICAgfVxuICAgICAgbGV0IHBvbGxDb21tYW5kOiBIT1NUX0NPTU1BTkRTID0gSE9TVF9DT01NQU5EUy5QT0xMO1xuICAgICAgaWYgKHRoaXMuaG9sZGluZykge1xuICAgICAgICBwb2xsQ29tbWFuZCA9IEhPU1RfQ09NTUFORFMuSE9MRDtcbiAgICAgIH1cbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZW5kKGZvcm1hdE1lc3NhZ2UocG9sbENvbW1hbmQpKTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICB0aGlzLmNvbW1hbmQgPSBIT1NUX0NPTU1BTkRTLk5PX0NPTU1BTkQ7XG4gICAgICBsb2cuZXJyb3IoXCJFcnJvciBmaXJlIGVycm9yIHdoaWxlIHBvbGxpbmcgZGV2aWNlLiBQcm9iYWJseSBkaXNjb25uZWN0ZWQuXFxuXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgdGhpcy5sYXN0UmF3UmVzcG9uc2UgPSBbXTtcbiAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLm9rID0gZmFsc2U7XG4gICAgICB0aGlzLmxhc3RTdGF0dXMgPSBcIkRpc2Nvbm5lY3RlZFwiO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgdGhpcy5sYXN0UmF3UmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICB0aGlzLm9rID0gdHJ1ZTtcbiAgICB0aGlzLmlzRnVsbCA9IGZhbHNlO1xuICAgIGNvbnN0IGdlbmVyaWNSZXNwb25zZSA9IHJlc3BvbnNlWzNdO1xuICAgIGNvbnN0IHNsYXZlUmVzcG9uc2U6IEFycmF5PG51bWJlcj4gPSByZXNwb25zZS5sZW5ndGggPD0gNiA/IFtdIDogcmVzcG9uc2Uuc2xpY2UoNCwgcmVzcG9uc2UubGVuZ3RoIC0gMik7XG4gICAgaWYgKGdlbmVyaWNSZXNwb25zZSAhPT0gR0VORVJJQ19SRVNQT05TRVMuT0spIHtcbiAgICAgIHRoaXMub2sgPSBmYWxzZTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBbc3RyaW5nLCBudW1iZXJdIHwgdW5kZWZpbmVkID0gT2JqZWN0LmVudHJpZXMoR0VORVJJQ19SRVNQT05TRVMpLmZpbmQoKFtfLCB2YWx1ZV0pID0+IHZhbHVlID09PSBnZW5lcmljUmVzcG9uc2UpO1xuICAgICAgdGhpcy5sYXN0U3RhdHVzID0gcmVzcG9uc2UgPyByZXNwb25zZVswXSA6IFwiVW5rbm93blwiO1xuICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkVycm9yXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghc2xhdmVSZXNwb25zZS5sZW5ndGggfHwgc2xhdmVSZXNwb25zZVswXSAhPT0gQUNDRVBUT1JfRVZFTlRTLlJFSkVDVElORykge1xuICAgICAgaWYgKHRoaXMucmVqZWN0aW5nKSB7XG4gICAgICAgIHRoaXMuY29tbWFuZCA9IEhPU1RfQ09NTUFORFMuTEFTVF9SRUpFQ1RfQ09ERTtcbiAgICAgICAgdGhpcy5yZWplY3RpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXNsYXZlUmVzcG9uc2UubGVuZ3RoKSB7XG4gICAgICBsb2cuZGVidWcoXCJPS1wiLCByZXNwb25zZS5tYXAoKG51bWJlcikgPT4gbnVtYmVyLnRvU3RyaW5nKDE2KSksIHNsYXZlUmVzcG9uc2UpO1xuICAgICAgdGhpcy5sYXN0U3RhdHVzID0gXCJPS1wiO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN3aXRjaCAoc2xhdmVSZXNwb25zZVswXSkge1xuICAgICAgY2FzZSBBQ0NFUFRPUl9FVkVOVFMuUkVBRDpcbiAgICAgICAgdGhpcy5jaGFubmVsID0gc2xhdmVSZXNwb25zZVsxXTtcbiAgICAgICAgdGhpcy5lc2Nyb3cgPSB0cnVlO1xuICAgICAgICBsb2cuZGVidWcoXCJSZWFkaW5nIG5vdGU6IFwiLCB0aGlzLmNoYW5uZWwpO1xuICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSBcIlJlYWRpbmcgbm90ZVwiO1xuICAgICAgICBpZiAodGhpcy5jaGFubmVsID09PSAwKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ob2xkaW5nID0gdHJ1ZTtcbiAgICAgICAgbG9nLmRlYnVnKFwiR290IGJpbGwgZnJvbSBjaGFubmVsOiBcIiwgdGhpcy5jaGFubmVsKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJiaWxsSW5cIiwgdGhpcy5jaGFubmVsKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLmhvbGRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5lc2Nyb3cgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoKHRoaXMuY29tbWFuZCAhPT0gSE9TVF9DT01NQU5EUy5QT0xMKSAmJiAodGhpcy5jb21tYW5kICE9PSBIT1NUX0NPTU1BTkRTLlJFSkVDVCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZCA9IEhPU1RfQ09NTUFORFMuUkVKRUNUO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2cuZGVidWcoXCJCaWxsIHJldHVybmVkIGJlY2F1c2Ugb2YgVGltZW91dCFcIik7XG4gICAgICAgIH0sIDEwMDAwKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQUNDRVBUT1JfRVZFTlRTLlNUQUNLSU5HOlxuICAgICAgICBsb2cuZGVidWcoXCJFc2Nyb3c6IFwiLCB0aGlzLmVzY3Jvdyk7XG4gICAgICAgIGlmICh0aGlzLmVzY3Jvdykge1xuICAgICAgICAgIHRoaXMuZXNjcm93ID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJiaWxsU3RhY2tlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSBcIlNUQUNLSU5HIVwiO1xuICAgICAgICBsb2cuZGVidWcoXCJTVEFDS0lORyBiaWxsIGZyb20gY2hhbm5lbDogXCIsIHRoaXMuY2hhbm5lbCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBQ0NFUFRPUl9FVkVOVFMuUkVKRUNUSU5HOlxuICAgICAgICB0aGlzLmVzY3JvdyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSBcIlJlamVjdGluZ1wiO1xuICAgICAgICB0aGlzLnJlamVjdGluZyA9IHRydWU7XG4gICAgICAgIGxvZy5kZWJ1ZyhcIlJFSkVDVElOR1wiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEFDQ0VQVE9SX0VWRU5UUy5TVEFDS0VSX0ZVTEw6XG4gICAgICAgIHRoaXMuaXNGdWxsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSBcIlNUQUNLRVIgSVMgRlVMTFwiO1xuICAgICAgICBsb2cuZGVidWcoXCJTdGFja2VyIGlzIGZ1bGwhXCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uRXJyb3JcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBQ0NFUFRPUl9FVkVOVFMuVU5TQUZFX0pBTTpcbiAgICAgICAgdGhpcy5sYXN0U3RhdHVzID0gXCJVTlNBRkUgSkFNXCI7XG4gICAgICBjYXNlIEFDQ0VQVE9SX0VWRU5UUy5GUkFVRF9BVFRFTVBUUzpcbiAgICAgICAgdGhpcy5sYXN0U3RhdHVzID0gXCJGUkFVRCBBVFRFTVBUU1wiO1xuICAgICAgICB0aGlzLm9rID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc3Qgc3RhdHVzOiBbc3RyaW5nLCBudW1iZXJdIHwgdW5kZWZpbmVkID0gT2JqZWN0LmVudHJpZXM8bnVtYmVyPihBQ0NFUFRPUl9FVkVOVFMpLmZpbmQoKGVudHJpZTogW3N0cmluZywgbnVtYmVyXSkgPT4gZW50cmllWzFdID09PSBzbGF2ZVJlc3BvbnNlWzBdKTtcbiAgICAgICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSBcIk9LXCI7XG4gICAgICAgICAgbG9nLmRlYnVnKFwiT0tcIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0U3RhdHVzID0gc3RhdHVzWzBdO1xuICAgICAgICBsb2cuZGVidWcodGhpcy5sYXN0U3RhdHVzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFjY2VwdCgpIHtcbiAgICB0aGlzLnJlamVjdGluZyA9IGZhbHNlO1xuICAgIHRoaXMuY29tbWFuZCA9IEhPU1RfQ09NTUFORFMuUE9MTDtcbiAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVqZWN0KCkge1xuICAgIHRoaXMuZXNjcm93ID0gZmFsc2U7XG4gICAgdGhpcy5yZWplY3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNvbW1hbmQgPSBIT1NUX0NPTU1BTkRTLlJFSkVDVDtcbiAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgZmlyZUV2ZW50IChldmVudDogc3RyaW5nLCBkYXRhPzogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldmVudCA9PT0gXCJyZXR1cm5lZFwiKSB7XG4gICAgICB0aGlzLm9rID0gdHJ1ZTtcbiAgICAgIHRoaXMuZXZlbnRzLmdldChcInJlamVjdGVkXCIpPy5mb3JFYWNoKChoYW5kbGVyKSA9PiB7XG4gICAgICAgIGhhbmRsZXIoe1xuICAgICAgICAgIHJlYXNvbjogZGF0YSA/IFJFSkVDVF9SRUFTT05TLmdldCgrIGRhdGEpIHx8IFwiXCIgOiBcIlVua25vd25cIixcbiAgICAgICAgICBjb2RlT2ZSZWplY3Q6IGRhdGEgPyArIGRhdGEgOiBOYU5cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgbG9nLmRlYnVnKFwiRmlyZWQgRXZlbnQ6IFwiICsgZXZlbnQpO1xuICAgIGZvciAoY29uc3QgaGFuZGxlciBvZiB0aGlzLmV2ZW50cy5nZXQoZXZlbnQpIHx8IFtdKSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICAgIGNhc2UgXCJyZXR1cm5lZFwiOlxuICAgICAgICAgIHRoaXMub2sgPSB0cnVlO1xuICAgICAgICAgIGhhbmRsZXIoe1xuICAgICAgICAgICAgcmVhc29uOiBkYXRhID8gUkVKRUNUX1JFQVNPTlMuZ2V0KCsgZGF0YSkgfHwgXCJcIiA6IFwiVW5rbm93blwiLFxuICAgICAgICAgICAgY29kZU9mUmVqZWN0OiBkYXRhID8gKyBkYXRhIDogTmFOXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJiaWxsU3RhY2tlZFwiOlxuICAgICAgICBjYXNlIFwiYmlsbEluXCI6XG4gICAgICAgICAgdGhpcy5vayA9IHRydWU7XG4gICAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSAwO1xuICAgICAgICAgIGxldCBjdXJyZW5jeTogc3RyaW5nID0gXCJcIjtcbiAgICAgICAgICBjb25zdCByZWplY3QgPSAoKSA9PiB0aGlzLnJlamVjdCgpO1xuICAgICAgICAgIGNvbnN0IGFjY2VwdCA9ICgpID0+IHRoaXMuYWNjZXB0KCk7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVuY3lUYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuY3VycmVuY3lUYWJsZS5maW5kKCh7IGRlbm9taW5hdG9yIH0pID0+ICh0aGlzLmNoYW5uZWwpID09PSBkZW5vbWluYXRvcik7XG4gICAgICAgICAgICB2YWx1ZSA9IHJvdz8udmFsdWUgfHwgMDtcbiAgICAgICAgICAgIGN1cnJlbmN5ID0gdGhpcz8uY291bnRyeUNvZGUgfHwgXCJcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaGFuZGxlcih7XG4gICAgICAgICAgICBkZW5vbWluYXRvcjogdGhpcy5jaGFubmVsLFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBjdXJyZW5jeSxcbiAgICAgICAgICAgIHJlamVjdCxcbiAgICAgICAgICAgIGFjY2VwdFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib25FcnJvclwiOlxuICAgICAgICAgIHRoaXMub2sgPSBmYWxzZTtcbiAgICAgICAgICBjb25zdCByZXNldCA9ICgpID0+IHRoaXMucmVzZXQoKTtcbiAgICAgICAgICBoYW5kbGVyKHtcbiAgICAgICAgICAgIGVycm9yOiB0aGlzLmxhc3RTdGF0dXMsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5sYXN0U3RhdHVzLFxuICAgICAgICAgICAgcmVzZXRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgbG9vcCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnBvbGxBY2NlcHRvcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzZW5kKG1lc3NhZ2U6IEFycmF5PG51bWJlcj4sIHRpbWVvdXQgPSAyMDApIHtcbiAgICBpZiAoIXRoaXMucG9ydCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW05WOV0gUG9ydCBub3QgRGVmaW5lZFwiKVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhcIk1lc3NhZ2VcIiwgbWVzc2FnZSwgXCJcXG50aW1lb3V0OiBcIiwgdGltZW91dCk7XG4gICAgbGV0IGFuc3dlcjogQXJyYXk8bnVtYmVyPjtcbiAgICB0cnkge1xuICAgICAgYW5zd2VyID0gYXdhaXQgdGhpcy5wb3J0LndyaXRlQW5kUmVhZChtZXNzYWdlLCB0aW1lb3V0KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBieXRlczogQXJyYXk8bnVtYmVyPiA9IGF3YWl0IHRoaXMucG9ydC5yZWRCeXRlcygpO1xuICAgICAgICBhbnN3ZXIucHVzaCguLi5ieXRlcyk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhbnN3ZXI7XG4gIH1cbn0iXX0=