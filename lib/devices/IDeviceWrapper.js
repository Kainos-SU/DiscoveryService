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

exports.DeviceWrapper = void 0;

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/map"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context = Object.prototype.toString.call(o)).call(_context, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var DeviceWrapper = /*#__PURE__*/function () {
  function DeviceWrapper() {
    (0, _classCallCheck2.default)(this, DeviceWrapper);
    (0, _defineProperty2.default)(this, "enabled", false);
    (0, _defineProperty2.default)(this, "device", void 0);
    (0, _defineProperty2.default)(this, "eventsHandlers", new _map.default());
  }

  (0, _createClass2.default)(DeviceWrapper, [{
    key: "isEnabled",
    value: function isEnabled() {
      return this.enabled;
    }
  }, {
    key: "checkStatus",
    value: function checkStatus() {
      if (!this.device) {
        return _promise.default.resolve({
          rawResponse: [],
          status: "Disconnected",
          enabled: this.enabled,
          ok: false,
          connected: false
        });
      }

      return this.device.checkStatus().then(function (status) {
        return status;
      }).catch(function (err) {
        console.warn("Error in get device wrapper:\n", err);
        return {
          ok: false,
          enabled: false,
          connected: false,
          status: "Device Lost!",
          rawResponse: []
        };
      });
    }
  }, {
    key: "getPort",
    value: function getPort() {
      var _this$device;

      return (_this$device = this.device) === null || _this$device === void 0 ? void 0 : _this$device.getPort();
    }
  }, {
    key: "isMyPort",
    value: function isMyPort(port) {
      var _this$device2;

      return (_this$device2 = this.device) === null || _this$device2 === void 0 ? void 0 : _this$device2.isMyPort(port);
    }
  }, {
    key: "setEnabled",
    value: function setEnabled(enabled) {
      var _this$device3;

      this.enabled = enabled;
      (_this$device3 = this.device) === null || _this$device3 === void 0 ? void 0 : _this$device3.enabled(this.enabled);
    }
  }, {
    key: "clearDevice",
    value: function clearDevice() {
      var _this$device4, _this$device5;

      (_this$device4 = this.device) === null || _this$device4 === void 0 ? void 0 : _this$device4.removeAllEventListeners();
      (_this$device5 = this.device) === null || _this$device5 === void 0 ? void 0 : _this$device5.destroy();
      this.device = undefined;
    }
  }, {
    key: "setDevice",
    set: function set(device) {
      this.clearDevice();
      this.device = device;

      var _iterator = _createForOfIteratorHelper(this.eventsHandlers),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var eventItem = _step.value;
          var _event = eventItem[0];
          var handlers = eventItem[1];

          var _iterator2 = _createForOfIteratorHelper(handlers),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _handler = _step2.value;
              this.device.on(_event, _handler);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.device.enabled(this.enabled);
    }
  }, {
    key: "on",
    value: function on(event, handler) {
      var _this$device6;

      if (this.eventsHandlers.has(event)) {
        var _this$eventsHandlers$;

        (_this$eventsHandlers$ = this.eventsHandlers.get(event)) === null || _this$eventsHandlers$ === void 0 ? void 0 : _this$eventsHandlers$.push(handler);
      } else {
        this.eventsHandlers.set(event, [handler]);
      }

      (_this$device6 = this.device) === null || _this$device6 === void 0 ? void 0 : _this$device6.on(event, handler);
    }
  }, {
    key: "off",
    value: function off(event, handler) {
      var _this$device7, _this$eventsHandlers$2, _this$eventsHandlers$3;

      if (!this.eventsHandlers.has(event)) {
        return;
      }

      (_this$device7 = this.device) === null || _this$device7 === void 0 ? void 0 : _this$device7.off(event, handler);
      var index = (_this$eventsHandlers$2 = this.eventsHandlers.get(event)) === null || _this$eventsHandlers$2 === void 0 ? void 0 : (0, _indexOf.default)(_this$eventsHandlers$2).call(_this$eventsHandlers$2, handler);

      if (!index || index < 0) {
        return;
      }

      (_this$eventsHandlers$3 = this.eventsHandlers.get(event)) === null || _this$eventsHandlers$3 === void 0 ? void 0 : (0, _splice.default)(_this$eventsHandlers$3).call(_this$eventsHandlers$3, 1, index);
    }
  }, {
    key: "getDevice",
    value: function getDevice() {
      return this.device;
    }
  }]);
  return DeviceWrapper;
}();

