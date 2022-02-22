"use strict";

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _sliceInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/slice");

var _Array$from = require("@babel/runtime-corejs3/core-js-stable/array/from");

var _Symbol = require("@babel/runtime-corejs3/core-js-stable/symbol");

var _getIteratorMethod = require("@babel/runtime-corejs3/core-js/get-iterator-method");

var _Array$isArray = require("@babel/runtime-corejs3/core-js-stable/array/is-array");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.regexp.exec.js");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _get2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/applyDecoratedDescriptor"));

var _IAcceptor = require("../../model/IAcceptor");

var _d4cQueue = require("d4c-queue");

var _constants = require("./constants");

var _logger = require("../../../helpers/logger");

var _class;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context9; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context9 = Object.prototype.toString.call(o)).call(_context9, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var log = new _logger.Logger("[ID003]");
var portParameters = {
  baudRate: 9600,
  bufferSize: 255,
  dataBit: 8,
  flowControl: "none",
  parity: "even",
  stopBits: 1
};
var ID003 = (_class = /*#__PURE__*/function (_BaseAcceptor) {
  (0, _inherits2.default)(ID003, _BaseAcceptor);

  var _super = _createSuper(ID003);

  function ID003(port) {
    var _this;

    (0, _classCallCheck2.default)(this, ID003);
    _this = _super.call(this, port);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "currencyTable", []);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "currentBill", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "currentDenominator", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "currentCurrency", "MNT");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "previousStatus", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "failureReason", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "lastRawStatus", []);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "ok", false);
    _this.deviceType = "ID003";
    return _this;
  }
  /**
   * Инициализация ацептора
   */


  (0, _createClass2.default)(ID003, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var response, responseIsValid, prevStatus;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.port) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", false);

              case 2:
                _context.prev = 2;
                _context.next = 5;
                return this.port.open(portParameters);

              case 5:
                _context.next = 17;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](2);
                _context.prev = 9;
                _context.next = 12;
                return this.port.close();

              case 12:
                _context.next = 16;
                break;

              case 14:
                _context.prev = 14;
                _context.t1 = _context["catch"](9);

              case 16:
                return _context.abrupt("return", false);

              case 17:
                _context.prev = 17;
                _context.next = 20;
                return this.send(_constants.CODES_OF_TRANSMITTER.STATUS_REQUEST);

              case 20:
                response = _context.sent;
                _context.next = 28;
                break;

              case 23:
                _context.prev = 23;
                _context.t2 = _context["catch"](17);
                _context.next = 27;
                return this.port.close();

              case 27:
                return _context.abrupt("return", false);

              case 28:
                responseIsValid = (0, _constants.isValidResponse)(response);

                if (responseIsValid) {
                  _context.next = 33;
                  break;
                }

                _context.next = 32;
                return this.port.close();

              case 32:
                return _context.abrupt("return", false);

              case 33:
                _context.prev = 33;
                _context.next = 36;
                return this.getCurrencyTable();

              case 36:
                _context.next = 41;
                break;

              case 38:
                _context.prev = 38;
                _context.t3 = _context["catch"](33);
                log.warning("Error getting currency table!");

              case 41:
                if (_constants.CODES_OF_RESSIVER.POWER_UP_STATUS.has(response[2])) {
                  _context.next = 44;
                  break;
                }

                this.initLoop(500);
                return _context.abrupt("return", true);

              case 44:
                if (!_constants.CODES_OF_RESSIVER.ERROR_STATUS.has(response[2])) {
                  _context.next = 49;
                  break;
                }

                log.warning("Acceptor at initialize in error! Try to reset!");
                _context.next = 48;
                return this.reset();

              case 48:
                return _context.abrupt("return", true);

              case 49:
                _context.prev = 49;
                _context.next = 52;
                return this.reset();

              case 52:
                response = _context.sent;
                _context.next = 55;
                return this.setEnable();

              case 55:
                response = _context.sent;
                _context.next = 58;
                return this.setOptionalFunction();

              case 58:
                response = _context.sent;
                _context.next = 61;
                return this.setInhibit();

              case 61:
                response = _context.sent;
                _context.next = 70;
                break;

              case 64:
                _context.prev = 64;
                _context.t4 = _context["catch"](49);
                log.error("Initialization Error! " + _context.t4);
                _context.next = 69;
                return this.port.close();

              case 69:
                return _context.abrupt("return", false);

              case 70:
                prevStatus = response[2];

              case 71:
                if (!true) {
                  _context.next = 80;
                  break;
                }

                _context.next = 74;
                return this.send(_constants.CODES_OF_TRANSMITTER.STATUS_REQUEST);

              case 74:
                response = _context.sent;

                if (!(prevStatus === _constants.RESIVER_RESPONSES.STATUS.INITIALIZE && response[2] !== _constants.RESIVER_RESPONSES.STATUS.INITIALIZE)) {
                  _context.next = 77;
                  break;
                }

                return _context.abrupt("break", 80);

              case 77:
                prevStatus = response[2];
                _context.next = 71;
                break;

              case 80:
                this.connected = true;
                this.initLoop(200);
                return _context.abrupt("return", true);

              case 83:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 7], [9, 14], [17, 23], [33, 38], [49, 64]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "checkStatus",
    value: function checkStatus() {
      return _promise.default.resolve({
        ok: this.ok,
        connected: this.connected,
        status: this.lastStatus,
        enabled: this.enable,
        rawResponse: this.lastRawStatus
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
    key: "isMyPort",
    value: function isMyPort(port) {
      var _this$port;

      return ((_this$port = this.port) === null || _this$port === void 0 ? void 0 : _this$port.port) === port.port;
    }
  }, {
    key: "fireEvent",
    value: function fireEvent(event) {
      var _this2 = this;

      if (!this.events.has(event)) {
        return;
      }

      log.info("Fired Event: " + event);

      var _iterator = _createForOfIteratorHelper(this.events.get(event) || []),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var handler = _step.value;

          switch (event) {
            case "rejected":
              handler({
                reason: arguments.length <= 1 ? undefined : arguments[1],
                codeOfReject: arguments.length <= 2 ? undefined : arguments[2]
              });
              break;

            case "returned":
            case "billStacked":
            case "billIn":
              handler({
                value: this.currentBill,
                denominator: this.currentDenominator,
                currency: this.currentCurrency,
                reject: function () {
                  var _reject = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
                    return _regenerator.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return _this2.reject();

                          case 2:
                            return _context2.abrupt("return", _context2.sent);

                          case 3:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  function reject() {
                    return _reject.apply(this, arguments);
                  }

                  return reject;
                }(),
                accept: function () {
                  var _accept = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
                    return _regenerator.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _this2.accept();

                          case 2:
                            return _context3.abrupt("return", _context3.sent);

                          case 3:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  function accept() {
                    return _accept.apply(this, arguments);
                  }

                  return accept;
                }()
              });
              break;

            case "onError":
              var error = _constants.CODES_OF_RESSIVER.ERROR_STATUS.get(this.previousStatus) || "";
              handler({
                error: error,
                description: this.failureReason || error,
                reset: function reset() {
                  _this2.reset();
                }
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
      var _loop = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var response, _this$port2, value;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.failureReason = undefined;
                _context4.prev = 1;
                _context4.next = 4;
                return this.send(_constants.CODES_OF_TRANSMITTER.STATUS_REQUEST);

              case 4:
                response = _context4.sent;
                _context4.next = 15;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](1);
                this.lastStatus = "Acceptor not available!";
                this.ok = false;
                this.connected = false;
                this.lastRawStatus = [];
                log.error("Error ocupy in loop: ", _context4.t0);
                return _context4.abrupt("return");

              case 15:
                if ((0, _constants.isValidResponse)(response)) {
                  _context4.next = 21;
                  break;
                }

                this.ok = false;
                this.connected = true;
                this.lastStatus = "Invalid Response";
                this.lastRawStatus = response;
                return _context4.abrupt("return");

              case 21:
                this.lastRawStatus = response;
                this.connected = true;

                if (_constants.RESIVER_RESPONSES.ERROR_STATUS.STACKER_FULL === response[2]) {
                  this.isFull = true;
                } else if (_constants.RESIVER_RESPONSES.ERROR_STATUS.STACKER_OPEN === response[2]) {
                  this.isFull = false;
                }

                if (!(!this.enable && _constants.RESIVER_RESPONSES.STATUS.ENABLE_IDLING === response[2])) {
                  _context4.next = 28;
                  break;
                }

                _context4.next = 27;
                return this.setInhibit();

              case 27:
                response = _context4.sent;

              case 28:
                if (!(this.enable && _constants.RESIVER_RESPONSES.STATUS.DISABLED_INHIBIT === response[2])) {
                  _context4.next = 32;
                  break;
                }

                _context4.next = 31;
                return this.setInhibit([0x00]);

              case 31:
                response = _context4.sent;

              case 32:
                if (!(_constants.RESIVER_RESPONSES.STATUS.VEND_VALID === response[2])) {
                  _context4.next = 36;
                  break;
                }

                _context4.next = 35;
                return (_this$port2 = this.port) === null || _this$port2 === void 0 ? void 0 : _this$port2.write((0, _constants.formatMessage)(_constants.CODES_OF_TRANSMITTER.ACK));

              case 35:
                return _context4.abrupt("return");

              case 36:
                if (!(response[2] === this.previousStatus)) {
                  _context4.next = 38;
                  break;
                }

                return _context4.abrupt("return");

              case 38:
                this.setLastStatus(response[2]); // log.debug("Current status: ", this.lastStatus);

                this.previousStatus = response[2];

                if (_constants.CODES_OF_RESSIVER.ERROR_STATUS.has(response[2])) {
                  log.warning("Error status: ", response);

                  if (_constants.RESIVER_RESPONSES.ERROR_STATUS.FAILURE === response[2]) {
                    this.failureReason = _constants.FAILURE_CODES.get(response[3]);
                    this.lastStatus += "\n" + this.failureReason;
                  }

                  this.fireEvent("onError");
                }

                if (_constants.RESIVER_RESPONSES.STATUS.STACKED === response[2]) {
                  this.fireEvent("billStacked");
                }

                if (_constants.RESIVER_RESPONSES.STATUS.REJECTING === response[2]) {
                  log.warning("[ID003] Rejected", _constants.REJECT_REASONS.get(response[3]));
                  this.fireEvent("rejected", "[ID003] Rejected ".concat(_constants.REJECT_REASONS.get(response[3])), response[3]);
                  this.lastStatus += "\n" + _constants.REJECT_REASONS.get(response[3]);
                }

                if (_constants.RESIVER_RESPONSES.STATUS.RETURNING === response[2]) {
                  this.fireEvent("returned");
                }

                if (!(_constants.RESIVER_RESPONSES.STATUS.ESCROW === response[2] && this.enable)) {
                  _context4.next = 52;
                  break;
                }

                value = this.parseEscrow(response);
                this.currentBill = value.value;
                this.currentCurrency = _constants.COUNTRY_TYPE_TABLE.get(value.currency) || this.currentCurrency;
                this.currentDenominator = (!value ? response[3] : value.denominator) - 0x60;
                _context4.next = 51;
                return this.send(_constants.CODES_OF_TRANSMITTER.OPERATION_COMMAND.HOLD);

              case 51:
                this.fireEvent("billIn");

              case 52:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 7]]);
      }));

      function loop() {
        return _loop.apply(this, arguments);
      }

      return loop;
    }()
  }, {
    key: "reset",
    value: function reset() {
      return this.send(_constants.CODES_OF_TRANSMITTER.OPERATION_COMMAND.RESET);
    }
  }, {
    key: "enabled",
    value: function enabled(_enabled) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(ID003.prototype), "enabled", this).call(this, _enabled);
      this.setInhibit(this.enable ? [0x00] : [0x00]);
    }
  }, {
    key: "setEnable",
    value: function setEnable() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0x00, 0x00];
      return this.send(_constants.CODES_OF_TRANSMITTER.SETTING_COMMAND.ENABLE_DISABLE, data);
    }
  }, {
    key: "setOptionalFunction",
    value: function setOptionalFunction() {
      return this.send(_constants.CODES_OF_TRANSMITTER.SETTING_COMMAND.OPTIONAL_FUNCTION, [0xff, 0xff]);
    }
  }, {
    key: "setInhibit",
    value: function setInhibit() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0xff];
      return this.send(_constants.CODES_OF_TRANSMITTER.SETTING_COMMAND.INHIBIT_ACCEPTOR, data);
    }
  }, {
    key: "send",
    value: function () {
      var _send = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(code, data) {
        var _this$port3;

        var message, response, _this$port4;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                message = (0, _constants.formatMessage)(code, data); // log.debug("Writing in port" + this.port.port);

                _context5.next = 3;
                return (_this$port3 = this.port) === null || _this$port3 === void 0 ? void 0 : _this$port3.write(message);

              case 3:
                response = [];
                _context5.prev = 4;
                _context5.next = 7;
                return (_this$port4 = this.port) === null || _this$port4 === void 0 ? void 0 : _this$port4.read();

              case 7:
                _context5.t0 = _context5.sent;

                if (_context5.t0) {
                  _context5.next = 10;
                  break;
                }

                _context5.t0 = [];

              case 10:
                response = _context5.t0;
                _context5.next = 16;
                break;

              case 13:
                _context5.prev = 13;
                _context5.t1 = _context5["catch"](4);
                console.error("[ID003]", _context5.t1);

              case 16:
                if ((0, _constants.isValidResponse)(response)) {
                  _context5.next = 18;
                  break;
                }

                return _context5.abrupt("return", _promise.default.reject(new Error("Invalid response!")));

              case 18:
                return _context5.abrupt("return", response);

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[4, 13]]);
      }));

      function send(_x, _x2) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "parseEscrow",
    value: function parseEscrow(response) {
      if (_constants.RESIVER_RESPONSES.STATUS.ESCROW !== response[2]) {
        throw new Error("[ID003] Invalid status. Not ESCROW!");
      }

      var value;

      if (this.currencyTable.length) {
        var _context6;

        value = (0, _find.default)(_context6 = this.currencyTable).call(_context6, function (el) {
          return el.denominator === response[3];
        });

        if (!value) {
          throw new RangeError("[ID003] Invalid denominator value");
        }
      } else {
        value = {
          value: NaN,
          denominator: response[3],
          currency: NaN
        };
      }

      return value;
    }
  }, {
    key: "reject",
    value: function reject() {
      return this.send(_constants.CODES_OF_TRANSMITTER.OPERATION_COMMAND.RETURN);
    }
  }, {
    key: "accept",
    value: function () {
      var _accept2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var response;
        return _regenerator.default.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.send(_constants.CODES_OF_TRANSMITTER.OPERATION_COMMAND.STACK_1);

              case 2:
                response = _context7.sent;
                _context7.next = 5;
                return this.send(_constants.CODES_OF_TRANSMITTER.STATUS_REQUEST);

              case 5:
                return _context7.abrupt("return", _context7.sent);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee6, this);
      }));

      function accept() {
        return _accept2.apply(this, arguments);
      }

      return accept;
    }()
  }, {
    key: "getCurrencyTable",
    value: function () {
      var _getCurrencyTable = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var _this$currencyTable;

        var response;
        return _regenerator.default.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.send(_constants.CODES_OF_TRANSMITTER.SETTING_STATUS_REQUEST.CURRENCY_ASSIGN_REQUEST);

              case 2:
                response = _context8.sent;

                if (!(response[2] !== _constants.RESIVER_RESPONSES.RESPONSE_TO_SETTING_COMMAND.DENOMINATION_DATA)) {
                  _context8.next = 6;
                  break;
                }

                log.warning("Device does not support currency table!");
                return _context8.abrupt("return");

              case 6:
                (_this$currencyTable = this.currencyTable).push.apply(_this$currencyTable, (0, _toConsumableArray2.default)((0, _constants.parseCurrencyTable)(response)));

                log.info("Currency table: ", this.currencyTable);

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee7, this);
      }));

      function getCurrencyTable() {
        return _getCurrencyTable.apply(this, arguments);
      }

      return getCurrencyTable;
    }()
  }, {
    key: "setLastStatus",
    value: function setLastStatus(code) {
      for (var _i = 0, _Object$entries = (0, _entries.default)(_constants.CODES_OF_RESSIVER); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            map = _Object$entries$_i[1];

        if (map.has(code)) {
          this.lastStatus = map.get(code) || "";
          this.ok = !(key === "ERROR_STATUS");
          return;
        }
      }
    }
  }]);
  return ID003;
}(_IAcceptor.BaseAcceptor), ((0, _applyDecoratedDescriptor2.default)(_class.prototype, "send", [_d4cQueue.synchronized], (0, _getOwnPropertyDescriptor.default)(_class.prototype, "send"), _class.prototype)), _class);
exports.default = ID003;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZXZpY2VzL2FjY2NlcHRvci9JRDAwMy9pbmRleC50cyJdLCJuYW1lcyI6WyJsb2ciLCJMb2dnZXIiLCJwb3J0UGFyYW1ldGVycyIsImJhdWRSYXRlIiwiYnVmZmVyU2l6ZSIsImRhdGFCaXQiLCJmbG93Q29udHJvbCIsInBhcml0eSIsInN0b3BCaXRzIiwiSUQwMDMiLCJwb3J0IiwiZGV2aWNlVHlwZSIsIm9wZW4iLCJjbG9zZSIsInNlbmQiLCJDT0RFU19PRl9UUkFOU01JVFRFUiIsIlNUQVRVU19SRVFVRVNUIiwicmVzcG9uc2UiLCJyZXNwb25zZUlzVmFsaWQiLCJnZXRDdXJyZW5jeVRhYmxlIiwid2FybmluZyIsIkNPREVTX09GX1JFU1NJVkVSIiwiUE9XRVJfVVBfU1RBVFVTIiwiaGFzIiwiaW5pdExvb3AiLCJFUlJPUl9TVEFUVVMiLCJyZXNldCIsInNldEVuYWJsZSIsInNldE9wdGlvbmFsRnVuY3Rpb24iLCJzZXRJbmhpYml0IiwiZXJyb3IiLCJwcmV2U3RhdHVzIiwiUkVTSVZFUl9SRVNQT05TRVMiLCJTVEFUVVMiLCJJTklUSUFMSVpFIiwiY29ubmVjdGVkIiwicmVzb2x2ZSIsIm9rIiwic3RhdHVzIiwibGFzdFN0YXR1cyIsImVuYWJsZWQiLCJlbmFibGUiLCJyYXdSZXNwb25zZSIsImxhc3RSYXdTdGF0dXMiLCJpc0Z1bGwiLCJ0eXBlIiwiZXZlbnQiLCJldmVudHMiLCJpbmZvIiwiZ2V0IiwiaGFuZGxlciIsInJlYXNvbiIsImNvZGVPZlJlamVjdCIsInZhbHVlIiwiY3VycmVudEJpbGwiLCJkZW5vbWluYXRvciIsImN1cnJlbnREZW5vbWluYXRvciIsImN1cnJlbmN5IiwiY3VycmVudEN1cnJlbmN5IiwicmVqZWN0IiwiYWNjZXB0IiwicHJldmlvdXNTdGF0dXMiLCJkZXNjcmlwdGlvbiIsImZhaWx1cmVSZWFzb24iLCJ1bmRlZmluZWQiLCJTVEFDS0VSX0ZVTEwiLCJTVEFDS0VSX09QRU4iLCJFTkFCTEVfSURMSU5HIiwiRElTQUJMRURfSU5ISUJJVCIsIlZFTkRfVkFMSUQiLCJ3cml0ZSIsIkFDSyIsInNldExhc3RTdGF0dXMiLCJGQUlMVVJFIiwiRkFJTFVSRV9DT0RFUyIsImZpcmVFdmVudCIsIlNUQUNLRUQiLCJSRUpFQ1RJTkciLCJSRUpFQ1RfUkVBU09OUyIsIlJFVFVSTklORyIsIkVTQ1JPVyIsInBhcnNlRXNjcm93IiwiQ09VTlRSWV9UWVBFX1RBQkxFIiwiT1BFUkFUSU9OX0NPTU1BTkQiLCJIT0xEIiwiUkVTRVQiLCJkYXRhIiwiU0VUVElOR19DT01NQU5EIiwiRU5BQkxFX0RJU0FCTEUiLCJPUFRJT05BTF9GVU5DVElPTiIsIklOSElCSVRfQUNDRVBUT1IiLCJjb2RlIiwibWVzc2FnZSIsInJlYWQiLCJjb25zb2xlIiwiRXJyb3IiLCJjdXJyZW5jeVRhYmxlIiwibGVuZ3RoIiwiZWwiLCJSYW5nZUVycm9yIiwiTmFOIiwiUkVUVVJOIiwiU1RBQ0tfMSIsIlNFVFRJTkdfU1RBVFVTX1JFUVVFU1QiLCJDVVJSRU5DWV9BU1NJR05fUkVRVUVTVCIsIlJFU1BPTlNFX1RPX1NFVFRJTkdfQ09NTUFORCIsIkRFTk9NSU5BVElPTl9EQVRBIiwicHVzaCIsImtleSIsIm1hcCIsIkJhc2VBY2NlcHRvciIsInN5bmNocm9uaXplZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQWdCQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxHQUFHLEdBQUcsSUFBSUMsY0FBSixDQUFXLFNBQVgsQ0FBWjtBQUVBLElBQU1DLGNBQWdDLEdBQUc7QUFDdkNDLEVBQUFBLFFBQVEsRUFBRSxJQUQ2QjtBQUV2Q0MsRUFBQUEsVUFBVSxFQUFFLEdBRjJCO0FBR3ZDQyxFQUFBQSxPQUFPLEVBQUUsQ0FIOEI7QUFJdkNDLEVBQUFBLFdBQVcsRUFBRSxNQUowQjtBQUt2Q0MsRUFBQUEsTUFBTSxFQUFF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QUFLdEQsRUFBTCxHQUFVLEVBQUV1RSxHQUFHLEtBQUssY0FBVixDQUFWO0FBQ0E7QUFDRDtBQUNGO0FBQ0Y7OztFQWhVZ0NFLHVCLHVFQXNQaENDLHNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUFjY2VwdG9yLCBJQWNjZXB0b3JTdGF0dXMgfSBmcm9tIFwiLi4vLi4vbW9kZWwvSUFjY2VwdG9yXCI7XG5pbXBvcnQgeyBzeW5jaHJvbml6ZWQgfSBmcm9tIFwiZDRjLXF1ZXVlXCI7XG5pbXBvcnQge1xuICBTVEFSVF9XT1JELFxuICBFTlEsXG4gIENPREVTX09GX1RSQU5TTUlUVEVSLFxuICBDT0RFU19PRl9SRVNTSVZFUixcbiAgUkVTSVZFUl9SRVNQT05TRVMsXG4gIEZBSUxVUkVfQ09ERVMsXG4gIFJFSkVDVF9SRUFTT05TLFxuICBwYXJzZUN1cnJlbmN5VGFibGUsXG4gIGlzVmFsaWRSZXNwb25zZSxcbiAgZm9ybWF0TWVzc2FnZSxcbiAgQ09VTlRSWV9UWVBFX1RBQkxFLFxuICBDdXJyZW5jeVJlY29yZFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IElTdGF0dXMgfSBmcm9tIFwiLi4vLi4vbW9kZWwvSVN0YXR1c1wiO1xuaW1wb3J0IHsgSVNlcmlhbFBvcnQsIFNlcmlhbFBvcnRPcHRpb24gfSBmcm9tIFwiLi4vLi4vc2VyaWFsL3R5cGVzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vaGVscGVycy9sb2dnZXJcIjtcblxuY29uc3QgbG9nID0gbmV3IExvZ2dlcihcIltJRDAwM11cIik7XG5cbmNvbnN0IHBvcnRQYXJhbWV0ZXJzOiBTZXJpYWxQb3J0T3B0aW9uID0ge1xuICBiYXVkUmF0ZTogOTYwMCxcbiAgYnVmZmVyU2l6ZTogMjU1LFxuICBkYXRhQml0OiA4LFxuICBmbG93Q29udHJvbDogXCJub25lXCIsXG4gIHBhcml0eTogXCJldmVuXCIsXG4gIHN0b3BCaXRzOiAxXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJRDAwMyBleHRlbmRzIEJhc2VBY2NlcHRvciB7XG4gIHByaXZhdGUgY3VycmVuY3lUYWJsZTogQXJyYXk8Q3VycmVuY3lSZWNvcmQ+ID0gW107XG4gIHByaXZhdGUgY3VycmVudEJpbGw6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgY3VycmVudERlbm9taW5hdG9yOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGN1cnJlbnRDdXJyZW5jeTogc3RyaW5nID0gXCJNTlRcIjtcbiAgcHJpdmF0ZSBwcmV2aW91c1N0YXR1czogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBmYWlsdXJlUmVhc29uPzogc3RyaW5nO1xuICBwcml2YXRlIGxhc3RSYXdTdGF0dXM6IEFycmF5PG51bWJlcj4gPSBbXTtcbiAgcHJpdmF0ZSBvazogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHBvcnQ6IElTZXJpYWxQb3J0KSB7XG4gICAgc3VwZXIocG9ydCk7XG4gICAgdGhpcy5kZXZpY2VUeXBlID0gXCJJRDAwM1wiO1xuICB9XG5cbiAgLyoqXG4gICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINCw0YbQtdC/0YLQvtGA0LBcbiAgICovXG4gIHB1YmxpYyBhc3luYyBpbml0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICghdGhpcy5wb3J0KSByZXR1cm4gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMucG9ydC5vcGVuKHBvcnRQYXJhbWV0ZXJzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIGxvZy5kZWJ1ZyhcIkVycm9yIHdoaWxlIG9wZW5pbmcgcG9ydFwiLCBlcnIpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gbG9nLmRlYnVnKFwiW0lEMDAzXSBUcnkgdG8gY2xvc2UgcG9ydFwiLCB0aGlzLnBvcnQucG9ydCk7XG4gICAgICAgIGF3YWl0IHRoaXMucG9ydC5jbG9zZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIGxvZy5kZWJ1Z0Vycm9yKGVycik7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IHJlc3BvbnNlOiBBcnJheTxudW1iZXI+O1xuICAgIHRyeSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZChDT0RFU19PRl9UUkFOU01JVFRFUi5TVEFUVVNfUkVRVUVTVCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBsb2cuZGVidWcoXCJbSUQwMDNdIFRyeSB0byBjbG9zZSBwb3J0IFwiLCB0aGlzLnBvcnQucG9ydCk7XG4gICAgICBhd2FpdCB0aGlzLnBvcnQuY2xvc2UoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZUlzVmFsaWQgPSBpc1ZhbGlkUmVzcG9uc2UocmVzcG9uc2UpO1xuXG4gICAgaWYgKCFyZXNwb25zZUlzVmFsaWQpIHtcbiAgICAgIC8vIGxvZy5kZWJ1ZyhcIltJRDAwM10gSW5pdCBpcyBmYWlsZWQhXCIpO1xuICAgICAgYXdhaXQgdGhpcy5wb3J0LmNsb3NlKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLmdldEN1cnJlbmN5VGFibGUoKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIGxvZy53YXJuaW5nKFwiRXJyb3IgZ2V0dGluZyBjdXJyZW5jeSB0YWJsZSFcIik7XG4gICAgfVxuICAgIGlmICghQ09ERVNfT0ZfUkVTU0lWRVIuUE9XRVJfVVBfU1RBVFVTLmhhcyhyZXNwb25zZVsyXSkpIHtcbiAgICAgIHRoaXMuaW5pdExvb3AoNTAwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoQ09ERVNfT0ZfUkVTU0lWRVIuRVJST1JfU1RBVFVTLmhhcyhyZXNwb25zZVsyXSkpIHtcbiAgICAgIGxvZy53YXJuaW5nKFwiQWNjZXB0b3IgYXQgaW5pdGlhbGl6ZSBpbiBlcnJvciEgVHJ5IHRvIHJlc2V0IVwiKTtcbiAgICAgIGF3YWl0IHRoaXMucmVzZXQoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlc2V0KCk7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2V0RW5hYmxlKCk7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2V0T3B0aW9uYWxGdW5jdGlvbigpO1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnNldEluaGliaXQoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZy5lcnJvcihcIkluaXRpYWxpemF0aW9uIEVycm9yISBcIiArIGVycik7XG4gICAgICBhd2FpdCB0aGlzLnBvcnQuY2xvc2UoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IHByZXZTdGF0dXMgPSByZXNwb25zZVsyXTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnNlbmQoQ09ERVNfT0ZfVFJBTlNNSVRURVIuU1RBVFVTX1JFUVVFU1QpO1xuICAgICAgaWYgKHByZXZTdGF0dXMgPT09IFJFU0lWRVJfUkVTUE9OU0VTLlNUQVRVUy5JTklUSUFMSVpFICYmIHJlc3BvbnNlWzJdICE9PSBSRVNJVkVSX1JFU1BPTlNFUy5TVEFUVVMuSU5JVElBTElaRSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHByZXZTdGF0dXMgPSByZXNwb25zZVsyXTtcbiAgICB9XG4gICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuaW5pdExvb3AoMjAwKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjaGVja1N0YXR1cygpOiBQcm9taXNlPElTdGF0dXM+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB7XG4gICAgICAgIG9rOiB0aGlzLm9rLFxuICAgICAgICBjb25uZWN0ZWQ6IHRoaXMuY29ubmVjdGVkLFxuICAgICAgICBzdGF0dXM6IHRoaXMubGFzdFN0YXR1cyxcbiAgICAgICAgZW5hYmxlZDogdGhpcy5lbmFibGUsXG4gICAgICAgIHJhd1Jlc3BvbnNlOiB0aGlzLmxhc3RSYXdTdGF0dXNcbiAgICAgIH0pXG4gIH1cblxuICBwdWJsaWMgZ2V0QWNjZXB0b3JTdGF0dXMoKTogSUFjY2VwdG9yU3RhdHVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgb2s6IHRoaXMub2ssXG4gICAgICBzdGF0dXM6IHRoaXMubGFzdFN0YXR1cyxcbiAgICAgIGlzRnVsbDogdGhpcy5pc0Z1bGwsXG4gICAgICB0eXBlOiB0aGlzLmRldmljZVR5cGVcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNNeVBvcnQocG9ydDogSVNlcmlhbFBvcnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wb3J0Py5wb3J0ID09PSBwb3J0LnBvcnQ7XG4gIH1cblxuICBwcml2YXRlIGZpcmVFdmVudChldmVudDogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKSB7XG4gICAgaWYgKCF0aGlzLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxvZy5pbmZvKFwiRmlyZWQgRXZlbnQ6IFwiICsgZXZlbnQpO1xuICAgIGZvciAoY29uc3QgaGFuZGxlciBvZiB0aGlzLmV2ZW50cy5nZXQoZXZlbnQpIHx8IFtdKSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICAgIGNhc2UgXCJyZWplY3RlZFwiOlxuICAgICAgICAgIGhhbmRsZXIoe1xuICAgICAgICAgICAgcmVhc29uOiBwYXJhbXNbMF0sXG4gICAgICAgICAgICBjb2RlT2ZSZWplY3Q6IHBhcmFtc1sxXVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmV0dXJuZWRcIjpcbiAgICAgICAgY2FzZSBcImJpbGxTdGFja2VkXCI6XG4gICAgICAgIGNhc2UgXCJiaWxsSW5cIjpcbiAgICAgICAgICBoYW5kbGVyKHtcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmN1cnJlbnRCaWxsLFxuICAgICAgICAgICAgZGVub21pbmF0b3I6IHRoaXMuY3VycmVudERlbm9taW5hdG9yLFxuICAgICAgICAgICAgY3VycmVuY3k6IHRoaXMuY3VycmVudEN1cnJlbmN5LFxuICAgICAgICAgICAgcmVqZWN0OiBhc3luYyAoKSA9PiBhd2FpdCB0aGlzLnJlamVjdCgpLFxuICAgICAgICAgICAgYWNjZXB0OiBhc3luYyAoKSA9PiBhd2FpdCB0aGlzLmFjY2VwdCgpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJvbkVycm9yXCI6XG4gICAgICAgICAgY29uc3QgZXJyb3IgPSBDT0RFU19PRl9SRVNTSVZFUi5FUlJPUl9TVEFUVVMuZ2V0KHRoaXMucHJldmlvdXNTdGF0dXMpIHx8IFwiXCI7XG4gICAgICAgICAgaGFuZGxlcih7XG4gICAgICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5mYWlsdXJlUmVhc29uIHx8IGVycm9yLFxuICAgICAgICAgICAgcmVzZXQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBsb29wKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuZmFpbHVyZVJlYXNvbiA9IHVuZGVmaW5lZDtcbiAgICBsZXQgcmVzcG9uc2U6IEFycmF5PG51bWJlcj47XG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZW5kKENPREVTX09GX1RSQU5TTUlUVEVSLlNUQVRVU19SRVFVRVNUKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMubGFzdFN0YXR1cyA9IFwiQWNjZXB0b3Igbm90IGF2YWlsYWJsZSFcIjtcbiAgICAgIHRoaXMub2sgPSBmYWxzZTtcbiAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmxhc3RSYXdTdGF0dXMgPSBbXTtcbiAgICAgIGxvZy5lcnJvcihcIkVycm9yIG9jdXB5IGluIGxvb3A6IFwiLCBlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghaXNWYWxpZFJlc3BvbnNlKHJlc3BvbnNlKSkge1xuICAgICAgdGhpcy5vayA9IGZhbHNlO1xuICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5sYXN0U3RhdHVzID0gXCJJbnZhbGlkIFJlc3BvbnNlXCI7XG4gICAgICB0aGlzLmxhc3RSYXdTdGF0dXMgPSByZXNwb25zZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxhc3RSYXdTdGF0dXMgPSByZXNwb25zZTtcbiAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgaWYgKFJFU0lWRVJfUkVTUE9OU0VTLkVSUk9SX1NUQVRVUy5TVEFDS0VSX0ZVTEwgPT09IHJlc3BvbnNlWzJdKSB7XG4gICAgICB0aGlzLmlzRnVsbCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChSRVNJVkVSX1JFU1BPTlNFUy5FUlJPUl9TVEFUVVMuU1RBQ0tFUl9PUEVOID09PSByZXNwb25zZVsyXSkge1xuICAgICAgdGhpcy5pc0Z1bGwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZW5hYmxlICYmIFJFU0lWRVJfUkVTUE9OU0VTLlNUQVRVUy5FTkFCTEVfSURMSU5HID09PSByZXNwb25zZVsyXSkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnNldEluaGliaXQoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZW5hYmxlICYmIFJFU0lWRVJfUkVTUE9OU0VTLlNUQVRVUy5ESVNBQkxFRF9JTkhJQklUID09PSByZXNwb25zZVsyXSkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnNldEluaGliaXQoWzB4MDBdKTtcbiAgICB9XG5cbiAgICBpZiAoUkVTSVZFUl9SRVNQT05TRVMuU1RBVFVTLlZFTkRfVkFMSUQgPT09IHJlc3BvbnNlWzJdKSB7XG4gICAgICBhd2FpdCB0aGlzLnBvcnQ/LndyaXRlKGZvcm1hdE1lc3NhZ2UoQ09ERVNfT0ZfVFJBTlNNSVRURVIuQUNLKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGxvZy5kZWJ1ZyhcIltJRDAwM10gbG9vcFwiLCBcIlByZXYgc3RhdHVzOlwiLCB0aGlzLnByZXZpb3VzU3RhdHVzLCBcIkN1cnJlbnQgU3RhdHVzOiBcIiArIHJlc3BvbnNlLm1hcCgoZWwpID0+IGVsLnRvU3RyaW5nKDE2KSkuam9pbihcIiwgXCIpKTtcblxuICAgIGlmIChyZXNwb25zZVsyXSA9PT0gdGhpcy5wcmV2aW91c1N0YXR1cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNldExhc3RTdGF0dXMocmVzcG9uc2VbMl0pO1xuICAgIC8vIGxvZy5kZWJ1ZyhcIkN1cnJlbnQgc3RhdHVzOiBcIiwgdGhpcy5sYXN0U3RhdHVzKTtcbiAgICB0aGlzLnByZXZpb3VzU3RhdHVzID0gcmVzcG9uc2VbMl07XG4gICAgaWYgKENPREVTX09GX1JFU1NJVkVSLkVSUk9SX1NUQVRVUy5oYXMocmVzcG9uc2VbMl0pKSB7XG4gICAgICBsb2cud2FybmluZyhcIkVycm9yIHN0YXR1czogXCIsIHJlc3BvbnNlKTtcbiAgICAgIGlmIChSRVNJVkVSX1JFU1BPTlNFUy5FUlJPUl9TVEFUVVMuRkFJTFVSRSA9PT0gcmVzcG9uc2VbMl0pIHtcbiAgICAgICAgdGhpcy5mYWlsdXJlUmVhc29uID0gRkFJTFVSRV9DT0RFUy5nZXQocmVzcG9uc2VbM10pO1xuICAgICAgICB0aGlzLmxhc3RTdGF0dXMgKz0gXCJcXG5cIiArIHRoaXMuZmFpbHVyZVJlYXNvbjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25FcnJvclwiKTtcbiAgICB9XG4gICAgaWYgKFJFU0lWRVJfUkVTUE9OU0VTLlNUQVRVUy5TVEFDS0VEID09PSByZXNwb25zZVsyXSkge1xuICAgICAgdGhpcy5maXJlRXZlbnQoXCJiaWxsU3RhY2tlZFwiKTtcbiAgICB9XG4gICAgaWYgKFJFU0lWRVJfUkVTUE9OU0VTLlNUQVRVUy5SRUpFQ1RJTkcgPT09IHJlc3BvbnNlWzJdKSB7XG4gICAgICBsb2cud2FybmluZyhcIltJRDAwM10gUmVqZWN0ZWRcIiwgUkVKRUNUX1JFQVNPTlMuZ2V0KHJlc3BvbnNlWzNdKSk7XG4gICAgICB0aGlzLmZpcmVFdmVudChcInJlamVjdGVkXCIsIGBbSUQwMDNdIFJlamVjdGVkICR7UkVKRUNUX1JFQVNPTlMuZ2V0KHJlc3BvbnNlWzNdKX1gLCByZXNwb25zZVszXSk7XG4gICAgICB0aGlzLmxhc3RTdGF0dXMgKz0gXCJcXG5cIiArIFJFSkVDVF9SRUFTT05TLmdldChyZXNwb25zZVszXSk7XG4gICAgfVxuICAgIGlmIChSRVNJVkVSX1JFU1BPTlNFUy5TVEFUVVMuUkVUVVJOSU5HID09PSByZXNwb25zZVsyXSkge1xuICAgICAgdGhpcy5maXJlRXZlbnQoXCJyZXR1cm5lZFwiKTtcbiAgICB9XG4gICAgaWYgKFJFU0lWRVJfUkVTUE9OU0VTLlNUQVRVUy5FU0NST1cgPT09IHJlc3BvbnNlWzJdICYmIHRoaXMuZW5hYmxlKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGFyc2VFc2Nyb3cocmVzcG9uc2UpO1xuICAgICAgdGhpcy5jdXJyZW50QmlsbCA9IHZhbHVlLnZhbHVlO1xuICAgICAgdGhpcy5jdXJyZW50Q3VycmVuY3kgPSBDT1VOVFJZX1RZUEVfVEFCTEUuZ2V0KHZhbHVlLmN1cnJlbmN5KSB8fCB0aGlzLmN1cnJlbnRDdXJyZW5jeTtcbiAgICAgIHRoaXMuY3VycmVudERlbm9taW5hdG9yID0gKCF2YWx1ZSA/IHJlc3BvbnNlWzNdIDogdmFsdWUuZGVub21pbmF0b3IpIC0gMHg2MDtcbiAgICAgIGF3YWl0IHRoaXMuc2VuZChDT0RFU19PRl9UUkFOU01JVFRFUi5PUEVSQVRJT05fQ09NTUFORC5IT0xEKTtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KFwiYmlsbEluXCIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXQoKTogUHJvbWlzZTxBcnJheTxudW1iZXI+PiB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZChDT0RFU19PRl9UUkFOU01JVFRFUi5PUEVSQVRJT05fQ09NTUFORC5SRVNFVCk7XG4gIH1cblxuICBwdWJsaWMgZW5hYmxlZChlbmFibGVkOiBib29sZWFuKSB7XG4gICAgc3VwZXIuZW5hYmxlZChlbmFibGVkKTtcbiAgICB0aGlzLnNldEluaGliaXQodGhpcy5lbmFibGUgPyBbMHgwMF0gOiBbMHgwMF0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRFbmFibGUoZGF0YTogQXJyYXk8bnVtYmVyPiA9IFsweDAwLCAweDAwXSk6IFByb21pc2U8QXJyYXk8bnVtYmVyPj4ge1xuICAgIHJldHVybiB0aGlzLnNlbmQoQ09ERVNfT0ZfVFJBTlNNSVRURVIuU0VUVElOR19DT01NQU5ELkVOQUJMRV9ESVNBQkxFLCBkYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9uYWxGdW5jdGlvbigpOiBQcm9taXNlPEFycmF5PG51bWJlcj4+IHtcbiAgICByZXR1cm4gdGhpcy5zZW5kKENPREVTX09GX1RSQU5TTUlUVEVSLlNFVFRJTkdfQ09NTUFORC5PUFRJT05BTF9GVU5DVElPTiwgWzB4ZmYsIDB4ZmZdKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5oaWJpdChkYXRhOiBBcnJheTxudW1iZXI+ID0gWzB4ZmZdKTogUHJvbWlzZTxBcnJheTxudW1iZXI+PiB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZChDT0RFU19PRl9UUkFOU01JVFRFUi5TRVRUSU5HX0NPTU1BTkQuSU5ISUJJVF9BQ0NFUFRPUiwgZGF0YSk7XG4gIH1cblxuICBAc3luY2hyb25pemVkXG4gIHByaXZhdGUgYXN5bmMgc2VuZChjb2RlOiBudW1iZXIsIGRhdGE/OiBBcnJheTxudW1iZXI+KTogUHJvbWlzZTxBcnJheTxudW1iZXI+PiB7XG4gICAgY29uc3QgbWVzc2FnZTogQXJyYXk8bnVtYmVyPiA9IGZvcm1hdE1lc3NhZ2UoY29kZSwgZGF0YSk7XG4gICAgLy8gbG9nLmRlYnVnKFwiV3JpdGluZyBpbiBwb3J0XCIgKyB0aGlzLnBvcnQucG9ydCk7XG4gICAgYXdhaXQgdGhpcy5wb3J0Py53cml0ZShtZXNzYWdlKTtcbiAgICBsZXQgcmVzcG9uc2U6IEFycmF5PG51bWJlcj4gPSBbXTtcbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2UgPSAoYXdhaXQgdGhpcy5wb3J0Py5yZWFkKCkpIHx8IFtdO1xuICAgICAgLy8gbG9nLmRlYnVnKFwiUmVzcG9uc2VcIiwgcmVzcG9uc2UpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcIltJRDAwM11cIiwgZXJyKTtcbiAgICB9XG4gICAgaWYgKCFpc1ZhbGlkUmVzcG9uc2UocmVzcG9uc2UpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCByZXNwb25zZSFcIikpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlRXNjcm93KHJlc3BvbnNlOiBBcnJheTxudW1iZXI+KTogQ3VycmVuY3lSZWNvcmQge1xuICAgIGlmIChSRVNJVkVSX1JFU1BPTlNFUy5TVEFUVVMuRVNDUk9XICE9PSByZXNwb25zZVsyXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW0lEMDAzXSBJbnZhbGlkIHN0YXR1cy4gTm90IEVTQ1JPVyFcIik7XG4gICAgfVxuICAgIGxldCB2YWx1ZTogQ3VycmVuY3lSZWNvcmQgfCB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMuY3VycmVuY3lUYWJsZS5sZW5ndGgpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5jdXJyZW5jeVRhYmxlLmZpbmQoKGVsKSA9PiBlbC5kZW5vbWluYXRvciA9PT0gcmVzcG9uc2VbM10pO1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIltJRDAwM10gSW52YWxpZCBkZW5vbWluYXRvciB2YWx1ZVwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSB7XG4gICAgICAgIHZhbHVlOiBOYU4sXG4gICAgICAgIGRlbm9taW5hdG9yOiByZXNwb25zZVszXSxcbiAgICAgICAgY3VycmVuY3k6IE5hTlxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSByZWplY3QoKTogUHJvbWlzZTxBcnJheTxudW1iZXI+PiB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZChDT0RFU19PRl9UUkFOU01JVFRFUi5PUEVSQVRJT05fQ09NTUFORC5SRVRVUk4pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBhY2NlcHQoKTogUHJvbWlzZTxBcnJheTxudW1iZXI+PiB7XG4gICAgbGV0IHJlc3BvbnNlOiBBcnJheTxudW1iZXI+ID0gYXdhaXQgdGhpcy5zZW5kKENPREVTX09GX1RSQU5TTUlUVEVSLk9QRVJBVElPTl9DT01NQU5ELlNUQUNLXzEpO1xuICAgIC8vIGlmIChyZXNwb25zZVsyXSAhPT0gUkVTSVZFUl9SRVNQT05TRVMuUkVTUE9OU0VfVE9fT1BFUkFUSU9OX0NPTU1BTkQuQUNLKSB7XG4gICAgLy8gICBjb25zb2xlLndhcm4ocmVzcG9uc2UpO1xuICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKFxuICAgIC8vICAgICBSRVNJVkVSX1JFU1BPTlNFUy5SRVNQT05TRV9UT19PUEVSQVRJT05fQ09NTUFORC5JTlZBTElEX0NPTU1BTkQgPT09XG4gICAgLy8gICAgIHJlc3BvbnNlWzJdXG4gICAgLy8gICAgICAgPyBcIlVua25vd24gY29tbWFuZCBmb3IgYWNjZXB0b3IhXCJcbiAgICAvLyAgICAgICA6IFwiVW5rbm93biBhbnN3ZXIgZnJvbSBhY2NlcHRvciFcIlxuICAgIC8vICAgKTtcbiAgICAvLyB9XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc2VuZChDT0RFU19PRl9UUkFOU01JVFRFUi5TVEFUVVNfUkVRVUVTVCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldEN1cnJlbmN5VGFibGUoKSB7XG4gICAgY29uc3QgcmVzcG9uc2U6IEFycmF5PG51bWJlcj4gPSBhd2FpdCB0aGlzLnNlbmQoQ09ERVNfT0ZfVFJBTlNNSVRURVIuU0VUVElOR19TVEFUVVNfUkVRVUVTVC5DVVJSRU5DWV9BU1NJR05fUkVRVUVTVCk7XG4gICAgaWYgKHJlc3BvbnNlWzJdICE9PSBSRVNJVkVSX1JFU1BPTlNFUy5SRVNQT05TRV9UT19TRVRUSU5HX0NPTU1BTkQuREVOT01JTkFUSU9OX0RBVEEpIHtcbiAgICAgIGxvZy53YXJuaW5nKFwiRGV2aWNlIGRvZXMgbm90IHN1cHBvcnQgY3VycmVuY3kgdGFibGUhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbmN5VGFibGUucHVzaCguLi5wYXJzZUN1cnJlbmN5VGFibGUocmVzcG9uc2UpKTtcbiAgICBsb2cuaW5mbyhcIkN1cnJlbmN5IHRhYmxlOiBcIiwgdGhpcy5jdXJyZW5jeVRhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0TGFzdFN0YXR1cyhjb2RlOiBudW1iZXIpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIG1hcF0gb2YgT2JqZWN0LmVudHJpZXMoQ09ERVNfT0ZfUkVTU0lWRVIpKSB7XG4gICAgICBpZiAobWFwLmhhcyhjb2RlKSkge1xuICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSBtYXAuZ2V0KGNvZGUpIHx8IFwiXCI7XG4gICAgICAgIHRoaXMub2sgPSAhKGtleSA9PT0gXCJFUlJPUl9TVEFUVVNcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==