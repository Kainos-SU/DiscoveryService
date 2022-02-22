"use strict";

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _replaceAll = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/replace-all"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

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

var _IPrinter = require("../../model/IPrinter");

var _ibm = require("ibm866");

var _logger = require("../../../helpers/logger");

var _helpers = require("./helpers");

var _d4cQueue = require("d4c-queue");

var _class;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var log = new _logger.Logger("[VKP-80]: "); // const encode = require("ibm866").encode;

var portSettings = {
  baudRate: 38400,
  bufferSize: 255,
  dataBit: 8,
  flowControl: "none",
  parity: "none",
  stopBits: 1
};
var VKP80 = (_class = /*#__PURE__*/function (_BasePrinter) {
  (0, _inherits2.default)(VKP80, _BasePrinter);

  var _super = _createSuper(VKP80);

  function VKP80(port) {
    var _this;

    (0, _classCallCheck2.default)(this, VKP80);
    _this = _super.call(this, port);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resolvePaperInOutput", void 0);
    _this.deviceType = "VKP80";
    return _this;
  }

  (0, _createClass2.default)(VKP80, [{
    key: "checkStatus",
    value: function () {
      var _checkStatus = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _context;

        var def, status;
        return _regenerator.default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getStatus();

              case 2:
                def = _context2.sent;
                status = "";
                (0, _forEach.default)(_context = (0, _entries.default)(def.PAPER_STATUS)).call(_context, function (_ref) {
                  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
                      key = _ref2[0],
                      state = _ref2[1];

                  if (state) {
                    status += key + "\n";
                  }
                });

                if (!status) {
                  status = "No Error!";
                }

                return _context2.abrupt("return", {
                  ok: def.DLE && def.SECOND_BYTE,
                  enabled: this.enable,
                  connected: true,
                  status: status,
                  rawResponse: def.rawStatus
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function checkStatus() {
        return _checkStatus.apply(this, arguments);
      }

      return checkStatus;
    }()
  }, {
    key: "cut",
    value: function () {
      var _cut = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var align,
            _this$port,
            _this$port2,
            _args2 = arguments;

        return _regenerator.default.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                align = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
                console.log("Обрезаем", align);

                if (!align) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 5;
                return this.printLine('----------------------------------');

              case 5:
                _context3.next = 7;
                return this.printLine('');

              case 7:
                _context3.next = 17;
                break;

              case 9:
                _context3.next = 11;
                return this.printLine('');

              case 11:
                _context3.next = 13;
                return this.printLine('');

              case 13:
                _context3.next = 15;
                return (_this$port = this.port) === null || _this$port === void 0 ? void 0 : _this$port.write([0x1b, 0x69]);

              case 15:
                _context3.next = 17;
                return (_this$port2 = this.port) === null || _this$port2 === void 0 ? void 0 : _this$port2.write([0x1D, 0x65, 0x03, 0xFF]);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function cut() {
        return _cut.apply(this, arguments);
      }

      return cut;
    }()
  }, {
    key: "reset",
    value: function () {
      var _reset = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _this$port3;

        return _regenerator.default.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (_this$port3 = this.port) === null || _this$port3 === void 0 ? void 0 : _this$port3.write([0x1B, 0x40]);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, this);
      }));

      function reset() {
        return _reset.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var _this$port4, status, _this$port5;

        return _regenerator.default.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return (_this$port4 = this.port) === null || _this$port4 === void 0 ? void 0 : _this$port4.open(portSettings);

              case 3:
                _context5.next = 5;
                return this.reset();

              case 5:
                _context5.next = 7;
                return this.getStatus();

              case 7:
                status = _context5.sent;

                if (!(status.DLE && status.SECOND_BYTE)) {
                  _context5.next = 11;
                  break;
                }

                this.initLoop(400);
                return _context5.abrupt("return", true);

              case 11:
                return _context5.abrupt("return", false);

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5["catch"](0);
                console.log(_context5.t0);
                _context5.next = 19;
                return (_this$port5 = this.port) === null || _this$port5 === void 0 ? void 0 : _this$port5.close();

              case 19:
                return _context5.abrupt("return", false);

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, this, [[0, 14]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "loop",
    value: function () {
      var _loop = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var status;
        return _regenerator.default.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getStatus();

              case 2:
                status = _context6.sent;

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee5, this);
      }));

      function loop() {
        return _loop.apply(this, arguments);
      }

      return loop;
    }()
  }, {
    key: "printBarCode",
    value: function () {
      var _printBarCode = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(code) {
        var _this$port6, _this$port7, _this$port8, _this$port9, _this$port10, _this$port11, _this$port12, _this$port13, _this$port14;

        return _regenerator.default.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(code.length > 13)) {
                  _context7.next = 2;
                  break;
                }

                throw new Error("[VKP-80] String is to long for barcode! " + code);

              case 2:
                _context7.next = 4;
                return (_this$port6 = this.port) === null || _this$port6 === void 0 ? void 0 : _this$port6.write([0x1b, 0x61, 0x01]);

              case 4:
                _context7.next = 6;
                return (_this$port7 = this.port) === null || _this$port7 === void 0 ? void 0 : _this$port7.write([0x1D, 0x48, 0x02]);

              case 6:
                _context7.next = 8;
                return (_this$port8 = this.port) === null || _this$port8 === void 0 ? void 0 : _this$port8.write([0x1D, 0x66, 0x00]);

              case 8:
                _context7.next = 10;
                return (_this$port9 = this.port) === null || _this$port9 === void 0 ? void 0 : _this$port9.write([0x1D, 0x68, 0x51]);

              case 10:
                _context7.next = 12;
                return (_this$port10 = this.port) === null || _this$port10 === void 0 ? void 0 : _this$port10.write([0x1D, 0x77, 0x03]);

              case 12:
                _context7.next = 14;
                return (_this$port11 = this.port) === null || _this$port11 === void 0 ? void 0 : _this$port11.write([0x1D, 0x6B, 0x02]);

              case 14:
                _context7.next = 16;
                return (_this$port12 = this.port) === null || _this$port12 === void 0 ? void 0 : _this$port12.writeString(code);

              case 16:
                _context7.next = 18;
                return (_this$port13 = this.port) === null || _this$port13 === void 0 ? void 0 : _this$port13.write([0x00, 0x00]);

              case 18:
                _context7.next = 20;
                return (_this$port14 = this.port) === null || _this$port14 === void 0 ? void 0 : _this$port14.writeString("\r\n");

              case 20:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee6, this);
      }));

      function printBarCode(_x) {
        return _printBarCode.apply(this, arguments);
      }

      return printBarCode;
    }()
  }, {
    key: "printLine",
    value: function () {
      var _printLine = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(message) {
        var _this$port15, _this$port16, _this$port17, _this$port18;

        var messageConv;
        return _regenerator.default.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                messageConv = this.changeCode(message);
                _context8.next = 3;
                return (_this$port15 = this.port) === null || _this$port15 === void 0 ? void 0 : _this$port15.write([0x1b, 0x74, 0x11]);

              case 3:
                _context8.next = 5;
                return (_this$port16 = this.port) === null || _this$port16 === void 0 ? void 0 : _this$port16.write([0x1b, 0x61, 0x01]);

              case 5:
                _context8.next = 7;
                return (_this$port17 = this.port) === null || _this$port17 === void 0 ? void 0 : _this$port17.write((0, _from.default)(messageConv));

              case 7:
                _context8.next = 9;
                return (_this$port18 = this.port) === null || _this$port18 === void 0 ? void 0 : _this$port18.write([0x0D, 0x0A]);

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee7, this);
      }));

      function printLine(_x2) {
        return _printLine.apply(this, arguments);
      }

      return printLine;
    }()
  }, {
    key: "romVersion",
    value: function () {
      var _romVersion = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var transmitPrinterId, _this$port19, _context9, _this$port20, _context10, _this$port21, _context11, _context12, printerModel, typeId, romVersionId;

        return _regenerator.default.wrap(function _callee8$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                transmitPrinterId = [0x1D, 0x49];
                _context13.prev = 1;
                _context13.next = 4;
                return (_this$port19 = this.port) === null || _this$port19 === void 0 ? void 0 : _this$port19.writeAndRead((0, _concat.default)(_context9 = []).call(_context9, transmitPrinterId, [0x01]), 50, true);

              case 4:
                _context13.t0 = _context13.sent;

                if (_context13.t0) {
                  _context13.next = 7;
                  break;
                }

                _context13.t0 = [];

              case 7:
                printerModel = _context13.t0;
                _context13.next = 10;
                return (_this$port20 = this.port) === null || _this$port20 === void 0 ? void 0 : _this$port20.writeAndRead((0, _concat.default)(_context10 = []).call(_context10, transmitPrinterId, [0x02]), 50, true);

              case 10:
                _context13.t1 = _context13.sent;

                if (_context13.t1) {
                  _context13.next = 13;
                  break;
                }

                _context13.t1 = [];

              case 13:
                typeId = _context13.t1;
                _context13.next = 16;
                return (_this$port21 = this.port) === null || _this$port21 === void 0 ? void 0 : _this$port21.writeAndRead((0, _concat.default)(_context11 = []).call(_context11, transmitPrinterId, [0x03]), 50, true);

              case 16:
                _context13.t2 = _context13.sent;

                if (_context13.t2) {
                  _context13.next = 19;
                  break;
                }

                _context13.t2 = [];

              case 19:
                romVersionId = _context13.t2;
                log.info("Printer Model: ", (0, _map.default)(printerModel).call(printerModel, function (num) {
                  return num === null || num === void 0 ? void 0 : num.toString(16);
                }));
                log.info("Type ID: ", (0, _map.default)(typeId).call(typeId, function (num) {
                  return num === null || num === void 0 ? void 0 : num.toString(16);
                }));
                log.info("romVersion: ", (0, _map.default)(romVersionId).call(romVersionId, function (num) {
                  return num === null || num === void 0 ? void 0 : num.toString(16);
                }));
                return _context13.abrupt("return", {
                  ok: true,
                  enabled: this.enable,
                  connected: true,
                  status: "",
                  rawResponse: (0, _concat.default)(_context12 = []).call(_context12, (0, _toConsumableArray2.default)(printerModel), (0, _toConsumableArray2.default)(typeId), (0, _toConsumableArray2.default)(romVersionId))
                });

              case 26:
                _context13.prev = 26;
                _context13.t3 = _context13["catch"](1);
                log.error("Can not get rom version");
                return _context13.abrupt("return", {
                  connected: false,
                  enabled: this.enable,
                  ok: false,
                  rawResponse: [],
                  status: "Can not get Rom Version"
                });

              case 30:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee8, this, [[1, 26]]);
      }));

      function romVersion() {
        return _romVersion.apply(this, arguments);
      }

      return romVersion;
    }()
  }, {
    key: "paperRemoved",
    value: function paperRemoved() {
      if (this.resolvePaperInOutput) {
        this.resolvePaperInOutput();
        this.resolvePaperInOutput = undefined;
      }
    }
  }, {
    key: "paperRemovedFromInput",
    value: function paperRemovedFromInput() {
      var _this2 = this;

      return new _promise.default(function (resolve) {
        _this2.resolvePaperInOutput = resolve;
      });
    }
  }, {
    key: "getStatus",
    value: function () {
      var _getStatus = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var _context14, _context15, _context16, _context17, buffer, status, prevPaperInOutput, currentStatus, setCurrentStatus;

        return _regenerator.default.wrap(function _callee9$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                if (this.port) {
                  _context18.next = 2;
                  break;
                }

                return _context18.abrupt("return", _promise.default.reject(new Error("Port is not exists!")));

              case 2:
                _context18.prev = 2;
                _context18.next = 5;
                return this.port.writeAndRead([0x10, 0x04, 0x14], 100);

              case 5:
                buffer = _context18.sent;
                status = (0, _helpers.parseStatus)(buffer);
                prevPaperInOutput = this.paperInOutput;
                this.paperInOutput = status.PAPER_STATUS.TICKET_PRESENT_IN_OUTPUT;

                if (!this.paperInOutput && prevPaperInOutput) {
                  this.paperRemoved();
                }

                this.paperJam = status.RECOVERABLE_STATUS.PAPER_JAM;
                this.nearEnd = status.PAPER_STATUS.PAPER_NEAR_END;
                this.paperNotPresent = status.PAPER_STATUS.PAPER_NOT_PRESENT;
                this.coverOpen = status.USER_STATUS.COVER_OPEN || status.USER_STATUS.COVER_OPEN_1;
                currentStatus = "";

                setCurrentStatus = function setCurrentStatus(_ref3) {
                  var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
                      key = _ref4[0],
                      value = _ref4[1];

                  if (!value) {
                    return;
                  }

                  currentStatus += (0, _replaceAll.default)(key).call(key, "_", " ") + "\n";
                };

                (0, _forEach.default)(_context14 = (0, _entries.default)(status.PAPER_STATUS)).call(_context14, setCurrentStatus);
                (0, _forEach.default)(_context15 = (0, _entries.default)(status.USER_STATUS)).call(_context15, setCurrentStatus);
                (0, _forEach.default)(_context16 = (0, _entries.default)(status.RECOVERABLE_STATUS)).call(_context16, setCurrentStatus);
                (0, _forEach.default)(_context17 = (0, _entries.default)(status.UNRECOVERABLE_ERROR)).call(_context17, setCurrentStatus);

                if (currentStatus === "") {
                  currentStatus = "OK";
                }

                this.lastStatus = currentStatus;
                return _context18.abrupt("return", status);

              case 25:
                _context18.prev = 25;
                _context18.t0 = _context18["catch"](2);
                throw new Error("Error of parsing message: " + _context18.t0.message);

              case 28:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee9, this, [[2, 25]]);
      }));

      function getStatus() {
        return _getStatus.apply(this, arguments);
      }

      return getStatus;
    }()
  }, {
    key: "changeCode",
    value: function changeCode(message) {
      return (0, _ibm.encode)(message);
    }
  }, {
    key: "getPrinterStatus",
    value: function getPrinterStatus() {
      return {
        paperInOutput: this.paperInOutput,
        coverOpen: this.coverOpen,
        nearEnd: this.nearEnd,
        paperJam: this.paperJam,
        paperNotPresent: this.paperNotPresent,
        status: this.lastStatus,
        type: this.deviceType
      };
    }
  }, {
    key: "fireEvent",
    value: function fireEvent(event) {}
  }]);
  return VKP80;
}(_IPrinter.BasePrinter), ((0, _applyDecoratedDescriptor2.default)(_class.prototype, "getStatus", [_d4cQueue.synchronized], (0, _getOwnPropertyDescriptor.default)(_class.prototype, "getStatus"), _class.prototype)), _class);
exports.default = VKP80;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZXZpY2VzL3ByaW50ZXIvdmtwODBJSS9pbmRleC50cyJdLCJuYW1lcyI6WyJsb2ciLCJMb2dnZXIiLCJwb3J0U2V0dGluZ3MiLCJiYXVkUmF0ZSIsImJ1ZmZlclNpemUiLCJkYXRhQml0IiwiZmxvd0NvbnRyb2wiLCJwYXJpdHkiLCJzdG9wQml0cyIsIlZLUDgwIiwicG9ydCIsImRldmljZVR5cGUiLCJnZXRTdGF0dXMiLCJkZWYiLCJzdGF0dXMiLCJQQVBFUl9TVEFUVVMiLCJrZXkiLCJzdGF0ZSIsIm9rIiwiRExFIiwiU0VDT05EX0JZVEUiLCJlbmFibGVkIiwiZW5hYmxlIiwiY29ubmVjdGVkIiwicmF3UmVzcG9uc2UiLCJyYXdTdGF0dXMiLCJhbGlnbiIsImNvbnNvbGUiLCJwcmludExpbmUiLCJ3cml0ZSIsIm9wZW4iLCJyZXNldCIsImluaXRMb29wIiwiY2xvc2UiLCJjb2RlIiwibGVuZ3RoIiwiRXJyb3IiLCJ3cml0ZVN0cmluZyIsIm1lc3NhZ2UiLCJtZXNzYWdlQ29udiIsImNoYW5nZUNvZGUiLCJ0cmFuc21pdFByaW50ZXJJZCIsIndyaXRlQW5kUmVhZCIsInByaW50ZXJNb2RlbCIsInR5cGVJZCIsInJvbVZlcnNpb25JZCIsImluZm8iLCJudW0iLCJ0b1N0cmluZyIsImVycm9yIiwicmVzb2x2ZVBhcGVySW5PdXRwdXQiLCJ1bmRlZmluZWQiLCJyZXNvbHZlIiwicmVqZWN0IiwiYnVmZmVyIiwicHJldlBhcGVySW5PdXRwdXQiLCJwYXBlckluT3V0cHV0IiwiVElDS0VUX1BSRVNFTlRfSU5fT1VUUFVUIiwicGFwZXJSZW1vdmVkIiwicGFwZXJKYW0iLCJSRUNPVkVSQUJMRV9TVEFUVVMiLCJQQVBFUl9KQU0iLCJuZWFyRW5kIiwiUEFQRVJfTkVBUl9FTkQiLCJwYXBlck5vdFByZXNlbnQiLCJQQVBFUl9OT1RfUFJFU0VOVCIsImNvdmVyT3BlbiIsIlVTRVJfU1RBVFVTIiwiQ09WRVJfT1BFTiIsIkNPVkVSX09QRU5fMSIsImN1cnJlbnRTdGF0dXMiLCJzZXRDdXJyZW50U3RhdHVzIiwidmFsdWUiLCJVTlJFQ09WRVJBQkxFX0VSUk9SIiwibGFzdFN0YXR1cyIsInR5cGUiLCJldmVudCIsIkJhc2VQcmludGVyIiwic3luY2hyb25pemVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsR0FBRyxHQUFHLElBQUlDLGNBQUosQ0FBVyxZQUFYLENBQVosQyxDQUVBOztBQUVBLElBQU1DLFlBQThCLEdBQUc7QUFDbkNDLEVBQUFBLFFBQVEsRUFBRSxLQUR5QjtBQUVuQ0MsRUFBQUEsVUFBVSxFQUFFLEdBRnVCO0FBR25DQyxFQUFBQSxPQUFPLEVBQUUsQ0FIMEI7QUFJbkNDLEVBQUFBLFdBQVcsRUFBRSxNQUpzQjtBQUtuQ0MsRUFBQUEsTUFBTSxFQUFFLE1BTDJCO0FBTW5DQyxFQUFBQSxRQUFRLEVBQUU7QUFOeUIsQ0FBdkM7SUFTcUJDLEs7Ozs7O0FBSWpCLGlCQUFtQkMsSUFBbkIsRUFBc0M7QUFBQTs7QUFBQTtBQUNsQyw4QkFBTUEsSUFBTjtBQURrQztBQUVsQyxVQUFLQyxVQUFMLEdBQWtCLE9BQWxCO0FBRmtDO0FBR3JDOzs7OztpR0FFRDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUNzQixLQUFLQyxTQUFMLEVBRHRCOztBQUFBO0FBQ1VDLGdCQUFBQSxHQURWO0FBRVFDLGdCQUFBQSxNQUZSLEdBRWlCLEVBRmpCO0FBR0ksdUVBQWVELEdBQUcsQ0FBQ0UsWUFBbkIsa0JBQXlDLGdCQUFrQjtBQUFBO0FBQUEsc0JBQWhCQyxHQUFnQjtBQUFBLHNCQUFYQyxLQUFXOztBQUN2RCxzQkFBSUEsS0FBSixFQUFXO0FBQ1BILG9CQUFBQSxNQUFNLElBQUlFLEdBQUcsR0FBRyxJQUFoQjtBQUNIO0FBQ0osaUJBSkQ7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QzJELG1CQUF0QixvQkFBbURGLGdCQUFuRDs7QUFFQSxvQkFBSUQsYUFBYSxLQUFLLEVBQXRCLEVBQTBCO0FBQ3RCQSxrQkFBQUEsYUFBYSxHQUFHLElBQWhCO0FBQ0g7O0FBRUQscUJBQUtJLFVBQUwsR0FBa0JKLGFBQWxCO0FBL0JSLG1EQWlDZXhELE1BakNmOztBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQW1DYyxJQUFJc0IsS0FBSixDQUFVLCtCQUErQixjQUFNRSxPQUEvQyxDQW5DZDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7O1dBdUNBLG9CQUFXQSxPQUFYLEVBQTRCO0FBQ3hCLGFBQU8saUJBQU9BLE9BQVAsQ0FBUDtBQUNIOzs7V0FFRCw0QkFBMEM7QUFDdEMsYUFBTztBQUNIa0IsUUFBQUEsYUFBYSxFQUFFLEtBQUtBLGFBRGpCO0FBRUhVLFFBQUFBLFNBQVMsRUFBRSxLQUFLQSxTQUZiO0FBR0hKLFFBQUFBLE9BQU8sRUFBRSxLQUFLQSxPQUhYO0FBSUhILFFBQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUpaO0FBS0hLLFFBQUFBLGVBQWUsRUFBRSxLQUFLQSxlQUxuQjtBQU1IbEQsUUFBQUEsTUFBTSxFQUFFLEtBQUs0RCxVQU5WO0FBT0hDLFFBQUFBLElBQUksRUFBRSxLQUFLaEU7QUFQUixPQUFQO0FBU0g7OztXQUVELG1CQUFrQmlFLEtBQWxCLEVBQW9DLENBRW5DOzs7RUE5TDhCQyxxQiw0RUFxSTlCQyxzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNlcmlhbFBvcnQsIFNlcmlhbFBvcnRPcHRpb259IGZyb20gXCIuLi8uLi9zZXJpYWwvdHlwZXNcIjtcbmltcG9ydCB7IEJhc2VQcmludGVyLCBJUHJpbnRlclN0YXR1cyB9IGZyb20gXCIuLi8uLi9tb2RlbC9JUHJpbnRlclwiO1xuaW1wb3J0IHtJU3RhdHVzfSBmcm9tIFwiLi4vLi4vbW9kZWwvSVN0YXR1c1wiO1xuaW1wb3J0IHsgZW5jb2RlIH0gZnJvbSBcImlibTg2NlwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL2hlbHBlcnMvbG9nZ2VyXCI7XG5pbXBvcnQgeyBJVktQODBGdWxsU3RhdHVzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IHBhcnNlU3RhdHVzIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgc3luY2hyb25pemVkIH0gZnJvbSBcImQ0Yy1xdWV1ZVwiO1xuXG5jb25zdCBsb2cgPSBuZXcgTG9nZ2VyKFwiW1ZLUC04MF06IFwiKTtcblxuLy8gY29uc3QgZW5jb2RlID0gcmVxdWlyZShcImlibTg2NlwiKS5lbmNvZGU7XG5cbmNvbnN0IHBvcnRTZXR0aW5nczogU2VyaWFsUG9ydE9wdGlvbiA9IHtcbiAgICBiYXVkUmF0ZTogMzg0MDAsXG4gICAgYnVmZmVyU2l6ZTogMjU1LFxuICAgIGRhdGFCaXQ6IDgsXG4gICAgZmxvd0NvbnRyb2w6IFwibm9uZVwiLFxuICAgIHBhcml0eTogXCJub25lXCIsXG4gICAgc3RvcEJpdHM6IDEsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWS1A4MCBleHRlbmRzIEJhc2VQcmludGVyIHtcblxuICAgIHByaXZhdGUgcmVzb2x2ZVBhcGVySW5PdXRwdXQ/OiAodmFsdWU/OiBhbnkpID0+IHZvaWQ7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocG9ydDogSVNlcmlhbFBvcnQpIHtcbiAgICAgICAgc3VwZXIocG9ydCk7XG4gICAgICAgIHRoaXMuZGV2aWNlVHlwZSA9IFwiVktQODBcIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgY2hlY2tTdGF0dXMoKTogUHJvbWlzZTxJU3RhdHVzPiB7XG4gICAgICAgIGNvbnN0IGRlZiA9IGF3YWl0IHRoaXMuZ2V0U3RhdHVzKClcbiAgICAgICAgbGV0IHN0YXR1cyA9IFwiXCI7XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRlZi5QQVBFUl9TVEFUVVMpLmZvckVhY2goKFtrZXksIHN0YXRlXSkgPT4ge1xuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzICs9IGtleSArIFwiXFxuXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmICghc3RhdHVzKSB7XG4gICAgICAgICAgICBzdGF0dXMgPSBcIk5vIEVycm9yIVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvazogZGVmLkRMRSAmJiBkZWYuU0VDT05EX0JZVEUsXG4gICAgICAgICAgICBlbmFibGVkOiB0aGlzLmVuYWJsZSxcbiAgICAgICAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcbiAgICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICAgIHJhd1Jlc3BvbnNlOiBkZWYucmF3U3RhdHVzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGN1dChhbGlnbjpib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCLQntCx0YDQtdC30LDQtdC8XCIsIGFsaWduKVxuICAgICAgICBpZihhbGlnbikge1xuICAgICAgICAgIC8vICBjb25zb2xlLmxvZyhcItCc0Ysg0YHRjtC00LAg0L/QvtC/0LDQu9C4INCyINC/0LXRgNC10LTQsNGH0YMg0LHQsNC50YLQvtCyIVwiKVxuICAgICAgICAgIC8vICBhd2FpdCB0aGlzLnBvcnQud3JpdGUoWzB4MUQsMHhGOF0pXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnByaW50TGluZSgnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnByaW50TGluZSgnJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucHJpbnRMaW5lKCcnKVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wcmludExpbmUoJycpXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBvcnQ/LndyaXRlKFsweDFiLCAweDY5XSlcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucG9ydD8ud3JpdGUoWzB4MUQsIDB4NjUsIDB4MDMsIDB4RkZdKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlc2V0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLnBvcnQ/LndyaXRlKFsweDFCLCAweDQwXSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGluaXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBvcnQ/Lm9wZW4ocG9ydFNldHRpbmdzKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIGxldCBzdGF0dXMgPSBhd2FpdCB0aGlzLmdldFN0YXR1cygpO1xuICAgICAgICAgICAgaWYgKHN0YXR1cy5ETEUgJiYgc3RhdHVzLlNFQ09ORF9CWVRFKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0TG9vcCg0MDApO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBvcnQ/LmNsb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXN5bmMgbG9vcCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gYXdhaXQgdGhpcy5nZXRTdGF0dXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcHJpbnRCYXJDb2RlKGNvZGU6IHN0cmluZykge1xuICAgICAgICBpZiAoY29kZS5sZW5ndGggPiAxMykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW1ZLUC04MF0gU3RyaW5nIGlzIHRvIGxvbmcgZm9yIGJhcmNvZGUhIFwiICsgY29kZSk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5wb3J0Py53cml0ZShbMHgxYiwgMHg2MSwgMHgwMV0pXG4gICAgICAgIGF3YWl0IHRoaXMucG9ydD8ud3JpdGUoWzB4MUQsIDB4NDgsIDB4MDJdKVxuICAgICAgICBhd2FpdCB0aGlzLnBvcnQ/LndyaXRlKFsweDFELCAweDY2LCAweDAwXSlcbiAgICAgICAgYXdhaXQgdGhpcy5wb3J0Py53cml0ZShbMHgxRCwgMHg2OCwgMHg1MV0pXG4gICAgICAgIGF3YWl0IHRoaXMucG9ydD8ud3JpdGUoWzB4MUQsIDB4NzcsIDB4MDNdKVxuICAgICAgICBhd2FpdCB0aGlzLnBvcnQ/LndyaXRlKFsweDFELCAweDZCLCAweDAyXSlcbiAgICAgICAgYXdhaXQgdGhpcy5wb3J0Py53cml0ZVN0cmluZyhjb2RlKVxuICAgICAgICBhd2FpdCB0aGlzLnBvcnQ/LndyaXRlKFsweDAwLCAweDAwXSlcbiAgICAgICAgYXdhaXQgdGhpcy5wb3J0Py53cml0ZVN0cmluZyhcIlxcclxcblwiKVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBwcmludExpbmUobWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGxldCBtZXNzYWdlQ29udiA9IHRoaXMuY2hhbmdlQ29kZShtZXNzYWdlKVxuICAgICAgICBhd2FpdCB0aGlzLnBvcnQ/LndyaXRlKFsweDFiLCAweDc0LCAweDExXSlcbiAgICAgICAgYXdhaXQgdGhpcy5wb3J0Py53cml0ZShbMHgxYiwgMHg2MSwgMHgwMV0pXG4gICAgICAgIGF3YWl0IHRoaXMucG9ydD8ud3JpdGUoQXJyYXkuZnJvbShtZXNzYWdlQ29udikpXG4gICAgICAgIGF3YWl0IHRoaXMucG9ydD8ud3JpdGUoWzB4MEQsIDB4MEFdKVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByb21WZXJzaW9uKCk6IFByb21pc2U8SVN0YXR1cz4ge1xuICAgICAgICBjb25zdCB0cmFuc21pdFByaW50ZXJJZCA9IFsweDFELCAweDQ5XTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHByaW50ZXJNb2RlbCA9IGF3YWl0IHRoaXMucG9ydD8ud3JpdGVBbmRSZWFkKFsuLi50cmFuc21pdFByaW50ZXJJZCwgMHgwMV0sIDUwLCB0cnVlKSB8fCBbXTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVJZCA9IGF3YWl0IHRoaXMucG9ydD8ud3JpdGVBbmRSZWFkKFsuLi50cmFuc21pdFByaW50ZXJJZCwgMHgwMl0sIDUwLCB0cnVlKSB8fCBbXTtcbiAgICAgICAgICAgIGNvbnN0IHJvbVZlcnNpb25JZCA9IGF3YWl0IHRoaXMucG9ydD8ud3JpdGVBbmRSZWFkKFsuLi50cmFuc21pdFByaW50ZXJJZCwgMHgwM10sIDUwLCB0cnVlKSB8fCBbXTtcbiAgICAgICAgICAgIGxvZy5pbmZvKFwiUHJpbnRlciBNb2RlbDogXCIsIHByaW50ZXJNb2RlbC5tYXAobnVtID0+IG51bT8udG9TdHJpbmcoMTYpKSk7XG4gICAgICAgICAgICBsb2cuaW5mbyhcIlR5cGUgSUQ6IFwiLCB0eXBlSWQubWFwKG51bSA9PiBudW0/LnRvU3RyaW5nKDE2KSkpO1xuICAgICAgICAgICAgbG9nLmluZm8oXCJyb21WZXJzaW9uOiBcIiwgcm9tVmVyc2lvbklkLm1hcChudW0gPT4gbnVtPy50b1N0cmluZygxNikpKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5lbmFibGUsXG4gICAgICAgICAgICAgICAgY29ubmVjdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN0YXR1czogXCJcIixcbiAgICAgICAgICAgICAgICByYXdSZXNwb25zZTogWy4uLnByaW50ZXJNb2RlbCwgLi4udHlwZUlkLCAuLi5yb21WZXJzaW9uSWRdLFxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbG9nLmVycm9yKFwiQ2FuIG5vdCBnZXQgcm9tIHZlcnNpb25cIik7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5lbmFibGUsXG4gICAgICAgICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJhd1Jlc3BvbnNlOiBbXSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwiQ2FuIG5vdCBnZXQgUm9tIFZlcnNpb25cIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXBlclJlbW92ZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc29sdmVQYXBlckluT3V0cHV0KSB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVQYXBlckluT3V0cHV0KCk7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVQYXBlckluT3V0cHV0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHBhcGVyUmVtb3ZlZEZyb21JbnB1dCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVQYXBlckluT3V0cHV0ID0gcmVzb2x2ZTtcbiAgICAgICAgfSkgYXMgUHJvbWlzZTx2b2lkPjtcbiAgICB9XG5cbiAgICBAc3luY2hyb25pemVkXG4gICAgYXN5bmMgZ2V0U3RhdHVzKCk6IFByb21pc2U8SVZLUDgwRnVsbFN0YXR1cz4ge1xuICAgICAgICBpZiAoIXRoaXMucG9ydCkgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlBvcnQgaXMgbm90IGV4aXN0cyFcIikpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgdGhpcy5wb3J0LndyaXRlQW5kUmVhZChbMHgxMCwgMHgwNCwgMHgxNF0sIDEwMCk7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBwYXJzZVN0YXR1cyhidWZmZXIpO1xuICAgICAgICAgICAgY29uc3QgcHJldlBhcGVySW5PdXRwdXQgPSB0aGlzLnBhcGVySW5PdXRwdXQ7XG4gICAgICAgICAgICB0aGlzLnBhcGVySW5PdXRwdXQgPSBzdGF0dXMuUEFQRVJfU1RBVFVTLlRJQ0tFVF9QUkVTRU5UX0lOX09VVFBVVDtcbiAgICAgICAgICAgIGlmICghdGhpcy5wYXBlckluT3V0cHV0ICYmIHByZXZQYXBlckluT3V0cHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXBlclJlbW92ZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGFwZXJKYW0gPSBzdGF0dXMuUkVDT1ZFUkFCTEVfU1RBVFVTLlBBUEVSX0pBTTtcbiAgICAgICAgICAgIHRoaXMubmVhckVuZCA9IHN0YXR1cy5QQVBFUl9TVEFUVVMuUEFQRVJfTkVBUl9FTkQ7XG4gICAgICAgICAgICB0aGlzLnBhcGVyTm90UHJlc2VudCA9IHN0YXR1cy5QQVBFUl9TVEFUVVMuUEFQRVJfTk9UX1BSRVNFTlQ7XG4gICAgICAgICAgICB0aGlzLmNvdmVyT3BlbiA9IHN0YXR1cy5VU0VSX1NUQVRVUy5DT1ZFUl9PUEVOIHx8IHN0YXR1cy5VU0VSX1NUQVRVUy5DT1ZFUl9PUEVOXzE7XG4gICAgICAgICAgICBsZXQgY3VycmVudFN0YXR1cyA9IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBzZXRDdXJyZW50U3RhdHVzID0gKFtrZXksIHZhbHVlXTogIFtzdHJpbmcsIGJvb2xlYW5dKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGF0dXMgKz0ga2V5LnJlcGxhY2VBbGwoXCJfXCIsIFwiIFwiKSArIFwiXFxuXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhzdGF0dXMuUEFQRVJfU1RBVFVTKS5mb3JFYWNoKHNldEN1cnJlbnRTdGF0dXMpO1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoc3RhdHVzLlVTRVJfU1RBVFVTKS5mb3JFYWNoKHNldEN1cnJlbnRTdGF0dXMpO1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoc3RhdHVzLlJFQ09WRVJBQkxFX1NUQVRVUykuZm9yRWFjaChzZXRDdXJyZW50U3RhdHVzKTtcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKHN0YXR1cy5VTlJFQ09WRVJBQkxFX0VSUk9SKS5mb3JFYWNoKHNldEN1cnJlbnRTdGF0dXMpO1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudFN0YXR1cyA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGF0dXMgPSBcIk9LXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5sYXN0U3RhdHVzID0gY3VycmVudFN0YXR1cztcblxuICAgICAgICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICAgICAgfSBjYXRjaChlcnJvcjogYW55KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciBvZiBwYXJzaW5nIG1lc3NhZ2U6IFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VDb2RlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gZW5jb2RlKG1lc3NhZ2UpXG4gICAgfVxuXG4gICAgcHVibGljIGdldFByaW50ZXJTdGF0dXMoKTogSVByaW50ZXJTdGF0dXMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFwZXJJbk91dHB1dDogdGhpcy5wYXBlckluT3V0cHV0LFxuICAgICAgICAgICAgY292ZXJPcGVuOiB0aGlzLmNvdmVyT3BlbixcbiAgICAgICAgICAgIG5lYXJFbmQ6IHRoaXMubmVhckVuZCxcbiAgICAgICAgICAgIHBhcGVySmFtOiB0aGlzLnBhcGVySmFtLFxuICAgICAgICAgICAgcGFwZXJOb3RQcmVzZW50OiB0aGlzLnBhcGVyTm90UHJlc2VudCxcbiAgICAgICAgICAgIHN0YXR1czogdGhpcy5sYXN0U3RhdHVzLFxuICAgICAgICAgICAgdHlwZTogdGhpcy5kZXZpY2VUeXBlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaXJlRXZlbnQoZXZlbnQ6IGFueSk6IHZvaWQge1xuXG4gICAgfVxuXG59Il19