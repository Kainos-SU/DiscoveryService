"use strict";

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.regexp.exec.js");

var _sliceInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/slice");

var _Array$from2 = require("@babel/runtime-corejs3/core-js-stable/array/from");

var _Symbol = require("@babel/runtime-corejs3/core-js-stable/symbol");

var _getIteratorMethod = require("@babel/runtime-corejs3/core-js/get-iterator-method");

var _Array$isArray = require("@babel/runtime-corejs3/core-js-stable/array/is-array");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.DiscoveryService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.promise.finally.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/map"));

var _setInterval2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-interval"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _map2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/entries"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _NodeSerialPort = _interopRequireDefault(require("./serial/NodeSerialPort"));

var _IDeviceWrapper = require("./IDeviceWrapper");

var _LCDM = _interopRequireDefault(require("./dispenser/LCDM"));

var _ECDM = _interopRequireDefault(require("./dispenser/ECDM"));

var _MINIMECH = _interopRequireDefault(require("./dispenser/MINIMECH"));

var _IDeviceType = require("./model/IDeviceType");

var _logger = require("../helpers/logger");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context15; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context15 = Object.prototype.toString.call(o)).call(_context15, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var log = new _logger.Logger("[DiscoveryService]");
var availableDevicesMap = new _map.default([[_IDeviceType.DeviceType.DISPENSER, [_LCDM.default, _ECDM.default, _MINIMECH.default]], [_IDeviceType.DeviceType.ACCEPTOR, [// ID003,
  // NV9
]], [_IDeviceType.DeviceType.PRINTER, [// VKP80
]]]);

var DiscoveryService = /*#__PURE__*/function () {
  function DiscoveryService() {
    (0, _classCallCheck2.default)(this, DiscoveryService);
    (0, _defineProperty2.default)(this, "prevStatuses", {});
    (0, _defineProperty2.default)(this, "deviceStatus", new _map.default());
    (0, _defineProperty2.default)(this, "devices", new _map.default([[_IDeviceType.DeviceType.DISPENSER, new _IDeviceWrapper.DeviceWrapper()], [_IDeviceType.DeviceType.ACCEPTOR, new _IDeviceWrapper.DeviceWrapper()], [_IDeviceType.DeviceType.PRINTER, new _IDeviceWrapper.DeviceWrapper()]]));
    (0, _defineProperty2.default)(this, "eventHandlersList", {
      connect: [],
      lost: [],
      change: []
    });
  }

  (0, _createClass2.default)(DiscoveryService, [{
    key: "initLoop",
    value: function initLoop() {
      var _this = this;

      var isWork = false;
      this.loop().finally(function () {
        return (0, _setInterval2.default)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!isWork) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return");

                case 2:
                  _context.prev = 2;
                  isWork = true;
                  _context.next = 6;
                  return _this.loop();

                case 6:
                  _context.prev = 6;
                  isWork = false;
                  return _context.finish(6);

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[2,, 6, 9]]);
        })), 10000);
      });
    }
    /** Цикл опроса устрйоств */

  }, {
    key: "loop",
    value: function () {
      var _loop = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _this2 = this;

        var _iterator, _step, _loop2, _ret;

        return _regenerator.default.wrap(function _callee2$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                log.debug("Loop tick.");
                _iterator = _createForOfIteratorHelper(this.devices);
                _context9.prev = 2;
                _loop2 = /*#__PURE__*/_regenerator.default.mark(function _loop2() {
                  var _context4, _context5, _context6;

                  var _step$value, name, device, status, _device$getDevice, deviceModel, _context2, _device$getDevice2, _device$getDevice3, _context3, prevStatus, _device$getDevice4, _device$getDevice5, _device$getDevice6, ports, usedPorts, portsToCheck, _iterator2, _step2, _port, devices, found, _iterator3, _step3, dev, deviceInstance, _context7;

                  return _regenerator.default.wrap(function _loop2$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          _step$value = (0, _slicedToArray2.default)(_step.value, 2), name = _step$value[0], device = _step$value[1];
                          log.debug("Device check: ", name);
                          status = void 0;
                          _context8.prev = 3;
                          _context8.next = 6;
                          return device.checkStatus();

                        case 6:
                          status = _context8.sent;
                          _context8.next = 12;
                          break;

                        case 9:
                          _context8.prev = 9;
                          _context8.t0 = _context8["catch"](3);
                          status = {
                            ok: false,
                            connected: false,
                            enabled: false,
                            status: "Not enabled",
                            rawResponse: []
                          };

                        case 12:
                          log.debug("Response from ", name, status);

                          if (!_this2.prevStatuses[name]) {
                            _this2.prevStatuses[name] = status;
                          } else {
                            if (_this2.compareStatuses(_this2.prevStatuses[name], status)) {
                              _this2.prevStatuses[name] = status;
                              deviceModel = device.getDevice() ? (_device$getDevice = device.getDevice()) === null || _device$getDevice === void 0 ? void 0 : _device$getDevice.getType() : "Not Set";

                              _this2.fireEvent("change", {
                                deviceType: name,
                                deviceModel: deviceModel,
                                deviceStatus: status,
                                device: device.getDevice()
                              });
                            }
                          }

                          if (!status.connected) {
                            _context8.next = 28;
                            break;
                          }

                          log.debug("Found connected device:", (0, _concat.default)(_context2 = "Status of ".concat(name, " ")).call(_context2, (_device$getDevice2 = device.getDevice()) === null || _device$getDevice2 === void 0 ? void 0 : _device$getDevice2.getType(), " - connected!"));
                          prevStatus = _this2.deviceStatus.get(name);

                          if (!((!prevStatus || !prevStatus.connected) && (_device$getDevice3 = device.getDevice()) !== null && _device$getDevice3 !== void 0 && (0, _includes.default)(_context3 = _device$getDevice3.getType()).call(_context3, "MOCK"))) {
                            _context8.next = 26;
                            break;
                          }

                          _context8.t1 = _this2;
                          _context8.t2 = name;
                          _context8.t3 = (_device$getDevice4 = device.getDevice()) === null || _device$getDevice4 === void 0 ? void 0 : _device$getDevice4.getType();
                          _context8.next = 23;
                          return device.checkStatus();

                        case 23:
                          _context8.t4 = _context8.sent;
                          _context8.t5 = {
                            deviceType: _context8.t2,
                            deviceModel: _context8.t3,
                            deviceStatus: _context8.t4
                          };

                          _context8.t1.fireEvent.call(_context8.t1, "connect", _context8.t5);

                        case 26:
                          _this2.deviceStatus.set(name, status);

                          return _context8.abrupt("return", "continue");

                        case 28:
                          _this2.deviceStatus.set(name, undefined);

                          if (device.getDevice()) {
                            log.info("Lost Device: ", name, (_device$getDevice5 = device.getDevice()) === null || _device$getDevice5 === void 0 ? void 0 : _device$getDevice5.getType());

                            _this2.fireEvent("lost", {
                              deviceType: name,
                              deviceModel: (_device$getDevice6 = device.getDevice()) === null || _device$getDevice6 === void 0 ? void 0 : _device$getDevice6.getType()
                            });
                          }

                          log.debug("Searching Device: ".concat(name));
                          device.clearDevice();
                          _context8.next = 34;
                          return _NodeSerialPort.default.getPorts();

                        case 34:
                          ports = _context8.sent;
                          usedPorts = (0, _filter.default)(_context4 = (0, _map2.default)(_context5 = (0, _from.default)((0, _entries.default)(_context6 = _this2.devices).call(_context6))).call(_context5, function (_ref2) {
                            var _value$getPort;

                            var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
                                _ = _ref3[0],
                                value = _ref3[1];

                            return (_value$getPort = value.getPort()) === null || _value$getPort === void 0 ? void 0 : _value$getPort.port;
                          })).call(_context4, function (port) {
                            return port !== undefined;
                          });
                          portsToCheck = (0, _filter.default)(ports).call(ports, function (el) {
                            return !(0, _includes.default)(usedPorts).call(usedPorts, el.port);
                          });
                          _iterator2 = _createForOfIteratorHelper(portsToCheck);
                          _context8.prev = 38;

                          _iterator2.s();

                        case 40:
                          if ((_step2 = _iterator2.n()).done) {
                            _context8.next = 94;
                            break;
                          }

                          _port = _step2.value;
                          _context8.prev = 42;
                          _context8.next = 45;
                          return _port.close();

                        case 45:
                          _context8.next = 49;
                          break;

                        case 47:
                          _context8.prev = 47;
                          _context8.t6 = _context8["catch"](42);

                        case 49:
                          devices = availableDevicesMap.get(name);

                          if (devices) {
                            _context8.next = 52;
                            break;
                          }

                          return _context8.abrupt("continue", 92);

                        case 52:
                          found = false;
                          _iterator3 = _createForOfIteratorHelper(devices);
                          _context8.prev = 54;

                          _iterator3.s();

                        case 56:
                          if ((_step3 = _iterator3.n()).done) {
                            _context8.next = 82;
                            break;
                          }

                          dev = _step3.value;
                          deviceInstance = new dev(_port);
                          _context8.prev = 59;
                          _context8.next = 62;
                          return deviceInstance.init();

                        case 62:
                          found = _context8.sent;

                          if (!found) {
                            _context8.next = 75;
                            break;
                          }

                          device.setDevice = deviceInstance;
                          log.info((0, _concat.default)(_context7 = "[".concat(name, "] Device is found! Model=")).call(_context7, deviceInstance.getType()));
                          _context8.t7 = _this2;
                          _context8.t8 = name;
                          _context8.t9 = deviceInstance.getType();
                          _context8.next = 71;
                          return device.checkStatus();

                        case 71:
                          _context8.t10 = _context8.sent;
                          _context8.t11 = {
                            deviceType: _context8.t8,
                            deviceModel: _context8.t9,
                            deviceStatus: _context8.t10
                          };

                          _context8.t7.fireEvent.call(_context8.t7, "connect", _context8.t11);

                          return _context8.abrupt("break", 82);

                        case 75:
                          _context8.next = 80;
                          break;

                        case 77:
                          _context8.prev = 77;
                          _context8.t12 = _context8["catch"](59);
                          log.debugError("Error while initialize device: ", _context8.t12);

                        case 80:
                          _context8.next = 56;
                          break;

                        case 82:
                          _context8.next = 87;
                          break;

                        case 84:
                          _context8.prev = 84;
                          _context8.t13 = _context8["catch"](54);

                          _iterator3.e(_context8.t13);

                        case 87:
                          _context8.prev = 87;

                          _iterator3.f();

                          return _context8.finish(87);

                        case 90:
                          if (!found) {
                            _context8.next = 92;
                            break;
                          }

                          return _context8.abrupt("break", 94);

                        case 92:
                          _context8.next = 40;
                          break;

                        case 94:
                          _context8.next = 99;
                          break;

                        case 96:
                          _context8.prev = 96;
                          _context8.t14 = _context8["catch"](38);

                          _iterator2.e(_context8.t14);

                        case 99:
                          _context8.prev = 99;

                          _iterator2.f();

                          return _context8.finish(99);

                        case 102:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _loop2, null, [[3, 9], [38, 96, 99, 102], [42, 47], [54, 84, 87, 90], [59, 77]]);
                });

                _iterator.s();

              case 5:
                if ((_step = _iterator.n()).done) {
                  _context9.next = 12;
                  break;
                }

                return _context9.delegateYield(_loop2(), "t0", 7);

              case 7:
                _ret = _context9.t0;

                if (!(_ret === "continue")) {
                  _context9.next = 10;
                  break;
                }

                return _context9.abrupt("continue", 10);

              case 10:
                _context9.next = 5;
                break;

              case 12:
                _context9.next = 17;
                break;

              case 14:
                _context9.prev = 14;
                _context9.t1 = _context9["catch"](2);

                _iterator.e(_context9.t1);

              case 17:
                _context9.prev = 17;

                _iterator.f();

                return _context9.finish(17);

              case 20:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee2, this, [[2, 14, 17, 20]]);
      }));

      function loop() {
        return _loop.apply(this, arguments);
      }

      return loop;
    }()
    /**
     * Получение статусов устройств
     */

  }, {
    key: "getDevicesStatus",
    value: function getDevicesStatus() {
      return this.deviceStatus;
    }
    /**
     * Хранилище обработчиков событий
     */

  }, {
    key: "subscribeOn",
    value:
    /**
     * Метод для подписки на события
     * @param event тип события - строка
     * @param handler функция колбек
     */
    function subscribeOn(event, handler) {
      var _context10;

      if (!(0, _includes.default)(_context10 = (0, _keys.default)(this.eventHandlersList)).call(_context10, event)) {
        log.debugError("Try to subscribe to not existing event: ", event);
        return;
      }

      this.eventHandlersList[event].push(handler);
    }
    /**
     * Метод для отписки от события
     * @param event тип события - строка
     * @param handler функция колбек для удаления
     */

  }, {
    key: "unsubscribeFrom",
    value: function unsubscribeFrom(event, handler) {
      var _context11, _context12, _context13;

      if (!(0, _includes.default)(_context11 = (0, _keys.default)(this.eventHandlersList)).call(_context11, event)) {
        log.debugError("Try to unsubscribe from not existing event: ", event);
        return;
      }

      var handlerIndex = (0, _indexOf.default)(_context12 = this.eventHandlersList[event]).call(_context12, handler);

      if (-1 === handlerIndex) {
        log.debugError("Not found required handler for event: ", event, "\nGot handlers: ", this.eventHandlersList);
        return;
      }

      (0, _splice.default)(_context13 = this.eventHandlersList[event]).call(_context13, handlerIndex, 1);
    }
    /**
     * Функция сравнения двух статусов с интерфейсом IStatus. Если статусы различаються возвращает истину
     * @param {IStatus} firstStatus
     * @param {IStatus} secondStatus
     * @returns {boolean} Истина если статусы разные
     * @private
     */

  }, {
    key: "compareStatuses",
    value: function compareStatuses(firstStatus, secondStatus) {
      for (var field in firstStatus) {
        if (!firstStatus.hasOwnProperty(field) || !secondStatus.hasOwnProperty(field)) {
          return true;
        } //@ts-ignore


        if (field !== "rawResponse" && field in firstStatus && field && secondStatus && firstStatus[field] !== secondStatus[field]) {
          return true;
        }
      }

      return false;
    }
    /**
     * Функция для вызова события
     * @param event
     * @param data
     * @private
     */

  }, {
    key: "fireEvent",
    value: function fireEvent(event, data) {
      var _context14;

      log.debug("FireEvent");
      (0, _forEach.default)(_context14 = this.eventHandlersList[event]).call(_context14, function (handler) {
        handler(data);
      });
    }
    /**
     * Получение обьекта ацептора
     */

  }, {
    key: "getAcceptor",
    value: function getAcceptor() {
      return this.findDeviceWrapper(_IDeviceType.DeviceType.ACCEPTOR);
    }
    /**
     * Получение обьекта диспенсера
     */

  }, {
    key: "getDispenser",
    value: function getDispenser() {
      return this.findDeviceWrapper(_IDeviceType.DeviceType.DISPENSER);
    }
    /**
     * Получение обьекта принтера
     */

  }, {
    key: "getPrinter",
    value: function getPrinter() {
      return this.findDeviceWrapper(_IDeviceType.DeviceType.PRINTER);
    }
    /**
     * Получение обертки устройства по типу
     *
     * @param type тип устройства
     */

  }, {
    key: "findDeviceWrapper",
    value: function findDeviceWrapper(type) {
      var wrapper = this.devices.get(type);

      if (!wrapper) {
        throw new Error("[Discovery]: Device [".concat(type, "] not found!"));
      }

      return wrapper;
    }
  }], [{
    key: "getInstance",
    value:
    /**
     * Получение инстанса сервиса дискавери
     */
    function getInstance() {
      if (!DiscoveryService.discovery) {
        DiscoveryService.discovery = new DiscoveryService();
      }

      return DiscoveryService.discovery;
    }
  }, {
    key: "init",
    value:
    /**
     * Первичная инициализация инстанса дискавери
     */
    function init() {
      var ds = DiscoveryService.getInstance();
      log.info("Discovery service initialize!");
      ds.initLoop();
      return ds;
    }
  }]);
  return DiscoveryService;
}();

