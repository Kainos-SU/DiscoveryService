"use strict";

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.object.to-string.js");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.BaseDispenser = void 0;

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/map"));

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

var BaseDispenser = /*#__PURE__*/function (_BaseDevice) {
  (0, _inherits2.default)(BaseDispenser, _BaseDevice);

  var _super = _createSuper(BaseDispenser);

  function BaseDispenser(port) {
    var _this;

    (0, _classCallCheck2.default)(this, BaseDispenser);
    _this = _super.call(this);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "numberOfCassettes", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "cassettesStatus", new _map.default());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "events", new _map.default([["error", []]]));
    _this.port = port;
    return _this;
  }

  (0, _createClass2.default)(BaseDispenser, [{
    key: "getCassetteNumber",
    value: function getCassetteNumber() {
      return this.numberOfCassettes;
    }
  }, {
    key: "isMyPort",
    value: function isMyPort(port) {
      var _this$port;

      return ((_this$port = this.port) === null || _this$port === void 0 ? void 0 : _this$port.port) === port.port;
    }
  }]);
  return BaseDispenser;
}(_BaseDevice2.default);

exports.BaseDispenser = BaseDispenser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZXZpY2VzL21vZGVsL0lEaXNwZW5zZXIudHMiXSwibmFtZXMiOlsiQmFzZURpc3BlbnNlciIsInBvcnQiLCJudW1iZXJPZkNhc3NldHRlcyIsIkJhc2VEZXZpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7OztJQXFDc0JBLGE7Ozs7O0FBU3BCLHlCQUFzQkMsSUFBdEIsRUFBeUM7QUFBQTs7QUFBQTtBQUN2QztBQUR1QyxvR0FSSCxDQVFHO0FBQUEsa0dBTmlCLGtCQU1qQjtBQUFBLHlGQUpvRCxpQkFBUSxDQUNuRyxDQUFDLE9BQUQsRUFBVSxFQUFWLENBRG1HLENBQVIsQ0FJcEQ7QUFFdkMsVUFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBRnVDO0FBR3hDOzs7O1dBZ0JELDZCQUFtQztBQUNqQyxhQUFPLEtBQUtDLGlCQUFaO0FBQ0Q7OztXQUVELGtCQUFnQkQsSUFBaEIsRUFBNEM7QUFBQTs7QUFDMUMsYUFBTyxvQkFBS0EsSUFBTCwwREFBV0EsSUFBWCxNQUFvQkEsSUFBSSxDQUFDQSxJQUFoQztBQUNEOzs7RUFsQ3lDRSxvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTdGF0dXMgfSBmcm9tIFwiLi9JU3RhdHVzXCI7XG5pbXBvcnQgeyBJU2VyaWFsUG9ydCB9IGZyb20gXCIuLi9zZXJpYWwvdHlwZXNcIjtcbmltcG9ydCBCYXNlRGV2aWNlIGZyb20gXCIuL0Jhc2VEZXZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJRGlzcGVuc2VyT25FcnJvciB7XG4gIHB1cmdlOiAoKSA9PiB2b2lkO1xuICBzdGF0dXM6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGlzcGVuc2VyU3RhdHVzIHtcbiAgb2s6IGJvb2xlYW47XG4gIHN0YXR1czogc3RyaW5nO1xuICBjYXNzZXR0ZXM6IE1hcDxudW1iZXIsIElDYXNzZXR0ZVN0YXR1cz47XG4gIHR5cGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGlzcGVuc2VBbnN3ZXIge1xuICBvazogYm9vbGVhbjtcbiAgY3JjOiBib29sZWFuO1xuICBlcnJvckNvZGU6IG51bWJlcjtcbiAgZXJyb3JUZXh0OiBzdHJpbmc7XG4gIGNhc3NldHRlczogQXJyYXk8e1xuICAgIGNhc3NldHRlTnVtYmVyOiBudW1iZXI7XG4gICAgcmVxdWVzdGVkQmlsbENISzogbnVtYmVyO1xuICAgIHJlcXVlc3RlZEJpbGxFWElUOiBudW1iZXI7XG4gICAgcmVqZWN0ZWRCaWxsOiBudW1iZXI7XG4gICAgY2Fzc2V0dGVTdGF0dXM6IHN0cmluZztcbiAgfT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURpc3BlbnNlckFjdGlvbnMge31cblxuZXhwb3J0IGludGVyZmFjZSBJRGlzcGVuc2VyIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNhc3NldHRlU3RhdHVzIHtcbiAgaXNFeGlzdDogYm9vbGVhbjtcbiAgaXNFbXB0eTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VEaXNwZW5zZXIgZXh0ZW5kcyBCYXNlRGV2aWNlIGltcGxlbWVudHMgSURpc3BlbnNlciB7XG4gIHByb3RlY3RlZCBudW1iZXJPZkNhc3NldHRlczogbnVtYmVyID0gMDtcblxuICBwcm90ZWN0ZWQgY2Fzc2V0dGVzU3RhdHVzOiBNYXA8bnVtYmVyLCBJQ2Fzc2V0dGVTdGF0dXM+ID0gbmV3IE1hcCgpO1xuXG4gIHByb3RlY3RlZCBldmVudHM6IE1hcDxzdHJpbmcsIEFycmF5PChvcHQ6IElEaXNwZW5zZXJPbkVycm9yIHwgSURpc3BlbnNlckFjdGlvbnMpID0+IHZvaWQ+PiA9IG5ldyBNYXAoW1xuICAgIFtcImVycm9yXCIsIFtdXVxuICBdKTtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocG9ydDogSVNlcmlhbFBvcnQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucG9ydCA9IHBvcnQ7XG4gIH1cblxuICBhYnN0cmFjdCBkaXNwZW5zZShjb3VudDogbnVtYmVyLCBjYXNzZXR0ZU51bWJlcjogbnVtYmVyKTogUHJvbWlzZTxJRGlzcGVuc2VBbnN3ZXI+O1xuXG4gIGFic3RyYWN0IG11bHRpRGlzcGVuc2UoZGlzcGVuc2VEYXRhOiBBcnJheTx7Y291bnQ6IG51bWJlciwgY2Fzc2V0dGVOdW1iZXI6IG51bWJlcn0+KTogUHJvbWlzZTxJRGlzcGVuc2VBbnN3ZXI+O1xuXG4gIGFic3RyYWN0IHB1cmdlKCk6IFByb21pc2U8SVN0YXR1cz47XG5cbiAgYWJzdHJhY3QgdGVzdERpc3BlbnNlKCk6IFByb21pc2U8SVN0YXR1cz47XG5cbiAgYWJzdHJhY3Qgcm9tVmVyc2lvbigpOiBQcm9taXNlPElTdGF0dXM+O1xuXG4gIGFic3RyYWN0IGluaXQoKTogUHJvbWlzZTxib29sZWFuPjtcblxuICBhYnN0cmFjdCBnZXREaXNwZW5zZXJTdGF0dXMoKTogSURpc3BlbnNlclN0YXR1cztcblxuICBwdWJsaWMgZ2V0Q2Fzc2V0dGVOdW1iZXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5udW1iZXJPZkNhc3NldHRlc1xuICB9XG5cbiAgcHVibGljIGlzTXlQb3J0KHBvcnQ6IElTZXJpYWxQb3J0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucG9ydD8ucG9ydCA9PT0gcG9ydC5wb3J0O1xuICB9XG5cbiAgYWJzdHJhY3QgY2hlY2tTdGF0dXMoKTogUHJvbWlzZTxJU3RhdHVzPjtcbn1cbiJdfQ==