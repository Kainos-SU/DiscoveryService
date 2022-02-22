"use strict";

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.object.to-string.js");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.BasePrinter = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _BaseDevice2 = _interopRequireDefault(require("./BaseDevice"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var BasePrinter = /*#__PURE__*/function (_BaseDevice) {
  (0, _inherits2.default)(BasePrinter, _BaseDevice);

  var _super = _createSuper(BasePrinter);

  function BasePrinter(port) {
    var _this;

    (0, _classCallCheck2.default)(this, BasePrinter);
    _this = _super.call(this);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "paperJam", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "nearEnd", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "paperNotPresent", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "coverOpen", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "paperInOutput", false);
    _this.port = port;
    return _this;
  }

  (0, _createClass2.default)(BasePrinter, [{
    key: "isMyPort",
    value: function isMyPort(port) {
      var _this$port;

      return ((_this$port = this.port) === null || _this$port === void 0 ? void 0 : _this$port.port) === port.port;
    }
  }]);
  return BasePrinter;
}(_BaseDevice2.default);

exports.BasePrinter = BasePrinter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZXZpY2VzL21vZGVsL0lQcmludGVyLnRzIl0sIm5hbWVzIjpbIkJhc2VQcmludGVyIiwicG9ydCIsIkJhc2VEZXZpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7SUF1QnNCQSxXOzs7OztBQVFsQix1QkFBc0JDLElBQXRCLEVBQXlDO0FBQUE7O0FBQUE7QUFDckM7QUFEcUMsMkZBTlgsS0FNVztBQUFBLDBGQUxaLEtBS1k7QUFBQSxrR0FKSixLQUlJO0FBQUEsNEZBSFYsS0FHVTtBQUFBLGdHQUZMLEtBRUs7QUFFckMsVUFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBRnFDO0FBR3hDOzs7O1dBWUQsa0JBQWdCQSxJQUFoQixFQUE0QztBQUFBOztBQUN4QyxhQUFPLG9CQUFLQSxJQUFMLDBEQUFXQSxJQUFYLE1BQW9CQSxJQUFJLENBQUNBLElBQWhDO0FBQ0g7OztFQXpCcUNDLG9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJU3RhdHVzfSBmcm9tIFwiLi9JU3RhdHVzXCI7XG5pbXBvcnQge0lTZXJpYWxQb3J0fSBmcm9tIFwiLi4vc2VyaWFsL3R5cGVzXCI7XG5pbXBvcnQgQmFzZURldmljZSBmcm9tIFwiLi9CYXNlRGV2aWNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByaW50ZXIge1xuXG4gICAgcHJpbnRCYXJDb2RlKGNvZGU6IHN0cmluZyk6IGJvb2xlYW4gfCBQcm9taXNlPHZvaWQ+O1xuXG4gICAgY3V0KGFsaWduPzpib29sZWFuKTogYm9vbGVhbiB8IFByb21pc2U8dm9pZD47XG5cbiAgICBwcmludExpbmUobWVzc2FnZTogU3RyaW5nKTogYm9vbGVhbiB8IFByb21pc2U8dm9pZD47XG5cbiAgICBwYXBlclJlbW92ZWRGcm9tSW5wdXQ/KCk6IFByb21pc2U8dm9pZD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByaW50ZXJTdGF0dXMge1xuICAgIHBhcGVySW5PdXRwdXQ/OiBib29sZWFuO1xuICAgIHBhcGVySmFtPzogYm9vbGVhbjtcbiAgICBuZWFyRW5kPzogYm9vbGVhbjtcbiAgICBwYXBlck5vdFByZXNlbnQ/OiBib29sZWFuO1xuICAgIGNvdmVyT3Blbj86IGJvb2xlYW47XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVByaW50ZXIgZXh0ZW5kcyBCYXNlRGV2aWNlIGltcGxlbWVudHMgSVByaW50ZXIge1xuXG4gICAgcHJvdGVjdGVkIHBhcGVySmFtOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJvdGVjdGVkIG5lYXJFbmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcm90ZWN0ZWQgcGFwZXJOb3RQcmVzZW50OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJvdGVjdGVkIGNvdmVyT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCBwYXBlckluT3V0cHV0PzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHBvcnQ6IElTZXJpYWxQb3J0KSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCBwcmludExpbmUobWVzc2FnZTogU3RyaW5nKTogYm9vbGVhbiB8IFByb21pc2U8dm9pZD47XG5cbiAgICBhYnN0cmFjdCBwcmludEJhckNvZGUoY29kZTogc3RyaW5nKTogYm9vbGVhbiB8IFByb21pc2U8dm9pZD47XG5cbiAgICBhYnN0cmFjdCBjdXQoYWxpZ24/OiBib29sZWFuICk6IGJvb2xlYW4gfCBQcm9taXNlPHZvaWQ+O1xuXG4gICAgYWJzdHJhY3Qgcm9tVmVyc2lvbigpOiBQcm9taXNlPElTdGF0dXM+O1xuXG4gICAgYWJzdHJhY3QgaW5pdCgpOiBQcm9taXNlPGJvb2xlYW4+O1xuXG4gICAgcHVibGljIGlzTXlQb3J0KHBvcnQ6IElTZXJpYWxQb3J0KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcnQ/LnBvcnQgPT09IHBvcnQucG9ydDtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCByZXNldCgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gICAgYWJzdHJhY3QgY2hlY2tTdGF0dXMoKTogUHJvbWlzZTxJU3RhdHVzPjtcblxuICAgIGFic3RyYWN0IGdldFByaW50ZXJTdGF0dXMoKTogSVByaW50ZXJTdGF0dXM7XG5cbn1cbiJdfQ==