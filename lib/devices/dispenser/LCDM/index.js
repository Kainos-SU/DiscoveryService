"use strict";

require("core-js/modules/es.function.name.js");

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

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _some = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/some"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _replaceAll = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/replace-all"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _padStart = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/pad-start"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/applyDecoratedDescriptor"));

var _IDispenser = require("../../model/IDispenser");

var _constants = require("./constants");

var _helpers = require("./helpers");

var _d4cQueue = require("d4c-queue");

var _logger = require("../../../helpers/logger");

var _class;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context27; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty2(_context27 = Object.prototype.toString.call(o)).call(_context27, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var log = new _logger.Logger("[LCDM]");
var portSettings = {
  baudRate: 9600,
  // or 38400 depends on dip switches
  bufferSize: 255,
  dataBit: 8,
  flowControl: "none",
  parity: "none",
  stopBits: 1
};
var LCDM = (_class = /*#__PURE__*/function (_BaseDispenser) {
  (0, _inherits2.default)(LCDM, _BaseDispenser);

  var _super = _createSuper(LCDM);

  function LCDM(port) {
    var _this;

    (0, _classCallCheck2.default)(this, LCDM);
    _this = _super.call(this, port);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "errorStatus", "");
    _this.deviceType = "LCDM";
    return _this;
  }

  (0, _createClass2.default)(LCDM, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var evenTry, _this$port, answer, _this$port2, _this$port4, _this$port3;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                evenTry = false;

              case 1:
                if (!true) {
                  _context.next = 37;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return (_this$port = this.port) === null || _this$port === void 0 ? void 0 : _this$port.open(portSettings);

              case 5:
                _context.next = 7;
                return this.sendNew(_constants.COMMAND_CODES.STATUS, undefined, 10000);

              case 7:
                answer = _context.sent;

                if (!(!answer.ack && !answer.crc)) {
                  _context.next = 12;
                  break;
                }

                _context.next = 11;
                return (_this$port2 = this.port) === null || _this$port2 === void 0 ? void 0 : _this$port2.close();

              case 11:
                return _context.abrupt("return", false);

              case 12:
                _context.next = 14;
                return this.checkDeviceType();

              case 14:
                _context.next = 16;
                return this.purge();

              case 16:
                return _context.abrupt("break", 37);

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](2);
                _context.prev = 21;
                _context.next = 24;
                return (_this$port3 = this.port) === null || _this$port3 === void 0 ? void 0 : _this$port3.close();

              case 24:
                _context.next = 29;
                break;

              case 26:
                _context.prev = 26;
                _context.t1 = _context["catch"](21);
                log.debugError("Error on closing port: ", _context.t1);

              case 29:
                if (evenTry) {
                  _context.next = 33;
                  break;
                }

                evenTry = true;
                portSettings.parity = "even";
                return _context.abrupt("continue", 1);

              case 33:
                log.debugError("port: ".concat((_this$port4 = this.port) === null || _this$port4 === void 0 ? void 0 : _this$port4.port, "! Error while initialize: "), _context.t0);
                return _context.abrupt("return", false);

              case 35:
                _context.next = 1;
                break;

              case 37:
                this.initLoop(15000);
                return _context.abrupt("return", true);

              case 39:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 19], [21, 26]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "checkDeviceType",
    value: function () {
      var _checkDeviceType = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var answer, _context2, _context3, version;

        return _regenerator.default.wrap(function _callee2$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.romVersion();

              case 3:
                answer = _context4.sent;
                version = (0, _map.default)(_context2 = (0, _slice.default)(_context3 = answer.rawResponse).call(_context3, 4, 8)).call(_context2, function (el) {
                  return String.fromCharCode(el);
                }).join("");
                log.debug("Cheching device type:", version);

                if (!(version[0] === "O" && version[3] === "T")) {
                  _context4.next = 11;
                  break;
                }

                this.deviceType = "LCDM-1000";
                this.numberOfCassettes = 1;
                this.cassettesStatus.set(1, {
                  isExist: true,
                  isEmpty: true
                });
                return _context4.abrupt("return");

              case 11:
                if (!(version[0] === "T" && version[0] === version[3])) {
                  _context4.next = 17;
                  break;
                }

                this.deviceType = "LCDM-2000";
                this.numberOfCassettes = 2;
                this.cassettesStatus.set(1, {
                  isExist: true,
                  isEmpty: true
                });
                this.cassettesStatus.set(2, {
                  isExist: true,
                  isEmpty: true
                });
                return _context4.abrupt("return");

              case 17:
                _context4.next = 22;
                break;

              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](0);
                log.debugError("Error getting type of dispenser", _context4.t0);

              case 22:
                this.deviceType = "LCDM";
                return _context4.abrupt("return");

              case 24:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee2, this, [[0, 19]]);
      }));

      function checkDeviceType() {
        return _checkDeviceType.apply(this, arguments);
      }

      return checkDeviceType;
    }()
  }, {
    key: "loop",
    value: function () {
      var _loop = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _context6, _context9;

        var response, status, error, _context5, _context7, _context8, _context10, _context11;

        return _regenerator.default.wrap(function _callee3$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                _context12.next = 3;
                return this.sendNew(_constants.COMMAND_CODES.STATUS, undefined, 15000);

              case 3:
                response = _context12.sent;
                _context12.next = 10;
                break;

              case 6:
                _context12.prev = 6;
                _context12.t0 = _context12["catch"](0);
                log.debugError("Error in main loop", _context12.t0);
                return _context12.abrupt("return", _promise.default.reject(_context12.t0));

              case 10:
                status = (0, _helpers.parseStatus)(response.data, this.deviceType);
                this.lastStatus = status.errorStatus;
                this.setCassettesStatus(status);
                error = false;
                this.errorStatus = "";

                if (!status.ok) {
                  this.errorStatus = (0, _concat.default)(_context5 = "[LCDM] ErrorCode: ".concat(status.errorCode.toString(16), "H, Error: ")).call(_context5, status.errorStatus);
                  error = true;
                }

                if ((0, _some.default)(_context6 = (0, _entries.default)(status.sensor0Status)).call(_context6, function (_ref) {
                  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
                      _ = _ref2[0],
                      value = _ref2[1];

                  return value;
                })) {
                  this.errorStatus += "\n[LCDM] Sensor0 Error:\n" + (0, _map.default)(_context7 = (0, _filter.default)(_context8 = (0, _entries.default)(status.sensor0Status)).call(_context8, function (_ref3) {
                    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
                        _ = _ref4[0],
                        value = _ref4[1];

                    return value;
                  })).call(_context7, function (_ref5) {
                    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
                        key = _ref6[0],
                        _ = _ref6[1];

                    return (0, _replaceAll.default)(key).call(key, "_", " ") + ": Error";
                  }).join("\n");
                  error = true;
                }

                if ((0, _some.default)(_context9 = (0, _entries.default)(status.sensor1Status)).call(_context9, function (_ref7) {
                  var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
                      _ = _ref8[0],
                      value = _ref8[1];

                  return value;
                })) {
                  this.errorStatus += "\n[LCDM] Sensor1 Error:\n" + (0, _map.default)(_context10 = (0, _filter.default)(_context11 = (0, _entries.default)(status.sensor1Status)).call(_context11, function (_ref9) {
                    var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
                        _ = _ref10[0],
                        value = _ref10[1];

                    return value;
                  })).call(_context10, function (_ref11) {
                    var _ref12 = (0, _slicedToArray2.default)(_ref11, 2),
                        key = _ref12[0],
                        _ = _ref12[1];

                    return (0, _replaceAll.default)(key).call(key, "_", " ") + ": Error";
                  }).join("\n");
                  error = true;
                }

                if (!status.ok) {
                  this.fireEvent("error");
                }

                if (!(!this.deviceType || this.deviceType === "LCDM")) {
                  _context12.next = 22;
                  break;
                }

                _context12.next = 22;
                return this.checkDeviceType();

              case 22:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee3, this, [[0, 6]]);
      }));

      function loop() {
        return _loop.apply(this, arguments);
      }

      return loop;
    }()
  }, {
    key: "fireEvent",
    value: function fireEvent(event) {
      var _this2 = this;

      var handlerList = this.events.get(event);

      if (handlerList === undefined) {
        throw new Error("No such event in list of events");
      }

      var _iterator = _createForOfIteratorHelper(handlerList),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var handler = _step.value;

          switch (event) {
            case "error":
              handler({
                status: this.errorStatus,
                purge: function purge() {
                  return _this2.purge();
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
    key: "purge",
    value: function () {
      var _purge = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var _context13;

        var response, ok, status;
        return _regenerator.default.wrap(function _callee4$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                _context14.next = 3;
                return this.sendNew(_constants.COMMAND_CODES.PURGE, undefined, 20000);

              case 3:
                response = _context14.sent;
                _context14.next = 9;
                break;

              case 6:
                _context14.prev = 6;
                _context14.t0 = _context14["catch"](0);
                return _context14.abrupt("return", _promise.default.reject(_context14.t0));

              case 9:
                ok = this.errorCheck(response.data[4]);
                status = (0, _concat.default)(_context13 = "".concat(ok ? "Successful" : "Try to", " purge. Current error status: ")).call(_context13, _constants.ERROR_CODES.get(response.data[4]));
                return _context14.abrupt("return", {
                  ok: ok,
                  enabled: this.enable,
                  connected: true,
                  status: status,
                  rawResponse: response.data
                });

              case 12:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee4, this, [[0, 6]]);
      }));

      function purge() {
        return _purge.apply(this, arguments);
      }

      return purge;
    }()
  }, {
    key: "romVersion",
    value: function () {
      var _romVersion = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var response, status, data, _iterator2, _step2, char;

        return _regenerator.default.wrap(function _callee5$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                _context15.next = 3;
                return this.sendNew(_constants.COMMAND_CODES.ROM_VERSION, undefined, 30000);

              case 3:
                response = _context15.sent;
                _context15.next = 9;
                break;

              case 6:
                _context15.prev = 6;
                _context15.t0 = _context15["catch"](0);
                return _context15.abrupt("return", _promise.default.reject(_context15.t0));

              case 9:
                status = "ROM Version: ";
                data = response.data;
                _iterator2 = _createForOfIteratorHelper((0, _slice.default)(data).call(data, 4, data.length - 2));

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    char = _step2.value;
                    status += String.fromCharCode(char);
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }

                return _context15.abrupt("return", {
                  ok: response.ack,
                  enabled: this.enable,
                  connected: true,
                  status: status,
                  rawResponse: response.data
                });

              case 14:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee5, this, [[0, 6]]);
      }));

      function romVersion() {
        return _romVersion.apply(this, arguments);
      }

      return romVersion;
    }()
  }, {
    key: "checkStatus",
    value: function () {
      var _checkStatus = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var resp, status, _this$port5;

        return _regenerator.default.wrap(function _callee6$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.prev = 0;
                log.debug("[LCDM] CHECK STATUS");
                _context16.next = 4;
                return this.sendNew(_constants.COMMAND_CODES.STATUS, undefined, 30000);

              case 4:
                resp = _context16.sent;

                if (resp.data.length) {
                  _context16.next = 7;
                  break;
                }

                return _context16.abrupt("return", _promise.default.reject(new Error("[LCDM] Device not response. Probably disconnected!")));

              case 7:
                status = (0, _helpers.parseStatus)(resp.data, this.deviceType);
                this.lastStatus = status.errorStatus;
                this.setCassettesStatus(status);
                return _context16.abrupt("return", {
                  ok: this.errorCheck(resp.data[5]),
                  enabled: this.enable,
                  connected: true,
                  status: "OK",
                  rawResponse: resp.data
                });

              case 13:
                _context16.prev = 13;
                _context16.t0 = _context16["catch"](0);
                log.debug("port: ".concat((_this$port5 = this.port) === null || _this$port5 === void 0 ? void 0 : _this$port5.port, " No response!"));
                return _context16.abrupt("return", _promise.default.reject(new Error("No response")));

              case 17:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee6, this, [[0, 13]]);
      }));

      function checkStatus() {
        return _checkStatus.apply(this, arguments);
      }

      return checkStatus;
    }()
    /**
     * Отправка команды в диспенсер
     * @param cmd команда
     * @param data дополнительные байты пакета
     * @param timeout через которое прекращается чтение
     * @private
     */

  }, {
    key: "sendNew",
    value: function () {
      var _sendNew = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(cmd) {
        var data,
            timeout,
            request,
            buffer,
            _this$port6,
            bytes,
            _this$port7,
            prevIndexSOH,
            indexSOH,
            indexEXT,
            checkSOH,
            checkEXT,
            _this$port8,
            _bytes,
            _this$port9,
            _this$port10,
            _bytes2,
            resp,
            _args7 = arguments;

        return _regenerator.default.wrap(function _callee7$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                data = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : undefined;
                timeout = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : 15000;

                if (this.port) {
                  _context17.next = 4;
                  break;
                }

                return _context17.abrupt("return", _promise.default.reject(new Error("[LCDM]: Port is not exists!")));

              case 4:
                if (_constants.CODES_OF_COMMANDS.has(cmd)) {
                  _context17.next = 6;
                  break;
                }

                return _context17.abrupt("return", _promise.default.reject(new RangeError("[LCDM]: Invalid command!")));

              case 6:
                request = [_constants.STANDART_BYTES.EOT, _constants.STANDART_BYTES.ID, _constants.STANDART_BYTES.STX, cmd];

                if (data) {
                  request.push.apply(request, (0, _toConsumableArray2.default)(data));
                }

                request.push(_constants.STANDART_BYTES.EXT);
                request.push((0, _helpers.calculateCRC)(request));
                buffer = [];
                _context17.prev = 11;
                _context17.next = 14;
                return (_this$port6 = this.port) === null || _this$port6 === void 0 ? void 0 : _this$port6.writeAndRead(request, timeout, true);

              case 14:
                _context17.t0 = _context17.sent;

                if (_context17.t0) {
                  _context17.next = 17;
                  break;
                }

                _context17.t0 = [];

              case 17:
                bytes = _context17.t0;
                buffer.push.apply(buffer, (0, _toConsumableArray2.default)(bytes)); // log.debug("[LCDM]",`port: ${this.port?.port}. Primary response in method send: `, buffer);

                _context17.next = 25;
                break;

              case 21:
                _context17.prev = 21;
                _context17.t1 = _context17["catch"](11);
                log.error("Error on port ".concat((_this$port7 = this.port) === null || _this$port7 === void 0 ? void 0 : _this$port7.port), _context17.t1);
                return _context17.abrupt("return", _promise.default.reject(_context17.t1));

              case 25:
                prevIndexSOH = 0;

              case 26:
                if (!true) {
                  _context17.next = 67;
                  break;
                }

                indexSOH = (0, _indexOf.default)(buffer).call(buffer, _constants.STANDART_BYTES.SOH, prevIndexSOH);
                indexEXT = (0, _indexOf.default)(buffer).call(buffer, _constants.STANDART_BYTES.EXT, indexSOH === -1 ? prevIndexSOH : indexSOH);
                prevIndexSOH = indexSOH === -1 ? prevIndexSOH : indexSOH;
                checkSOH = indexSOH !== -1 && _constants.STANDART_BYTES.ID === buffer[indexSOH + 1];
                checkEXT = indexEXT > -1 && indexEXT <= buffer.length - 2;

                if (!(checkSOH && checkEXT)) {
                  _context17.next = 34;
                  break;
                }

                return _context17.abrupt("break", 67);

              case 34:
                if (!((indexEXT === -1 || indexSOH === -1) && indexEXT !== indexSOH && buffer.length > 200)) {
                  _context17.next = 52;
                  break;
                }

                prevIndexSOH = 0;
                (0, _splice.default)(buffer).call(buffer, 0, buffer.length);
                _context17.prev = 37;
                _context17.next = 40;
                return (_this$port8 = this.port) === null || _this$port8 === void 0 ? void 0 : _this$port8.writeAndRead([_constants.STANDART_BYTES.NCK], timeout);

              case 40:
                _context17.t2 = _context17.sent;

                if (_context17.t2) {
                  _context17.next = 43;
                  break;
                }

                _context17.t2 = [];

              case 43:
                _bytes = _context17.t2;
                buffer.push.apply(buffer, (0, _toConsumableArray2.default)(_bytes));
                _context17.next = 51;
                break;

              case 47:
                _context17.prev = 47;
                _context17.t3 = _context17["catch"](37);
                log.error("Port: ".concat((_this$port9 = this.port) === null || _this$port9 === void 0 ? void 0 : _this$port9.port, "! Error on reading data by writeAndRead after message lost"), _context17.t3);
                return _context17.abrupt("return", _promise.default.reject(_context17.t3));

              case 51:
                return _context17.abrupt("continue", 26);

              case 52:
                _context17.prev = 52;
                _context17.next = 55;
                return (_this$port10 = this.port) === null || _this$port10 === void 0 ? void 0 : _this$port10.redBytes(timeout);

              case 55:
                _context17.t4 = _context17.sent;

                if (_context17.t4) {
                  _context17.next = 58;
                  break;
                }

                _context17.t4 = [];

              case 58:
                _bytes2 = _context17.t4;
                buffer.push.apply(buffer, (0, _toConsumableArray2.default)(_bytes2));
                _context17.next = 65;
                break;

              case 62:
                _context17.prev = 62;
                _context17.t5 = _context17["catch"](52);
                return _context17.abrupt("return", _promise.default.reject(_context17.t5));

              case 65:
                _context17.next = 26;
                break;

              case 67:
                // log.debug("End version of response: ", buffer);
                resp = (0, _helpers.handleLDCMAnswer)(buffer);

                if (!(resp.ack || resp.crc)) {
                  _context17.next = 71;
                  break;
                }

                _context17.next = 71;
                return this.port.write([_constants.STANDART_BYTES.ACK]);

              case 71:
                return _context17.abrupt("return", resp);

              case 72:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee7, this, [[11, 21], [37, 47], [52, 62]]);
      }));

      function sendNew(_x) {
        return _sendNew.apply(this, arguments);
      }

      return sendNew;
    }()
  }, {
    key: "errorCheck",
    value: function errorCheck(code) {
      var status = _constants.ERROR_CODES.get(code) || "";

      if (status !== "Good" && status !== "Normal Stop") {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: "setCassettesStatus",
    value: function setCassettesStatus(status) {
      var _iterator3 = _createForOfIteratorHelper(this.cassettesStatus),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = (0, _slicedToArray2.default)(_step3.value, 2),
              cassetteNumber = _step3$value[0],
              cassetteStatus = _step3$value[1];

          if (cassetteNumber === 1) {
            cassetteStatus.isExist = !status.sensor1Status.CASSETTE0_SENSOR;

            if (status.sensor0Status.CASSETTE0_SENSOR) {
              cassetteStatus.isEmpty = false;
            }
          } else if ("CASSETTE1_SENSOR" in status.sensor1Status) {
            cassetteStatus.isExist = !status.sensor1Status.CASSETTE0_SENSOR;

            if (status.sensor1Status.CASSETTE1_SENSOR) {
              cassetteStatus.isEmpty = false;
            }
          }

          this.cassettesStatus.set(cassetteNumber, cassetteStatus);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "formatDispenseMessage",
    value: function formatDispenseMessage(count) {
      var _context18, _context19;

      if (count >= 100) {
        throw new RangeError("Value to dispense is to big!");
      }

      return (0, _map.default)(_context18 = (0, _padStart.default)(_context19 = count.toString(10)).call(_context19, 2, "0").split("")).call(_context18, function (el) {
        return el.charCodeAt(0);
      });
    }
  }, {
    key: "testDispense",
    value: function () {
      var _testDispense = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var _context20, _context21;

        var upper,
            response,
            parsedResponse,
            status,
            _args8 = arguments;
        return _regenerator.default.wrap(function _callee8$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                upper = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : true;
                _context22.prev = 1;
                _context22.next = 4;
                return this.sendNew(upper ? _constants.COMMAND_CODES.UPPER_TEST_DISPENSE : _constants.COMMAND_CODES.LOWER_TEST_DISPENSE, undefined, 60000);

              case 4:
                response = _context22.sent;
                _context22.next = 10;
                break;

              case 7:
                _context22.prev = 7;
                _context22.t0 = _context22["catch"](1);
                return _context22.abrupt("return", _promise.default.reject(_context22.t0));

              case 10:
                parsedResponse = (0, _helpers.parseDispense)(response.data);
                status = (0, _concat.default)(_context20 = (0, _concat.default)(_context21 = "Test dispense. Error status: ".concat(parsedResponse.errorText, "\nDispensed: ")).call(_context21, parsedResponse.cassettes[0].requestedBillCHK, "\nRejected: ")).call(_context20, parsedResponse.cassettes[0].rejectedBill);
                return _context22.abrupt("return", {
                  ok: this.errorCheck(parsedResponse.errorCode),
                  enabled: this.enable,
                  connected: true,
                  status: status,
                  rawResponse: response.data
                });

              case 13:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee8, this, [[1, 7]]);
      }));

      function testDispense() {
        return _testDispense.apply(this, arguments);
      }

      return testDispense;
    }()
  }, {
    key: "dispense",
    value: function () {
      var _dispense = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(count) {
        var _context23,
            _this3 = this;

        var cassetteNumber,
            commandCode,
            answer,
            dispensed,
            _args9 = arguments;
        return _regenerator.default.wrap(function _callee9$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                cassetteNumber = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 1;
                _context24.t0 = cassetteNumber;
                _context24.next = _context24.t0 === 1 ? 4 : _context24.t0 === 2 ? 6 : 8;
                break;

              case 4:
                commandCode = _constants.COMMAND_CODES.UPPER_DISPENSE;
                return _context24.abrupt("break", 9);

              case 6:
                commandCode = _constants.COMMAND_CODES.LOWER_DISPENSE;
                return _context24.abrupt("break", 9);

              case 8:
                return _context24.abrupt("return", _promise.default.reject("Unknown cassette number"));

              case 9:
                _context24.prev = 9;
                _context24.next = 12;
                return this.purge();

              case 12:
                _context24.next = 14;
                return this.sendNew(commandCode, this.formatDispenseMessage(count), 65000);

              case 14:
                answer = _context24.sent;
                _context24.next = 21;
                break;

              case 17:
                _context24.prev = 17;
                _context24.t1 = _context24["catch"](9);
                log.error("Error while getting response from dispenser");
                return _context24.abrupt("return", _promise.default.reject(_context24.t1));

              case 21:
                log.debug("Answer on dispense: ", answer);
                dispensed = (0, _helpers.parseDispense)(answer.data);
                this.lastStatus = dispensed.errorText;
                (0, _forEach.default)(_context23 = dispensed.cassettes).call(_context23, function (cassette) {
                  var _this3$cassettesStatu;

                  var isExist = ((_this3$cassettesStatu = _this3.cassettesStatus.get(cassette.cassetteNumber)) === null || _this3$cassettesStatu === void 0 ? void 0 : _this3$cassettesStatu.isExist) || false;
                  var isEmpty = false;

                  if (count > cassette.requestedBillEXIT) {
                    isEmpty = true;
                  }

                  _this3.cassettesStatus.set(cassette.cassetteNumber, {
                    isExist: isExist,
                    isEmpty: isEmpty
                  });
                });
                return _context24.abrupt("return", dispensed);

              case 26:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee9, this, [[9, 17]]);
      }));

      function dispense(_x2) {
        return _dispense.apply(this, arguments);
      }

      return dispense;
    }()
  }, {
    key: "multiDispense",
    value: function () {
      var _multiDispense = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(dispenseData) {
        var _this4 = this,
            _dispenseData$find,
            _dispenseData$find2,
            _context25;

        var _dispenseData$, count, cassetteNumber, firstDispense, secondDispense, dataToDispense, answer, dispensed;

        return _regenerator.default.wrap(function _callee10$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                if (!(0, _some.default)(dispenseData).call(dispenseData, function (_ref13) {
                  var cassetteNumber = _ref13.cassetteNumber;
                  return cassetteNumber > _this4.numberOfCassettes;
                })) {
                  _context26.next = 2;
                  break;
                }

                return _context26.abrupt("return", _promise.default.reject("[LCDM] This dispenser can dispenser can dispense only from ".concat(this.numberOfCassettes, " number of cassettes! Invalid input number of cassettes")));

              case 2:
                if (!(dispenseData.length === 1)) {
                  _context26.next = 7;
                  break;
                }

                _dispenseData$ = dispenseData[0], count = _dispenseData$.count, cassetteNumber = _dispenseData$.cassetteNumber;
                _context26.next = 6;
                return this.dispense(count, cassetteNumber);

              case 6:
                return _context26.abrupt("return", _context26.sent);

              case 7:
                firstDispense = this.formatDispenseMessage(((_dispenseData$find = (0, _find.default)(dispenseData).call(dispenseData, function (_ref14) {
                  var cassetteNumber = _ref14.cassetteNumber;
                  return cassetteNumber === 1;
                })) === null || _dispenseData$find === void 0 ? void 0 : _dispenseData$find.count) || 0);
                secondDispense = this.formatDispenseMessage(((_dispenseData$find2 = (0, _find.default)(dispenseData).call(dispenseData, function (_ref15) {
                  var cassetteNumber = _ref15.cassetteNumber;
                  return cassetteNumber === 2;
                })) === null || _dispenseData$find2 === void 0 ? void 0 : _dispenseData$find2.count) || 0);
                dataToDispense = (0, _concat.default)(firstDispense).call(firstDispense, secondDispense);
                _context26.prev = 10;
                _context26.next = 13;
                return this.purge();

              case 13:
                _context26.next = 15;
                return this.sendNew(_constants.COMMAND_CODES.UPPER_AND_LOWER_DISPENSE, dataToDispense, 60000);

              case 15:
                answer = _context26.sent;
                _context26.next = 21;
                break;

              case 18:
                _context26.prev = 18;
                _context26.t0 = _context26["catch"](10);
                return _context26.abrupt("return", _promise.default.reject("[LCDM] Error while getting response on multiDispense: " + _context26.t0.message));

              case 21:
                dispensed = (0, _helpers.parseDispense)(answer.data);
                this.lastStatus = dispensed.errorText;
                (0, _forEach.default)(_context25 = dispensed.cassettes).call(_context25, function (cassette) {
                  var _this4$cassettesStatu;

                  var requestDispense = (0, _find.default)(dispenseData).call(dispenseData, function (_ref16) {
                    var cassetteNumber = _ref16.cassetteNumber;
                    return cassetteNumber === cassette.cassetteNumber;
                  });

                  if (!requestDispense) {
                    return;
                  }

                  var isExist = ((_this4$cassettesStatu = _this4.cassettesStatus.get(cassette.cassetteNumber)) === null || _this4$cassettesStatu === void 0 ? void 0 : _this4$cassettesStatu.isExist) || false;
                  var isEmpty = false;

                  if (requestDispense.count > cassette.requestedBillEXIT) {
                    isEmpty = true;
                  }

                  _this4.cassettesStatus.set(cassette.cassetteNumber, {
                    isExist: isExist,
                    isEmpty: isEmpty
                  });
                });
                return _context26.abrupt("return", dispensed);

              case 25:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee10, this, [[10, 18]]);
      }));

      function multiDispense(_x3) {
        return _multiDispense.apply(this, arguments);
      }

      return multiDispense;
    }()
  }, {
    key: "getDispenserStatus",
    value: function getDispenserStatus() {
      return {
        type: this.deviceType,
        status: this.lastStatus,
        ok: this.lastStatus === "Good" || this.lastStatus === "Normal Stop",
        cassettes: this.cassettesStatus
      };
    }
  }]);
  return LCDM;
}(_IDispenser.BaseDispenser), ((0, _applyDecoratedDescriptor2.default)(_class.prototype, "sendNew", [_d4cQueue.synchronized], (0, _getOwnPropertyDescriptor.default)(_class.prototype, "sendNew"), _class.prototype)), _class);
exports.default = LCDM;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZXZpY2VzL2Rpc3BlbnNlci9MQ0RNL2luZGV4LnRzIl0sIm5hbWVzIjpbImxvZyIsIkxvZ2dlciIsInBvcnRTZXR0aW5ncyIsImJhdWRSYXRlIiwiYnVmZmVyU2l6ZSIsImRhdGFCaXQiLCJmbG93Q29udHJvbCIsInBhcml0eSIsInN0b3BCaXRzIiwiTENETSIsInBvcnQiLCJkZXZpY2VUeXBlIiwiZXZlblRyeSIsIm9wZW4iLCJzZW5kTmV3IiwiQ09NTUFORF9DT0RFUyIsIlNUQVRVUyIsInVuZGVmaW5lZCIsImFuc3dlciIsImFjayIsImNyYyIsImNsb3NlIiwiY2hlY2tEZXZpY2VUeXBlIiwicHVyZ2UiLCJkZWJ1Z0Vycm9yIiwiaW5pdExvb3AiLCJyb21WZXJzaW9uIiwidmVyc2lvbiIsInJhd1Jlc3BvbnNlIiwiZWwiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJqb2luIiwiZGVidWciLCJudW1iZXJPZkNhc3NldHRlcyIsImNhc3NldHRlc1N0YXR1cyIsInNldCIsImlzRXhpc3QiLCJpc0VtcHR5IiwicmVzcG9uc2UiLCJyZWplY3QiLCJzdGF0dXMiLCJkYXRhIiwibGFzdFN0YXR1cyIsImVycm9yU3RhdHVzIiwic2V0Q2Fzc2V0dGVzU3RhdHVzIiwiZXJyb3IiLCJvayIsImVycm9yQ29kZSIsInRvU3RyaW5nIiwic2Vuc29yMFN0YXR1cyIsIl8iLCJ2YWx1ZSIsImtleSIsInNlbnNvcjFTdGF0dXMiLCJmaXJlRXZlbnQiLCJldmVudCIsImhhbmRsZXJMaXN0IiwiZXZlbnRzIiwiZ2V0IiwiRXJyb3IiLCJoYW5kbGVyIiwiUFVSR0UiLCJlcnJvckNoZWNrIiwiRVJST1JfQ09ERVMiLCJlbmFibGVkIiwiZW5hYmxlIiwiY29ubmVjdGVkIiwiUk9NX1ZFUlNJT04iLCJsZW5ndGgiLCJjaGFyIiwicmVzcCIsImNtZCIsInRpbWVvdXQiLCJDT0RFU19PRl9DT01NQU5EUyIsImhhcyIsIlJhbmdlRXJyb3IiLCJyZXF1ZXN0IiwiU1RBTkRBUlRfQllURVMiLCJFT1QiLCJJRCIsIlNUWCIsInB1c2giLCJFWFQiLCJidWZmZXIiLCJ3cml0ZUFuZFJlYWQiLCJieXRlcyIsInByZXZJbmRleFNPSCIsImluZGV4U09IIiwiU09IIiwiaW5kZXhFWFQiLCJjaGVja1NPSCIsImNoZWNrRVhUIiwiTkNLIiwicmVkQnl0ZXMiLCJ3cml0ZSIsIkFDSyIsImNvZGUiLCJjYXNzZXR0ZU51bWJlciIsImNhc3NldHRlU3RhdHVzIiwiQ0FTU0VUVEUwX1NFTlNPUiIsIkNBU1NFVFRFMV9TRU5TT1IiLCJjb3VudCIsInNwbGl0IiwiY2hhckNvZGVBdCIsInVwcGVyIiwiVVBQRVJfVEVTVF9ESVNQRU5TRSIsIkxPV0VSX1RFU1RfRElTUEVOU0UiLCJwYXJzZWRSZXNwb25zZSIsImVycm9yVGV4dCIsImNhc3NldHRlcyIsInJlcXVlc3RlZEJpbGxDSEsiLCJyZWplY3RlZEJpbGwiLCJjb21tYW5kQ29kZSIsIlVQUEVSX0RJU1BFTlNFIiwiTE9XRVJfRElTUEVOU0UiLCJmb3JtYXREaXNwZW5zZU1lc3NhZ2UiLCJkaXNwZW5zZWQiLCJjYXNzZXR0ZSIsInJlcXVlc3RlZEJpbGxFWElUIiwiZGlzcGVuc2VEYXRhIiwiZGlzcGVuc2UiLCJmaXJzdERpc3BlbnNlIiwic2Vjb25kRGlzcGVuc2UiLCJkYXRhVG9EaXNwZW5zZSIsIlVQUEVSX0FORF9MT1dFUl9ESVNQRU5TRSIsIm1lc3NhZ2UiLCJyZXF1ZXN0RGlzcGVuc2UiLCJ0eXBlIiwiQmFzZURpc3BlbnNlciIsInN5bmNocm9uaXplZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUVBOztBQVFBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLEdBQUcsR0FBRyxJQUFJQyxjQUFKLENBQVcsUUFBWCxDQUFaO0FBRUEsSUFBTUMsWUFB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LE9BQVA7QUFNRDs7O0VBbGErQjhGLHlCLDBFQXFOL0JDLHNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVN0YXR1cyB9IGZyb20gXCIuLi8uLi9tb2RlbC9JU3RhdHVzXCI7XG5pbXBvcnQgeyBCYXNlRGlzcGVuc2VyLCBJRGlzcGVuc2VBbnN3ZXIsIElEaXNwZW5zZXJTdGF0dXMgfSBmcm9tIFwiLi4vLi4vbW9kZWwvSURpc3BlbnNlclwiO1xuaW1wb3J0IHsgSVNlcmlhbFBvcnQsIFNlcmlhbFBvcnRPcHRpb24gfSBmcm9tIFwiLi4vLi4vc2VyaWFsL3R5cGVzXCI7XG5pbXBvcnQge1xuICBDT0RFU19PRl9DT01NQU5EUyxcbiAgQ09NTUFORF9DT0RFUyxcbiAgU1RBTkRBUlRfQllURVMsXG4gIEVSUk9SX0NPREVTLFxuICBTRU5TT1JfU1RBVFVTLFxuICBDT0RFU19PRl9FUlJPUlNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBjYWxjdWxhdGVDUkMsIGhhbmRsZUxEQ01BbnN3ZXIsIHBhcnNlRGlzcGVuc2UsIHBhcnNlU3RhdHVzIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgSUxDRE1Qb3J0QW5zd2VyLCBJTENETVN0YXR1cyB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBzeW5jaHJvbml6ZWQgfSBmcm9tIFwiZDRjLXF1ZXVlXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vaGVscGVycy9sb2dnZXJcIjtcblxuY29uc3QgbG9nID0gbmV3IExvZ2dlcihcIltMQ0RNXVwiKTtcblxuY29uc3QgcG9ydFNldHRpbmdzOiBTZXJpYWxQb3J0T3B0aW9uID0ge1xuICBiYXVkUmF0ZTogOTYwMCwgLy8gb3IgMzg0MDAgZGVwZW5kcyBvbiBkaXAgc3dpdGNoZXNcbiAgYnVmZmVyU2l6ZTogMjU1LFxuICBkYXRhQml0OiA4LFxuICBmbG93Q29udHJvbDogXCJub25lXCIsXG4gIHBhcml0eTogXCJub25lXCIsXG4gIHN0b3BCaXRzOiAxXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMQ0RNIGV4dGVuZHMgQmFzZURpc3BlbnNlciB7XG4gIHByaXZhdGUgZXJyb3JTdGF0dXM6IHN0cmluZyA9IFwiXCI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBvcnQ6IElTZXJpYWxQb3J0KSB7XG4gICAgc3VwZXIocG9ydCk7XG4gICAgdGhpcy5kZXZpY2VUeXBlID0gXCJMQ0RNXCI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgaW5pdCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBsZXQgZXZlblRyeSA9IGZhbHNlO1xuICAgIHdoaWxlICh0cnVlKXtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMucG9ydD8ub3Blbihwb3J0U2V0dGluZ3MpO1xuICAgICAgICBjb25zdCBhbnN3ZXIgPSBhd2FpdCB0aGlzLnNlbmROZXcoQ09NTUFORF9DT0RFUy5TVEFUVVMsIHVuZGVmaW5lZCwgMTAwMDApO1xuICAgICAgICBpZiAoIWFuc3dlci5hY2sgJiYgIWFuc3dlci5jcmMpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBvcnQ/LmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuY2hlY2tEZXZpY2VUeXBlKCk7XG4gICAgICAgIGF3YWl0IHRoaXMucHVyZ2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHRoaXMucG9ydD8uY2xvc2UoKTtcbiAgICAgICAgfSBjYXRjaChlcnJvcjogYW55KSB7XG4gICAgICAgICAgbG9nLmRlYnVnRXJyb3IoXCJFcnJvciBvbiBjbG9zaW5nIHBvcnQ6IFwiLCBlcnJvcilcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWV2ZW5UcnkpIHtcbiAgICAgICAgICBldmVuVHJ5ID0gdHJ1ZTtcbiAgICAgICAgICBwb3J0U2V0dGluZ3MucGFyaXR5ID0gXCJldmVuXCI7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgbG9nLmRlYnVnRXJyb3IoYHBvcnQ6ICR7dGhpcy5wb3J0Py5wb3J0fSEgRXJyb3Igd2hpbGUgaW5pdGlhbGl6ZTogYCwgZXJyb3IpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW5pdExvb3AoMTUwMDApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjaGVja0RldmljZVR5cGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IGFuc3dlcjogSVN0YXR1cztcbiAgICB0cnkge1xuICAgICAgYW5zd2VyID0gYXdhaXQgdGhpcy5yb21WZXJzaW9uKCk7XG4gICAgICBjb25zdCB2ZXJzaW9uID0gYW5zd2VyLnJhd1Jlc3BvbnNlXG4gICAgICAgIC5zbGljZSg0LCA4KVxuICAgICAgICAubWFwKChlbCkgPT4gU3RyaW5nLmZyb21DaGFyQ29kZShlbCkpXG4gICAgICAgIC5qb2luKFwiXCIpO1xuICAgICAgbG9nLmRlYnVnKGBDaGVjaGluZyBkZXZpY2UgdHlwZTpgLCB2ZXJzaW9uKTtcbiAgICAgIGlmICh2ZXJzaW9uWzBdID09PSBcIk9cIiAmJiB2ZXJzaW9uWzNdID09PSBcIlRcIikge1xuICAgICAgICB0aGlzLmRldmljZVR5cGUgPSBcIkxDRE0tMTAwMFwiO1xuICAgICAgICB0aGlzLm51bWJlck9mQ2Fzc2V0dGVzID0gMTtcbiAgICAgICAgdGhpcy5jYXNzZXR0ZXNTdGF0dXMuc2V0KDEsIHtcbiAgICAgICAgICBpc0V4aXN0OiB0cnVlLFxuICAgICAgICAgIGlzRW1wdHk6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodmVyc2lvblswXSA9PT0gXCJUXCIgJiYgdmVyc2lvblswXSA9PT0gdmVyc2lvblszXSkge1xuICAgICAgICB0aGlzLmRldmljZVR5cGUgPSBcIkxDRE0tMjAwMFwiO1xuICAgICAgICB0aGlzLm51bWJlck9mQ2Fzc2V0dGVzID0gMjtcbiAgICAgICAgdGhpcy5jYXNzZXR0ZXNTdGF0dXMuc2V0KDEsIHtcbiAgICAgICAgICBpc0V4aXN0OiB0cnVlLFxuICAgICAgICAgIGlzRW1wdHk6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNhc3NldHRlc1N0YXR1cy5zZXQoMiwge1xuICAgICAgICAgIGlzRXhpc3Q6IHRydWUsXG4gICAgICAgICAgaXNFbXB0eTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nLmRlYnVnRXJyb3IoXCJFcnJvciBnZXR0aW5nIHR5cGUgb2YgZGlzcGVuc2VyXCIsIGVycm9yKTtcbiAgICB9XG4gICAgdGhpcy5kZXZpY2VUeXBlID0gXCJMQ0RNXCI7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGxvb3AoKSB7XG4gICAgbGV0IHJlc3BvbnNlOiBJTENETVBvcnRBbnN3ZXI7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZW5kTmV3KENPTU1BTkRfQ09ERVMuU1RBVFVTLCB1bmRlZmluZWQsIDE1MDAwKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZy5kZWJ1Z0Vycm9yKFwiRXJyb3IgaW4gbWFpbiBsb29wXCIsIGVycik7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0dXMgPSBwYXJzZVN0YXR1cyhyZXNwb25zZS5kYXRhLCB0aGlzLmRldmljZVR5cGUpO1xuICAgIHRoaXMubGFzdFN0YXR1cyA9IHN0YXR1cy5lcnJvclN0YXR1cztcbiAgICB0aGlzLnNldENhc3NldHRlc1N0YXR1cyhzdGF0dXMpO1xuICAgIGxldCBlcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHRoaXMuZXJyb3JTdGF0dXMgPSBcIlwiO1xuICAgIGlmICghc3RhdHVzLm9rKSB7XG4gICAgICB0aGlzLmVycm9yU3RhdHVzID0gYFtMQ0RNXSBFcnJvckNvZGU6ICR7c3RhdHVzLmVycm9yQ29kZS50b1N0cmluZygxNil9SCwgRXJyb3I6ICR7c3RhdHVzLmVycm9yU3RhdHVzfWA7XG4gICAgICBlcnJvciA9IHRydWU7XG4gICAgfVxuICAgIGlmIChPYmplY3QuZW50cmllcyhzdGF0dXMuc2Vuc29yMFN0YXR1cykuc29tZSgoW18sIHZhbHVlXSkgPT4gdmFsdWUpKSB7XG4gICAgICB0aGlzLmVycm9yU3RhdHVzICs9XG4gICAgICAgIFwiXFxuW0xDRE1dIFNlbnNvcjAgRXJyb3I6XFxuXCIgK1xuICAgICAgICBPYmplY3QuZW50cmllcyhzdGF0dXMuc2Vuc29yMFN0YXR1cylcbiAgICAgICAgICAuZmlsdGVyKChbXywgdmFsdWVdKSA9PiB2YWx1ZSlcbiAgICAgICAgICAubWFwKChba2V5LCBfXSkgPT4ga2V5LnJlcGxhY2VBbGwoXCJfXCIsIFwiIFwiKSArIFwiOiBFcnJvclwiKVxuICAgICAgICAgIC5qb2luKFwiXFxuXCIpO1xuICAgICAgZXJyb3IgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LmVudHJpZXMoc3RhdHVzLnNlbnNvcjFTdGF0dXMpLnNvbWUoKFtfLCB2YWx1ZV0pID0+IHZhbHVlKSkge1xuICAgICAgdGhpcy5lcnJvclN0YXR1cyArPVxuICAgICAgICBcIlxcbltMQ0RNXSBTZW5zb3IxIEVycm9yOlxcblwiICtcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoc3RhdHVzLnNlbnNvcjFTdGF0dXMpXG4gICAgICAgICAgLmZpbHRlcigoW18sIHZhbHVlXSkgPT4gdmFsdWUpXG4gICAgICAgICAgLm1hcCgoW2tleSwgX10pID0+IGtleS5yZXBsYWNlQWxsKFwiX1wiLCBcIiBcIikgKyBcIjogRXJyb3JcIilcbiAgICAgICAgICAuam9pbihcIlxcblwiKTtcbiAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCFzdGF0dXMub2spIHtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KFwiZXJyb3JcIik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmRldmljZVR5cGUgfHwgdGhpcy5kZXZpY2VUeXBlID09PSBcIkxDRE1cIikge1xuICAgICAgYXdhaXQgdGhpcy5jaGVja0RldmljZVR5cGUoKTtcbiAgICB9XG4gICAgLy8gbG9nLmRlYnVnKFwiW0xDRE1dIENoZWNrU3RhdHVzIGluIGxvb3BcIiwgdGhpcy5kZXZpY2VUeXBlLCBcIkdldHRlZCBzdGF0dXM6IFwiLCBzdGF0dXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBmaXJlRXZlbnQoZXZlbnQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGhhbmRsZXJMaXN0ID0gdGhpcy5ldmVudHMuZ2V0KGV2ZW50KTtcbiAgICBpZiAoaGFuZGxlckxpc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBldmVudCBpbiBsaXN0IG9mIGV2ZW50c1wiKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBoYW5kbGVyIG9mIGhhbmRsZXJMaXN0KSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICAgIGNhc2UgXCJlcnJvclwiOlxuICAgICAgICAgIGhhbmRsZXIoe1xuICAgICAgICAgICAgc3RhdHVzOiB0aGlzLmVycm9yU3RhdHVzLFxuICAgICAgICAgICAgcHVyZ2U6ICgpID0+IHRoaXMucHVyZ2UoKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwdXJnZSgpOiBQcm9taXNlPElTdGF0dXM+IHtcbiAgICBsZXQgcmVzcG9uc2U6IElMQ0RNUG9ydEFuc3dlcjtcbiAgICB0cnkge1xuICAgICAgLy8gbG9nLmRlYnVnKFwiW0xDRE1dIFBVUkdJTkdcIik7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZE5ldyhDT01NQU5EX0NPREVTLlBVUkdFLCB1bmRlZmluZWQsIDIwMDAwKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdDxJU3RhdHVzPihlcnIpO1xuICAgIH1cbiAgICBjb25zdCBvayA9IHRoaXMuZXJyb3JDaGVjayhyZXNwb25zZS5kYXRhWzRdKTtcbiAgICBjb25zdCBzdGF0dXMgPSBgJHtvayA/IFwiU3VjY2Vzc2Z1bFwiIDogXCJUcnkgdG9cIn0gcHVyZ2UuIEN1cnJlbnQgZXJyb3Igc3RhdHVzOiAke0VSUk9SX0NPREVTLmdldChyZXNwb25zZS5kYXRhWzRdKX1gO1xuICAgIHJldHVybiB7XG4gICAgICBvayxcbiAgICAgIGVuYWJsZWQ6IHRoaXMuZW5hYmxlLFxuICAgICAgY29ubmVjdGVkOiB0cnVlLFxuICAgICAgc3RhdHVzLFxuICAgICAgcmF3UmVzcG9uc2U6IHJlc3BvbnNlLmRhdGFcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJvbVZlcnNpb24oKTogUHJvbWlzZTxJU3RhdHVzPiB7XG4gICAgbGV0IHJlc3BvbnNlOiBJTENETVBvcnRBbnN3ZXI7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGxvZy5kZWJ1ZyhcIltMRENNXSBST00gVkVSU0lPTlwiKTtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZW5kTmV3KENPTU1BTkRfQ09ERVMuUk9NX1ZFUlNJT04sIHVuZGVmaW5lZCwgMzAwMDApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfVxuICAgIGxldCBzdGF0dXMgPSBcIlJPTSBWZXJzaW9uOiBcIjtcbiAgICBjb25zdCBkYXRhOiBBcnJheTxudW1iZXI+ID0gcmVzcG9uc2UuZGF0YTtcbiAgICBmb3IgKGNvbnN0IGNoYXIgb2YgZGF0YS5zbGljZSg0LCBkYXRhLmxlbmd0aCAtIDIpKSB7XG4gICAgICBzdGF0dXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgb2s6IHJlc3BvbnNlLmFjayxcbiAgICAgIGVuYWJsZWQ6IHRoaXMuZW5hYmxlLFxuICAgICAgY29ubmVjdGVkOiB0cnVlLFxuICAgICAgc3RhdHVzLFxuICAgICAgcmF3UmVzcG9uc2U6IHJlc3BvbnNlLmRhdGFcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNoZWNrU3RhdHVzKCk6IFByb21pc2U8SVN0YXR1cz4ge1xuICAgIHRyeSB7XG4gICAgICBsb2cuZGVidWcoXCJbTENETV0gQ0hFQ0sgU1RBVFVTXCIpO1xuICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMuc2VuZE5ldyhDT01NQU5EX0NPREVTLlNUQVRVUywgdW5kZWZpbmVkLCAzMDAwMCk7XG4gICAgICBpZiAoIXJlc3AuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIltMQ0RNXSBEZXZpY2Ugbm90IHJlc3BvbnNlLiBQcm9iYWJseSBkaXNjb25uZWN0ZWQhXCIpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0YXR1cyA9IHBhcnNlU3RhdHVzKHJlc3AuZGF0YSwgdGhpcy5kZXZpY2VUeXBlKTtcbiAgICAgIHRoaXMubGFzdFN0YXR1cyA9IHN0YXR1cy5lcnJvclN0YXR1cztcbiAgICAgIHRoaXMuc2V0Q2Fzc2V0dGVzU3RhdHVzKHN0YXR1cyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBvazogdGhpcy5lcnJvckNoZWNrKHJlc3AuZGF0YVs1XSksXG4gICAgICAgIGVuYWJsZWQ6IHRoaXMuZW5hYmxlLFxuICAgICAgICBjb25uZWN0ZWQ6IHRydWUsXG4gICAgICAgIHN0YXR1czogXCJPS1wiLFxuICAgICAgICByYXdSZXNwb25zZTogcmVzcC5kYXRhXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZGVidWcoYHBvcnQ6ICR7dGhpcy5wb3J0Py5wb3J0fSBObyByZXNwb25zZSFgKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyByZXNwb25zZVwiKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqINCe0YLQv9GA0LDQstC60LAg0LrQvtC80LDQvdC00Ysg0LIg0LTQuNGB0L/QtdC90YHQtdGAXG4gICAqIEBwYXJhbSBjbWQg0LrQvtC80LDQvdC00LBcbiAgICogQHBhcmFtIGRhdGEg0LTQvtC/0L7Qu9C90LjRgtC10LvRjNC90YvQtSDQsdCw0LnRgtGLINC/0LDQutC10YLQsFxuICAgKiBAcGFyYW0gdGltZW91dCDRh9C10YDQtdC3INC60L7RgtC+0YDQvtC1INC/0YDQtdC60YDQsNGJ0LDQtdGC0YHRjyDRh9GC0LXQvdC40LVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEBzeW5jaHJvbml6ZWRcbiAgcHJpdmF0ZSBhc3luYyBzZW5kTmV3KGNtZDogbnVtYmVyLCBkYXRhOiBBcnJheTxudW1iZXI+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLCB0aW1lb3V0OiBudW1iZXIgPSAxNTAwMCk6IFByb21pc2U8SUxDRE1Qb3J0QW5zd2VyPiB7XG4gICAgaWYgKCF0aGlzLnBvcnQpIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJbTENETV06IFBvcnQgaXMgbm90IGV4aXN0cyFcIikpO1xuICAgIGlmICghQ09ERVNfT0ZfQ09NTUFORFMuaGFzKGNtZCkpIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgUmFuZ2VFcnJvcihcIltMQ0RNXTogSW52YWxpZCBjb21tYW5kIVwiKSk7XG5cbiAgICBjb25zdCByZXF1ZXN0OiBBcnJheTxudW1iZXI+ID0gW1NUQU5EQVJUX0JZVEVTLkVPVCwgU1RBTkRBUlRfQllURVMuSUQsIFNUQU5EQVJUX0JZVEVTLlNUWCwgY21kXTtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgcmVxdWVzdC5wdXNoKC4uLmRhdGEpO1xuICAgIH1cbiAgICByZXF1ZXN0LnB1c2goU1RBTkRBUlRfQllURVMuRVhUKTtcbiAgICByZXF1ZXN0LnB1c2goY2FsY3VsYXRlQ1JDKHJlcXVlc3QpKTtcbiAgICBjb25zdCBidWZmZXI6IEFycmF5PG51bWJlcj4gPSBbXTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYnl0ZXMgPSBhd2FpdCB0aGlzLnBvcnQ/LndyaXRlQW5kUmVhZChyZXF1ZXN0LCB0aW1lb3V0LCB0cnVlKSB8fCBbXTtcbiAgICAgIGJ1ZmZlci5wdXNoKC4uLmJ5dGVzKTtcbiAgICAgIC8vIGxvZy5kZWJ1ZyhcIltMQ0RNXVwiLGBwb3J0OiAke3RoaXMucG9ydD8ucG9ydH0uIFByaW1hcnkgcmVzcG9uc2UgaW4gbWV0aG9kIHNlbmQ6IGAsIGJ1ZmZlcik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2cuZXJyb3IoYEVycm9yIG9uIHBvcnQgJHt0aGlzLnBvcnQ/LnBvcnR9YCwgZXJyKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH1cbiAgICBsZXQgcHJldkluZGV4U09IID0gMDtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgaW5kZXhTT0ggPSBidWZmZXIuaW5kZXhPZihTVEFOREFSVF9CWVRFUy5TT0gsIHByZXZJbmRleFNPSCk7XG4gICAgICBjb25zdCBpbmRleEVYVCA9IGJ1ZmZlci5pbmRleE9mKFNUQU5EQVJUX0JZVEVTLkVYVCwgaW5kZXhTT0ggPT09IC0xID8gcHJldkluZGV4U09IIDogaW5kZXhTT0gpO1xuICAgICAgcHJldkluZGV4U09IID0gaW5kZXhTT0ggPT09IC0xID8gcHJldkluZGV4U09IIDogaW5kZXhTT0g7XG4gICAgICBjb25zdCBjaGVja1NPSCA9IGluZGV4U09IICE9PSAtMSAmJiBTVEFOREFSVF9CWVRFUy5JRCA9PT0gYnVmZmVyW2luZGV4U09IICsgMV07XG4gICAgICBjb25zdCBjaGVja0VYVCA9IGluZGV4RVhUID4gLTEgJiYgaW5kZXhFWFQgPD0gYnVmZmVyLmxlbmd0aCAtIDI7XG4gICAgICBpZiAoY2hlY2tTT0ggJiYgY2hlY2tFWFQpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoKGluZGV4RVhUID09PSAtMSB8fCBpbmRleFNPSCA9PT0gLTEpICYmIGluZGV4RVhUICE9PSBpbmRleFNPSCAmJiBidWZmZXIubGVuZ3RoID4gMjAwKSB7XG4gICAgICAgIHByZXZJbmRleFNPSCA9IDA7XG4gICAgICAgIGJ1ZmZlci5zcGxpY2UoMCwgYnVmZmVyLmxlbmd0aCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgYnl0ZXMgPSBhd2FpdCB0aGlzLnBvcnQ/LndyaXRlQW5kUmVhZChbU1RBTkRBUlRfQllURVMuTkNLXSwgdGltZW91dCkgfHwgW107XG4gICAgICAgICAgYnVmZmVyLnB1c2goLi4uYnl0ZXMpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGxvZy5lcnJvcihgUG9ydDogJHt0aGlzLnBvcnQ/LnBvcnR9ISBFcnJvciBvbiByZWFkaW5nIGRhdGEgYnkgd3JpdGVBbmRSZWFkIGFmdGVyIG1lc3NhZ2UgbG9zdGAsIGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYnl0ZXMgPSBhd2FpdCB0aGlzLnBvcnQ/LnJlZEJ5dGVzKHRpbWVvdXQpIHx8IFtdO1xuICAgICAgICBidWZmZXIucHVzaCguLi5ieXRlcyk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gbG9nLmVycm9yKGBQb3J0OiAke3RoaXMucG9ydD8ucG9ydH0hIEVycm9yIG9uIHJlYWRpbmcgZGF0YSBieSByZWFkQnl0ZXNgLCBlcnIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICAgIC8vIGxvZy5kZWJ1ZyhcIk5ldyBSZXNwb25zZVwiLCBidWZmZXIpO1xuICAgIH1cbiAgICAvLyBsb2cuZGVidWcoXCJFbmQgdmVyc2lvbiBvZiByZXNwb25zZTogXCIsIGJ1ZmZlcik7XG4gICAgY29uc3QgcmVzcCA9IGhhbmRsZUxEQ01BbnN3ZXIoYnVmZmVyKTtcblxuICAgIGlmIChyZXNwLmFjayB8fCByZXNwLmNyYykge1xuICAgICAgYXdhaXQgdGhpcy5wb3J0LndyaXRlKFtTVEFOREFSVF9CWVRFUy5BQ0tdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3A7XG4gIH1cblxuICBwcml2YXRlIGVycm9yQ2hlY2soY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgc3RhdHVzOiBTdHJpbmcgPSBFUlJPUl9DT0RFUy5nZXQoY29kZSkgfHwgXCJcIjtcbiAgICBpZiAoc3RhdHVzICE9PSBcIkdvb2RcIiAmJiBzdGF0dXMgIT09IFwiTm9ybWFsIFN0b3BcIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENhc3NldHRlc1N0YXR1cyAoc3RhdHVzOiBJTENETVN0YXR1cykge1xuICAgIGZvciAoY29uc3QgW2Nhc3NldHRlTnVtYmVyLCBjYXNzZXR0ZVN0YXR1c10gb2YgdGhpcy5jYXNzZXR0ZXNTdGF0dXMpIHtcbiAgICAgIGlmIChjYXNzZXR0ZU51bWJlciA9PT0gMSkge1xuICAgICAgICBjYXNzZXR0ZVN0YXR1cy5pc0V4aXN0ID0gIXN0YXR1cy5zZW5zb3IxU3RhdHVzLkNBU1NFVFRFMF9TRU5TT1I7XG4gICAgICAgIGlmIChzdGF0dXMuc2Vuc29yMFN0YXR1cy5DQVNTRVRURTBfU0VOU09SKSB7XG4gICAgICAgICAgY2Fzc2V0dGVTdGF0dXMuaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFwiQ0FTU0VUVEUxX1NFTlNPUlwiIGluIHN0YXR1cy5zZW5zb3IxU3RhdHVzKSB7XG4gICAgICAgIGNhc3NldHRlU3RhdHVzLmlzRXhpc3QgPSAhc3RhdHVzLnNlbnNvcjFTdGF0dXMuQ0FTU0VUVEUwX1NFTlNPUjtcbiAgICAgICAgaWYgKHN0YXR1cy5zZW5zb3IxU3RhdHVzLkNBU1NFVFRFMV9TRU5TT1IpIHtcbiAgICAgICAgICBjYXNzZXR0ZVN0YXR1cy5pc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuY2Fzc2V0dGVzU3RhdHVzLnNldChjYXNzZXR0ZU51bWJlciwgY2Fzc2V0dGVTdGF0dXMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0RGlzcGVuc2VNZXNzYWdlKGNvdW50OiBudW1iZXIpOiBBcnJheTxudW1iZXI+IHtcbiAgICBpZiAoY291bnQgPj0gMTAwKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIlZhbHVlIHRvIGRpc3BlbnNlIGlzIHRvIGJpZyFcIik7XG4gICAgfVxuICAgIHJldHVybiBjb3VudFxuICAgICAgLnRvU3RyaW5nKDEwKVxuICAgICAgLnBhZFN0YXJ0KDIsIFwiMFwiKVxuICAgICAgLnNwbGl0KFwiXCIpXG4gICAgICAubWFwKChlbCkgPT4gZWwuY2hhckNvZGVBdCgwKSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdGVzdERpc3BlbnNlKHVwcGVyOiBib29sZWFuID0gdHJ1ZSk6IFByb21pc2U8SVN0YXR1cz4ge1xuICAgIGxldCByZXNwb25zZTogSUxDRE1Qb3J0QW5zd2VyO1xuICAgIHRyeSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZE5ldyh1cHBlciA/IENPTU1BTkRfQ09ERVMuVVBQRVJfVEVTVF9ESVNQRU5TRSA6IENPTU1BTkRfQ09ERVMuTE9XRVJfVEVTVF9ESVNQRU5TRSwgdW5kZWZpbmVkLCA2MDAwMCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG4gICAgY29uc3QgcGFyc2VkUmVzcG9uc2UgPSBwYXJzZURpc3BlbnNlKHJlc3BvbnNlLmRhdGEpO1xuXG4gICAgY29uc3Qgc3RhdHVzOiBzdHJpbmcgPSBgVGVzdCBkaXNwZW5zZS4gRXJyb3Igc3RhdHVzOiAke3BhcnNlZFJlc3BvbnNlLmVycm9yVGV4dH1cXG5EaXNwZW5zZWQ6ICR7cGFyc2VkUmVzcG9uc2UuY2Fzc2V0dGVzWzBdLnJlcXVlc3RlZEJpbGxDSEt9XFxuUmVqZWN0ZWQ6ICR7cGFyc2VkUmVzcG9uc2UuY2Fzc2V0dGVzWzBdLnJlamVjdGVkQmlsbH1gO1xuICAgIHJldHVybiB7XG4gICAgICBvazogdGhpcy5lcnJvckNoZWNrKHBhcnNlZFJlc3BvbnNlLmVycm9yQ29kZSksXG4gICAgICBlbmFibGVkOiB0aGlzLmVuYWJsZSxcbiAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcbiAgICAgIHN0YXR1cyxcbiAgICAgIHJhd1Jlc3BvbnNlOiByZXNwb25zZS5kYXRhXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkaXNwZW5zZShjb3VudDogbnVtYmVyLCBjYXNzZXR0ZU51bWJlcjogbnVtYmVyID0gMSk6IFByb21pc2U8SURpc3BlbnNlQW5zd2VyPiB7XG4gICAgbGV0IGNvbW1hbmRDb2RlOiBudW1iZXI7XG5cbiAgICBzd2l0Y2ggKGNhc3NldHRlTnVtYmVyKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGNvbW1hbmRDb2RlID0gQ09NTUFORF9DT0RFUy5VUFBFUl9ESVNQRU5TRTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGNvbW1hbmRDb2RlID0gQ09NTUFORF9DT0RFUy5MT1dFUl9ESVNQRU5TRTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJVbmtub3duIGNhc3NldHRlIG51bWJlclwiKTtcbiAgICB9XG5cbiAgICBsZXQgYW5zd2VyOiBJTENETVBvcnRBbnN3ZXI7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMucHVyZ2UoKTtcbiAgICAgIGFuc3dlciA9IGF3YWl0IHRoaXMuc2VuZE5ldyhjb21tYW5kQ29kZSwgdGhpcy5mb3JtYXREaXNwZW5zZU1lc3NhZ2UoY291bnQpLCA2NTAwMCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcIkVycm9yIHdoaWxlIGdldHRpbmcgcmVzcG9uc2UgZnJvbSBkaXNwZW5zZXJcIik7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cbiAgICBsb2cuZGVidWcoXCJBbnN3ZXIgb24gZGlzcGVuc2U6IFwiLCBhbnN3ZXIpO1xuICAgIGNvbnN0IGRpc3BlbnNlZCA9IHBhcnNlRGlzcGVuc2UoYW5zd2VyLmRhdGEpO1xuICAgIHRoaXMubGFzdFN0YXR1cyA9IGRpc3BlbnNlZC5lcnJvclRleHQ7XG4gICAgZGlzcGVuc2VkLmNhc3NldHRlcy5mb3JFYWNoKChjYXNzZXR0ZSkgPT4ge1xuICAgICAgY29uc3QgaXNFeGlzdCA9IHRoaXMuY2Fzc2V0dGVzU3RhdHVzLmdldChjYXNzZXR0ZS5jYXNzZXR0ZU51bWJlcik/LmlzRXhpc3QgfHwgZmFsc2U7XG4gICAgICBsZXQgaXNFbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgaWYgKGNvdW50ID4gY2Fzc2V0dGUucmVxdWVzdGVkQmlsbEVYSVQpIHtcbiAgICAgICAgaXNFbXB0eSA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMuY2Fzc2V0dGVzU3RhdHVzLnNldChjYXNzZXR0ZS5jYXNzZXR0ZU51bWJlciwge1xuICAgICAgICBpc0V4aXN0LFxuICAgICAgICBpc0VtcHR5XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGlzcGVuc2VkO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG11bHRpRGlzcGVuc2UoZGlzcGVuc2VEYXRhOiBBcnJheTx7IGNvdW50OiBudW1iZXI7IGNhc3NldHRlTnVtYmVyOiBudW1iZXIgfT4pOiBQcm9taXNlPElEaXNwZW5zZUFuc3dlcj4ge1xuICAgIGlmIChkaXNwZW5zZURhdGEuc29tZSgoeyBjYXNzZXR0ZU51bWJlciB9KSA9PiBjYXNzZXR0ZU51bWJlciA+IHRoaXMubnVtYmVyT2ZDYXNzZXR0ZXMpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXG4gICAgICAgIGBbTENETV0gVGhpcyBkaXNwZW5zZXIgY2FuIGRpc3BlbnNlciBjYW4gZGlzcGVuc2Ugb25seSBmcm9tICR7dGhpcy5udW1iZXJPZkNhc3NldHRlc30gbnVtYmVyIG9mIGNhc3NldHRlcyEgSW52YWxpZCBpbnB1dCBudW1iZXIgb2YgY2Fzc2V0dGVzYFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGRpc3BlbnNlRGF0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbnN0IHsgY291bnQsIGNhc3NldHRlTnVtYmVyIH0gPSBkaXNwZW5zZURhdGFbMF07XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5kaXNwZW5zZShjb3VudCwgY2Fzc2V0dGVOdW1iZXIpO1xuICAgIH1cbiAgICBjb25zdCBmaXJzdERpc3BlbnNlOiBBcnJheTxudW1iZXI+ID0gdGhpcy5mb3JtYXREaXNwZW5zZU1lc3NhZ2UoZGlzcGVuc2VEYXRhLmZpbmQoKHsgY2Fzc2V0dGVOdW1iZXIgfSkgPT4gY2Fzc2V0dGVOdW1iZXIgPT09IDEpPy5jb3VudCB8fCAwKTtcbiAgICBjb25zdCBzZWNvbmREaXNwZW5zZTogQXJyYXk8bnVtYmVyPiA9IHRoaXMuZm9ybWF0RGlzcGVuc2VNZXNzYWdlKGRpc3BlbnNlRGF0YS5maW5kKCh7IGNhc3NldHRlTnVtYmVyIH0pID0+IGNhc3NldHRlTnVtYmVyID09PSAyKT8uY291bnQgfHwgMCk7XG4gICAgY29uc3QgZGF0YVRvRGlzcGVuc2U6IEFycmF5PG51bWJlcj4gPSBmaXJzdERpc3BlbnNlLmNvbmNhdChzZWNvbmREaXNwZW5zZSk7XG5cbiAgICBsZXQgYW5zd2VyOiBJTENETVBvcnRBbnN3ZXI7XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5wdXJnZSgpO1xuICAgICAgYW5zd2VyID0gYXdhaXQgdGhpcy5zZW5kTmV3KENPTU1BTkRfQ09ERVMuVVBQRVJfQU5EX0xPV0VSX0RJU1BFTlNFLCBkYXRhVG9EaXNwZW5zZSwgNjAwMDApO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIltMQ0RNXSBFcnJvciB3aGlsZSBnZXR0aW5nIHJlc3BvbnNlIG9uIG11bHRpRGlzcGVuc2U6IFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgY29uc3QgZGlzcGVuc2VkID0gcGFyc2VEaXNwZW5zZShhbnN3ZXIuZGF0YSk7XG4gICAgdGhpcy5sYXN0U3RhdHVzID0gZGlzcGVuc2VkLmVycm9yVGV4dDtcbiAgICBkaXNwZW5zZWQuY2Fzc2V0dGVzLmZvckVhY2goKGNhc3NldHRlKSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0RGlzcGVuc2UgPSBkaXNwZW5zZURhdGEuZmluZCgoe2Nhc3NldHRlTnVtYmVyfSkgPT4gY2Fzc2V0dGVOdW1iZXIgPT09IGNhc3NldHRlLmNhc3NldHRlTnVtYmVyKTtcbiAgICAgIGlmICghcmVxdWVzdERpc3BlbnNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGlzRXhpc3QgPSB0aGlzLmNhc3NldHRlc1N0YXR1cy5nZXQoY2Fzc2V0dGUuY2Fzc2V0dGVOdW1iZXIpPy5pc0V4aXN0IHx8IGZhbHNlO1xuICAgICAgbGV0IGlzRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgIGlmIChyZXF1ZXN0RGlzcGVuc2UuY291bnQgPiBjYXNzZXR0ZS5yZXF1ZXN0ZWRCaWxsRVhJVCkge1xuICAgICAgICBpc0VtcHR5ID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy5jYXNzZXR0ZXNTdGF0dXMuc2V0KGNhc3NldHRlLmNhc3NldHRlTnVtYmVyLCB7XG4gICAgICAgIGlzRXhpc3QsXG4gICAgICAgIGlzRW1wdHlcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBkaXNwZW5zZWQ7XG4gIH1cblxuICBnZXREaXNwZW5zZXJTdGF0dXMoKTogSURpc3BlbnNlclN0YXR1cyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHRoaXMuZGV2aWNlVHlwZSxcbiAgICAgIHN0YXR1czogdGhpcy5sYXN0U3RhdHVzLFxuICAgICAgb2s6IHRoaXMubGFzdFN0YXR1cyA9PT0gXCJHb29kXCIgfHwgdGhpcy5sYXN0U3RhdHVzID09PSBcIk5vcm1hbCBTdG9wXCIsXG4gICAgICBjYXNzZXR0ZXM6IHRoaXMuY2Fzc2V0dGVzU3RhdHVzXG4gICAgfVxuICB9XG59XG4iXX0=