exports.DiscoveryService = DiscoveryService;
(0, _defineProperty2.default)(DiscoveryService, "discovery", void 0);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZXZpY2VzL0Rpc2NvdmVyeVNlcnZpY2UudHMiXSwibmFtZXMiOlsibG9nIiwiTG9nZ2VyIiwiYXZhaWxhYmxlRGV2aWNlc01hcCIsIkRldmljZVR5cGUiLCJESVNQRU5TRVIiLCJMQ0RNIiwiRUNETSIsIk1JTklNRUNIIiwiQUNDRVBUT1IiLCJQUklOVEVSIiwiRGlzY292ZXJ5U2VydmljZSIsIkRldmljZVdyYXBwZXIiLCJjb25uZWN0IiwibG9zdCIsImNoYW5nZSIsImlzV29yayIsImxvb3AiLCJmaW5hbGx5IiwiZGVidWciLCJkZXZpY2VzIiwibmFtZSIsImRldmljZSIsInN0YXR1cyIsImNoZWNrU3RhdHVzIiwib2siLCJjb25uZWN0ZWQiLCJlbmFibGVkIiwicmF3UmVzcG9uc2UiLCJwcmV2U3RhdHVzZXMiLCJjb21wYXJlU3RhdHVzZXMiLCJkZXZpY2VNb2RlbCIsImdldERldmljZSIsImdldFR5cGUiLCJmaXJlRXZlbnQiLCJkZXZpY2VUeXBlIiwiZGV2aWNlU3RhdHVzIiwicHJldlN0YXR1cyIsImdldCIsInNldCIsInVuZGVmaW5lZCIsImluZm8iLCJjbGVhckRldmljZSIsIk5vZGVTZXJpYWxQb3J0IiwiZ2V0UG9ydHMiLCJwb3J0cyIsInVzZWRQb3J0cyIsIl8iLCJ2YWx1ZSIsImdldFBvcnQiLCJwb3J0IiwicG9ydHNUb0NoZWNrIiwiZWwiLCJjbG9zZSIsImZvdW5kIiwiZGV2IiwiZGV2aWNlSW5zdGFuY2UiLCJpbml0Iiwic2V0RGV2aWNlIiwiZGVidWdFcnJvciIsImV2ZW50IiwiaGFuZGxlciIsImV2ZW50SGFuZGxlcnNMaXN0IiwicHVzaCIsImhhbmRsZXJJbmRleCIsImZpcnN0U3RhdHVzIiwic2Vjb25kU3RhdHVzIiwiZmllbGQiLCJoYXNPd25Qcm9wZXJ0eSIsImRhdGEiLCJmaW5kRGV2aWNlV3JhcHBlciIsInR5cGUiLCJ3cmFwcGVyIiwiRXJyb3IiLCJkaXNjb3ZlcnkiLCJkcyIsImdldEluc3RhbmNlIiwi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ekIsRUFBMEQ7QUFDeEQsVUFBTUMsT0FBTyxHQUFHLEtBQUtwRCxPQUFMLENBQWFrQixHQUFiLENBQWlCaUMsSUFBakIsQ0FBaEI7O0FBQ0EsVUFBSSxDQUFDQyxPQUFMLEVBQWM7QUFDWixjQUFNLElBQUlDLEtBQUosZ0NBQWtDRixJQUFsQyxrQkFBTjtBQUNEOztBQUVELGFBQU9DLE9BQVA7QUFDRDs7OztBQS9PRDtBQUNGO0FBQ0E7QUFDRSwyQkFBOEM7QUFDNUMsVUFBSSxDQUFDN0QsZ0JBQWdCLENBQUMrRCxTQUF0QixFQUFpQztBQUMvQi9ELFFBQUFBLGdCQUFnQixDQUFDK0QsU0FBakIsR0FBNkIsSUFBSS9ELGdCQUFKLEVBQTdCO0FBQ0Q7O0FBQ0QsYUFBT0EsZ0JBQWdCLENBQUMrRCxTQUF4QjtBQUNEOzs7O0FBU0Q7QUFDRjtBQUNBO0FBQ0Usb0JBQXVDO0FBQ3JDLFVBQU1DLEVBQUUsR0FBR2hFLGdCQUFnQixDQUFDaUUsV0FBakIsRUFBWDtBQUNBM0UsTUFBQUEsR0FBRyxDQUFDd0MsSUFBSixDQUFTLCtCQUFUO0FBQ0FrQyxNQUFBQSxFQUFFLENBQUNFLFFBQUg7QUFDQSxhQUFPRixFQUFQO0FBQ0Q7Ozs7Ozs4QkFoQ1VoRSxnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElEZXZpY2UgfSBmcm9tIFwiLi9tb2RlbC9JRGV2aWNlXCI7XG5pbXBvcnQgTm9kZVNlcmlhbFBvcnQgZnJvbSBcIi4vc2VyaWFsL05vZGVTZXJpYWxQb3J0XCI7XG5pbXBvcnQgeyBJU3RhdHVzIH0gZnJvbSBcIi4vbW9kZWwvSVN0YXR1c1wiO1xuaW1wb3J0IHsgRGV2aWNlV3JhcHBlciB9IGZyb20gXCIuL0lEZXZpY2VXcmFwcGVyXCI7XG5pbXBvcnQgSUQwMDMgZnJvbSBcIi4vYWNjY2VwdG9yL0lEMDAzXCI7XG5pbXBvcnQgTlY5IGZyb20gXCIuL2FjY2NlcHRvci9OVjkvaW5kZXhcIjtcbmltcG9ydCBMQ0RNIGZyb20gXCIuL2Rpc3BlbnNlci9MQ0RNXCI7XG5pbXBvcnQgRUNETSBmcm9tIFwiLi9kaXNwZW5zZXIvRUNETVwiO1xuaW1wb3J0IE1JTklNRUNIIGZyb20gXCIuL2Rpc3BlbnNlci9NSU5JTUVDSFwiO1xuaW1wb3J0IHsgRGV2aWNlVHlwZSB9IGZyb20gXCIuL21vZGVsL0lEZXZpY2VUeXBlXCI7XG5pbXBvcnQgeyBJU2VyaWFsUG9ydCB9IGZyb20gXCIuL3NlcmlhbC90eXBlc1wiO1xuaW1wb3J0IFZLUDgwIGZyb20gXCIuL3ByaW50ZXIvdmtwODBJSVwiO1xuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vaGVscGVycy9sb2dnZXJcIjtcblxuY29uc3QgbG9nID0gbmV3IExvZ2dlcihcIltEaXNjb3ZlcnlTZXJ2aWNlXVwiKTtcblxudHlwZSBJRGV2aWNlQ2xhc3MgPSB7IG5ldyAocG9ydDogSVNlcmlhbFBvcnQpOiBJRGV2aWNlIH07XG5cbnR5cGUgRXZlbnRzID0gXCJjb25uZWN0XCIgfCBcImxvc3RcIiB8IFwiY2hhbmdlXCI7XG5cbmV4cG9ydCB0eXBlIElEaXNjb3ZlcnlFdmVudCA9IHsgZGV2aWNlVHlwZTogRGV2aWNlVHlwZTsgZGV2aWNlTW9kZWw/OiBzdHJpbmcsIGRldmljZVN0YXR1cz86IElTdGF0dXMsIGRldmljZTogSURldmljZSB9O1xuXG5jb25zdCBhdmFpbGFibGVEZXZpY2VzTWFwOiBNYXA8RGV2aWNlVHlwZSwgQXJyYXk8SURldmljZUNsYXNzPj4gPSBuZXcgTWFwKFtcbiAgW0RldmljZVR5cGUuRElTUEVOU0VSLCBbXG4gICAgTENETSxcbiAgICBFQ0RNLFxuICAgIE1JTklNRUNIXG4gIF1dLFxuICBbRGV2aWNlVHlwZS5BQ0NFUFRPUiwgW1xuICAgIC8vIElEMDAzLFxuICAgIC8vIE5WOVxuICBdXSxcbiAgW0RldmljZVR5cGUuUFJJTlRFUiwgW1xuICAgIC8vIFZLUDgwXG4gIF1dXG5dKTtcblxuZXhwb3J0IGNsYXNzIERpc2NvdmVyeVNlcnZpY2Uge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cblxuICBwcml2YXRlIHByZXZTdGF0dXNlczogUmVjb3JkPERldmljZVR5cGUsIElTdGF0dXM+ID0ge30gYXMgUmVjb3JkPERldmljZVR5cGUsIElTdGF0dXM+O1xuXG4gIHByaXZhdGUgc3RhdGljIGRpc2NvdmVyeTogRGlzY292ZXJ5U2VydmljZTtcblxuICAvKipcbiAgICog0J/QvtC70YPRh9C10L3QuNC1INC40L3RgdGC0LDQvdGB0LAg0YHQtdGA0LLQuNGB0LAg0LTQuNGB0LrQsNCy0LXRgNC4XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IERpc2NvdmVyeVNlcnZpY2Uge1xuICAgIGlmICghRGlzY292ZXJ5U2VydmljZS5kaXNjb3ZlcnkpIHtcbiAgICAgIERpc2NvdmVyeVNlcnZpY2UuZGlzY292ZXJ5ID0gbmV3IERpc2NvdmVyeVNlcnZpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIERpc2NvdmVyeVNlcnZpY2UuZGlzY292ZXJ5O1xuICB9XG5cbiAgcHJpdmF0ZSBkZXZpY2VTdGF0dXMgPSBuZXcgTWFwPERldmljZVR5cGUsIElTdGF0dXMgfCB1bmRlZmluZWQ+KCk7XG4gIHByaXZhdGUgZGV2aWNlcyA9IG5ldyBNYXAoW1xuICAgIFtEZXZpY2VUeXBlLkRJU1BFTlNFUiwgbmV3IERldmljZVdyYXBwZXIoKV0sXG4gICAgW0RldmljZVR5cGUuQUNDRVBUT1IsIG5ldyBEZXZpY2VXcmFwcGVyKCldLFxuICAgIFtEZXZpY2VUeXBlLlBSSU5URVIsIG5ldyBEZXZpY2VXcmFwcGVyKCldXG4gIF0pO1xuXG4gIC8qKlxuICAgKiDQn9C10YDQstC40YfQvdCw0Y8g0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LjQvdGB0YLQsNC90YHQsCDQtNC40YHQutCw0LLQtdGA0LhcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaW5pdCgpOiBEaXNjb3ZlcnlTZXJ2aWNlIHtcbiAgICBjb25zdCBkcyA9IERpc2NvdmVyeVNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgICBsb2cuaW5mbyhcIkRpc2NvdmVyeSBzZXJ2aWNlIGluaXRpYWxpemUhXCIpO1xuICAgIGRzLmluaXRMb29wKCk7XG4gICAgcmV0dXJuIGRzO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0TG9vcCgpIHtcbiAgICBsZXQgaXNXb3JrID0gZmFsc2U7XG4gICAgdGhpcy5sb29wKCkuZmluYWxseSgoKSA9PlxuICAgICAgc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoaXNXb3JrKSByZXR1cm47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaXNXb3JrID0gdHJ1ZTtcbiAgICAgICAgICBhd2FpdCB0aGlzLmxvb3AoKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpc1dvcmsgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMDApXG4gICAgKTtcbiAgfVxuXG4gIC8qKiDQptC40LrQuyDQvtC/0YDQvtGB0LAg0YPRgdGC0YDQudC+0YHRgtCyICovXG4gIHByaXZhdGUgYXN5bmMgbG9vcCgpIHtcbiAgICBsb2cuZGVidWcoXCJMb29wIHRpY2suXCIpO1xuICAgIGZvciAoY29uc3QgW25hbWUsIGRldmljZV0gb2YgdGhpcy5kZXZpY2VzKSB7XG4gICAgICBsb2cuZGVidWcoXCJEZXZpY2UgY2hlY2s6IFwiLCBuYW1lKTtcbiAgICAgIGxldCBzdGF0dXM6IElTdGF0dXM7XG4gICAgICB0cnkge1xuICAgICAgICBzdGF0dXMgPSBhd2FpdCBkZXZpY2UuY2hlY2tTdGF0dXMoKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHN0YXR1cyA9IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICBzdGF0dXM6IFwiTm90IGVuYWJsZWRcIixcbiAgICAgICAgICByYXdSZXNwb25zZTogW11cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGxvZy5kZWJ1ZyhcIlJlc3BvbnNlIGZyb20gXCIsIG5hbWUsIHN0YXR1cyk7XG4gICAgICBpZighdGhpcy5wcmV2U3RhdHVzZXNbbmFtZV0pIHtcbiAgICAgICAgdGhpcy5wcmV2U3RhdHVzZXNbbmFtZV0gPSBzdGF0dXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5jb21wYXJlU3RhdHVzZXModGhpcy5wcmV2U3RhdHVzZXNbbmFtZV0sIHN0YXR1cykpIHtcbiAgICAgICAgICB0aGlzLnByZXZTdGF0dXNlc1tuYW1lXSA9IHN0YXR1cztcbiAgICAgICAgICBjb25zdCBkZXZpY2VNb2RlbCA9IGRldmljZS5nZXREZXZpY2UoKSA/IGRldmljZS5nZXREZXZpY2UoKT8uZ2V0VHlwZSgpIDogXCJOb3QgU2V0XCI7XG4gICAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJjaGFuZ2VcIiwgeyBkZXZpY2VUeXBlOiBuYW1lLCBkZXZpY2VNb2RlbCwgZGV2aWNlU3RhdHVzOiBzdGF0dXMsIGRldmljZTogZGV2aWNlLmdldERldmljZSgpIH0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXR1cy5jb25uZWN0ZWQpIHtcbiAgICAgICAgbG9nLmRlYnVnKFwiRm91bmQgY29ubmVjdGVkIGRldmljZTpcIiwgYFN0YXR1cyBvZiAke25hbWV9ICR7ZGV2aWNlLmdldERldmljZSgpPy5nZXRUeXBlKCl9IC0gY29ubmVjdGVkIWApO1xuICAgICAgICBjb25zdCBwcmV2U3RhdHVzID0gdGhpcy5kZXZpY2VTdGF0dXMuZ2V0KG5hbWUpXG4gICAgICAgIGlmICgoIXByZXZTdGF0dXMgfHwgIXByZXZTdGF0dXMuY29ubmVjdGVkKSAmJiBkZXZpY2UuZ2V0RGV2aWNlKCk/LmdldFR5cGUoKS5pbmNsdWRlcyhcIk1PQ0tcIikpIHtcbiAgICAgICAgICB0aGlzLmZpcmVFdmVudChcImNvbm5lY3RcIiwgeyBkZXZpY2VUeXBlOiBuYW1lLCBkZXZpY2VNb2RlbDogZGV2aWNlLmdldERldmljZSgpPy5nZXRUeXBlKCksIGRldmljZVN0YXR1czogYXdhaXQgZGV2aWNlLmNoZWNrU3RhdHVzKCkgfSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRldmljZVN0YXR1cy5zZXQobmFtZSwgc3RhdHVzKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGV2aWNlU3RhdHVzLnNldChuYW1lLCB1bmRlZmluZWQpO1xuXG4gICAgICBpZiAoZGV2aWNlLmdldERldmljZSgpKSB7XG4gICAgICAgIGxvZy5pbmZvKFwiTG9zdCBEZXZpY2U6IFwiLCBuYW1lLCBkZXZpY2UuZ2V0RGV2aWNlKCk/LmdldFR5cGUoKSk7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwibG9zdFwiLCB7IGRldmljZVR5cGU6IG5hbWUsIGRldmljZU1vZGVsOiBkZXZpY2UuZ2V0RGV2aWNlKCk/LmdldFR5cGUoKSB9KVxuICAgICAgfVxuXG4gICAgICBsb2cuZGVidWcoYFNlYXJjaGluZyBEZXZpY2U6ICR7bmFtZX1gKTtcblxuICAgICAgZGV2aWNlLmNsZWFyRGV2aWNlKCk7XG4gICAgICBjb25zdCBwb3J0cyA9IGF3YWl0IE5vZGVTZXJpYWxQb3J0LmdldFBvcnRzKCk7XG4gICAgICBjb25zdCB1c2VkUG9ydHMgPSBBcnJheS5mcm9tPFtEZXZpY2VUeXBlLCBEZXZpY2VXcmFwcGVyXT4odGhpcy5kZXZpY2VzLmVudHJpZXMoKSlcbiAgICAgICAgLm1hcCgoW18sIHZhbHVlXSkgPT4gdmFsdWUuZ2V0UG9ydCgpPy5wb3J0KVxuICAgICAgICAuZmlsdGVyKChwb3J0KSA9PiBwb3J0ICE9PSB1bmRlZmluZWQpO1xuXG4gICAgICBjb25zdCBwb3J0c1RvQ2hlY2sgPSBwb3J0cy5maWx0ZXIoKGVsKSA9PiAhdXNlZFBvcnRzLmluY2x1ZGVzKGVsLnBvcnQpKTtcbiAgICAgIGZvciAoY29uc3QgcG9ydCBvZiBwb3J0c1RvQ2hlY2spIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBwb3J0LmNsb3NlKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIC8vIGxvZy5kZWJ1Z0Vycm9yKGBFcnJvciBvZiBjbG9zaW5nIHBvcnQ6ICR7cG9ydC5wb3J0fSFcXG5gLCBlcnIpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZXZpY2VzID0gYXZhaWxhYmxlRGV2aWNlc01hcC5nZXQobmFtZSk7XG4gICAgICAgIGlmICghZGV2aWNlcykgY29udGludWU7XG5cbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgZGV2IG9mIGRldmljZXMpIHtcbiAgICAgICAgICBjb25zdCBkZXZpY2VJbnN0YW5jZSA9IG5ldyBkZXYocG9ydCk7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvdW5kID0gYXdhaXQgZGV2aWNlSW5zdGFuY2UuaW5pdCgpO1xuICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgIGRldmljZS5zZXREZXZpY2UgPSBkZXZpY2VJbnN0YW5jZTtcbiAgICAgICAgICAgICAgbG9nLmluZm8oYFske25hbWV9XSBEZXZpY2UgaXMgZm91bmQhIE1vZGVsPSR7ZGV2aWNlSW5zdGFuY2UuZ2V0VHlwZSgpfWApO1xuICAgICAgICAgICAgICB0aGlzLmZpcmVFdmVudChcImNvbm5lY3RcIiwgeyBkZXZpY2VUeXBlOiBuYW1lLCBkZXZpY2VNb2RlbDpkZXZpY2VJbnN0YW5jZS5nZXRUeXBlKCksIGRldmljZVN0YXR1czogYXdhaXQgZGV2aWNlLmNoZWNrU3RhdHVzKCkgfSlcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBsb2cuZGVidWdFcnJvcihcIkVycm9yIHdoaWxlIGluaXRpYWxpemUgZGV2aWNlOiBcIiwgZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvdW5kKSBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog0J/QvtC70YPRh9C10L3QuNC1INGB0YLQsNGC0YPRgdC+0LIg0YPRgdGC0YDQvtC50YHRgtCyXG4gICAqL1xuICBwdWJsaWMgZ2V0RGV2aWNlc1N0YXR1cygpOiBNYXA8RGV2aWNlVHlwZSwgSVN0YXR1cyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmRldmljZVN0YXR1cztcbiAgfVxuXG4gIC8qKlxuICAgKiDQpdGA0LDQvdC40LvQuNGJ0LUg0L7QsdGA0LDQsdC+0YLRh9C40LrQvtCyINGB0L7QsdGL0YLQuNC5XG4gICAqL1xuICBwcml2YXRlIGV2ZW50SGFuZGxlcnNMaXN0OiBSZWNvcmQ8RXZlbnRzLCBBcnJheTwocGF5bG9hZD86IGFueSk9PnZvaWQ+PiA9IHtcbiAgICBjb25uZWN0OiBbXSxcbiAgICBsb3N0OiBbXSxcbiAgICBjaGFuZ2U6IFtdXG4gIH1cblxuICAvKipcbiAgICog0JzQtdGC0L7QtCDQtNC70Y8g0L/QvtC00L/QuNGB0LrQuCDQvdCwINGB0L7QsdGL0YLQuNGPXG4gICAqIEBwYXJhbSBldmVudCDRgtC40L8g0YHQvtCx0YvRgtC40Y8gLSDRgdGC0YDQvtC60LBcbiAgICogQHBhcmFtIGhhbmRsZXIg0YTRg9C90LrRhtC40Y8g0LrQvtC70LHQtdC6XG4gICAqL1xuICBwdWJsaWMgc3Vic2NyaWJlT24oZXZlbnQ6IEV2ZW50cywgaGFuZGxlcjogKHBheWxvYWQ/OiBJRGlzY292ZXJ5RXZlbnQpID0+IHZvaWQpIHtcbiAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMuZXZlbnRIYW5kbGVyc0xpc3QpLmluY2x1ZGVzKGV2ZW50KSkge1xuICAgICAgbG9nLmRlYnVnRXJyb3IoXCJUcnkgdG8gc3Vic2NyaWJlIHRvIG5vdCBleGlzdGluZyBldmVudDogXCIsIGV2ZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5ldmVudEhhbmRsZXJzTGlzdFtldmVudF0ucHVzaChoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDQnNC10YLQvtC0INC00LvRjyDQvtGC0L/QuNGB0LrQuCDQvtGCINGB0L7QsdGL0YLQuNGPXG4gICAqIEBwYXJhbSBldmVudCDRgtC40L8g0YHQvtCx0YvRgtC40Y8gLSDRgdGC0YDQvtC60LBcbiAgICogQHBhcmFtIGhhbmRsZXIg0YTRg9C90LrRhtC40Y8g0LrQvtC70LHQtdC6INC00LvRjyDRg9C00LDQu9C10L3QuNGPXG4gICAqL1xuICBwdWJsaWMgdW5zdWJzY3JpYmVGcm9tKGV2ZW50OiBFdmVudHMsIGhhbmRsZXI6IChwYXlsb2FkPzogSURpc2NvdmVyeUV2ZW50KSA9PiB2b2lkKSB7XG4gICAgaWYgKCFPYmplY3Qua2V5cyh0aGlzLmV2ZW50SGFuZGxlcnNMaXN0KS5pbmNsdWRlcyhldmVudCkpIHtcbiAgICAgIGxvZy5kZWJ1Z0Vycm9yKFwiVHJ5IHRvIHVuc3Vic2NyaWJlIGZyb20gbm90IGV4aXN0aW5nIGV2ZW50OiBcIiwgZXZlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBoYW5kbGVySW5kZXggPSB0aGlzLmV2ZW50SGFuZGxlcnNMaXN0W2V2ZW50XS5pbmRleE9mKGhhbmRsZXIpO1xuICAgIGlmICgtMSA9PT0gaGFuZGxlckluZGV4KSB7XG4gICAgICBsb2cuZGVidWdFcnJvcihcIk5vdCBmb3VuZCByZXF1aXJlZCBoYW5kbGVyIGZvciBldmVudDogXCIsIGV2ZW50LCBcIlxcbkdvdCBoYW5kbGVyczogXCIsIHRoaXMuZXZlbnRIYW5kbGVyc0xpc3QpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50SGFuZGxlcnNMaXN0W2V2ZW50XS5zcGxpY2UoaGFuZGxlckluZGV4LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDQpNGD0L3QutGG0LjRjyDRgdGA0LDQstC90LXQvdC40Y8g0LTQstGD0YUg0YHRgtCw0YLRg9GB0L7QsiDRgSDQuNC90YLQtdGA0YTQtdC50YHQvtC8IElTdGF0dXMuINCV0YHQu9C4INGB0YLQsNGC0YPRgdGLINGA0LDQt9C70LjRh9Cw0Y7RgtGM0YHRjyDQstC+0LfQstGA0LDRidCw0LXRgiDQuNGB0YLQuNC90YNcbiAgICogQHBhcmFtIHtJU3RhdHVzfSBmaXJzdFN0YXR1c1xuICAgKiBAcGFyYW0ge0lTdGF0dXN9IHNlY29uZFN0YXR1c1xuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0g0JjRgdGC0LjQvdCwINC10YHQu9C4INGB0YLQsNGC0YPRgdGLINGA0LDQt9C90YvQtVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBjb21wYXJlU3RhdHVzZXMoZmlyc3RTdGF0dXM6IElTdGF0dXMsIHNlY29uZFN0YXR1czogSVN0YXR1cyk6IGJvb2xlYW4ge1xuICAgIGZvciAoY29uc3QgZmllbGQgaW4gZmlyc3RTdGF0dXMpIHtcbiAgICAgIGlmICghKGZpcnN0U3RhdHVzLmhhc093blByb3BlcnR5KGZpZWxkKSkgfHwgIShzZWNvbmRTdGF0dXMuaGFzT3duUHJvcGVydHkoZmllbGQpKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgaWYgKChmaWVsZCAhPT0gXCJyYXdSZXNwb25zZVwiKSAmJiAoKGZpZWxkIGluIGZpcnN0U3RhdHVzKSAmJiAoZmllbGQgJiYgc2Vjb25kU3RhdHVzKSkgJiYgKGZpcnN0U3RhdHVzW2ZpZWxkXSAhPT0gc2Vjb25kU3RhdHVzW2ZpZWxkXSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0LLRi9C30L7QstCwINGB0L7QsdGL0YLQuNGPXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBmaXJlRXZlbnQoZXZlbnQ6IEV2ZW50cywgZGF0YTogeyBkZXZpY2VUeXBlOiBEZXZpY2VUeXBlOyBkZXZpY2VNb2RlbD86IHN0cmluZywgZGV2aWNlU3RhdHVzPzogSVN0YXR1cywgZGV2aWNlPzogSURldmljZSB9KSB7XG4gICAgbG9nLmRlYnVnKFwiRmlyZUV2ZW50XCIpO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyc0xpc3RbZXZlbnRdLmZvckVhY2goKGhhbmRsZXIpID0+IHtcbiAgICAgIGhhbmRsZXIoZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICog0J/QvtC70YPRh9C10L3QuNC1INC+0LHRjNC10LrRgtCwINCw0YbQtdC/0YLQvtGA0LBcbiAgICovXG4gIHB1YmxpYyBnZXRBY2NlcHRvcigpOiBEZXZpY2VXcmFwcGVyIHtcbiAgICByZXR1cm4gdGhpcy5maW5kRGV2aWNlV3JhcHBlcihEZXZpY2VUeXBlLkFDQ0VQVE9SKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0L7QsdGM0LXQutGC0LAg0LTQuNGB0L/QtdC90YHQtdGA0LBcbiAgICovXG4gIHB1YmxpYyBnZXREaXNwZW5zZXIoKTogRGV2aWNlV3JhcHBlciB7XG4gICAgcmV0dXJuIHRoaXMuZmluZERldmljZVdyYXBwZXIoRGV2aWNlVHlwZS5ESVNQRU5TRVIpO1xuICB9XG5cbiAgLyoqXG4gICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQvtCx0YzQtdC60YLQsCDQv9GA0LjQvdGC0LXRgNCwXG4gICAqL1xuICBwdWJsaWMgZ2V0UHJpbnRlcigpOiBEZXZpY2VXcmFwcGVyIHtcbiAgICByZXR1cm4gdGhpcy5maW5kRGV2aWNlV3JhcHBlcihEZXZpY2VUeXBlLlBSSU5URVIpO1xuICB9XG5cbiAgLyoqXG4gICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQvtCx0LXRgNGC0LrQuCDRg9GB0YLRgNC+0LnRgdGC0LLQsCDQv9C+INGC0LjQv9GDXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlINGC0LjQvyDRg9GB0YLRgNC+0LnRgdGC0LLQsFxuICAgKi9cbiAgcHVibGljIGZpbmREZXZpY2VXcmFwcGVyKHR5cGU6IERldmljZVR5cGUpOiBEZXZpY2VXcmFwcGVyIHtcbiAgICBjb25zdCB3cmFwcGVyID0gdGhpcy5kZXZpY2VzLmdldCh0eXBlKTtcbiAgICBpZiAoIXdyYXBwZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW0Rpc2NvdmVyeV06IERldmljZSBbJHt0eXBlfV0gbm90IGZvdW5kIWApO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwcGVyO1xuICB9XG59XG4iXX0=