exports.DeviceWrapper = DeviceWrapper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZXZpY2VzL0lEZXZpY2VXcmFwcGVyLnRzIl0sIm5hbWVzIjpbIkRldmljZVdyYXBwZXIiLCJlbmFibGVkIiwiZGV2aWNlIiwicmVzb2x2ZSIsInJhd1Jlc3BvbnNlIiwic3RhdHVzIiwib2siLCJjb25uZWN0ZWQiLCJjaGVja1N0YXR1cyIsInRoZW4iLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJ3YXJuIiwiZ2V0UG9ydCIsInBvcnQiLCJpc015UG9ydCIsInJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzIiwiZGVzdHJveSIsInVuZGVmaW5lZCIsImNsZWFyRGV2aWNlIiwiZXZlbnRzSGFuZGxlcnMiLCJldmVudEl0ZW0iLCJldmVudCIsImhhbmRsZXJzIiwiaGFuZGxlciIsIm9uIiwiaGFzIiwiZ2V0IiwicHVzaCIsInNldCIsIm9mZiIsImluZGV4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFZYUEsYTs7O21EQUNnQixLOzswREFFc0Msa0I7Ozs7O1dBRWpFLHFCQUFxQjtBQUNuQixhQUFPLEtBQUtDLE9BQVo7QUFDRDs7O1dBRUQsdUJBQXVDO0FBQ3JDLFVBQUksQ0FBQyxLQUFLQyxNQUFWLEVBQWtCO0FBQ2hCLGVBQU8saUJBQVFDLE9BQVIsQ0FBZ0I7QUFDckJDLFVBQUFBLFdBQVcsRUFBRSxFQURRO0FBRXJCQyxVQUFBQSxNQUFNLEVBQUUsY0FGYTtBQUdyQkosVUFBQUEsT0FBTyxFQUFFLEtBQUtBLE9BSE87QUFJckJLLFVBQUFBLEVBQUUsRUFBRSxLQUppQjtBQUtyQkMsVUFBQUEsU0FBUyxFQUFFO0FBTFUsU0FBaEIsQ0FBUDtBQU9EOztBQUNELGFBQU8sS0FBS0wsTUFBTCxDQUFZTSxXQUFaLEdBQ0ZDLElBREUsQ0FDRyxVQUFDSixNQUFEO0FBQUEsZUFBcUJBLE1BQXJCO0FBQUEsT0FESCxFQUVGSyxLQUZFLENBRUksVUFBQ0MsR0FBRCxFQUFnQjtBQUNy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QztBQUNEOzs7V0FFRCxxQkFBd0M7QUFDdEMsYUFBTyxLQUFLOUIsTUFBWjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVN0YXR1cyB9IGZyb20gXCIuL21vZGVsL0lTdGF0dXNcIjtcbmltcG9ydCB7IElEZXZpY2UgfSBmcm9tIFwiLi9tb2RlbC9JRGV2aWNlXCI7XG5pbXBvcnQgeyBJU2VyaWFsUG9ydCB9IGZyb20gXCIuL3NlcmlhbC90eXBlc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEZXZpY2VXcmFwcGVyIHtcbiAgY2hlY2tTdGF0dXMoKTogUHJvbWlzZTxJU3RhdHVzPjtcbiAgb24oZXZlbnQ6IHN0cmluZywgaGFuZGxlcjogKG9iajogYW55KSA9PiBhbnkpOiB2b2lkO1xuICBvZmYoZXZlbnQ6IHN0cmluZywgaGFuZGxlcjogKG9iajogYW55KSA9PiBhbnkpOiB2b2lkO1xuICBnZXREZXZpY2UoKTogSURldmljZSB8IHVuZGVmaW5lZDtcbiAgaXNFbmFibGVkKCk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBEZXZpY2VXcmFwcGVyIGltcGxlbWVudHMgSURldmljZVdyYXBwZXIge1xuICBwcml2YXRlIGVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBkZXZpY2U/OiBJRGV2aWNlO1xuICBwcml2YXRlIGV2ZW50c0hhbmRsZXJzOiBNYXA8c3RyaW5nLCBBcnJheTwocHJvcDogYW55KSA9PiBhbnk+PiA9IG5ldyBNYXAoKTtcblxuICBpc0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZW5hYmxlZDtcbiAgfVxuXG4gIHB1YmxpYyBjaGVja1N0YXR1cygpOiBQcm9taXNlPElTdGF0dXM+IHtcbiAgICBpZiAoIXRoaXMuZGV2aWNlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgcmF3UmVzcG9uc2U6IFtdIGFzIEFycmF5PCBudW1iZXI+LFxuICAgICAgICBzdGF0dXM6IFwiRGlzY29ubmVjdGVkXCIsXG4gICAgICAgIGVuYWJsZWQ6IHRoaXMuZW5hYmxlZCxcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRldmljZS5jaGVja1N0YXR1cygpXG4gICAgICAgIC50aGVuKChzdGF0dXM6IElTdGF0dXMpID0+IHN0YXR1cylcbiAgICAgICAgLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFwiRXJyb3IgaW4gZ2V0IGRldmljZSB3cmFwcGVyOlxcblwiLCBlcnIpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBzdGF0dXM6IFwiRGV2aWNlIExvc3QhXCIsXG4gICAgICAgICAgICByYXdSZXNwb25zZTogW11cbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQb3J0KCk6IElTZXJpYWxQb3J0IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5kZXZpY2U/LmdldFBvcnQoKVxuICB9XG5cbiAgcHVibGljIGlzTXlQb3J0KHBvcnQ6IElTZXJpYWxQb3J0KSB7XG4gICAgcmV0dXJuIHRoaXMuZGV2aWNlPy5pc015UG9ydChwb3J0KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRFbmFibGVkKGVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBlbmFibGVkO1xuICAgIHRoaXMuZGV2aWNlPy5lbmFibGVkKHRoaXMuZW5hYmxlZClcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckRldmljZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRldmljZT8ucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmRldmljZT8uZGVzdHJveSgpO1xuICAgIHRoaXMuZGV2aWNlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIHNldCBzZXREZXZpY2UoZGV2aWNlOiBJRGV2aWNlKSB7XG4gICAgdGhpcy5jbGVhckRldmljZSgpO1xuICAgIHRoaXMuZGV2aWNlID0gZGV2aWNlO1xuICAgIGZvciAoY29uc3QgZXZlbnRJdGVtIG9mIHRoaXMuZXZlbnRzSGFuZGxlcnMpIHtcbiAgICAgIGNvbnN0IGV2ZW50OiBzdHJpbmcgPSBldmVudEl0ZW1bMF07XG4gICAgICBjb25zdCBoYW5kbGVyczogQXJyYXk8KG9iajogYW55KSA9PiBhbnk+ID0gZXZlbnRJdGVtWzFdO1xuICAgICAgZm9yIChjb25zdCBoYW5kbGVyIG9mIGhhbmRsZXJzKSB7XG4gICAgICAgIHRoaXMuZGV2aWNlLm9uKGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kZXZpY2UuZW5hYmxlZCh0aGlzLmVuYWJsZWQpO1xuICB9XG5cbiAgb24oZXZlbnQ6IHN0cmluZywgaGFuZGxlcjogKG9iajogYW55KSA9PiBhbnkpIHtcbiAgICBpZiAodGhpcy5ldmVudHNIYW5kbGVycy5oYXMoZXZlbnQpKSB7XG4gICAgICB0aGlzLmV2ZW50c0hhbmRsZXJzLmdldChldmVudCk/LnB1c2goaGFuZGxlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXZlbnRzSGFuZGxlcnMuc2V0KGV2ZW50LCBbaGFuZGxlcl0pO1xuICAgIH1cbiAgICB0aGlzLmRldmljZT8ub24oZXZlbnQsIGhhbmRsZXIpO1xuICB9XG5cbiAgb2ZmKGV2ZW50OiBzdHJpbmcsIGhhbmRsZXI6IChvYmo6IGFueSkgPT4gYW55KSB7XG4gICAgaWYgKCF0aGlzLmV2ZW50c0hhbmRsZXJzLmhhcyhldmVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZXZpY2U/Lm9mZihldmVudCwgaGFuZGxlcik7XG4gICAgY29uc3QgaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCA9IHRoaXMuZXZlbnRzSGFuZGxlcnNcbiAgICAgIC5nZXQoZXZlbnQpXG4gICAgICA/LmluZGV4T2YoaGFuZGxlcik7XG4gICAgaWYgKCFpbmRleCB8fCBpbmRleCA8IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5ldmVudHNIYW5kbGVycy5nZXQoZXZlbnQpPy5zcGxpY2UoMSwgaW5kZXgpO1xuICB9XG5cbiAgcHVibGljIGdldERldmljZSgpOiBJRGV2aWNlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5kZXZpY2U7XG4gIH1cbn1cbiJdfQ==