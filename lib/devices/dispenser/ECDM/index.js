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

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.join.js");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/values"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

var _lastIndexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/last-index-of"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/applyDecoratedDescriptor"));

var _logger = require("../../../helpers/logger");

var _IDispenser = require("../../model/IDispenser");

var _constants = require("./constants");

var _helpers = require("./helpers");

var _d4cQueue = require("d4c-queue");

var _class;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context23; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty2(_context23 = Object.prototype.toString.call(o)).call(_context23, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var log = new _logger.Logger("[PULOON ECDM-200]: ");
var portSettings = {
  baudRate: 9600,
  bufferSize: 255,
  dataBit: 8,
  flowControl: "none",
  parity: "none",
  stopBits: 1
};
var ECDM = (_class = /*#__PURE__*/function (_BaseDispenser) {
  (0, _inherits2.default)(ECDM, _BaseDispenser);

  var _super = _createSuper(ECDM);

  function ECDM(port) {
    var _this;

    (0, _classCallCheck2.default)(this, ECDM);
    _this = _super.call(this, port);
    _this.deviceType = "PULOON ECDM-200";
    return _this;
  }

  (0, _createClass2.default)(ECDM, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this2 = this;

        var _this$port, _this$port2, _context, response, status, _this$port3;

        return _regenerator.default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                log.debug("Try to init device on port", (_this$port = this.port) === null || _this$port === void 0 ? void 0 : _this$port.port);
                _context2.next = 4;
                return (_this$port2 = this.port) === null || _this$port2 === void 0 ? void 0 : _this$port2.open(portSettings);

              case 4:
                _context2.next = 6;
                return this.reset();

              case 6:
                response = _context2.sent;
                log.debug("Response from device: ", response);
                _context2.next = 10;
                return this.getECDMStatus();

              case 10:
                status = _context2.sent;
                (0, _forEach.default)(_context = status.cassettes).call(_context, function (cassette) {
                  if (cassette.inserted) {
                    _this2.numberOfCassettes++;

                    _this2.cassettesStatus.set(cassette.cassetteNumber, {
                      isEmpty: false,
                      isExist: !cassette.status.CASSETTE_EXIST.state
                    });
                  }
                });
                log.debug("Number of cassettes: ", this.numberOfCassettes);
                log.debug("Cassettes: ", this.cassettesStatus);
                this.initLoop(5000);
                return _context2.abrupt("return", true);

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](0);
                log.error("Error while reseting dispenser!", _context2.t0);
                _context2.next = 23;
                return (_this$port3 = this.port) === null || _this$port3 === void 0 ? void 0 : _this$port3.close();

              case 23:
                return _context2.abrupt("return", false);

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this, [[0, 18]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "reset",
    value: function () {
      var _reset = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var response, indexSoh, indexExt, data, ack, crc;
        return _regenerator.default.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.send(_constants.COMMAND_CODES.RESET, 4500);

              case 3:
                response = _context3.sent;
                indexSoh = (0, _indexOf.default)(response).call(response, _constants.STANDART_BYTES.SOH);
                indexExt = (0, _indexOf.default)(response).call(response, _constants.STANDART_BYTES.EXT, indexSoh);
                data = (0, _slice.default)(response).call(response, indexSoh, indexExt + 2);
                ack = (0, _includes.default)(response).call(response, _constants.STANDART_BYTES.ACK);
                crc = (0, _helpers.checkXorCrc)(data);
                return _context3.abrupt("return", {
                  ack: ack,
                  error: 0x30 === data[4],
                  crc: crc,
                  data: data
                });

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", _promise.default.reject(_context3.t0));

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this, [[0, 12]]);
      }));

      function reset() {
        return _reset.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: "checkStatus",
    value: function () {
      var _checkStatus = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _context4, _context5, _context6, _context7, _context8, dispensersStatus, ok, status, indexSoh, indexExt, rawResponse;

        return _regenerator.default.wrap(function _callee3$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return this.getECDMStatus();

              case 3:
                dispensersStatus = _context9.sent;
                ok = true;
                status = "";

                if (dispensersStatus.errorCode) {
                  ok = false;
                  status += "[ECDM] Error: " + dispensersStatus.error + "\n";
                }

                (0, _forEach.default)(_context4 = (0, _values.default)(dispensersStatus.DISP0)).call(_context4, function (sensor) {
                  if (!sensor.state) {
                    return;
                  }

                  ok = false;

                  if (!(0, _includes.default)(status).call(status, "[ECDM] Sensor 0:\n")) {
                    status += "[ECDM] Sensor 0:\n";
                  }

                  status += sensor.description + ": error\n";
                });
                (0, _forEach.default)(_context5 = (0, _values.default)(dispensersStatus.DISP1)).call(_context5, function (sensor) {
                  if (!sensor.state) {
                    return;
                  }

                  ok = false;

                  if (!(0, _includes.default)(status).call(status, "[ECDM] Sensor 1:\n")) {
                    status += "[ECDM] Sensor 1:\n";
                  }

                  status += sensor.description + ": error\n";
                });

                if (status.length) {
                  status = "OK!";
                }

                indexSoh = (0, _indexOf.default)(_context6 = dispensersStatus.rawResponse).call(_context6, _constants.STANDART_BYTES.SOH);
                indexExt = (0, _indexOf.default)(_context7 = dispensersStatus.rawResponse).call(_context7, _constants.STANDART_BYTES.EXT, indexSoh);
                rawResponse = (0, _slice.default)(_context8 = dispensersStatus.rawResponse).call(_context8, indexSoh, indexExt + 2);
                return _context9.abrupt("return", {
                  ok: ok,
                  enabled: this.enable,
                  connected: true,
                  status: status,
                  rawResponse: rawResponse
                });

              case 16:
                _context9.prev = 16;
                _context9.t0 = _context9["catch"](0);
                return _context9.abrupt("return", _promise.default.reject(new Error("[ECDM] error getting response from dispenser: " + _context9.t0.message)));

              case 19:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee3, this, [[0, 16]]);
      }));

      function checkStatus() {
        return _checkStatus.apply(this, arguments);
      }

      return checkStatus;
    }()
  }, {
    key: "purge",
    value: function () {
      var _purge = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var response, ok, status;
        return _regenerator.default.wrap(function _callee4$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return this.purgeDispenser();

              case 3:
                response = _context10.sent;
                ok = true;
                status = "Successful Purge!";

                if (response.errorCode) {
                  status = "Purge with error status:\n" + response.error;
                }

                return _context10.abrupt("return", {
                  ok: ok,
                  enabled: this.enable,
                  connected: true,
                  status: status,
                  rawResponse: response.rawResponse
                });

              case 10:
                _context10.prev = 10;
                _context10.t0 = _context10["catch"](0);
                return _context10.abrupt("return", _promise.default.reject(new Error("[ECDM] Error while purge! " + _context10.t0.message)));

              case 13:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee4, this, [[0, 10]]);
      }));

      function purge() {
        return _purge.apply(this, arguments);
      }

      return purge;
    }()
  }, {
    key: "romVersion",
    value: function romVersion() {
      return _promise.default.resolve({
        ok: false,
        enabled: this.enable,
        connected: true,
        status: "PULON ECDM-200 does not support this command!",
        rawResponse: []
      });
    }
  }, {
    key: "dispense",
    value: function dispense(count, cassetteNumber) {
      return this.multiDispense([{
        count: count,
        cassetteNumber: cassetteNumber
      }]);
    }
  }, {
    key: "multiDispense",
    value: function () {
      var _multiDispense = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(dispenseData) {
        var _context11,
            _this3 = this;

        var data, response, indexOfSoh, indexOfExt, dataToParse, dispenseResponse;
        return _regenerator.default.wrap(function _callee5$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.purgeDispenser();

              case 2:
                data = (0, _helpers.prepareDataForDispense)((0, _map.default)(dispenseData).call(dispenseData, function (_ref) {
                  var count = _ref.count,
                      cassetteNumber = _ref.cassetteNumber;
                  return {
                    count: count,
                    cassette: cassetteNumber
                  };
                }));
                _context12.next = 5;
                return this.send(_constants.COMMAND_CODES.DISPENSE, 60000, data);

              case 5:
                response = _context12.sent;
                log.debug("Dispense response: ", (0, _map.default)(response).call(response, function (el) {
                  return "0x" + el.toString(16);
                }));
                indexOfSoh = (0, _indexOf.default)(response).call(response, _constants.STANDART_BYTES.SOH);
                indexOfExt = (0, _indexOf.default)(response).call(response, _constants.STANDART_BYTES.EXT);
                dataToParse = (0, _slice.default)(response).call(response, indexOfSoh, indexOfExt + 2);
                log.debug("Dispense data to parse:", (0, _map.default)(dataToParse).call(dataToParse, function (el) {
                  return "0x" + el.toString(16);
                }));
                dispenseResponse = (0, _helpers.parseDispenseData)(dataToParse);

                if (!dispenseResponse.ok) {
                  this.lastStatus = dispenseResponse.errorText;
                }

                (0, _forEach.default)(_context11 = dispenseResponse.cassettes).call(_context11, function (cassette) {
                  var _this3$cassettesStatu;

                  var dataForCassette = (0, _find.default)(dispenseData).call(dispenseData, function (_ref2) {
                    var cassetteNumber = _ref2.cassetteNumber;
                    return cassetteNumber === cassette.cassetteNumber;
                  });

                  if (!dataForCassette) {
                    return;
                  }

                  var isExist = ((_this3$cassettesStatu = _this3.cassettesStatus.get(cassette.cassetteNumber)) === null || _this3$cassettesStatu === void 0 ? void 0 : _this3$cassettesStatu.isExist) || false;
                  var isEmpty = dataForCassette.count > cassette.requestedBillEXIT;

                  _this3.cassettesStatus.set(cassette.cassetteNumber, {
                    isEmpty: isEmpty,
                    isExist: isExist
                  });
                });
                return _context12.abrupt("return", dispenseResponse);

              case 15:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee5, this);
      }));

      function multiDispense(_x) {
        return _multiDispense.apply(this, arguments);
      }

      return multiDispense;
    }()
  }, {
    key: "loop",
    value: function () {
      var _loop = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var _context13, _context14, _context15;

        var status, errors;
        return _regenerator.default.wrap(function _callee6$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return this.getECDMStatus();

              case 2:
                status = _context17.sent;
                log.debug("Pooling status of device:", status);
                errors = status.error || "";
                (0, _forEach.default)(_context13 = (0, _entries.default)(status.DISP0)).call(_context13, function (_ref3) {
                  var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
                      _ = _ref4[0],
                      value = _ref4[1];

                  if (value.state) {
                    errors += ((0, _includes.default)(errors).call(errors, "DISP0") ? "" : "DISP0 Error:\n") + value.description + ": error\n";
                  }
                });
                (0, _forEach.default)(_context14 = (0, _entries.default)(status.DISP1)).call(_context14, function (_ref5) {
                  var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
                      _ = _ref6[0],
                      value = _ref6[1];

                  if (value.state) {
                    errors += ((0, _includes.default)(errors).call(errors, "DISP1") ? "" : "DISP1 Error:\n") + value.description + ": error\n";
                  }
                });
                (0, _forEach.default)(_context15 = status.cassettes).call(_context15, function (cassette, index) {
                  var _context16;

                  (0, _forEach.default)(_context16 = (0, _entries.default)(cassette.status)).call(_context16, function (_ref7) {
                    var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
                        key = _ref8[0],
                        value = _ref8[1];

                    if (value.state) {
                      errors += ((0, _includes.default)(errors).call(errors, "Cassette" + index) ? "" : "Cassette".concat(index, ":\n")) + value.description + ": error\n";
                    }
                  });
                });

                if (errors) {
                  this.fireEvent("error", errors);
                }

              case 9:
              case "end":
                return _context17.stop();
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
    key: "fireEvent",
    value: function fireEvent(event) {
      var _this4 = this;

      if (!this.events.has(event)) {
        return;
      }

      log.debug("Fired Event: ", event);

      var _iterator = _createForOfIteratorHelper(this.events.get(event) || []),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var handler = _step.value;

          switch (event) {
            case "error":
              handler({
                purge: function purge() {
                  return _this4.purge();
                },
                status: arguments.length <= 1 ? undefined : arguments[1]
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
    key: "purgeDispenser",
    value: function () {
      var _purgeDispenser = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var rawResponse, errorCode, error, indexOfCmd, indexOfExt, data, rejectedData, i;
        return _regenerator.default.wrap(function _callee7$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.t0 = _helpers.filterResponse;
                _context18.next = 3;
                return this.send(_constants.COMMAND_CODES.PURGE, 4000);

              case 3:
                _context18.t1 = _context18.sent;
                rawResponse = (0, _context18.t0)(_context18.t1);
                errorCode = (0, _helpers.decodeValue)(rawResponse[(0, _indexOf.default)(rawResponse).call(rawResponse, _constants.STANDART_BYTES.STX) + 2]);
                error = errorCode ? _constants.ERROR_CODES.get(errorCode) : "";
                this.lastStatus = error || "OK";
                indexOfCmd = (0, _indexOf.default)(rawResponse).call(rawResponse, _constants.COMMAND_CODES.PURGE);
                indexOfExt = (0, _indexOf.default)(rawResponse).call(rawResponse, _constants.STANDART_BYTES.EXT, indexOfCmd);
                data = (0, _slice.default)(rawResponse).call(rawResponse, indexOfCmd + 3, indexOfExt);
                rejectedData = [];

                for (i = 0; i < data.length; i += 3) {
                  rejectedData.push({
                    cassetteNumber: i + 1,
                    dispensed: (0, _helpers.decodeValue)(data[i]),
                    rejected: (0, _helpers.decodeValue)(data[i + 1]),
                    exist: data[i + 2] - 0x30 !== 0
                  });
                }

                return _context18.abrupt("return", {
                  error: error,
                  errorCode: errorCode,
                  rawResponse: rawResponse,
                  rejectedData: rejectedData
                });

              case 14:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee7, this);
      }));

      function purgeDispenser() {
        return _purgeDispenser.apply(this, arguments);
      }

      return purgeDispenser;
    }()
  }, {
    key: "getECDMStatus",
    value: function () {
      var _getECDMStatus = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var _context19,
            _this5 = this;

        var response, indexSoh, indexExt, data, status;
        return _regenerator.default.wrap(function _callee8$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return this.send(_constants.COMMAND_CODES.STATUS, 3000);

              case 2:
                response = _context20.sent;
                indexSoh = (0, _indexOf.default)(response).call(response, _constants.STANDART_BYTES.SOH);
                indexExt = (0, _indexOf.default)(response).call(response, _constants.STANDART_BYTES.EXT, indexSoh);
                data = (0, _slice.default)(response).call(response, indexSoh, indexExt + 2);
                status = (0, _helpers.parseStatus)(data);
                this.lastStatus = status.errorCode ? status.error || "Unknown" : "OK";
                (0, _forEach.default)(_context19 = status.cassettes).call(_context19, function (cassette) {
                  var _this5$cassettesStatu;

                  if (cassette.cassetteNumber > _this5.numberOfCassettes) {
                    return;
                  }

                  var isExist = !cassette.status.CASSETTE_EXIST.state;
                  var isEmpty = isExist ? ((_this5$cassettesStatu = _this5.cassettesStatus.get(cassette.cassetteNumber)) === null || _this5$cassettesStatu === void 0 ? void 0 : _this5$cassettesStatu.isEmpty) || false : false;

                  _this5.cassettesStatus.set(cassette.cassetteNumber, {
                    isExist: isExist,
                    isEmpty: isEmpty
                  });
                });
                return _context20.abrupt("return", status);

              case 10:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee8, this);
      }));

      function getECDMStatus() {
        return _getECDMStatus.apply(this, arguments);
      }

      return getECDMStatus;
    }()
  }, {
    key: "testDispense",
    value: function testDispense() {
      return _promise.default.resolve({
        ok: false,
        enabled: this.enable,
        connected: true,
        status: "Not implemented!",
        rawResponse: []
      });
    }
  }, {
    key: "prepareMessage",
    value: function prepareMessage(cmd, data) {
      var _context21;

      if (!(0, _includes.default)(_context21 = (0, _values.default)(_constants.COMMAND_CODES)).call(_context21, cmd)) {
        throw new Error("[ECDM] Error while formatting message. Unknown command! " + cmd);
      }

      var message = [_constants.STANDART_BYTES.EOT, _constants.STANDART_BYTES.ID, _constants.STANDART_BYTES.STX, cmd];

      if (data && data.length) {
        message.push.apply(message, (0, _toConsumableArray2.default)(data));
      }

      message.push(_constants.STANDART_BYTES.EXT);
      message.push((0, _helpers.calculateXorCrc)(message));
      return message;
    }
  }, {
    key: "send",
    value: function () {
      var _send = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(cmd) {
        var timeout,
            data,
            message,
            response,
            _response,
            indexOfExt,
            _args9 = arguments;

        return _regenerator.default.wrap(function _callee9$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                timeout = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 1000;
                data = _args9.length > 2 ? _args9[2] : undefined;

                if (this.port) {
                  _context22.next = 4;
                  break;
                }

                throw new Error("[ECDM] Serial port not found!");

              case 4:
                message = this.prepareMessage(cmd, data);
                log.debug("Message to send!", message);
                response = [];
                _context22.prev = 7;
                _context22.next = 10;
                return this.port.writeAndRead(message, timeout);

              case 10:
                response = _context22.sent;
                _context22.next = 16;
                break;

              case 13:
                _context22.prev = 13;
                _context22.t0 = _context22["catch"](7);
                return _context22.abrupt("return", _promise.default.reject(new Error("[ECDM] error on writeAndRead!")));

              case 16:
                if (!true) {
                  _context22.next = 34;
                  break;
                }

                if (!((0, _includes.default)(response).call(response, _constants.STANDART_BYTES.NCK) && !(0, _includes.default)(response).call(response, cmd))) {
                  _context22.next = 19;
                  break;
                }

                return _context22.abrupt("return", _promise.default.reject(new Error("[ECDM] Dispenser not recognize command! Response:" + (0, _map.default)(response).call(response, function (num) {
                  return num.toString(16);
                }).join(", "))));

              case 19:
                indexOfExt = (0, _lastIndexOf.default)(response).call(response, _constants.STANDART_BYTES.EXT);

                if (!(indexOfExt < response.length && response.length > 7)) {
                  _context22.next = 24;
                  break;
                }

                _context22.next = 23;
                return this.port.write([_constants.STANDART_BYTES.ACK]);

              case 23:
                return _context22.abrupt("break", 34);

              case 24:
                _context22.t1 = (_response = response).push;
                _context22.t2 = _response;
                _context22.t3 = _toConsumableArray2.default;
                _context22.next = 29;
                return this.port.redBytes(timeout);

              case 29:
                _context22.t4 = _context22.sent;
                _context22.t5 = (0, _context22.t3)(_context22.t4);

                _context22.t1.apply.call(_context22.t1, _context22.t2, _context22.t5);

                _context22.next = 16;
                break;

              case 34:
                return _context22.abrupt("return", response);

              case 35:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee9, this, [[7, 13]]);
      }));

      function send(_x2) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "getDispenserStatus",
    value: function getDispenserStatus() {
      return {
        type: this.deviceType,
        ok: this.lastStatus === "OK",
        status: this.lastStatus,
        cassettes: this.cassettesStatus
      };
    }
  }]);
  return ECDM;
}(_IDispenser.BaseDispenser), ((0, _applyDecoratedDescriptor2.default)(_class.prototype, "send", [_d4cQueue.synchronized], (0, _getOwnPropertyDescriptor.default)(_class.prototype, "send"), _class.prototype)), _class);
exports.default = ECDM;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZXZpY2VzL2Rpc3BlbnNlci9FQ0RNL2luZGV4LnRzIl0sIm5hbWVzIjpbImxvZyIsIkxvZ2dlciIsInBvcnRTZXR0aW5ncyIsImJhdWRSYXRlIiwiYnVmZmVyU2l6ZSIsImRhdGFCaXQiLCJmbG93Q29udHJvbCIsInBhcml0eSIsInN0b3BCaXRzIiwiRUNETSIsInBvcnQiLCJkZXZpY2VUeXBlIiwiZGVidWciLCJvcGVuIiwicmVzZXQiLCJyZXNwb25zZSIsImdldEVDRE1TdGF0dXMiLCJzdGF0dXMiLCJjYXNzZXR0ZXMiLCJjYXNzZXR0ZSIsImluc2VydGVkIiwibnVtYmVyT2ZDYXNzZXR0ZXMiLCJjYXNzZXR0ZXNTdGF0dXMiLCJzZXQiLCJjYXNzZXR0ZU51bWJlciIsImlzRW1wdHkiLCJpc0V4aXN0IiwiQ0FTU0VUVEVfRVhJU1QiLCJzdGF0ZSIsImluaXRMb29wIiwiZXJyb3IiLCJjbG9zZSIsInNlbmQiLCJDT01NQU5EX0NPREVTIiwiUkVTRVQiLCJpbmRleFNvaCIsIlNUQU5EQVJUX0JZVEVTIiwiU09IIiwiaW5kZXhFeHQiLCJFWFQiLCJkYXRhIiwiYWNrIiwiQUNLIiwiY3JjIiwicmVqZWN0IiwiZGlzcGVuc2Vyc1N0YXR1cyIsIm9rIiwiZXJyb3JDb2RlIiwiRElTUDAiLCJzZW5zb3IiLCJkZXNjcmlwdGlvbiIsIkRJU1AxIiwibGVuZ3RoIiwicmF3UmVzcG9uc2UiLCJlbmFibGVkIiwiZW5hYmxlIiwiY29ubmVjdGVkIiwiRXJyb3IiLCJtZXNzYWdlIiwicHVyZ2VEaXNwZW5zZXIiLCJyZXNvbHZlIiwiY291bnQiLCJtdWx0aURpc3BlbnNlIiwiZGlzcGVuc2VEYXRhIiwiRElTUEVOU0UiLCJlbCIsInRvU3RyaW5nIiwiaW5kZXhPZlNvaCIsImluZGV4T2ZFeHQiLCJkYXRhVG9QYXJzZSIsImRpc3BlbnNlUmVzcG9uc2UiLCJsYXN0U3RhdHVzIiwiZXJyb3JUZXh0IiwiZGF0YUZvckNhc3NldHRlIiwiZ2V0IiwicmVxdWVzdGVkQmlsbEVYSVQiLCJlcnJvcnMiLCJfIiwidmFsdWUiLCJpbmRleCIsImtleSIsImZpcmVFdmVudCIsImV2ZW50IiwiZXZlbnRzIiwiaGFzIiwiaGFuZGxlciIsInB1cmdlIiwiZmlsdGVyUmVzcG9uc2UiLCJQVVJHRSIsIlNUWCIsIkVSUk9SX0NPREVTIiwiaW5kZXhPZkNtZCIsInJlamVjdGVkRGF0YSIsImkiLCJwdXNoIiwiZGlzcGVuc2VkIiwicmVqZWN0ZWQiLCJleGlzdCIsIlNUQVRVUyIsImNtZCIsIkVPVCIsIklEIiwidGltZW91dCIsInByZXBhcmVNZXNzYWdlIiwid3JpdGVBbmRSZWFkIiwiTkNLIiwibnVtIiwiam9pbiIsIndyaXRlIiwicmVkQnl0ZXMiLCJ0eXBlIiwiQmFzZURpc3BlbnNlciIsInN5bmNocm9uaXplZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxHQUFHLEdBQUcsSUFBSUMsY0FBSixDQUFXLHFCQUFYLENBQVo7QUFFQSxJQUFNQyxZQUE4QixHQUFHO0FBQ3JDQyxFQUFBQSxRQUFRLEVBQUUsSUFEMkI7QUFFckNDLEVBQUFBLFVBQVUsRUFBRSxHQUZ5QjtBQUdyQ0MsRUFBQUEsT0FBTyxFQUFFLENBSDRCO0FBSXJDQyxFQUFBQSxXQUFXLEVBQUUsTUFKd0I7QUFLckNDLEVBQUFBLE1BQU0sRUFBRSxNQUw2QjtBQU1yQ0MsRUFBQUEsUUFBUSxFQUFFO0FBTjJCLENBQXZDO0lBU3FCQyxJOzs7OztBQUNuQixnQkFBbUJDLElBQW5CLEVBQXNDO0FBQUE7O0FBQUE7QUFDcEMsOEJBQU1BLElBQU47QUFDQSxVQUFLQyxVQUFMLEdBQWtCLGlCQUFsQjtBQUZvQztBQUdyQzs7Ozs7MEZBRUQ7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFB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Q0FBNkMsSUFBN0MsQ0FBaEUsQ0FBZixDQWZiOztBQUFBO0FBaUJVdkMsZ0JBQUFBLFVBakJWLEdBaUJ1QiwwQkFBQXJELFFBQVEsTUFBUixDQUFBQSxRQUFRLEVBQWFxQiwwQkFBZUcsR0FBNUIsQ0FqQi9COztBQUFBLHNCQWtCUTZCLFVBQVUsR0FBR3JELFFBQVEsQ0FBQ3FDLE1BQXRCLElBQWdDckMsUUFBUSxDQUFDcUMsTUFBVCxHQUFrQixDQWxCMUQ7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSx1QkFtQlksS0FBSzFDLElBQUwsQ0FBVWtHLEtBQVYsQ0FBZ0IsQ0FBQ3hFLDBCQUFlTSxHQUFoQixDQUFoQixDQW5CWjs7QUFBQTtBQUFBOztBQUFBO0FBQUEsZ0NBc0JJLGFBQUEzQixRQUFRLEVBQUMrRSxJQXRCYjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQXNCNEIsS0FBS3BGLElBQUwsQ0FBVW1HLFFBQVYsQ0FBbUJQLE9BQW5CLENBdEI1Qjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1EQXdCU3ZGLFFBeEJUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7V0EyQkEsOEJBQThDO0FBQzVDLGFBQU87QUFDTCtGLFFBQUFBLElBQUksRUFBRSxLQUFLbkcsVUFETjtBQUVMbUMsUUFBQUEsRUFBRSxFQUFFLEtBQUt5QixVQUFMLEtBQW9CLElBRm5CO0FBR0x0RCxRQUFBQSxNQUFNLEVBQUUsS0FBS3NELFVBSFI7QUFJTHJELFFBQUFBLFNBQVMsRUFBRSxLQUFLSTtBQUpYLE9BQVA7QUFNRDs7O0VBdlQrQnlGLHlCLHVFQXFSL0JDLHNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL2hlbHBlcnMvbG9nZ2VyXCI7XG5pbXBvcnQgeyBJU2VyaWFsUG9ydCwgU2VyaWFsUG9ydE9wdGlvbiB9IGZyb20gXCIuLi8uLi9zZXJpYWwvdHlwZXNcIjtcbmltcG9ydCB7IEJhc2VEaXNwZW5zZXIsIElDYXNzZXR0ZVN0YXR1cywgSURpc3BlbnNlQW5zd2VyLCBJRGlzcGVuc2VyU3RhdHVzIH0gZnJvbSBcIi4uLy4uL21vZGVsL0lEaXNwZW5zZXJcIjtcbmltcG9ydCB7IElTdGF0dXMgfSBmcm9tIFwiLi4vLi4vbW9kZWwvSVN0YXR1c1wiO1xuaW1wb3J0IHsgU1RBTkRBUlRfQllURVMsIENPTU1BTkRfQ09ERVMsIENPRUZGSUNJRU5UX09GX1ZBTFVFUywgRVJST1JfQ09ERVMgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGNhbGN1bGF0ZVhvckNyYywgZGVjb2RlVmFsdWUsIGNoZWNrWG9yQ3JjLCBwYXJzZVN0YXR1cywgZmlsdGVyUmVzcG9uc2UsIHByZXBhcmVEYXRhRm9yRGlzcGVuc2UsIHBhcnNlRGlzcGVuc2VEYXRhIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgSUVDRE1Qb3J0QW5zd2VyLCBJRUNETVB1cmdlUmVzcG9uc2UsIElFQ0RNU3RhdHVzLCBTZW5zb3JTdGF0dXMsIElSZWplY3QsIElFQ0RNU1RBVFN0YXR1cyB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBzeW5jaHJvbml6ZWQgfSBmcm9tIFwiZDRjLXF1ZXVlXCI7XG5cbmNvbnN0IGxvZyA9IG5ldyBMb2dnZXIoXCJbUFVMT09OIEVDRE0tMjAwXTogXCIpO1xuXG5jb25zdCBwb3J0U2V0dGluZ3M6IFNlcmlhbFBvcnRPcHRpb24gPSB7XG4gIGJhdWRSYXRlOiA5NjAwLFxuICBidWZmZXJTaXplOiAyNTUsXG4gIGRhdGFCaXQ6IDgsXG4gIGZsb3dDb250cm9sOiBcIm5vbmVcIixcbiAgcGFyaXR5OiBcIm5vbmVcIixcbiAgc3RvcEJpdHM6IDFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVDRE0gZXh0ZW5kcyBCYXNlRGlzcGVuc2VyIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKHBvcnQ6IElTZXJpYWxQb3J0KSB7XG4gICAgc3VwZXIocG9ydCk7XG4gICAgdGhpcy5kZXZpY2VUeXBlID0gXCJQVUxPT04gRUNETS0yMDBcIjtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBpbml0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHRyeSB7XG4gICAgICBsb2cuZGVidWcoXCJUcnkgdG8gaW5pdCBkZXZpY2Ugb24gcG9ydFwiLCB0aGlzLnBvcnQ/LnBvcnQpO1xuICAgICAgYXdhaXQgdGhpcy5wb3J0Py5vcGVuKHBvcnRTZXR0aW5ncyk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVzZXQoKTtcbiAgICAgIGxvZy5kZWJ1ZyhcIlJlc3BvbnNlIGZyb20gZGV2aWNlOiBcIiwgcmVzcG9uc2UpO1xuICAgICAgY29uc3Qgc3RhdHVzID0gYXdhaXQgdGhpcy5nZXRFQ0RNU3RhdHVzKCk7XG4gICAgICBzdGF0dXMuY2Fzc2V0dGVzLmZvckVhY2goKGNhc3NldHRlKSA9PiB7XG4gICAgICAgIGlmIChjYXNzZXR0ZS5pbnNlcnRlZCkge1xuICAgICAgICAgIHRoaXMubnVtYmVyT2ZDYXNzZXR0ZXMrKztcbiAgICAgICAgICB0aGlzLmNhc3NldHRlc1N0YXR1cy5zZXQoY2Fzc2V0dGUuY2Fzc2V0dGVOdW1iZXIsIHsgaXNFbXB0eTogZmFsc2UsIGlzRXhpc3Q6ICFjYXNzZXR0ZS5zdGF0dXMuQ0FTU0VUVEVfRVhJU1Quc3RhdGUgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbG9nLmRlYnVnKFwiTnVtYmVyIG9mIGNhc3NldHRlczogXCIsIHRoaXMubnVtYmVyT2ZDYXNzZXR0ZXMpO1xuICAgICAgbG9nLmRlYnVnKFwiQ2Fzc2V0dGVzOiBcIiwgdGhpcy5jYXNzZXR0ZXNTdGF0dXMpXG4gICAgICB0aGlzLmluaXRMb29wKDUwMDApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcIkVycm9yIHdoaWxlIHJlc2V0aW5nIGRpc3BlbnNlciFcIiwgZXJyb3IpO1xuICAgICAgYXdhaXQgdGhpcy5wb3J0Py5jbG9zZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXNldCgpOiBQcm9taXNlPElFQ0RNUG9ydEFuc3dlcj4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZChDT01NQU5EX0NPREVTLlJFU0VULCA0NTAwKTtcbiAgICAgIGNvbnN0IGluZGV4U29oID0gcmVzcG9uc2UuaW5kZXhPZihTVEFOREFSVF9CWVRFUy5TT0gpO1xuICAgICAgY29uc3QgaW5kZXhFeHQgPSByZXNwb25zZS5pbmRleE9mKFNUQU5EQVJUX0JZVEVTLkVYVCwgaW5kZXhTb2gpO1xuICAgICAgY29uc3QgZGF0YTogQXJyYXk8bnVtYmVyPiA9IHJlc3BvbnNlLnNsaWNlKGluZGV4U29oLCBpbmRleEV4dCArIDIpO1xuICAgICAgY29uc3QgYWNrID0gcmVzcG9uc2UuaW5jbHVkZXMoU1RBTkRBUlRfQllURVMuQUNLKTtcbiAgICAgIGNvbnN0IGNyYyA9IGNoZWNrWG9yQ3JjKGRhdGEpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWNrLFxuICAgICAgICBlcnJvcjogMHgzMCA9PT0gZGF0YVs0XSxcbiAgICAgICAgY3JjLFxuICAgICAgICBkYXRhXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjaGVja1N0YXR1cygpOiBQcm9taXNlPElTdGF0dXM+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGlzcGVuc2Vyc1N0YXR1cyA9IGF3YWl0IHRoaXMuZ2V0RUNETVN0YXR1cygpO1xuICAgICAgbGV0IG9rID0gdHJ1ZTtcbiAgICAgIGxldCBzdGF0dXMgPSBcIlwiO1xuICAgICAgaWYgKGRpc3BlbnNlcnNTdGF0dXMuZXJyb3JDb2RlKSB7XG4gICAgICAgIG9rID0gZmFsc2U7XG4gICAgICAgIHN0YXR1cyArPSBcIltFQ0RNXSBFcnJvcjogXCIgKyBkaXNwZW5zZXJzU3RhdHVzLmVycm9yICsgXCJcXG5cIjtcbiAgICAgIH1cbiAgICAgIE9iamVjdC52YWx1ZXMoZGlzcGVuc2Vyc1N0YXR1cy5ESVNQMCBhcyB7IFtwOiBzdHJpbmddOiBTZW5zb3JTdGF0dXMgfSkuZm9yRWFjaCgoc2Vuc29yKSA9PiB7XG4gICAgICAgIGlmICghc2Vuc29yLnN0YXRlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9rID0gZmFsc2U7XG4gICAgICAgIGlmICghc3RhdHVzLmluY2x1ZGVzKFwiW0VDRE1dIFNlbnNvciAwOlxcblwiKSkge1xuICAgICAgICAgIHN0YXR1cyArPSBcIltFQ0RNXSBTZW5zb3IgMDpcXG5cIjtcbiAgICAgICAgfVxuICAgICAgICBzdGF0dXMgKz0gc2Vuc29yLmRlc2NyaXB0aW9uICsgXCI6IGVycm9yXFxuXCI7XG4gICAgICB9KTtcbiAgICAgIE9iamVjdC52YWx1ZXMoZGlzcGVuc2Vyc1N0YXR1cy5ESVNQMSBhcyB7IFtwOiBzdHJpbmddOiBTZW5zb3JTdGF0dXMgfSkuZm9yRWFjaCgoc2Vuc29yKSA9PiB7XG4gICAgICAgIGlmICghc2Vuc29yLnN0YXRlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9rID0gZmFsc2U7XG4gICAgICAgIGlmICghc3RhdHVzLmluY2x1ZGVzKFwiW0VDRE1dIFNlbnNvciAxOlxcblwiKSkge1xuICAgICAgICAgIHN0YXR1cyArPSBcIltFQ0RNXSBTZW5zb3IgMTpcXG5cIjtcbiAgICAgICAgfVxuICAgICAgICBzdGF0dXMgKz0gc2Vuc29yLmRlc2NyaXB0aW9uICsgXCI6IGVycm9yXFxuXCI7XG4gICAgICB9KTtcbiAgICAgIGlmIChzdGF0dXMubGVuZ3RoKSB7XG4gICAgICAgIHN0YXR1cyA9IFwiT0shXCI7XG4gICAgICB9XG4gICAgICBjb25zdCBpbmRleFNvaCA9IGRpc3BlbnNlcnNTdGF0dXMucmF3UmVzcG9uc2UuaW5kZXhPZihTVEFOREFSVF9CWVRFUy5TT0gpO1xuICAgICAgY29uc3QgaW5kZXhFeHQgPSBkaXNwZW5zZXJzU3RhdHVzLnJhd1Jlc3BvbnNlLmluZGV4T2YoU1RBTkRBUlRfQllURVMuRVhULCBpbmRleFNvaCk7XG5cbiAgICAgIGNvbnN0IHJhd1Jlc3BvbnNlOiBBcnJheTxudW1iZXI+ID0gZGlzcGVuc2Vyc1N0YXR1cy5yYXdSZXNwb25zZS5zbGljZShpbmRleFNvaCwgaW5kZXhFeHQgKyAyKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG9rLFxuICAgICAgICBlbmFibGVkOiB0aGlzLmVuYWJsZSxcbiAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHJhd1Jlc3BvbnNlXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJbRUNETV0gZXJyb3IgZ2V0dGluZyByZXNwb25zZSBmcm9tIGRpc3BlbnNlcjogXCIgKyBlcnJvci5tZXNzYWdlKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHB1cmdlKCk6IFByb21pc2U8SVN0YXR1cz4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wdXJnZURpc3BlbnNlcigpO1xuICAgICAgbGV0IG9rID0gdHJ1ZTtcbiAgICAgIGxldCBzdGF0dXMgPSBcIlN1Y2Nlc3NmdWwgUHVyZ2UhXCI7XG4gICAgICBpZiAocmVzcG9uc2UuZXJyb3JDb2RlKSB7XG4gICAgICAgIHN0YXR1cyA9IFwiUHVyZ2Ugd2l0aCBlcnJvciBzdGF0dXM6XFxuXCIgKyByZXNwb25zZS5lcnJvcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIG9rLFxuICAgICAgICBlbmFibGVkOiB0aGlzLmVuYWJsZSxcbiAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHJhd1Jlc3BvbnNlOiByZXNwb25zZS5yYXdSZXNwb25zZVxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiW0VDRE1dIEVycm9yIHdoaWxlIHB1cmdlISBcIiArIGVycm9yLm1lc3NhZ2UpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcm9tVmVyc2lvbigpOiBQcm9taXNlPElTdGF0dXM+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVuYWJsZWQ6IHRoaXMuZW5hYmxlLFxuICAgICAgY29ubmVjdGVkOiB0cnVlLFxuICAgICAgc3RhdHVzOiBcIlBVTE9OIEVDRE0tMjAwIGRvZXMgbm90IHN1cHBvcnQgdGhpcyBjb21tYW5kIVwiLFxuICAgICAgcmF3UmVzcG9uc2U6IFtdXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcGVuc2UoY291bnQ6IG51bWJlciwgY2Fzc2V0dGVOdW1iZXI6IG51bWJlcik6IFByb21pc2U8SURpc3BlbnNlQW5zd2VyPiB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlEaXNwZW5zZShbeyBjb3VudCwgY2Fzc2V0dGVOdW1iZXIgfV0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG11bHRpRGlzcGVuc2UoZGlzcGVuc2VEYXRhOiBBcnJheTx7IGNvdW50OiBudW1iZXI7IGNhc3NldHRlTnVtYmVyOiBudW1iZXIgfT4pOiBQcm9taXNlPElEaXNwZW5zZUFuc3dlcj4ge1xuICAgIGF3YWl0IHRoaXMucHVyZ2VEaXNwZW5zZXIoKTtcbiAgICBjb25zdCBkYXRhID0gcHJlcGFyZURhdGFGb3JEaXNwZW5zZShkaXNwZW5zZURhdGEubWFwKCh7IGNvdW50LCBjYXNzZXR0ZU51bWJlciB9KSA9PiAoeyBjb3VudCwgY2Fzc2V0dGU6IGNhc3NldHRlTnVtYmVyIH0pKSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnNlbmQoQ09NTUFORF9DT0RFUy5ESVNQRU5TRSwgNjAwMDAsIGRhdGEpO1xuICAgIGxvZy5kZWJ1ZyhcbiAgICAgIFwiRGlzcGVuc2UgcmVzcG9uc2U6IFwiLFxuICAgICAgcmVzcG9uc2UubWFwKChlbCkgPT4gXCIweFwiICsgZWwudG9TdHJpbmcoMTYpKVxuICAgICk7XG4gICAgY29uc3QgaW5kZXhPZlNvaCA9IHJlc3BvbnNlLmluZGV4T2YoU1RBTkRBUlRfQllURVMuU09IKTtcbiAgICBjb25zdCBpbmRleE9mRXh0ID0gcmVzcG9uc2UuaW5kZXhPZihTVEFOREFSVF9CWVRFUy5FWFQpO1xuICAgIGNvbnN0IGRhdGFUb1BhcnNlID0gcmVzcG9uc2Uuc2xpY2UoaW5kZXhPZlNvaCwgaW5kZXhPZkV4dCArIDIpO1xuICAgIGxvZy5kZWJ1ZyhcbiAgICAgIFwiRGlzcGVuc2UgZGF0YSB0byBwYXJzZTpcIixcbiAgICAgIGRhdGFUb1BhcnNlLm1hcCgoZWwpID0+IFwiMHhcIiArIGVsLnRvU3RyaW5nKDE2KSlcbiAgICApO1xuICAgIGNvbnN0IGRpc3BlbnNlUmVzcG9uc2UgPSBwYXJzZURpc3BlbnNlRGF0YShkYXRhVG9QYXJzZSk7XG5cbiAgICBpZiAoIWRpc3BlbnNlUmVzcG9uc2Uub2spIHtcbiAgICAgIHRoaXMubGFzdFN0YXR1cyA9IGRpc3BlbnNlUmVzcG9uc2UuZXJyb3JUZXh0XG4gICAgfVxuXG4gICAgZGlzcGVuc2VSZXNwb25zZS5jYXNzZXR0ZXMuZm9yRWFjaCgoY2Fzc2V0dGUpID0+IHtcbiAgICAgIGNvbnN0IGRhdGFGb3JDYXNzZXR0ZSA9IGRpc3BlbnNlRGF0YS5maW5kKCh7IGNhc3NldHRlTnVtYmVyIH0pID0+IGNhc3NldHRlTnVtYmVyID09PSBjYXNzZXR0ZS5jYXNzZXR0ZU51bWJlcik7XG4gICAgICBpZiAoIWRhdGFGb3JDYXNzZXR0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBpc0V4aXN0ID0gdGhpcy5jYXNzZXR0ZXNTdGF0dXMuZ2V0KGNhc3NldHRlLmNhc3NldHRlTnVtYmVyKT8uaXNFeGlzdCB8fCBmYWxzZTtcbiAgICAgIGNvbnN0IGlzRW1wdHkgPSBkYXRhRm9yQ2Fzc2V0dGUuY291bnQgPiBjYXNzZXR0ZS5yZXF1ZXN0ZWRCaWxsRVhJVDtcbiAgICAgIHRoaXMuY2Fzc2V0dGVzU3RhdHVzLnNldChjYXNzZXR0ZS5jYXNzZXR0ZU51bWJlciwge1xuICAgICAgICBpc0VtcHR5LFxuICAgICAgICBpc0V4aXN0XG4gICAgICB9KTtcbiAgICB9KVxuICAgIHJldHVybiBkaXNwZW5zZVJlc3BvbnNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGxvb3AoKSB7XG4gICAgY29uc3Qgc3RhdHVzID0gYXdhaXQgdGhpcy5nZXRFQ0RNU3RhdHVzKCk7XG4gICAgbG9nLmRlYnVnKFwiUG9vbGluZyBzdGF0dXMgb2YgZGV2aWNlOlwiLCBzdGF0dXMpO1xuICAgIGxldCBlcnJvcnMgPSBzdGF0dXMuZXJyb3IgfHwgXCJcIjtcbiAgICBPYmplY3QuZW50cmllczxTZW5zb3JTdGF0dXM+KHN0YXR1cy5ESVNQMCkuZm9yRWFjaCgoW18sIHZhbHVlXSkgPT4ge1xuICAgICAgaWYgKHZhbHVlLnN0YXRlKSB7XG4gICAgICAgIGVycm9ycyArPSAoZXJyb3JzLmluY2x1ZGVzKFwiRElTUDBcIikgPyBcIlwiIDogXCJESVNQMCBFcnJvcjpcXG5cIikgKyB2YWx1ZS5kZXNjcmlwdGlvbiArIFwiOiBlcnJvclxcblwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIE9iamVjdC5lbnRyaWVzPFNlbnNvclN0YXR1cz4oc3RhdHVzLkRJU1AxKS5mb3JFYWNoKChbXywgdmFsdWVdKSA9PiB7XG4gICAgICBpZiAodmFsdWUuc3RhdGUpIHtcbiAgICAgICAgZXJyb3JzICs9IChlcnJvcnMuaW5jbHVkZXMoXCJESVNQMVwiKSA/IFwiXCIgOiBcIkRJU1AxIEVycm9yOlxcblwiKSArIHZhbHVlLmRlc2NyaXB0aW9uICsgXCI6IGVycm9yXFxuXCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgc3RhdHVzLmNhc3NldHRlcy5mb3JFYWNoKChjYXNzZXR0ZSwgaW5kZXgpID0+IHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKGNhc3NldHRlLnN0YXR1cykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZS5zdGF0ZSkge1xuICAgICAgICAgIGVycm9ycyArPSAoZXJyb3JzLmluY2x1ZGVzKFwiQ2Fzc2V0dGVcIiArIGluZGV4KSA/IFwiXCIgOiBgQ2Fzc2V0dGUke2luZGV4fTpcXG5gKSArIHZhbHVlLmRlc2NyaXB0aW9uICsgXCI6IGVycm9yXFxuXCI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChlcnJvcnMpIHtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KFwiZXJyb3JcIiwgZXJyb3JzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpcmVFdmVudChldmVudDogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKSB7XG4gICAgaWYgKCF0aGlzLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxvZy5kZWJ1ZyhcIkZpcmVkIEV2ZW50OiBcIiwgZXZlbnQpO1xuICAgIGZvciAoY29uc3QgaGFuZGxlciBvZiB0aGlzLmV2ZW50cy5nZXQoZXZlbnQpIHx8IFtdKSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICAgIGNhc2UgXCJlcnJvclwiOlxuICAgICAgICAgIGhhbmRsZXIoeyBwdXJnZTogKCkgPT4gdGhpcy5wdXJnZSgpLCBzdGF0dXM6IHBhcmFtc1swXSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHB1cmdlRGlzcGVuc2VyKCk6IFByb21pc2U8SUVDRE1QdXJnZVJlc3BvbnNlPiB7XG4gICAgY29uc3QgcmF3UmVzcG9uc2UgPSBmaWx0ZXJSZXNwb25zZShhd2FpdCB0aGlzLnNlbmQoQ09NTUFORF9DT0RFUy5QVVJHRSwgNDAwMCkpO1xuICAgIGNvbnN0IGVycm9yQ29kZSA9IGRlY29kZVZhbHVlKHJhd1Jlc3BvbnNlW3Jhd1Jlc3BvbnNlLmluZGV4T2YoU1RBTkRBUlRfQllURVMuU1RYKSArIDJdKTtcbiAgICBjb25zdCBlcnJvciA9IGVycm9yQ29kZSA/IEVSUk9SX0NPREVTLmdldChlcnJvckNvZGUpIDogXCJcIjtcbiAgICB0aGlzLmxhc3RTdGF0dXMgPSBlcnJvciB8fCBcIk9LXCI7XG4gICAgY29uc3QgaW5kZXhPZkNtZCA9IHJhd1Jlc3BvbnNlLmluZGV4T2YoQ09NTUFORF9DT0RFUy5QVVJHRSk7XG4gICAgY29uc3QgaW5kZXhPZkV4dCA9IHJhd1Jlc3BvbnNlLmluZGV4T2YoU1RBTkRBUlRfQllURVMuRVhULCBpbmRleE9mQ21kKTtcbiAgICBjb25zdCBkYXRhID0gcmF3UmVzcG9uc2Uuc2xpY2UoaW5kZXhPZkNtZCArIDMsIGluZGV4T2ZFeHQpO1xuICAgIGNvbnN0IHJlamVjdGVkRGF0YTogQXJyYXk8SVJlamVjdD4gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgIHJlamVjdGVkRGF0YS5wdXNoKHtcbiAgICAgICAgY2Fzc2V0dGVOdW1iZXI6IGkgKyAxLFxuICAgICAgICBkaXNwZW5zZWQ6IGRlY29kZVZhbHVlKGRhdGFbaV0pLFxuICAgICAgICByZWplY3RlZDogZGVjb2RlVmFsdWUoZGF0YVtpICsgMV0pLFxuICAgICAgICBleGlzdDogZGF0YVtpICsgMl0gLSAweDMwICE9PSAwXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yLFxuICAgICAgZXJyb3JDb2RlLFxuICAgICAgcmF3UmVzcG9uc2UsXG4gICAgICByZWplY3RlZERhdGFcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRFQ0RNU3RhdHVzKCk6IFByb21pc2U8SUVDRE1TdGF0dXM+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuc2VuZChDT01NQU5EX0NPREVTLlNUQVRVUywgMzAwMCk7XG4gICAgY29uc3QgaW5kZXhTb2ggPSByZXNwb25zZS5pbmRleE9mKFNUQU5EQVJUX0JZVEVTLlNPSCk7XG4gICAgY29uc3QgaW5kZXhFeHQgPSByZXNwb25zZS5pbmRleE9mKFNUQU5EQVJUX0JZVEVTLkVYVCwgaW5kZXhTb2gpO1xuICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5zbGljZShpbmRleFNvaCwgaW5kZXhFeHQgKyAyKTtcbiAgICBjb25zdCBzdGF0dXMgPSBwYXJzZVN0YXR1cyhkYXRhKTtcbiAgICB0aGlzLmxhc3RTdGF0dXMgPSBzdGF0dXMuZXJyb3JDb2RlID8gc3RhdHVzLmVycm9yIHx8IFwiVW5rbm93blwiIDogXCJPS1wiO1xuICAgIHN0YXR1cy5jYXNzZXR0ZXMuZm9yRWFjaCgoY2Fzc2V0dGUpID0+IHtcbiAgICAgIGlmIChjYXNzZXR0ZS5jYXNzZXR0ZU51bWJlciA+IHRoaXMubnVtYmVyT2ZDYXNzZXR0ZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgaXNFeGlzdCA9ICFjYXNzZXR0ZS5zdGF0dXMuQ0FTU0VUVEVfRVhJU1Quc3RhdGU7XG4gICAgICBjb25zdCBpc0VtcHR5ID0gaXNFeGlzdCA/IHRoaXMuY2Fzc2V0dGVzU3RhdHVzLmdldChjYXNzZXR0ZS5jYXNzZXR0ZU51bWJlcik/LmlzRW1wdHkgfHwgZmFsc2UgOiBmYWxzZTtcbiAgICAgIHRoaXMuY2Fzc2V0dGVzU3RhdHVzLnNldChjYXNzZXR0ZS5jYXNzZXR0ZU51bWJlciwge1xuICAgICAgICBpc0V4aXN0LFxuICAgICAgICBpc0VtcHR5XG4gICAgICB9KVxuICAgIH0pO1xuICAgIHJldHVybiBzdGF0dXM7XG4gIH1cblxuICB0ZXN0RGlzcGVuc2UoKTogUHJvbWlzZTxJU3RhdHVzPiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICBvazogZmFsc2UsXG4gICAgICBlbmFibGVkOiB0aGlzLmVuYWJsZSxcbiAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcbiAgICAgIHN0YXR1czogXCJOb3QgaW1wbGVtZW50ZWQhXCIsXG4gICAgICByYXdSZXNwb25zZTogW11cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZU1lc3NhZ2UoY21kOiBudW1iZXIsIGRhdGE/OiBBcnJheTxudW1iZXI+KSB7XG4gICAgaWYgKCFPYmplY3QudmFsdWVzKENPTU1BTkRfQ09ERVMpLmluY2x1ZGVzKGNtZCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIltFQ0RNXSBFcnJvciB3aGlsZSBmb3JtYXR0aW5nIG1lc3NhZ2UuIFVua25vd24gY29tbWFuZCEgXCIgKyBjbWQpO1xuICAgIH1cbiAgICBjb25zdCBtZXNzYWdlOiBBcnJheTxudW1iZXI+ID0gW1NUQU5EQVJUX0JZVEVTLkVPVCwgU1RBTkRBUlRfQllURVMuSUQsIFNUQU5EQVJUX0JZVEVTLlNUWCwgY21kXTtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCkge1xuICAgICAgbWVzc2FnZS5wdXNoKC4uLmRhdGEpO1xuICAgIH1cbiAgICBtZXNzYWdlLnB1c2goU1RBTkRBUlRfQllURVMuRVhUKTtcbiAgICBtZXNzYWdlLnB1c2goY2FsY3VsYXRlWG9yQ3JjKG1lc3NhZ2UpKTtcbiAgICByZXR1cm4gbWVzc2FnZTtcbiAgfVxuXG4gIEBzeW5jaHJvbml6ZWRcbiAgcHJpdmF0ZSBhc3luYyBzZW5kKGNtZDogbnVtYmVyLCB0aW1lb3V0OiBudW1iZXIgPSAxMDAwLCBkYXRhPzogQXJyYXk8bnVtYmVyPik6IFByb21pc2U8QXJyYXk8bnVtYmVyPj4ge1xuICAgIGlmICghdGhpcy5wb3J0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbRUNETV0gU2VyaWFsIHBvcnQgbm90IGZvdW5kIVwiKVxuICAgIH1cbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5wcmVwYXJlTWVzc2FnZShjbWQsIGRhdGEpO1xuICAgIGxvZy5kZWJ1ZyhcIk1lc3NhZ2UgdG8gc2VuZCFcIiwgbWVzc2FnZSk7XG4gICAgbGV0IHJlc3BvbnNlOiBBcnJheTxudW1iZXI+ID0gW107XG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wb3J0LndyaXRlQW5kUmVhZChtZXNzYWdlLCB0aW1lb3V0KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIltFQ0RNXSBlcnJvciBvbiB3cml0ZUFuZFJlYWQhXCIpKTtcbiAgICB9XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlmIChyZXNwb25zZS5pbmNsdWRlcyhTVEFOREFSVF9CWVRFUy5OQ0spICYmICFyZXNwb25zZS5pbmNsdWRlcyhjbWQpKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJbRUNETV0gRGlzcGVuc2VyIG5vdCByZWNvZ25pemUgY29tbWFuZCEgUmVzcG9uc2U6XCIgKyByZXNwb25zZS5tYXAoKG51bSkgPT4gbnVtLnRvU3RyaW5nKDE2KSkuam9pbihcIiwgXCIpKSk7XG4gICAgICB9XG4gICAgICBjb25zdCBpbmRleE9mRXh0ID0gcmVzcG9uc2UubGFzdEluZGV4T2YoU1RBTkRBUlRfQllURVMuRVhUKTtcbiAgICAgIGlmIChpbmRleE9mRXh0IDwgcmVzcG9uc2UubGVuZ3RoICYmIHJlc3BvbnNlLmxlbmd0aCA+IDcpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5wb3J0LndyaXRlKFtTVEFOREFSVF9CWVRFUy5BQ0tdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXNwb25zZS5wdXNoKC4uLihhd2FpdCB0aGlzLnBvcnQucmVkQnl0ZXModGltZW91dCkpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG5cbiAgcHVibGljIGdldERpc3BlbnNlclN0YXR1cygpOiBJRGlzcGVuc2VyU3RhdHVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogdGhpcy5kZXZpY2VUeXBlLFxuICAgICAgb2s6IHRoaXMubGFzdFN0YXR1cyA9PT0gXCJPS1wiLFxuICAgICAgc3RhdHVzOiB0aGlzLmxhc3RTdGF0dXMsXG4gICAgICBjYXNzZXR0ZXM6IHRoaXMuY2Fzc2V0dGVzU3RhdHVzXG4gICAgfTtcbiAgfVxufVxuIl19