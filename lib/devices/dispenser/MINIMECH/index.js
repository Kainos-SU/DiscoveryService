"use strict";

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.object.to-string.js");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/map"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

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

var _logger = require("../../../helpers/logger");

var _d4cQueue = require("d4c-queue");

var _class;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var log = new _logger.Logger("[MINIMECH]");
var MINIMECH = (_class = /*#__PURE__*/function (_BaseDispenser) {
  (0, _inherits2.default)(MINIMECH, _BaseDispenser);

  var _super = _createSuper(MINIMECH);

  function MINIMECH(port) {
    var _this;

    (0, _classCallCheck2.default)(this, MINIMECH);
    _this = _super.call(this, port);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "isEmpty", false);
    _this.deviceType = "[MINIMECH] ";
    _this.numberOfCassettes = 1;
    return _this;
  }

  (0, _createClass2.default)(MINIMECH, [{
    key: "checkStatus",
    value: function () {
      var _checkStatus = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var response, status, ok;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.sendMessage(_constants.COMMAND_CODES.STATUS, 10000);

              case 3:
                response = _context.sent;
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                throw new Error("Error while getting status of dispenser");

              case 9:
                status = (0, _helpers.parseStatus)(response);
                ok = !(status.FEED_SENSOR_BLOCKED || status.EXIT_SENSOR_BLOCKED || status.TIMING_WHEEL_SENSOR_BLOCKED);
                return _context.abrupt("return", {
                  ok: ok,
                  enabled: this.enable,
                  status: this.lastStatus,
                  connected: true,
                  rawResponse: response
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function checkStatus() {
        return _checkStatus.apply(this, arguments);
      }

      return checkStatus;
    }()
  }, {
    key: "dispense",
    value: function () {
      var _dispense = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(count, cassetteNumber) {
        var response;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(cassetteNumber > this.numberOfCassettes)) {
                  _context2.next = 2;
                  break;
                }

                throw new Error("Invalid number of cassette");

              case 2:
                _context2.prev = 2;
                _context2.next = 5;
                return this.billDispense(count);

              case 5:
                response = _context2.sent;
                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](2);
                log.debugError("Error occupy while dispensing:", _context2.t0);
                throw _context2.t0;

              case 12:
                log.debug("Response of dispensing: ", response);
                return _context2.abrupt("return", (0, _helpers.parseDispense)(response.raw));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 8]]);
      }));

      function dispense(_x, _x2) {
        return _dispense.apply(this, arguments);
      }

      return dispense;
    }()
  }, {
    key: "billDispense",
    value: function () {
      var _billDispense = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(count) {
        var response, status, dispensed, rejected;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.purge();

              case 3:
                _context3.next = 5;
                return this.sendMessage(_constants.COMMAND_CODES.DISPENSE, 120000, [count + 0x20]);

              case 5:
                response = _context3.sent;
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                throw new Error("Error occupy while getting response on dispensing!");

              case 11:
                status = _constants.STATUS_CODES.get(response[4]) || "";
                this.isEmpty = status === "Feed Failure";
                dispensed = response[5] - 0x20;
                rejected = response[6] - 0x20;
                return _context3.abrupt("return", {
                  status: status,
                  dispensed: dispensed,
                  rejected: rejected,
                  raw: response
                });

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function billDispense(_x3) {
        return _billDispense.apply(this, arguments);
      }

      return billDispense;
    }()
  }, {
    key: "getDispenserStatus",
    value: function getDispenserStatus() {
      return {
        status: this.lastStatus,
        type: this.deviceType,
        cassettes: new _map.default([[1, {
          isExist: true,
          isEmpty: this.isEmpty
        }]]),
        ok: this.lastStatus === "Good Operation"
      };
    }
  }, {
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var _this$port, status, _this$port2, response, _this$port3;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                log.debug("Try to init MINIMECH");
                _context4.next = 4;
                return (_this$port = this.port) === null || _this$port === void 0 ? void 0 : _this$port.open(_constants.PORT_SETTINGS);

              case 4:
                log.debug("Port open");
                _context4.next = 7;
                return this.checkStatus();

              case 7:
                status = _context4.sent;

                if (status.ok) {
                  _context4.next = 18;
                  break;
                }

                _context4.prev = 9;
                _context4.next = 12;
                return (_this$port2 = this.port) === null || _this$port2 === void 0 ? void 0 : _this$port2.close();

              case 12:
                _context4.next = 17;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4["catch"](9);
                log.debugError("Error while closing port. Device not respond");

              case 17:
                return _context4.abrupt("return", false);

              case 18:
                _context4.next = 20;
                return this.sendMessage(_constants.COMMAND_CODES.PURGE, 120000);

              case 20:
                response = _context4.sent;
                log.debug("Response on purge: ", response);
                this.lastStatus = _constants.STATUS_CODES.get(response[4]) || "";
                this.initLoop(800);
                return _context4.abrupt("return", true);

              case 27:
                _context4.prev = 27;
                _context4.t1 = _context4["catch"](0);
                _context4.prev = 29;
                _context4.next = 32;
                return (_this$port3 = this.port) === null || _this$port3 === void 0 ? void 0 : _this$port3.close();

              case 32:
                _context4.next = 37;
                break;

              case 34:
                _context4.prev = 34;
                _context4.t2 = _context4["catch"](29);
                log.debugError("Error while closing port: ", _context4.t2);

              case 37:
                log.debugError("Error occupy while try to initialize MINIMECH dispenser:\n", _context4.t1);
                return _context4.abrupt("return", false);

              case 39:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 27], [9, 14], [29, 34]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "loop",
    value: function loop() {}
  }, {
    key: "multiDispense",
    value: function () {
      var _multiDispense = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(dispenseData) {
        var response;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(dispenseData.length > 1 || dispenseData[0].cassetteNumber !== 1)) {
                  _context5.next = 2;
                  break;
                }

                throw new Error("Invalid cassette number");

              case 2:
                _context5.prev = 2;
                _context5.next = 5;
                return this.billDispense(dispenseData[0].count);

              case 5:
                response = _context5.sent;
                _context5.next = 12;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](2);
                log.debugError("Error while dispensing: ", _context5.t0);
                throw _context5.t0;

              case 12:
                log.debug("Response of dispensing: ", response);
                return _context5.abrupt("return", (0, _helpers.parseDispense)(response.raw));

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 8]]);
      }));

      function multiDispense(_x4) {
        return _multiDispense.apply(this, arguments);
      }

      return multiDispense;
    }()
  }, {
    key: "purge",
    value: function () {
      var _purge = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var response;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this.sendMessage(_constants.COMMAND_CODES.PURGE, 120000);

              case 3:
                response = _context6.sent;
                _context6.next = 10;
                break;

              case 6:
                _context6.prev = 6;
                _context6.t0 = _context6["catch"](0);
                log.debugError("Error occupy while purging!\n", _context6.t0);
                throw new Error("Error while purging: " + _context6.t0.message);

              case 10:
                this.lastStatus = _constants.STATUS_CODES.get(response[4]) || "";
                return _context6.abrupt("return", {
                  ok: !(response[4] - 0x20),
                  enabled: this.enable,
                  status: this.lastStatus,
                  connected: true,
                  rawResponse: response
                });

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 6]]);
      }));

      function purge() {
        return _purge.apply(this, arguments);
      }

      return purge;
    }()
  }, {
    key: "romVersion",
    value: function () {
      var _romVersion = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var _context7;

        var response, data0, data1, ROM_Version;
        return _regenerator.default.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return this.sendMessage(_constants.COMMAND_CODES.CONFIGURATIONS_STATUS);

              case 3:
                response = _context8.sent;
                _context8.next = 10;
                break;

              case 6:
                _context8.prev = 6;
                _context8.t0 = _context8["catch"](0);
                log.debugError("Error while getting ROM version:\n", _context8.t0);
                throw new Error("Error while getting ROM Version:\n" + _context8.t0.message);

              case 10:
                data0 = response[4];
                data1 = response[5];
                ROM_Version = (0, _concat.default)(_context7 = "2011-".concat(data0 - 0x20, ".")).call(_context7, data1 - 0x20);
                return _context8.abrupt("return", {
                  ok: true,
                  enabled: this.enable,
                  connected: true,
                  status: ROM_Version,
                  rawResponse: response
                });

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee7, this, [[0, 6]]);
      }));

      function romVersion() {
        return _romVersion.apply(this, arguments);
      }

      return romVersion;
    }()
  }, {
    key: "testDispense",
    value: function testDispense() {
      return _promise.default.resolve({
        connected: true,
        enabled: this.enable,
        ok: true,
        rawResponse: [],
        status: "Test Dispense"
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this$port4;

      return (_this$port4 = this.port) === null || _this$port4 === void 0 ? void 0 : _this$port4.write((0, _helpers.formatMessage)(_constants.COMMAND_CODES.RESET));
    }
  }, {
    key: "sendMessage",
    value: function () {
      var _sendMessage = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(command) {
        var timeout,
            data,
            message,
            response,
            _this$port5,
            indexOfStart,
            _this$port6,
            _response,
            bytes,
            _args8 = arguments;

        return _regenerator.default.wrap(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                timeout = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : 500;
                data = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : [];
                message = (0, _helpers.formatMessage)(command, data);
                log.debug("Message to send: ", message);
                _context9.prev = 4;
                log.debug("Getting response");
                _context9.next = 8;
                return (_this$port5 = this.port) === null || _this$port5 === void 0 ? void 0 : _this$port5.writeAndRead(message, timeout);

              case 8:
                _context9.t0 = _context9.sent;

                if (_context9.t0) {
                  _context9.next = 11;
                  break;
                }

                _context9.t0 = [];

              case 11:
                response = _context9.t0;
                log.debug("Response: ", response);
                _context9.next = 18;
                break;

              case 15:
                _context9.prev = 15;
                _context9.t1 = _context9["catch"](4);
                throw new Error("Error while waiting first part of response!");

              case 18:
                if (!true) {
                  _context9.next = 39;
                  break;
                }

                indexOfStart = (0, _indexOf.default)(response).call(response, _constants.STANDARD_BYTES.START_OF_HEADER);
                response = (0, _slice.default)(response).call(response, indexOfStart);

                if ((0, _helpers.isValidResponse)(response)) {
                  _context9.next = 36;
                  break;
                }

                _context9.prev = 22;
                _context9.next = 25;
                return (_this$port6 = this.port) === null || _this$port6 === void 0 ? void 0 : _this$port6.redBytes();

              case 25:
                _context9.t2 = _context9.sent;

                if (_context9.t2) {
                  _context9.next = 28;
                  break;
                }

                _context9.t2 = [];

              case 28:
                bytes = _context9.t2;

                (_response = response).push.apply(_response, (0, _toConsumableArray2.default)(bytes));

                _context9.next = 35;
                break;

              case 32:
                _context9.prev = 32;
                _context9.t3 = _context9["catch"](22);
                throw new Error("Error while getting rest of response!");

              case 35:
                return _context9.abrupt("continue", 18);

              case 36:
                return _context9.abrupt("return", response);

              case 39:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee8, this, [[4, 15], [22, 32]]);
      }));

      function sendMessage(_x5) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
  }]);
  return MINIMECH;
}(_IDispenser.BaseDispenser), ((0, _applyDecoratedDescriptor2.default)(_class.prototype, "sendMessage", [_d4cQueue.synchronized], (0, _getOwnPropertyDescriptor.default)(_class.prototype, "sendMessage"), _class.prototype)), _class);
exports.default = MINIMECH;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZXZpY2VzL2Rpc3BlbnNlci9NSU5JTUVDSC9pbmRleC50cyJdLCJuYW1lcyI6WyJsb2ciLCJMb2dnZXIiLCJNSU5JTUVDSCIsInBvcnQiLCJkZXZpY2VUeXBlIiwibnVtYmVyT2ZDYXNzZXR0ZXMiLCJzZW5kTWVzc2FnZSIsIkNPTU1BTkRfQ09ERVMiLCJTVEFUVVMiLCJyZXNwb25zZSIsIkVycm9yIiwic3RhdHVzIiwib2siLCJGRUVEX1NFTlNPUl9CTE9DS0VEIiwiRVhJVF9TRU5TT1JfQkxPQ0tFRCIsIlRJTUlOR19XSEVFTF9TRU5TT1JfQkxPQ0tFRCIsImVuYWJsZWQiLCJlbmFibGUiLCJsYXN0U3RhdHVzIiwiY29ubmVjdGVkIiwicmF3UmVzcG9uc2UiLCJjb3VudCIsImNhc3NldHRlTnVtYmVyIiwiYmlsbERpc3BlbnNlIiwiZGVidWdFcnJvciIsImRlYnVnIiwicmF3IiwicHVyZ2UiLCJESVNQRU5TRSIsIlNUQVRVU19DT0RFUyIsImdldCIsImlzRW1wdHkiLCJkaXNwZW5zZWQiLCJyZWplY3RlZCIsInR5cGUiLCJjYXNzZXR0ZXMiLCJpc0V4aXN0Iiwib3BlbiIsIlBPUlRfU0VUVElOR1MiLCJjaGVja1N0YXR1cyIsImNsb3NlIiwiUFVSR0UiLCJpbml0TG9vcCIsImRpc3BlbnNlRGF0YSIsImxlbmd0aCIsIm1lc3NhZ2UiLCJDT05GSUdVUkFUSU9OU19TVEFUVVMiLCJkYXRhMCIsImRhdGExIiwiUk9NX1ZlcnNpb24iLCJyZXNvbHZlIiwid3JpdGUiLCJSRVNFVCIsImNvbW1hbmQiLCJ0aW1lb3V0IiwiZGF0YSIsIndyaXRlQW5kUmVhZCIsImluZGV4T2ZTdGFydCIsIlNUQU5EQVJEX0JZVEVTIiwiU1RBUlRfT0ZfSEVBREVSIiwicmVkQnl0ZXMiLCJieXRlcyIsInB1c2giLCJCYXNlRGlzcGVuc2VyIiwic3luY2hyb25pemVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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O0FBa0JRLDZCQUFBcEQsUUFBUSxFQUFDcUQsSUFBVCxtREFBaUJELEtBQWpCOztBQWxCUjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQW9CYyxJQUFJbkQsS0FBSixDQUFVLHVDQUFWLENBcEJkOztBQUFBO0FBQUE7O0FBQUE7QUFBQSxrREF3QldELFFBeEJYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7RUE3S29Dc0QseUIsOEVBNktuQ0Msc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRGlzcGVuc2VyLCBJRGlzcGVuc2VBbnN3ZXIsIElEaXNwZW5zZXJTdGF0dXMgfSBmcm9tIFwiLi4vLi4vbW9kZWwvSURpc3BlbnNlclwiO1xuaW1wb3J0IHsgSVNlcmlhbFBvcnQgfSBmcm9tIFwiLi4vLi4vc2VyaWFsL3R5cGVzXCI7XG5pbXBvcnQgeyBJU3RhdHVzIH0gZnJvbSBcIi4uLy4uL21vZGVsL0lTdGF0dXNcIjtcbmltcG9ydCB7IENPTU1BTkRfQ09ERVMsIFNUQU5EQVJEX0JZVEVTLCBTVEFUVVNfQ09ERVMsIFBPUlRfU0VUVElOR1MgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGZvcm1hdE1lc3NhZ2UsIGlzVmFsaWRSZXNwb25zZSwgcGFyc2VEaXNwZW5zZSwgcGFyc2VTdGF0dXMgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vLi4vLi4vaGVscGVycy9sb2dnZXJcIjtcbmltcG9ydCB7IHN5bmNocm9uaXplZCB9IGZyb20gXCJkNGMtcXVldWVcIjtcblxuY29uc3QgbG9nID0gbmV3IExvZ2dlcihcIltNSU5JTUVDSF1cIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1JTklNRUNIIGV4dGVuZHMgQmFzZURpc3BlbnNlciB7XG5cbiAgcHJpdmF0ZSBpc0VtcHR5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBvcnQ6IElTZXJpYWxQb3J0KSB7XG4gICAgc3VwZXIocG9ydCk7XG4gICAgdGhpcy5kZXZpY2VUeXBlID0gXCJbTUlOSU1FQ0hdIFwiO1xuICAgIHRoaXMubnVtYmVyT2ZDYXNzZXR0ZXMgPSAxO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNoZWNrU3RhdHVzKCk6IFByb21pc2U8SVN0YXR1cz4ge1xuICAgIGxldCByZXNwb25zZTogQXJyYXk8bnVtYmVyPjtcbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnNlbmRNZXNzYWdlKENPTU1BTkRfQ09ERVMuU1RBVFVTLCAxMDAwMCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIHdoaWxlIGdldHRpbmcgc3RhdHVzIG9mIGRpc3BlbnNlclwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0dXMgPSBwYXJzZVN0YXR1cyhyZXNwb25zZSk7XG4gICAgY29uc3Qgb2s6IGJvb2xlYW4gPSAhKHN0YXR1cy5GRUVEX1NFTlNPUl9CTE9DS0VEIHx8IHN0YXR1cy5FWElUX1NFTlNPUl9CTE9DS0VEIHx8IHN0YXR1cy5USU1JTkdfV0hFRUxfU0VOU09SX0JMT0NLRUQpO1xuICAgIHJldHVybiB7XG4gICAgICBvayxcbiAgICAgIGVuYWJsZWQ6IHRoaXMuZW5hYmxlLFxuICAgICAgc3RhdHVzOiB0aGlzLmxhc3RTdGF0dXMsXG4gICAgICBjb25uZWN0ZWQ6IHRydWUsXG4gICAgICByYXdSZXNwb25zZTogcmVzcG9uc2UsXG4gICAgfTtcblxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRpc3BlbnNlKGNvdW50OiBudW1iZXIsIGNhc3NldHRlTnVtYmVyOiBudW1iZXIpOiBQcm9taXNlPElEaXNwZW5zZUFuc3dlcj4ge1xuICAgIGlmIChjYXNzZXR0ZU51bWJlciA+IHRoaXMubnVtYmVyT2ZDYXNzZXR0ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbnVtYmVyIG9mIGNhc3NldHRlXCIpO1xuICAgIH1cbiAgICBsZXQgcmVzcG9uc2U6IHsgc3RhdHVzOiBzdHJpbmcsIGRpc3BlbnNlZDogbnVtYmVyLCByZWplY3RlZDogbnVtYmVyLCByYXc6IEFycmF5PG51bWJlcj4gfTtcbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmJpbGxEaXNwZW5zZShjb3VudCk7XG4gICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgbG9nLmRlYnVnRXJyb3IoXCJFcnJvciBvY2N1cHkgd2hpbGUgZGlzcGVuc2luZzpcIiwgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgbG9nLmRlYnVnKFwiUmVzcG9uc2Ugb2YgZGlzcGVuc2luZzogXCIsIHJlc3BvbnNlKTtcblxuICAgIHJldHVybiBwYXJzZURpc3BlbnNlKHJlc3BvbnNlLnJhdyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGJpbGxEaXNwZW5zZSAoY291bnQ6IG51bWJlcik6IFByb21pc2U8eyBzdGF0dXM6IHN0cmluZywgZGlzcGVuc2VkOiBudW1iZXIsIHJlamVjdGVkOiBudW1iZXIsIHJhdzogQXJyYXk8bnVtYmVyPiB9PiB7XG4gICAgbGV0IHJlc3BvbnNlOiBBcnJheTxudW1iZXI+O1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLnB1cmdlKCk7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZE1lc3NhZ2UoQ09NTUFORF9DT0RFUy5ESVNQRU5TRSwgMTIwMDAwLCBbY291bnQgKyAweDIwXSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciBvY2N1cHkgd2hpbGUgZ2V0dGluZyByZXNwb25zZSBvbiBkaXNwZW5zaW5nIVwiKTtcbiAgICB9XG4gICAgY29uc3Qgc3RhdHVzOiBzdHJpbmcgPSBTVEFUVVNfQ09ERVMuZ2V0KHJlc3BvbnNlWzRdKSB8fCBcIlwiO1xuICAgIHRoaXMuaXNFbXB0eSA9IHN0YXR1cyA9PT0gXCJGZWVkIEZhaWx1cmVcIjtcbiAgICBjb25zdCBkaXNwZW5zZWQ6IG51bWJlciA9IHJlc3BvbnNlWzVdIC0gMHgyMDtcbiAgICBjb25zdCByZWplY3RlZDogbnVtYmVyID0gcmVzcG9uc2VbNl0gLSAweDIwO1xuICAgIHJldHVybiB7IHN0YXR1cywgZGlzcGVuc2VkLCByZWplY3RlZCwgcmF3OiByZXNwb25zZSB9O1xuICB9XG5cbiAgZ2V0RGlzcGVuc2VyU3RhdHVzKCk6IElEaXNwZW5zZXJTdGF0dXMge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHRoaXMubGFzdFN0YXR1cyxcbiAgICAgIHR5cGU6IHRoaXMuZGV2aWNlVHlwZSxcbiAgICAgIGNhc3NldHRlczogbmV3IE1hcChbXG4gICAgICAgIFsxLCB7IGlzRXhpc3Q6IHRydWUsIGlzRW1wdHk6IHRoaXMuaXNFbXB0eSB9XVxuICAgICAgXSksXG4gICAgICBvazogdGhpcy5sYXN0U3RhdHVzID09PSBcIkdvb2QgT3BlcmF0aW9uXCJcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGluaXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdHJ5IHtcbiAgICAgIGxvZy5kZWJ1ZyhcIlRyeSB0byBpbml0IE1JTklNRUNIXCIpXG4gICAgICBhd2FpdCB0aGlzLnBvcnQ/Lm9wZW4oUE9SVF9TRVRUSU5HUyk7XG4gICAgICBsb2cuZGVidWcoXCJQb3J0IG9wZW5cIilcbiAgICAgIGNvbnN0IHN0YXR1cyA9IGF3YWl0IHRoaXMuY2hlY2tTdGF0dXMoKTtcbiAgICAgIGlmICghc3RhdHVzLm9rKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wb3J0Py5jbG9zZSgpXG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIGxvZy5kZWJ1Z0Vycm9yKFwiRXJyb3Igd2hpbGUgY2xvc2luZyBwb3J0LiBEZXZpY2Ugbm90IHJlc3BvbmRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgbGV0IHJlc3BvbnNlOiBBcnJheTxudW1iZXI+ID0gYXdhaXQgdGhpcy5zZW5kTWVzc2FnZShDT01NQU5EX0NPREVTLlBVUkdFLCAxMjAwMDApO1xuICAgICAgbG9nLmRlYnVnKFwiUmVzcG9uc2Ugb24gcHVyZ2U6IFwiLCByZXNwb25zZSk7XG4gICAgICB0aGlzLmxhc3RTdGF0dXMgPSBTVEFUVVNfQ09ERVMuZ2V0KHJlc3BvbnNlWzRdKSB8fCBcIlwiO1xuICAgICAgdGhpcy5pbml0TG9vcCg4MDApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMucG9ydD8uY2xvc2UoKVxuICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICBsb2cuZGVidWdFcnJvcihcIkVycm9yIHdoaWxlIGNsb3NpbmcgcG9ydDogXCIsIGVycm9yKTtcbiAgICAgIH1cbiAgICAgIGxvZy5kZWJ1Z0Vycm9yKFwiRXJyb3Igb2NjdXB5IHdoaWxlIHRyeSB0byBpbml0aWFsaXplIE1JTklNRUNIIGRpc3BlbnNlcjpcXG5cIiwgZXJyb3IpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBsb29wKCk6IHZvaWQge1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG11bHRpRGlzcGVuc2UoZGlzcGVuc2VEYXRhOiBBcnJheTx7IGNvdW50OiBudW1iZXI7IGNhc3NldHRlTnVtYmVyOiBudW1iZXIgfT4pOiBQcm9taXNlPElEaXNwZW5zZUFuc3dlcj4ge1xuICAgIGlmICgoZGlzcGVuc2VEYXRhLmxlbmd0aCA+IDEpIHx8IChkaXNwZW5zZURhdGFbMF0uY2Fzc2V0dGVOdW1iZXIgIT09IDEpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGNhc3NldHRlIG51bWJlclwiKTtcbiAgICB9XG4gICAgbGV0IHJlc3BvbnNlOiB7ZGlzcGVuc2VkOiBudW1iZXIsIHJlamVjdGVkOiBudW1iZXIsIHJhdzogQXJyYXk8bnVtYmVyPn07XG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5iaWxsRGlzcGVuc2UoZGlzcGVuc2VEYXRhWzBdLmNvdW50KTtcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICBsb2cuZGVidWdFcnJvcihcIkVycm9yIHdoaWxlIGRpc3BlbnNpbmc6IFwiLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgbG9nLmRlYnVnKFwiUmVzcG9uc2Ugb2YgZGlzcGVuc2luZzogXCIsIHJlc3BvbnNlKTtcbiAgICByZXR1cm4gcGFyc2VEaXNwZW5zZShyZXNwb25zZS5yYXcpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHB1cmdlKCk6IFByb21pc2U8SVN0YXR1cz4ge1xuICAgIGxldCByZXNwb25zZTogQXJyYXk8bnVtYmVyPjtcbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnNlbmRNZXNzYWdlKENPTU1BTkRfQ09ERVMuUFVSR0UsIDEyMDAwMCk7XG4gICAgfSBjYXRjaChlcnJvcjogYW55KSB7XG4gICAgICBsb2cuZGVidWdFcnJvcihcIkVycm9yIG9jY3VweSB3aGlsZSBwdXJnaW5nIVxcblwiLCBlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciB3aGlsZSBwdXJnaW5nOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgICB0aGlzLmxhc3RTdGF0dXMgPSBTVEFUVVNfQ09ERVMuZ2V0KHJlc3BvbnNlWzRdKSB8fCBcIlwiO1xuICAgIHJldHVybiB7XG4gICAgICBvazogIShyZXNwb25zZVs0XSAtIDB4MjApLFxuICAgICAgZW5hYmxlZDogdGhpcy5lbmFibGUsXG4gICAgICBzdGF0dXM6IHRoaXMubGFzdFN0YXR1cyxcbiAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcbiAgICAgIHJhd1Jlc3BvbnNlOiByZXNwb25zZSxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJvbVZlcnNpb24oKTogUHJvbWlzZTxJU3RhdHVzPiB7XG4gICAgbGV0IHJlc3BvbnNlOiBBcnJheTxudW1iZXI+O1xuICAgIHRyeSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZE1lc3NhZ2UoQ09NTUFORF9DT0RFUy5DT05GSUdVUkFUSU9OU19TVEFUVVMpO1xuICAgIH0gY2F0Y2goZXJyb3I6IGFueSkge1xuICAgICAgbG9nLmRlYnVnRXJyb3IoXCJFcnJvciB3aGlsZSBnZXR0aW5nIFJPTSB2ZXJzaW9uOlxcblwiLCBlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciB3aGlsZSBnZXR0aW5nIFJPTSBWZXJzaW9uOlxcblwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEwOiBudW1iZXIgPSByZXNwb25zZVs0XTtcbiAgICBjb25zdCBkYXRhMTogbnVtYmVyID0gcmVzcG9uc2VbNV07XG4gICAgY29uc3QgUk9NX1ZlcnNpb246IHN0cmluZyA9IGAyMDExLSR7ZGF0YTAgLSAweDIwfS4ke2RhdGExIC0gMHgyMH1gO1xuICAgIHJldHVybiB7XG4gICAgICBvazogdHJ1ZSxcbiAgICAgIGVuYWJsZWQ6IHRoaXMuZW5hYmxlLFxuICAgICAgY29ubmVjdGVkOiB0cnVlLFxuICAgICAgc3RhdHVzOiBST01fVmVyc2lvbixcbiAgICAgIHJhd1Jlc3BvbnNlOiByZXNwb25zZVxuICAgIH07XG4gIH1cblxuICB0ZXN0RGlzcGVuc2UoKTogUHJvbWlzZTxJU3RhdHVzPiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICBjb25uZWN0ZWQ6IHRydWUsXG4gICAgICBlbmFibGVkOiB0aGlzLmVuYWJsZSxcbiAgICAgIG9rOiB0cnVlLFxuICAgICAgcmF3UmVzcG9uc2U6IFtdLFxuICAgICAgc3RhdHVzOiBcIlRlc3QgRGlzcGVuc2VcIlxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3J0Py53cml0ZShmb3JtYXRNZXNzYWdlKENPTU1BTkRfQ09ERVMuUkVTRVQpKTtcbiAgfVxuXG4gIEBzeW5jaHJvbml6ZWRcbiAgcHJpdmF0ZSBhc3luYyBzZW5kTWVzc2FnZShjb21tYW5kOiBDT01NQU5EX0NPREVTLCB0aW1lb3V0OiBudW1iZXIgPSA1MDAsIGRhdGE6IEFycmF5PG51bWJlcj4gPSBbXSk6IFByb21pc2U8QXJyYXk8bnVtYmVyPj4ge1xuICAgIGNvbnN0IG1lc3NhZ2U6IEFycmF5PG51bWJlcj4gPSBmb3JtYXRNZXNzYWdlKGNvbW1hbmQsIGRhdGEpO1xuICAgIGxvZy5kZWJ1ZyhcIk1lc3NhZ2UgdG8gc2VuZDogXCIsIG1lc3NhZ2UpO1xuICAgIGxldCByZXNwb25zZTogQXJyYXk8bnVtYmVyPjtcbiAgICB0cnkge1xuICAgICAgbG9nLmRlYnVnKFwiR2V0dGluZyByZXNwb25zZVwiKVxuICAgICAgcmVzcG9uc2UgID0gYXdhaXQgdGhpcy5wb3J0Py53cml0ZUFuZFJlYWQobWVzc2FnZSwgdGltZW91dCkgfHwgW107XG4gICAgICBsb2cuZGVidWcoXCJSZXNwb25zZTogXCIsIHJlc3BvbnNlKVxuICAgIH0gY2F0Y2gge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3Igd2hpbGUgd2FpdGluZyBmaXJzdCBwYXJ0IG9mIHJlc3BvbnNlIVwiKTtcbiAgICB9XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IGluZGV4T2ZTdGFydDogbnVtYmVyID0gcmVzcG9uc2UuaW5kZXhPZihTVEFOREFSRF9CWVRFUy5TVEFSVF9PRl9IRUFERVIpO1xuICAgICAgcmVzcG9uc2UgPSByZXNwb25zZS5zbGljZShpbmRleE9mU3RhcnQpO1xuICAgICAgaWYgKCFpc1ZhbGlkUmVzcG9uc2UocmVzcG9uc2UpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgYnl0ZXMgPSBhd2FpdCB0aGlzLnBvcnQ/LnJlZEJ5dGVzKCkgfHwgW107XG4gICAgICAgICAgcmVzcG9uc2UucHVzaCguLi5ieXRlcyk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIHdoaWxlIGdldHRpbmcgcmVzdCBvZiByZXNwb25zZSFcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICB9XG5cbn0iXX0=