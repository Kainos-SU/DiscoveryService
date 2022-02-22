"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _bind = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/bind"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));

var _some = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/some"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _set = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.string.match.js");

var _logger = require("../../helpers/logger");

var _require = require("child_process"),
    exec = _require.exec;

var serialport = require("serialport");

var Buffer = require("buffer").Buffer;

var _require2 = require("events"),
    once = _require2.once;

var log = new _logger.Logger("[NodeSerial]");

var NodeSerialPort = /*#__PURE__*/function () {
  function NodeSerialPort(path) {
    (0, _classCallCheck2.default)(this, NodeSerialPort);
    (0, _defineProperty2.default)(this, "_port", void 0);
    (0, _defineProperty2.default)(this, "path", void 0);
    (0, _defineProperty2.default)(this, "isListening", false);
    (0, _defineProperty2.default)(this, "isReading", false);
    (0, _defineProperty2.default)(this, "readBuffer", []);
    (0, _defineProperty2.default)(this, "activeReject", null);
    (0, _defineProperty2.default)(this, "onData", []);
    (0, _defineProperty2.default)(this, "onReadable", []);
    (0, _defineProperty2.default)(this, "readBytesTimeoutIndex", void 0);
    this.path = path;
  }

  (0, _createClass2.default)(NodeSerialPort, [{
    key: "port",
    get: // public static async getPorts(): Promise<Array<NodeSerialPort>> {
    //   const portList: Array<PortInfo> = await serialport.list();
    //   return portList.map((el) => new NodeSerialPort(el.path));
    // }
    function get() {
      return this.path;
    }
  }, {
    key: "open",
    value: function open() {
      var _this = this;

      var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NodeSerialPort.portSettingsDefault;
      var params = {};

      if (option.baudRate) {
        params["baudRate"] = option.baudRate;
      }

      if (option.parity) {
        params["parity"] = option.parity;
      }

      if (option.stopBits) {
        params["stopBits"] = option.stopBits;
      }

      if (option.dataBit) {
        params["dataBits"] = option.dataBit;
      }

      return new _promise.default(function (resolve, reject) {
        // log.debug("Try opening port", this.port);
        _this._port = new serialport(_this.path, params, function (error) {
          var _context, _context2;

          if (error) {
            // log.debugError("Error opening port", this.port, error);
            try {
              _this._port.close(function (err) {// log.debugError("Error while close", err);
              });
            } catch (err) {// log.error("[NodeSerial] Error while close", err);
            }

            return reject(error);
          }

          _this._port.on("readable", (0, _bind.default)(_context = _this.onReadableEvent).call(_context, _this));

          _this._port.on("data", (0, _bind.default)(_context2 = _this.onReadFinishEvent).call(_context2, _this)); // this._port.on("error", () => {
          //   console.log("on stream [error]")
          //   if (this.activeReject) {
          //     this.activeReject()
          //   }
          //   this.activeReject = null
          // })


          _this._port.on("close", function () {
            console.log("on stream [close]");

            if (_this.activeReject) {
              _this.activeReject();
            }

            _this.activeReject = null;
          });

          _this._port.on("finish", function () {
            return console.log("ON FINISH");
          });

          return resolve();
        });
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this2 = this;

      // log.debug("[NodeSerial] closing port", this.port);
      return new _promise.default(function (resolve, reject) {
        if (!_this2._port) {
          // log.debug("[NodeSerial] Port not found", this.port, this._port)
          return resolve();
        } // log.debug("Start closing port!", this._port);


        _this2.activeReject = null;

        try {
          var _this2$_port, _this2$_port2;

          (_this2$_port = _this2._port) === null || _this2$_port === void 0 ? void 0 : _this2$_port.removeAllListeners();
          (_this2$_port2 = _this2._port) === null || _this2$_port2 === void 0 ? void 0 : _this2$_port2.close(function (error) {
            if (error) {
              // log.debug("[NodeSerial] Error while closing port", this.port, error);
              return reject(error);
            }

            return resolve();
          });
        } catch (err) {// log.debug("[NodeSerial] Error while closing port:", this.port);
        }
      });
    }
    /** Реализация чтения с порта в режиме паузи */

  }, {
    key: "pausePort",
    value: function pausePort() {
      var temp = this._port.rawListeners("data");

      if (temp.length) {
        this.onData = temp;

        this._port.removeAllListeners("data");
      }

      temp = this._port.rawListeners("readable");

      if (temp.length) {
        this.onReadable = temp;

        this._port.removeAllListeners("readable");
      }

      this._port.pause();
    }
  }, {
    key: "resumePort",
    value: function resumePort() {
      var _this3 = this;

      this._port.flush(function (error) {// log.debug(`[NodeSerial] flush error on port ${this.path}:`, error);
      });

      if (this._port.rawListeners("data").length && this.onData.length) {
        var _context3;

        this._port.removeAllListeners("data");

        (0, _forEach.default)(_context3 = this.onData).call(_context3, function (handler) {
          return _this3._port.on("data", handler);
        });
        this.onData = [];
      }

      if (this._port.rawListeners("readable").length && this.onReadable.length) {
        var _context4;

        this._port.removeAllListeners("readable");

        (0, _forEach.default)(_context4 = this.onReadable).call(_context4, function (handler) {
          return _this3._port.on("readable", handler);
        });
        this.onReadable = [];
      }

      this._port.resume();
    }
  }, {
    key: "writeAndRead",
    value: function writeAndRead(message) {
      var _this4 = this;

      var readTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
      var read = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      this._port.flush();

      this.pausePort();
      return new _promise.default(function (resolve, reject) {
        /** Стоп кран по времени */
        _this4.readBytesTimeoutIndex = (0, _setTimeout2.default)(function () {
          log.debug("!!!!!TIMEOUT!!!!!!");
          reject(new Error("[NodeSerial] Timeout of writeAndRead!"));

          _this4._port.removeAllListeners("readable");

          _this4.resumePort();
        }, readTimeout);

        var _read = function _read() {
          clearTimeout(_this4.readBytesTimeoutIndex);

          var temp = _this4._port.read();

          if (temp === null) {
            return reject("[NodeSerial] Error of writeAndRead - emptyAnswer!");
          }

          return resolve((0, _from.default)(temp));
        };
        /** Проверка данных в сообщении */


        if ((0, _some.default)(message).call(message, function (num) {
          return num > 255 || num < 0;
        })) {
          return reject(new Error("[NodeSerial] Wrong data in message. There is values or greater then 255 or smaller then 0: [".concat(message.join(", "), "]")));
        }

        var tempMessage = Buffer.from(message);

        _this4._port.write(tempMessage, function (error) {
          if (error) {
            return reject(error);
          }

          _this4._port.once("readable", _read);
        });

        if (!read) {
          return resolve([]);
        }
      });
    }
  }, {
    key: "redBytes",
    value: function redBytes() {
      var _this5 = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 600;
      this.pausePort();
      return new _promise.default(function (resolve, reject) {
        /** Стоп кран по времени */
        _this5.readBytesTimeoutIndex = (0, _setTimeout2.default)(function () {
          reject(new Error("[NodeSerial] Timeout of readBytes!"));

          _this5._port.removeAllListeners("readable");

          _this5.resumePort();
        }, timeout);

        var _read = function _read() {
          clearTimeout(_this5.readBytesTimeoutIndex);

          var temp = _this5._port.read();

          if (temp === null) {
            return reject(new Error("[NodeSerial] Error while reading by readBytes. Empty response!"));
          }

          resolve((0, _from.default)(temp));
        };

        _this5._port.once("readable", _read);
      });
    }
  }, {
    key: "read",
    value: function read() {
      var _this6 = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;

      if (this.isListening || this.isReading) {
        return _promise.default.reject(new Error("[NodeSerialPort] Can not read, port is busy! Someone is listening port!"));
      }

      this.readBuffer = [];
      this.isReading = true;
      return new _promise.default(function (resolve, reject) {
        _this6.activeReject = reject;

        var cleanAndExit = function cleanAndExit() {
          _this6.activeReject = null;

          if (_this6.readBuffer.length && !_this6.isReading) {
            var buffer = _this6.readBuffer;
            _this6.readBuffer = [];
            resolve(buffer);
          } else {
            reject();
          }
        };

        if (_this6.isReading || !_this6.readBuffer.length) {
          (0, _setTimeout2.default)(cleanAndExit, timeout);
        } else {
          cleanAndExit();
        }
      });
    }
  }, {
    key: "write",
    value: function write(message) {
      var _this7 = this;

      if ((0, _some.default)(message).call(message, function (el) {
        return el > 255 || el < 0;
      })) {
        return _promise.default.reject(new Error("Invalid value in message." + message.join(", ")));
      }

      return new _promise.default(function (resolve, reject) {
        _this7.activeReject = reject;
        var canWrite = false;
        var tempBuffer = Buffer.from(message);

        try {
          canWrite = _this7._port.write(tempBuffer, function (error) {
            _this7.activeReject = null;

            if (error) {
              log.debug("[NodeSerial] Error while writing!", error);
              return reject(error);
            }

            return resolve();
          });
        } catch (e) {
          _this7._port.flush();

          _this7._port.drain();

          _this7.activeReject = null;
          reject();
        }

        if (!canWrite) {
          _this7._port.once("drain", function (event) {
            _this7.activeReject = null;
            resolve();
          });
        }
      });
    }
  }, {
    key: "writeString",
    value: function writeString(message) {
      var _this8 = this;

      return new _promise.default(function (resolve, reject) {
        // console.log("[Node Serial]" + this.port + " start writing!")
        _this8.activeReject = reject;
        var canWrite = false;

        try {
          canWrite = _this8._port.write(message, "utf8", function (error) {
            _this8.activeReject = null;

            if (error) {
              console.error(error);
              return reject(error);
            }

            return resolve();
          });
        } catch (e) {
          console.error(e);

          _this8._port.flush();

          _this8._port.drain();

          _this8.activeReject = null;
          reject();
        } // console.log("[Node Serial]" + this.port + " is drained: ", canWrite);


        if (!canWrite) {
          once(_this8._port, "drain").then(function (event) {
            _this8.activeReject = null; // console.log("[Node Serial]" + this.port + " drain event fired ",event)

            resolve();
          });
        }
      });
    }
  }, {
    key: "onReadableEvent",
    value: function onReadableEvent() {
      var _this$readBuffer;

      // console.log("on onReadableEvent")
      if (this.readBuffer.length > 255) {
        var _context5;

        this.readBuffer = (0, _slice.default)(_context5 = this.readBuffer).call(_context5, this.readBuffer.length - 255);
      }

      this.isReading = true;

      var value = this._port.read();

      (_this$readBuffer = this.readBuffer).push.apply(_this$readBuffer, (0, _toConsumableArray2.default)(value)); // console.log(`[NodeSerial] ${this.path} readBuffer`,this.readBuffer)

    }
  }, {
    key: "onReadFinishEvent",
    value: function onReadFinishEvent() {
      // console.log("on onReadFinishEvent")
      this.isReading = false;
    }
  }], [{
    key: "getPorts",
    value: function () {
      var _getPorts = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var portList, realPorts, dmesgOutput, ports;
        return _regenerator.default.wrap(function _callee$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return serialport.list();

              case 2:
                portList = _context7.sent;
                realPorts = [];

                if (!(process.platform === "linux")) {
                  _context7.next = 12;
                  break;
                }

                _context7.next = 7;
                return new _promise.default(function (resolve, reject) {
                  exec("dmesg | grep tty", function (error, stdout, stderr) {
                    if (error) {
                      reject(error);
                    }

                    resolve(stdout);
                  });
                });

              case 7:
                dmesgOutput = _context7.sent;
                ports = (0, _from.default)(new _set.default(dmesgOutput.match(/(?<= )tty.{2,4}(?=[: \n])/g)));
                realPorts = (0, _filter.default)(portList).call(portList, function (port) {
                  return (0, _some.default)(ports).call(ports, function (p) {
                    var _context6;

                    return (0, _includes.default)(_context6 = port.path).call(_context6, p);
                  });
                });
                _context7.next = 13;
                break;

              case 12:
                realPorts = portList;

              case 13:
                return _context7.abrupt("return", (0, _map.default)(realPorts).call(realPorts, function (el) {
                  return new NodeSerialPort(el.path);
                }));

              case 14:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee);
      }));

      function getPorts() {
        return _getPorts.apply(this, arguments);
      }

      return getPorts;
    }()
  }]);
  return NodeSerialPort;
}();

