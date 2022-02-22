"use strict";

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.regexp.exec.js");

var _sliceInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/slice");

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

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/map"));

var _setInterval2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-interval"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context3; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context3 = Object.prototype.toString.call(o)).call(_context3, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BaseDevice = /*#__PURE__*/function () {
  function BaseDevice() {
    (0, _classCallCheck2.default)(this, BaseDevice);
    (0, _defineProperty2.default)(this, "events", new _map.default());
    (0, _defineProperty2.default)(this, "interval", void 0);
    (0, _defineProperty2.default)(this, "deviceType", "");
    (0, _defineProperty2.default)(this, "port", void 0);
    (0, _defineProperty2.default)(this, "enable", true);
    (0, _defineProperty2.default)(this, "lastStatus", "");
  }

  (0, _createClass2.default)(BaseDevice, [{
    key: "getType",
    value: function getType() {
      return this.deviceType;
    }
  }, {
    key: "getPort",
    value: function getPort() {
      return this.port;
    }
  }, {
    key: "destroy",
    value: function () {
      var _destroy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this$port;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                clearInterval(this.interval);
                this.removeAllEventListeners();

                if (this.port) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                _context.prev = 4;
                _context.next = 7;
                return (_this$port = this.port) === null || _this$port === void 0 ? void 0 : _this$port.close();

              case 7:
                console.log("Port is closed");
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
                console.warn(_context.t0);

              case 13:
                this.port = undefined;

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 10]]);
      }));

      function destroy() {
        return _destroy.apply(this, arguments);
      }

      return destroy;
    }()
  }, {
    key: "isMyPort",
    value: function isMyPort(port) {
      var _this$port2;

      return ((_this$port2 = this.port) === null || _this$port2 === void 0 ? void 0 : _this$port2.port) === port.port;
    }
  }, {
    key: "enabled",
    value: function enabled(_enabled) {
      this.enable = _enabled;
    }
  }, {
    key: "initLoop",
    value: function initLoop(period) {
      var _this = this;

      var isWork = false;
      this.interval = (0, _setInterval2.default)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!isWork) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                _context2.prev = 2;
                isWork = true;
                _context2.next = 6;
                return _this.loop();

              case 6:
                _context2.prev = 6;
                isWork = false;
                return _context2.finish(6);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2,, 6, 9]]);
      })), period);
    }
  }, {
    key: "off",
    value: function off(event, handler) {
      var _this$events$get, _this$events$get2;

      if (!this.events.has(event)) {
        console.warn("No event ".concat(event, " to delete handler"));
        return;
      }

      var index = (_this$events$get = this.events.get(event)) === null || _this$events$get === void 0 ? void 0 : (0, _indexOf.default)(_this$events$get).call(_this$events$get, handler);

      if (index === undefined || index === -1) {
        console.warn("Handler not found!");
        return;
      }

      (_this$events$get2 = this.events.get(event)) === null || _this$events$get2 === void 0 ? void 0 : (0, _splice.default)(_this$events$get2).call(_this$events$get2, index, 1);
    }
  }, {
    key: "on",
    value: function on(event, handler) {
      var _this$events$get3;

      if (!this.events.has(event)) {
        console.warn("No event " + event);
        return;
      }

      (_this$events$get3 = this.events.get(event)) === null || _this$events$get3 === void 0 ? void 0 : _this$events$get3.push(handler);
    }
  }, {
    key: "removeAllEventListeners",
    value: function removeAllEventListeners() {
      var _iterator = _createForOfIteratorHelper(this.events),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = (0, _slicedToArray2.default)(_step.value, 2),
              _ = _step$value[0],
              handlers = _step$value[1];

          (0, _splice.default)(handlers).call(handlers, 0, handlers.length);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);
  return BaseDevice;
}();

