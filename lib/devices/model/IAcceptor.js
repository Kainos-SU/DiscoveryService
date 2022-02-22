"use strict";

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.object.to-string.js");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.BaseAcceptor = void 0;

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/map"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _BaseDevice2 = _interopRequireDefault(require("./BaseDevice"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var BaseAcceptor = /*#__PURE__*/function (_BaseDevice) {
  (0, _inherits2.default)(BaseAcceptor, _BaseDevice);

  var _super = _createSuper(BaseAcceptor);

  function BaseAcceptor(port) {
    var _this;

    (0, _classCallCheck2.default)(this, BaseAcceptor);
    _this = _super.call(this);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "events", new _map.default([["billIn", []], ["billStacked", []], ["onError", []], ["returned", []], ["rejected", []]]));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "isFull", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "connected", false);
    _this.port = port;
    return _this;
  }

  return (0, _createClass2.default)(BaseAcceptor);
}(_BaseDevice2.default);

exports.BaseAcceptor = BaseAcceptor;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZXZpY2VzL21vZGVsL0lBY2NlcHRvci50cyJdLCJuYW1lcyI6WyJCYXNlQWNjZXB0b3IiLCJwb3J0IiwiQmFzZURldmljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7O0lBOEJzQkEsWTs7Ozs7QUFhcEIsd0JBQXNCQyxJQUF0QixFQUF5QztBQUFBOztBQUFBO0FBQ3ZDO0FBRHVDLHlGQVh2QyxpQkFBUSxDQUNOLENBQUMsUUFBRCxFQUFXLEVBQVgsQ0FETSxFQUVOLENBQUMsYUFBRCxFQUFnQixFQUFoQixDQUZNLEVBR04sQ0FBQyxTQUFELEVBQVksRUFBWixDQUhNLEVBSU4sQ0FBQyxVQUFELEVBQWEsRUFBYixDQUpNLEVBS04sQ0FBQyxVQUFELEVBQWEsRUFBYixDQUxNLENBQVIsQ0FXdUM7QUFBQSx5RkFIYixLQUdhO0FBQUEsNEZBRlYsS0FFVTtBQUV2QyxVQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFGdUM7QUFHeEM7OztFQWhCd0NDLG9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVN0YXR1cyB9IGZyb20gXCIuL0lTdGF0dXNcIjtcbmltcG9ydCB7SVNlcmlhbFBvcnR9IGZyb20gXCIuLi9zZXJpYWwvdHlwZXNcIjtcbmltcG9ydCBCYXNlRGV2aWNlIGZyb20gXCIuL0Jhc2VEZXZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJQWNjZXB0b3JBY3Rpb25zIHtcbiAgZGVub21pbmF0b3I6IG51bWJlcixcbiAgY3VycmVuY3k/OiBzdHJpbmcsXG4gIHZhbHVlPzogbnVtYmVyO1xuICBhY2NlcHQ/KCk6IHZvaWQ7XG4gIHJlamVjdD8oKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQWNjZXB0b3JTdGF0dXMge1xuICBvazogYm9vbGVhbjtcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIGlzRnVsbDogYm9vbGVhbjtcbiAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBY2NlcHRvck9uUmVqZWN0QWN0aW9ucyB7XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgY29kZU9mUmVqZWN0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBY2NlcHRvck9uRXJyb3JBY3Rpb25zIHtcbiAgZXJyb3I6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcmVzZXQ6KCk9PnZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFjY2VwdG9yIHt9XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlQWNjZXB0b3IgZXh0ZW5kcyBCYXNlRGV2aWNlIGltcGxlbWVudHMgSUFjY2VwdG9yIHtcbiAgcHJvdGVjdGVkIGV2ZW50czogTWFwPHN0cmluZywgQXJyYXk8KGFjdDogSUFjY2VwdG9yQWN0aW9ucyB8IElBY2NlcHRvck9uRXJyb3JBY3Rpb25zIHwgSUFjY2VwdG9yT25SZWplY3RBY3Rpb25zKSA9PiB2b2lkPj4gPVxuICAgIG5ldyBNYXAoW1xuICAgICAgW1wiYmlsbEluXCIsIFtdXSxcbiAgICAgIFtcImJpbGxTdGFja2VkXCIsIFtdXSxcbiAgICAgIFtcIm9uRXJyb3JcIiwgW11dLFxuICAgICAgW1wicmV0dXJuZWRcIiwgW11dLFxuICAgICAgW1wicmVqZWN0ZWRcIiwgW11dXG4gICAgXSk7XG5cbiAgcHJvdGVjdGVkIGlzRnVsbDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgY29ubmVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHBvcnQ6IElTZXJpYWxQb3J0KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnBvcnQgPSBwb3J0O1xuICB9XG5cbiAgYWJzdHJhY3QgaW5pdCgpOiBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIGFic3RyYWN0IGdldEFjY2VwdG9yU3RhdHVzKCk6IElBY2NlcHRvclN0YXR1c1xufVxuXG4iXX0=