exports.default = NodeSerialPort;
(0, _defineProperty2.default)(NodeSerialPort, "portSettingsDefault", {
  baudRate: 9600,
  bufferSize: 250,
  parity: "none",
  stopBits: 1,
  dataBit: 8,
  flowControl: "none"
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZXZpY2VzL3NlcmlhbC9Ob2RlU2VyaWFsUG9ydC50cyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiZXhlYyIsInNlcmlhbHBvcnQiLCJCdWZmZXIiLCJvbmNlIiwibG9nIiwiTG9nZ2VyIiwiTm9kZVNlcmlhbFBvcnQiLCJwYXRoIiwib3B0aW9uIiwicG9ydFNldHRpbmdzRGVmYXVsdCIsInBhcmFtcyIsImJhdWRSYXRlIiwicGFyaXR5Iiwic3RvcEJpdHMiLCJkYXRhQml0IiwicmVzb2x2ZSIsInJlamVjdCIsIl9wb3J0IiwiZXJyb3IiLCJjbG9zZSIsImVyciIsIm9uIiwib25SZWFkYWJsZUV2ZW50Iiwib25SZWFkRmluaXNoRXZlbnQiLCJjb25zb2xlIiwiYWN0aXZlUmVqZWN0IiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwidGVtcCIsInJhd0xpc3RlbmVycyIsImxlbmd0aCIsIm9uRGF0YSIsIm9uUmVhZGFibGUiLCJwYXVzZSIsImZsdXNoIiwiaGFuZGxlciIsInJlc3VtZSIsIm1lc3NhZ2UiLCJyZWFkVGltZW91dCIsInJlYWQiLCJwYXVzZVBvcnQiLCJyZWFkQnl0ZXNUaW1lb3V0SW5kZXgiLCJkZWJ1ZyIsIkVycm9yIiwicmVzdW1lUG9ydCIsIl9yZWFkIiwiY2xlYXJUaW1lb3V0IiwibnVtIiwiam9pbiIsInRlbXBNZXNzYWdlIiwiZnJvbSIsIndyaXRlIiwidGltZW91dCIsImlzTGlzdGVuaW5nIiwiaXNSZWFkaW5nIiwicmVhZEJ1ZmZlciIsImNsZWFuQW5kRXhpdCIsImJ1ZmZlciIsImVsIiwiY2FuV3JpdGUiLCJ0ZW1wQnVmZmVyIiwiZSIsImRyYWluIiwiZXZlbnQiLCJ0aGVuIiwidmFsdWUiLCJwdXNoIiwibGlzdCIsInBvcnRMaXN0IiwicmVhbFBvcnRzIiwicHJvY2VzcyIsInBsYXRmb3JtIiwic3Rkb3V0Iiwic3RkZXJyIiwiZG1lc2dPdXRwdXQiLCJwb3J0cyIsIm1hdGNoIiwicG9ydCIsInAiLCJidWZmZXJTaXpl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QUFRLEVBQUUsQ0FKMkM7QUFLckRDLEVBQUFBLE9BQU8sRUFBRSxDQUw0QztBQU1yRGlFLEVBQUFBLFdBQVcsRUFBRTtBQU53QyxDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBleGVjIH0gPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTtcbmNvbnN0IHNlcmlhbHBvcnQgPSByZXF1aXJlKFwic2VyaWFscG9ydFwiKTtcbmNvbnN0IEJ1ZmZlciA9IHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyO1xuaW1wb3J0IHsgSVNlcmlhbFBvcnQsIFNlcmlhbFBvcnRPcHRpb24gfSBmcm9tIFwiLi90eXBlc1wiO1xuY29uc3QgeyBvbmNlIH0gPSByZXF1aXJlKFwiZXZlbnRzXCIpO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZyA9IG5ldyBMb2dnZXIoXCJbTm9kZVNlcmlhbF1cIik7XG5cbnR5cGUgTlNlcmlhbFBvcnQgPSB0eXBlb2Ygc2VyaWFscG9ydDtcblxudHlwZSBQb3J0SW5mbyA9IHtcbiAgcGF0aDogc3RyaW5nO1xuICBtYW51ZmFjdHVyZXI6IHN0cmluZztcbiAgc2VyaWFsTnVtYmVyOiBzdHJpbmc7XG4gIHBucElkOiBzdHJpbmc7XG4gIGxvY2F0aW9uSWQ6IHN0cmluZztcbiAgcHJvZHVjdElkOiBzdHJpbmc7XG4gIHZlbmRvcklkOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlU2VyaWFsUG9ydCBpbXBsZW1lbnRzIElTZXJpYWxQb3J0IHtcbiAgcHJpdmF0ZSBfcG9ydDogTlNlcmlhbFBvcnQ7XG4gIHByaXZhdGUgcGF0aDogc3RyaW5nO1xuICBwcml2YXRlIGlzTGlzdGVuaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgaXNSZWFkaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgcmVhZEJ1ZmZlcjogQXJyYXk8bnVtYmVyPiA9IFtdO1xuICBwcml2YXRlIGFjdGl2ZVJlamVjdDogYW55ID0gbnVsbDtcbiAgcHJpdmF0ZSBvbkRhdGE6IEFycmF5PChlcnJvcjogYW55KSA9PiB2b2lkPiA9IFtdO1xuICBwcml2YXRlIG9uUmVhZGFibGU6IEFycmF5PChlcnJvcjogYW55KSA9PiB2b2lkPiA9IFtdO1xuICBwcml2YXRlIHJlYWRCeXRlc1RpbWVvdXRJbmRleDogYW55O1xuXG4gIHByaXZhdGUgc3RhdGljIHBvcnRTZXR0aW5nc0RlZmF1bHQ6IFNlcmlhbFBvcnRPcHRpb24gPSB7XG4gICAgYmF1ZFJhdGU6IDk2MDAsXG4gICAgYnVmZmVyU2l6ZTogMjUwLFxuICAgIHBhcml0eTogXCJub25lXCIsXG4gICAgc3RvcEJpdHM6IDEsXG4gICAgZGF0YUJpdDogOCxcbiAgICBmbG93Q29udHJvbDogXCJub25lXCJcbiAgfTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgZ2V0UG9ydHMoKTogUHJvbWlzZTxBcnJheTxOb2RlU2VyaWFsUG9ydD4+IHtcbiAgICBjb25zdCBwb3J0TGlzdDogQXJyYXk8UG9ydEluZm8+ID0gYXdhaXQgc2VyaWFscG9ydC5saXN0KCk7XG4gICAgbGV0IHJlYWxQb3J0czogQXJyYXk8UG9ydEluZm8+ID0gW107XG4gICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09IFwibGludXhcIikge1xuICAgICAgY29uc3QgZG1lc2dPdXRwdXQgPSBhd2FpdCBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZXhlYyhcImRtZXNnIHwgZ3JlcCB0dHlcIiwgKGVycm9yOiBhbnksIHN0ZG91dDogc3RyaW5nLCBzdGRlcnI6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShzdGRvdXQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcG9ydHM6IEFycmF5PHN0cmluZz4gPSBBcnJheS5mcm9tKG5ldyBTZXQoZG1lc2dPdXRwdXQubWF0Y2goLyg/PD0gKXR0eS57Miw0fSg/PVs6IFxcbl0pL2cpKSk7XG4gICAgICByZWFsUG9ydHMgPSBwb3J0TGlzdC5maWx0ZXIoKHBvcnQpID0+IHBvcnRzLnNvbWUoKHApID0+IHBvcnQucGF0aC5pbmNsdWRlcyhwKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWFsUG9ydHMgPSBwb3J0TGlzdDtcbiAgICB9XG4gICAgcmV0dXJuIHJlYWxQb3J0cy5tYXAoKGVsKSA9PiBuZXcgTm9kZVNlcmlhbFBvcnQoZWwucGF0aCkpO1xuICB9XG5cbiAgLy8gcHVibGljIHN0YXRpYyBhc3luYyBnZXRQb3J0cygpOiBQcm9taXNlPEFycmF5PE5vZGVTZXJpYWxQb3J0Pj4ge1xuICAvLyAgIGNvbnN0IHBvcnRMaXN0OiBBcnJheTxQb3J0SW5mbz4gPSBhd2FpdCBzZXJpYWxwb3J0Lmxpc3QoKTtcbiAgLy8gICByZXR1cm4gcG9ydExpc3QubWFwKChlbCkgPT4gbmV3IE5vZGVTZXJpYWxQb3J0KGVsLnBhdGgpKTtcbiAgLy8gfVxuXG4gIHB1YmxpYyBnZXQgcG9ydCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBhdGg7XG4gIH1cblxuICBwdWJsaWMgb3BlbihvcHRpb246IFNlcmlhbFBvcnRPcHRpb24gPSBOb2RlU2VyaWFsUG9ydC5wb3J0U2V0dGluZ3NEZWZhdWx0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAob3B0aW9uLmJhdWRSYXRlKSB7XG4gICAgICBwYXJhbXNbXCJiYXVkUmF0ZVwiXSA9IG9wdGlvbi5iYXVkUmF0ZTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbi5wYXJpdHkpIHtcbiAgICAgIHBhcmFtc1tcInBhcml0eVwiXSA9IG9wdGlvbi5wYXJpdHk7XG4gICAgfVxuICAgIGlmIChvcHRpb24uc3RvcEJpdHMpIHtcbiAgICAgIHBhcmFtc1tcInN0b3BCaXRzXCJdID0gb3B0aW9uLnN0b3BCaXRzO1xuICAgIH1cbiAgICBpZiAob3B0aW9uLmRhdGFCaXQpIHtcbiAgICAgIHBhcmFtc1tcImRhdGFCaXRzXCJdID0gb3B0aW9uLmRhdGFCaXQ7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBsb2cuZGVidWcoXCJUcnkgb3BlbmluZyBwb3J0XCIsIHRoaXMucG9ydCk7XG4gICAgICB0aGlzLl9wb3J0ID0gbmV3IHNlcmlhbHBvcnQodGhpcy5wYXRoLCBwYXJhbXMsIChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgLy8gbG9nLmRlYnVnRXJyb3IoXCJFcnJvciBvcGVuaW5nIHBvcnRcIiwgdGhpcy5wb3J0LCBlcnJvcik7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuX3BvcnQuY2xvc2UoKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIC8vIGxvZy5kZWJ1Z0Vycm9yKFwiRXJyb3Igd2hpbGUgY2xvc2VcIiwgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gbG9nLmVycm9yKFwiW05vZGVTZXJpYWxdIEVycm9yIHdoaWxlIGNsb3NlXCIsIGVycik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BvcnQub24oXCJyZWFkYWJsZVwiLCB0aGlzLm9uUmVhZGFibGVFdmVudC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fcG9ydC5vbihcImRhdGFcIiwgdGhpcy5vblJlYWRGaW5pc2hFdmVudC5iaW5kKHRoaXMpKTtcbiAgICAgICAgLy8gdGhpcy5fcG9ydC5vbihcImVycm9yXCIsICgpID0+IHtcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcIm9uIHN0cmVhbSBbZXJyb3JdXCIpXG4gICAgICAgIC8vICAgaWYgKHRoaXMuYWN0aXZlUmVqZWN0KSB7XG4gICAgICAgIC8vICAgICB0aGlzLmFjdGl2ZVJlamVjdCgpXG4gICAgICAgIC8vICAgfVxuICAgICAgICAvLyAgIHRoaXMuYWN0aXZlUmVqZWN0ID0gbnVsbFxuICAgICAgICAvLyB9KVxuICAgICAgICB0aGlzLl9wb3J0Lm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwib24gc3RyZWFtIFtjbG9zZV1cIik7XG4gICAgICAgICAgaWYgKHRoaXMuYWN0aXZlUmVqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVJlamVjdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFjdGl2ZVJlamVjdCA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9wb3J0Lm9uKFwiZmluaXNoXCIsICgpID0+IGNvbnNvbGUubG9nKFwiT04gRklOSVNIXCIpKTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIGxvZy5kZWJ1ZyhcIltOb2RlU2VyaWFsXSBjbG9zaW5nIHBvcnRcIiwgdGhpcy5wb3J0KTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9wb3J0KSB7XG4gICAgICAgIC8vIGxvZy5kZWJ1ZyhcIltOb2RlU2VyaWFsXSBQb3J0IG5vdCBmb3VuZFwiLCB0aGlzLnBvcnQsIHRoaXMuX3BvcnQpXG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGxvZy5kZWJ1ZyhcIlN0YXJ0IGNsb3NpbmcgcG9ydCFcIiwgdGhpcy5fcG9ydCk7XG4gICAgICB0aGlzLmFjdGl2ZVJlamVjdCA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl9wb3J0Py5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5fcG9ydD8uY2xvc2UoKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgLy8gbG9nLmRlYnVnKFwiW05vZGVTZXJpYWxdIEVycm9yIHdoaWxlIGNsb3NpbmcgcG9ydFwiLCB0aGlzLnBvcnQsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBsb2cuZGVidWcoXCJbTm9kZVNlcmlhbF0gRXJyb3Igd2hpbGUgY2xvc2luZyBwb3J0OlwiLCB0aGlzLnBvcnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqINCg0LXQsNC70LjQt9Cw0YbQuNGPINGH0YLQtdC90LjRjyDRgSDQv9C+0YDRgtCwINCyINGA0LXQttC40LzQtSDQv9Cw0YPQt9C4ICovXG4gIHByaXZhdGUgcGF1c2VQb3J0KCk6IHZvaWQge1xuICAgIGxldCB0ZW1wOiBBcnJheTwoZXJyb3I6IGFueSkgPT4gdm9pZD4gPSB0aGlzLl9wb3J0LnJhd0xpc3RlbmVycyhcImRhdGFcIik7XG4gICAgaWYgKHRlbXAubGVuZ3RoKSB7XG4gICAgICB0aGlzLm9uRGF0YSA9IHRlbXA7XG4gICAgICB0aGlzLl9wb3J0LnJlbW92ZUFsbExpc3RlbmVycyhcImRhdGFcIik7XG4gICAgfVxuICAgIHRlbXAgPSB0aGlzLl9wb3J0LnJhd0xpc3RlbmVycyhcInJlYWRhYmxlXCIpO1xuICAgIGlmICh0ZW1wLmxlbmd0aCkge1xuICAgICAgdGhpcy5vblJlYWRhYmxlID0gdGVtcDtcbiAgICAgIHRoaXMuX3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKFwicmVhZGFibGVcIik7XG4gICAgfVxuICAgIHRoaXMuX3BvcnQucGF1c2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzdW1lUG9ydCgpOiB2b2lkIHtcbiAgICB0aGlzLl9wb3J0LmZsdXNoKChlcnJvcjogYW55KSA9PiB7XG4gICAgICAvLyBsb2cuZGVidWcoYFtOb2RlU2VyaWFsXSBmbHVzaCBlcnJvciBvbiBwb3J0ICR7dGhpcy5wYXRofTpgLCBlcnJvcik7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuX3BvcnQucmF3TGlzdGVuZXJzKFwiZGF0YVwiKS5sZW5ndGggJiYgdGhpcy5vbkRhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9wb3J0LnJlbW92ZUFsbExpc3RlbmVycyhcImRhdGFcIik7XG4gICAgICB0aGlzLm9uRGF0YS5mb3JFYWNoKChoYW5kbGVyKSA9PiB0aGlzLl9wb3J0Lm9uKFwiZGF0YVwiLCBoYW5kbGVyKSk7XG4gICAgICB0aGlzLm9uRGF0YSA9IFtdO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcG9ydC5yYXdMaXN0ZW5lcnMoXCJyZWFkYWJsZVwiKS5sZW5ndGggJiYgdGhpcy5vblJlYWRhYmxlLmxlbmd0aCkge1xuICAgICAgdGhpcy5fcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJyZWFkYWJsZVwiKTtcbiAgICAgIHRoaXMub25SZWFkYWJsZS5mb3JFYWNoKChoYW5kbGVyKSA9PiB0aGlzLl9wb3J0Lm9uKFwicmVhZGFibGVcIiwgaGFuZGxlcikpO1xuICAgICAgdGhpcy5vblJlYWRhYmxlID0gW107XG4gICAgfVxuICAgIHRoaXMuX3BvcnQucmVzdW1lKCk7XG4gIH1cblxuICBwdWJsaWMgd3JpdGVBbmRSZWFkKG1lc3NhZ2U6IEFycmF5PG51bWJlcj4sIHJlYWRUaW1lb3V0OiBudW1iZXIgPSAzMDAsIHJlYWQ6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTxBcnJheTxudW1iZXI+PiB7XG4gICAgdGhpcy5fcG9ydC5mbHVzaCgpO1xuICAgIHRoaXMucGF1c2VQb3J0KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEFycmF5PG51bWJlcj4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8qKiDQodGC0L7QvyDQutGA0LDQvSDQv9C+INCy0YDQtdC80LXQvdC4ICovXG4gICAgICB0aGlzLnJlYWRCeXRlc1RpbWVvdXRJbmRleCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBsb2cuZGVidWcoXCIhISEhIVRJTUVPVVQhISEhISFcIik7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJbTm9kZVNlcmlhbF0gVGltZW91dCBvZiB3cml0ZUFuZFJlYWQhXCIpKTtcbiAgICAgICAgdGhpcy5fcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJyZWFkYWJsZVwiKTtcbiAgICAgICAgdGhpcy5yZXN1bWVQb3J0KCk7XG4gICAgICB9LCByZWFkVGltZW91dCk7XG5cbiAgICAgIGNvbnN0IF9yZWFkID0gKCkgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5yZWFkQnl0ZXNUaW1lb3V0SW5kZXgpO1xuICAgICAgICBjb25zdCB0ZW1wOiBCdWZmZXIgfCBudWxsID0gdGhpcy5fcG9ydC5yZWFkKCk7XG4gICAgICAgIGlmICh0ZW1wID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChcIltOb2RlU2VyaWFsXSBFcnJvciBvZiB3cml0ZUFuZFJlYWQgLSBlbXB0eUFuc3dlciFcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc29sdmUoQXJyYXkuZnJvbSh0ZW1wKSk7XG4gICAgICB9O1xuXG4gICAgICAvKiog0J/RgNC+0LLQtdGA0LrQsCDQtNCw0L3QvdGL0YUg0LIg0YHQvtC+0LHRidC10L3QuNC4ICovXG4gICAgICBpZiAobWVzc2FnZS5zb21lKChudW0pID0+IG51bSA+IDI1NSB8fCBudW0gPCAwKSkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihgW05vZGVTZXJpYWxdIFdyb25nIGRhdGEgaW4gbWVzc2FnZS4gVGhlcmUgaXMgdmFsdWVzIG9yIGdyZWF0ZXIgdGhlbiAyNTUgb3Igc21hbGxlciB0aGVuIDA6IFske21lc3NhZ2Uuam9pbihcIiwgXCIpfV1gKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRlbXBNZXNzYWdlOiBCdWZmZXIgPSBCdWZmZXIuZnJvbShtZXNzYWdlKTtcbiAgICAgIHRoaXMuX3BvcnQud3JpdGUodGVtcE1lc3NhZ2UsIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BvcnQub25jZShcInJlYWRhYmxlXCIsIF9yZWFkKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKCFyZWFkKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKFtdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZWRCeXRlcyh0aW1lb3V0OiBudW1iZXIgPSA2MDApOiBQcm9taXNlPEFycmF5PG51bWJlcj4+IHtcbiAgICB0aGlzLnBhdXNlUG9ydCgpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvKiog0KHRgtC+0L8g0LrRgNCw0L0g0L/QviDQstGA0LXQvNC10L3QuCAqL1xuICAgICAgdGhpcy5yZWFkQnl0ZXNUaW1lb3V0SW5kZXggPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIltOb2RlU2VyaWFsXSBUaW1lb3V0IG9mIHJlYWRCeXRlcyFcIikpO1xuICAgICAgICB0aGlzLl9wb3J0LnJlbW92ZUFsbExpc3RlbmVycyhcInJlYWRhYmxlXCIpO1xuICAgICAgICB0aGlzLnJlc3VtZVBvcnQoKTtcbiAgICAgIH0sIHRpbWVvdXQpO1xuXG4gICAgICBjb25zdCBfcmVhZCA9ICgpID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVhZEJ5dGVzVGltZW91dEluZGV4KTtcbiAgICAgICAgY29uc3QgdGVtcDogQnVmZmVyIHwgbnVsbCA9IHRoaXMuX3BvcnQucmVhZCgpO1xuICAgICAgICBpZiAodGVtcCA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKFwiW05vZGVTZXJpYWxdIEVycm9yIHdoaWxlIHJlYWRpbmcgYnkgcmVhZEJ5dGVzLiBFbXB0eSByZXNwb25zZSFcIikpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoQXJyYXkuZnJvbSh0ZW1wKSk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLl9wb3J0Lm9uY2UoXCJyZWFkYWJsZVwiLCBfcmVhZCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcmVhZCh0aW1lb3V0OiBudW1iZXIgPSAzMDApOiBQcm9taXNlPEFycmF5PG51bWJlcj4+IHtcbiAgICBpZiAodGhpcy5pc0xpc3RlbmluZyB8fCB0aGlzLmlzUmVhZGluZykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIltOb2RlU2VyaWFsUG9ydF0gQ2FuIG5vdCByZWFkLCBwb3J0IGlzIGJ1c3khIFNvbWVvbmUgaXMgbGlzdGVuaW5nIHBvcnQhXCIpKTtcbiAgICB9XG4gICAgdGhpcy5yZWFkQnVmZmVyID0gW107XG4gICAgdGhpcy5pc1JlYWRpbmcgPSB0cnVlO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmFjdGl2ZVJlamVjdCA9IHJlamVjdDtcbiAgICAgIGNvbnN0IGNsZWFuQW5kRXhpdCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmVSZWplY3QgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5yZWFkQnVmZmVyLmxlbmd0aCAmJiAhdGhpcy5pc1JlYWRpbmcpIHtcbiAgICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLnJlYWRCdWZmZXI7XG4gICAgICAgICAgdGhpcy5yZWFkQnVmZmVyID0gW107XG4gICAgICAgICAgcmVzb2x2ZShidWZmZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5pc1JlYWRpbmcgfHwgIXRoaXMucmVhZEJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgc2V0VGltZW91dChjbGVhbkFuZEV4aXQsIHRpbWVvdXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYW5BbmRFeGl0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgd3JpdGUobWVzc2FnZTogQXJyYXk8bnVtYmVyPik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChtZXNzYWdlLnNvbWUoKGVsOiBudW1iZXIpID0+IGVsID4gMjU1IHx8IGVsIDwgMCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGluIG1lc3NhZ2UuXCIgKyBtZXNzYWdlLmpvaW4oXCIsIFwiKSkpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmFjdGl2ZVJlamVjdCA9IHJlamVjdDtcbiAgICAgIGxldCBjYW5Xcml0ZSA9IGZhbHNlO1xuICAgICAgY29uc3QgdGVtcEJ1ZmZlciA9IEJ1ZmZlci5mcm9tKG1lc3NhZ2UpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2FuV3JpdGUgPSB0aGlzLl9wb3J0LndyaXRlKHRlbXBCdWZmZXIsIChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLmFjdGl2ZVJlamVjdCA9IG51bGw7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBsb2cuZGVidWcoXCJbTm9kZVNlcmlhbF0gRXJyb3Igd2hpbGUgd3JpdGluZyFcIiwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLl9wb3J0LmZsdXNoKCk7XG4gICAgICAgIHRoaXMuX3BvcnQuZHJhaW4oKTtcbiAgICAgICAgdGhpcy5hY3RpdmVSZWplY3QgPSBudWxsO1xuICAgICAgICByZWplY3QoKTtcbiAgICAgIH1cbiAgICAgIGlmICghY2FuV3JpdGUpIHtcbiAgICAgICAgdGhpcy5fcG9ydC5vbmNlKFwiZHJhaW5cIiwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmFjdGl2ZVJlamVjdCA9IG51bGw7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZVN0cmluZyhtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJbTm9kZSBTZXJpYWxdXCIgKyB0aGlzLnBvcnQgKyBcIiBzdGFydCB3cml0aW5nIVwiKVxuICAgICAgdGhpcy5hY3RpdmVSZWplY3QgPSByZWplY3Q7XG4gICAgICBsZXQgY2FuV3JpdGUgPSBmYWxzZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNhbldyaXRlID0gdGhpcy5fcG9ydC53cml0ZShtZXNzYWdlLCBcInV0ZjhcIiwgKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuYWN0aXZlUmVqZWN0ID0gbnVsbDtcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB0aGlzLl9wb3J0LmZsdXNoKCk7XG4gICAgICAgIHRoaXMuX3BvcnQuZHJhaW4oKTtcbiAgICAgICAgdGhpcy5hY3RpdmVSZWplY3QgPSBudWxsO1xuICAgICAgICByZWplY3QoKTtcbiAgICAgIH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiW05vZGUgU2VyaWFsXVwiICsgdGhpcy5wb3J0ICsgXCIgaXMgZHJhaW5lZDogXCIsIGNhbldyaXRlKTtcbiAgICAgIGlmICghY2FuV3JpdGUpIHtcbiAgICAgICAgb25jZSh0aGlzLl9wb3J0LCBcImRyYWluXCIpLnRoZW4oKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmFjdGl2ZVJlamVjdCA9IG51bGw7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJbTm9kZSBTZXJpYWxdXCIgKyB0aGlzLnBvcnQgKyBcIiBkcmFpbiBldmVudCBmaXJlZCBcIixldmVudClcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBvblJlYWRhYmxlRXZlbnQoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJvbiBvblJlYWRhYmxlRXZlbnRcIilcbiAgICBpZiAodGhpcy5yZWFkQnVmZmVyLmxlbmd0aCA+IDI1NSkge1xuICAgICAgdGhpcy5yZWFkQnVmZmVyID0gdGhpcy5yZWFkQnVmZmVyLnNsaWNlKHRoaXMucmVhZEJ1ZmZlci5sZW5ndGggLSAyNTUpO1xuICAgIH1cbiAgICB0aGlzLmlzUmVhZGluZyA9IHRydWU7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLl9wb3J0LnJlYWQoKTtcbiAgICB0aGlzLnJlYWRCdWZmZXIucHVzaCguLi4odmFsdWUgYXMgQXJyYXk8bnVtYmVyPikpO1xuICAgIC8vIGNvbnNvbGUubG9nKGBbTm9kZVNlcmlhbF0gJHt0aGlzLnBhdGh9IHJlYWRCdWZmZXJgLHRoaXMucmVhZEJ1ZmZlcilcbiAgfVxuXG4gIHByaXZhdGUgb25SZWFkRmluaXNoRXZlbnQoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJvbiBvblJlYWRGaW5pc2hFdmVudFwiKVxuICAgIHRoaXMuaXNSZWFkaW5nID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==