exports.default = BaseDevice;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZXZpY2VzL21vZGVsL0Jhc2VEZXZpY2UudHMiXSwibmFtZXMiOlsiQmFzZURldmljZSIsImRldmljZVR5cGUiLCJwb3J0IiwiY2xlYXJJbnRlcnZhbCIsImludGVydmFsIiwicmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMiLCJjbG9zZSIsImNvbnNvbGUiLCJsb2ciLCJ3YXJuIiwidW5kZWZpbmVkIiwiZW5hYmxlZCIsImVuYWJsZSIsInBlcmlvZCIsImlzV29yayIsImxvb3AiLCJldmVudCIsImhhbmRsZXIiLCJldmVudHMiLCJoYXMiLCJpbmRleCIsImdldCIsInB1c2giLCJfIiwiaGFuZGxlcnMiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUk4QkEsVTs7O2tEQUMrQixrQjs7c0RBRTVCLEU7O2tEQUVaLEk7c0RBQ1ksRTs7Ozs7V0FFL0IsbUJBQXlCO0FBQ3ZCLGFBQU8sS0FBS0MsVUFBWjtBQUNEOzs7V0FFRCxtQkFBMEM7QUFDeEMsYUFBTyxLQUFLQyxJQUFaO0FBQ0Q7Ozs7NkZBRUQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNFQyxnQkFBQUEsYUFBYSxDQUFDLEtBQUtDLFFBQU4sQ0FBYjtBQUNBLHFCQUFLQyx1QkFBTDs7QUFGRixvQkFHTyxLQUFLSCxJQUhaO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLHFDQU9VLEtBQUtBLElBUGYsK0NBT1UsV0FBV0ksS0FBWCxFQVBWOztBQUFBO0FBUUlDLGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWjtBQVJKO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBVUlELGdCQUFBQSxPQUFPLENBQUNFLElBQVI7O0FBVko7QUFZRSxxQkFBS1AsSUFBTCxHQUFZUSxTQUFaOztBQVpGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7Ozs7V0FlQSxrQkFBZ0JSLElBQWhCLEVBQTRDO0FBQUE7O0FBQzFDLGFBQU8scUJBQUtBLElBQUwsNERBQVdBLElBQVgsTUFBb0JBLElBQUksQ0FBQ0EsSUFBaEM7QUFDRDs7O1dBRUQsaUJBQWVTLFFBQWYsRUFBdUM7QUFDckMsV0FBS0MsTUFBTCxHQUFjRCxRQUFkO0FBQ0Q7OztXQUVELGtCQUFtQkUsTUFBbkIsRUFBbUM7QUFBQTs7QUFDakMsVUFBSUMsTUFBTSxHQUFHLEtBQWI7QUFDQSxXQUFLVixRQUFMLEdBQWdCLGlIQUFZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDdEJVLE1BRHNCO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFHeEJBLGdCQUFBQSxNQUFNLEdBQUcsSUFBVDtBQUh3QjtBQUFBLHVCQUlsQixLQUFJLENBQUNDLElBQUwsRUFKa0I7O0FBQUE7QUFBQTtBQU14QkQsZ0JBQUFBLE1BQU0sR0FBRyxLQUFUO0FBTndCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQVosSUFRYkQsTUFSYSxDQUFoQjtBQVNEOzs7V0FNRCxhQUFXRyxLQUFYLEVBQTBCQyxPQUExQixFQUE2RDtBQUFBOztBQUMzRCxVQUFJLENBQUMsS0FBS0MsTUFBTCxDQUFZQyxHQUFaLENBQWdCSCxLQUFoQixDQUFMLEVBQTZCO0FBQzNCVCxRQUFBQSxPQUFPLENBQUNFLElBQVIsb0JBQXlCTyxLQUF6QjtBQUNBO0FBQ0Q7O0FBQ0QsVUFBTUksS0FBeUIsdUJBQUcsS0FBS0YsTUFBTCxDQUFZRyxHQUFaLENBQWdCTCxLQUFoQixDQUFILHFEQUFHLCtEQUFnQ0MsT0FBaEMsQ0FBbEM7O0FBQ0EsVUFBSUcsS0FBSyxLQUFLVixTQUFWLElBQXVCVSxLQUFLLEtBQUssQ0FBQyxDQUF0QyxFQUF5QztBQUN2Q2IsUUFBQUEsT0FBTyxDQUFDRSxJQUFSLENBQWEsb0JBQWI7QUFDQTtBQUNEOztBQUNELGdDQUFLUyxNQUFMLENBQVlHLEdBQVosQ0FBZ0JMLEtBQWhCLHVIQUErQkksS0FBL0IsRUFBc0MsQ0FBdEM7QUFDRDs7O1dBRUQsWUFBVUosS0FBVixFQUF5QkMsT0FBekIsRUFBNEQ7QUFBQTs7QUFDMUQsVUFBSSxDQUFDLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFnQkgsS0FBaEIsQ0FBTCxFQUE2QjtBQUMzQlQsUUFBQUEsT0FBTyxDQUFDRSxJQUFSLENBQWEsY0FBY08sS0FBM0I7QUFDQTtBQUNEOztBQUNELGdDQUFLRSxNQUFMLENBQVlHLEdBQVosQ0FBZ0JMLEtBQWhCLHlFQUF3Qk0sSUFBeEIsQ0FBNkJMLE9BQTdCO0FBQ0Q7OztXQUVELG1DQUF1QztBQUFBLGlEQUNULEtBQUtDLE1BREk7QUFBQTs7QUFBQTtBQUNyQyw0REFBeUM7QUFBQTtBQUFBLGNBQTdCSyxDQUE2QjtBQUFBLGNBQTFCQyxRQUEwQjs7QUFDdkMsK0JBQUFBLFFBQVEsTUFBUixDQUFBQSxRQUFRLEVBQVEsQ0FBUixFQUFXQSxRQUFRLENBQUNDLE1BQXBCLENBQVI7QUFDRDtBQUhvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSXRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSURldmljZSB9IGZyb20gXCIuL0lEZXZpY2VcIjtcbmltcG9ydCB7IElTdGF0dXMgfSBmcm9tIFwiLi9JU3RhdHVzXCI7XG5pbXBvcnQgeyBJU2VyaWFsUG9ydCB9IGZyb20gXCIuLi9zZXJpYWwvdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZURldmljZSBpbXBsZW1lbnRzIElEZXZpY2Uge1xuICBwcm90ZWN0ZWQgZXZlbnRzOiBNYXA8c3RyaW5nLCBBcnJheTwoYWN0OiBhbnkpID0+IHZvaWQ+PiA9IG5ldyBNYXAoKTtcbiAgcHJvdGVjdGVkIGludGVydmFsOiBhbnk7XG4gIHByb3RlY3RlZCBkZXZpY2VUeXBlOiBzdHJpbmcgPSBcIlwiO1xuICBwcm90ZWN0ZWQgcG9ydD86IElTZXJpYWxQb3J0O1xuICBwcm90ZWN0ZWQgZW5hYmxlID0gdHJ1ZTtcbiAgcHJvdGVjdGVkIGxhc3RTdGF0dXM6IHN0cmluZyA9IFwiXCI7XG5cbiAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5kZXZpY2VUeXBlO1xuICB9XG5cbiAgcHVibGljIGdldFBvcnQoKTogSVNlcmlhbFBvcnQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnBvcnQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgIHRoaXMucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBpZiAoIXRoaXMucG9ydCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5wb3J0Py5jbG9zZSgpO1xuICAgICAgY29uc29sZS5sb2coXCJQb3J0IGlzIGNsb3NlZFwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUud2FybihlcnIpO1xuICAgIH1cbiAgICB0aGlzLnBvcnQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgaXNNeVBvcnQocG9ydDogSVNlcmlhbFBvcnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wb3J0Py5wb3J0ID09PSBwb3J0LnBvcnQ7XG4gIH1cblxuICBwdWJsaWMgZW5hYmxlZChlbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5lbmFibGUgPSBlbmFibGVkO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRMb29wKHBlcmlvZDogbnVtYmVyKSB7XG4gICAgbGV0IGlzV29yayA9IGZhbHNlO1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoaXNXb3JrKSByZXR1cm47XG4gICAgICB0cnkge1xuICAgICAgICBpc1dvcmsgPSB0cnVlO1xuICAgICAgICBhd2FpdCB0aGlzLmxvb3AoKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlzV29yayA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sIHBlcmlvZCk7XG4gIH1cblxuICBhYnN0cmFjdCBjaGVja1N0YXR1cygpOiBQcm9taXNlPElTdGF0dXM+O1xuXG4gIGFic3RyYWN0IGluaXQoKTogUHJvbWlzZTxib29sZWFuPjtcblxuICBwdWJsaWMgb2ZmKGV2ZW50OiBzdHJpbmcsIGhhbmRsZXI6IChwcm9wOiBhbnkpID0+IGFueSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgY29uc29sZS53YXJuKGBObyBldmVudCAke2V2ZW50fSB0byBkZWxldGUgaGFuZGxlcmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdGhpcy5ldmVudHMuZ2V0KGV2ZW50KT8uaW5kZXhPZihoYW5kbGVyKTtcbiAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCB8fCBpbmRleCA9PT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIkhhbmRsZXIgbm90IGZvdW5kIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5ldmVudHMuZ2V0KGV2ZW50KT8uc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIHB1YmxpYyBvbihldmVudDogc3RyaW5nLCBoYW5kbGVyOiAocHJvcDogYW55KSA9PiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIk5vIGV2ZW50IFwiICsgZXZlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50cy5nZXQoZXZlbnQpPy5wdXNoKGhhbmRsZXIpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgW18sIGhhbmRsZXJzXSBvZiB0aGlzLmV2ZW50cykge1xuICAgICAgaGFuZGxlcnMuc3BsaWNlKDAsIGhhbmRsZXJzLmxlbmd0aCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGxvb3AoKTogdm9pZDtcbn1cbiJdfQ==