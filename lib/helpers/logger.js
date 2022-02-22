"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.Logger = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var Logger = /*#__PURE__*/function () {
  function Logger(prefix) {
    (0, _classCallCheck2.default)(this, Logger);
    (0, _defineProperty2.default)(this, "prefix", "base");

    if (prefix) {
      this.prefix = prefix;
    }
  }

  (0, _createClass2.default)(Logger, [{
    key: "info",
    value: function info(message) {
      if (Logger.logLevel !== "none" && Logger.logLevel !== "only-error") {
        var _console, _context;

        for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          props[_key - 1] = arguments[_key];
        }

        (_console = console).log.apply(_console, (0, _concat.default)(_context = [this.prefix + " INFO: " + message + "\n"]).call(_context, props)); // console.log(this.prefix + " INFO: " + message + "\n", new Error().stack.match(/(?<= ).+(?=\n|$)/gm).map(str => str.trim()).slice(1).join("\n"), ...props);

      }
    }
  }, {
    key: "error",
    value: function error(message) {
      if (Logger.logLevel !== "none") {
        var _console2, _context2;

        for (var _len2 = arguments.length, props = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          props[_key2 - 1] = arguments[_key2];
        }

        (_console2 = console).error.apply(_console2, (0, _concat.default)(_context2 = [this.prefix + " ERROR: " + message]).call(_context2, props));
      }
    }
  }, {
    key: "debugError",
    value: function debugError(message) {
      if (Logger.logLevel === "debug") {
        var _console3, _context3;

        for (var _len3 = arguments.length, props = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          props[_key3 - 1] = arguments[_key3];
        }

        (_console3 = console).error.apply(_console3, (0, _concat.default)(_context3 = [this.prefix + " _ERROR: " + message]).call(_context3, props));
      }
    }
  }, {
    key: "warning",
    value: function warning(message) {
      if (Logger.logLevel !== "none" && Logger.logLevel !== "only-error") {
        var _console4, _context4;

        for (var _len4 = arguments.length, props = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          props[_key4 - 1] = arguments[_key4];
        }

        (_console4 = console).warn.apply(_console4, (0, _concat.default)(_context4 = [this.prefix + ": " + message]).call(_context4, props));
      }
    }
  }, {
    key: "debug",
    value: function debug(message) {
      if (Logger.logLevel === "debug") {
        var _console5, _context5, _context6;

        for (var _len5 = arguments.length, props = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          props[_key5 - 1] = arguments[_key5];
        }

        (_console5 = console).log.apply(_console5, (0, _concat.default)(_context5 = [(0, _concat.default)(_context6 = "".concat(this.prefix, ": ")).call(_context6, message)]).call(_context5, props));
      }
    }
  }], [{
    key: "initLogger",
    value: function initLogger(level) {
      if (level) {
        Logger.logLevel = level;
      }
    }
  }, {
    key: "getLogLevel",
    value: function getLogLevel() {
      return Logger.logLevel;
    }
  }]);
  return Logger;
}();

exports.Logger = Logger;
(0, _defineProperty2.default)(Logger, "logLevel", "base");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2xvZ2dlci50cyJdLCJuYW1lcyI6WyJMb2dnZXIiLCJwcmVmaXgiLCJtZXNzYWdlIiwibG9nTGV2ZWwiLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsIndhcm4iLCJsZXZlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBYUEsTTtBQWNYLGtCQUFtQkMsTUFBbkIsRUFBb0M7QUFBQTtBQUFBLGtEQVpYLE1BWVc7O0FBQ2xDLFFBQUlBLE1BQUosRUFBWTtBQUNWLFdBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNEO0FBQ0Y7Ozs7V0FFRCxjQUFZQyxPQUFaLEVBQThDO0FBQzVDLFVBQUlGLE1BQU0sQ0FBQ0csUUFBUCxLQUFvQixNQUFwQixJQUE4QkgsTUFBTSxDQUFDRyxRQUFQLEtBQW9CLFlBQXRELEVBQW9FO0FBQUE7O0FBQUEsMENBRHRDQyxLQUNzQztBQUR0Q0EsVUFBQUEsS0FDc0M7QUFBQTs7QUFDbEUsb0JBQUFDLE9BQU8sRUFBQ0MsR0FBUixrREFBWSxLQUFLTCxNQUFMLEdBQWMsU0FBZCxHQUEwQkMsT0FBMUIsR0FBb0MsSUFBaEQsa0JBQXlERSxLQUF6RCxHQURrRSxDQUVsRTs7QUFDRDtBQUNGOzs7V0FFRCxlQUFhRixPQUFiLEVBQStDO0FBQzdDLFVBQUlGLE1BQU0sQ0FBQ0csUUFBUCxLQUFvQixNQUF4QixFQUFnQztBQUFBOztBQUFBLDJDQUREQyxLQUNDO0FBRERBLFVBQUFBLEtBQ0M7QUFBQTs7QUFDOUIscUJBQUFDLE9BQU8sRUFBQ0UsS0FBUixvREFBYyxLQUFLTixNQUFMLEdBQWMsVUFBZCxHQUEyQkMsT0FBekMsbUJBQXFERSxLQUFyRDtBQUNEO0FBQ0Y7OztXQUVELG9CQUFrQkYsT0FBbEIsRUFBb0Q7QUFDbEQsVUFBSUYsTUFBTSxDQUFDRyxRQUFQLEtBQW9CLE9BQXhCLEVBQWlDO0FBQUE7O0FBQUEsMkNBREdDLEtBQ0g7QUFER0EsVUFBQUEsS0FDSDtBQUFBOztBQUMvQixxQkFBQUMsT0FBTyxFQUFDRSxLQUFSLG9EQUFjLEtBQUtOLE1BQUwsR0FBYyxXQUFkLEdBQTRCQyxPQUExQyxtQkFBc0RFLEtBQXREO0FBQ0Q7QUFDRjs7O1dBRUQsaUJBQWVGLE9BQWYsRUFBaUQ7QUFDL0MsVUFBSUYsTUFBTSxDQUFDRyxRQUFQLEtBQW9CLE1BQXBCLElBQThCSCxNQUFNLENBQUNHLFFBQVAsS0FBb0IsWUFBdEQsRUFBb0U7QUFBQTs7QUFBQSwyQ0FEbkNDLEtBQ21DO0FBRG5DQSxVQUFBQSxLQUNtQztBQUFBOztBQUNsRSxxQkFBQUMsT0FBTyxFQUFDRyxJQUFSLG9EQUFhLEtBQUtQLE1BQUwsR0FBYyxJQUFkLEdBQXFCQyxPQUFsQyxtQkFBOENFLEtBQTlDO0FBQ0Q7QUFDRjs7O1dBRUQsZUFBYUYsT0FBYixFQUErQztBQUM3QyxVQUFJRixNQUFNLENBQUNHLFFBQVAsS0FBb0IsT0FBeEIsRUFBaUM7QUFBQTs7QUFBQSwyQ0FERkMsS0FDRTtBQURGQSxVQUFBQSxLQUNFO0FBQUE7O0FBQy9CLHFCQUFBQyxPQUFPLEVBQUNDLEdBQVIsK0ZBQWUsS0FBS0wsTUFBcEIseUJBQStCQyxPQUEvQixvQkFBNkNFLEtBQTdDO0FBQ0Q7QUFDRjs7O1dBN0NELG9CQUF5QkssS0FBekIsRUFBMkU7QUFDekUsVUFBSUEsS0FBSixFQUFXO0FBQ1RULFFBQUFBLE1BQU0sQ0FBQ0csUUFBUCxHQUFrQk0sS0FBbEI7QUFDRDtBQUNGOzs7V0FFRCx1QkFBb0M7QUFDbEMsYUFBT1QsTUFBTSxDQUFDRyxRQUFkO0FBQ0Q7Ozs7Ozs4QkFaVUgsTSxjQUN5RCxNIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIExvZ2dlciB7XG4gIHByaXZhdGUgc3RhdGljIGxvZ0xldmVsOiBcImJhc2VcIiB8IFwiZGVidWdcIiB8IFwibm9uZVwiIHwgXCJvbmx5LWVycm9yXCIgPSBcImJhc2VcIjtcbiAgcHJpdmF0ZSBwcmVmaXg6IHN0cmluZyA9IFwiYmFzZVwiO1xuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdExvZ2dlcihsZXZlbD86IFwiYmFzZVwiIHwgXCJkZWJ1Z1wiIHwgXCJub25lXCIgfCBcIm9ubHktZXJyb3JcIikge1xuICAgIGlmIChsZXZlbCkge1xuICAgICAgTG9nZ2VyLmxvZ0xldmVsID0gbGV2ZWw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRMb2dMZXZlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBMb2dnZXIubG9nTGV2ZWw7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocHJlZml4Pzogc3RyaW5nKSB7XG4gICAgaWYgKHByZWZpeCkge1xuICAgICAgdGhpcy5wcmVmaXggPSBwcmVmaXg7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGluZm8obWVzc2FnZTogc3RyaW5nLCAuLi5wcm9wczogYW55W10pIHtcbiAgICBpZiAoTG9nZ2VyLmxvZ0xldmVsICE9PSBcIm5vbmVcIiAmJiBMb2dnZXIubG9nTGV2ZWwgIT09IFwib25seS1lcnJvclwiKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnByZWZpeCArIFwiIElORk86IFwiICsgbWVzc2FnZSArIFwiXFxuXCIsIC4uLnByb3BzKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJlZml4ICsgXCIgSU5GTzogXCIgKyBtZXNzYWdlICsgXCJcXG5cIiwgbmV3IEVycm9yKCkuc3RhY2subWF0Y2goLyg/PD0gKS4rKD89XFxufCQpL2dtKS5tYXAoc3RyID0+IHN0ci50cmltKCkpLnNsaWNlKDEpLmpvaW4oXCJcXG5cIiksIC4uLnByb3BzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZXJyb3IobWVzc2FnZTogc3RyaW5nLCAuLi5wcm9wczogYW55W10pIHtcbiAgICBpZiAoTG9nZ2VyLmxvZ0xldmVsICE9PSBcIm5vbmVcIikge1xuICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByZWZpeCArIFwiIEVSUk9SOiBcIiArIG1lc3NhZ2UsIC4uLnByb3BzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGVidWdFcnJvcihtZXNzYWdlOiBzdHJpbmcsIC4uLnByb3BzOiBhbnlbXSkge1xuICAgIGlmIChMb2dnZXIubG9nTGV2ZWwgPT09IFwiZGVidWdcIikge1xuICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByZWZpeCArIFwiIF9FUlJPUjogXCIgKyBtZXNzYWdlLCAuLi5wcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHdhcm5pbmcobWVzc2FnZTogc3RyaW5nLCAuLi5wcm9wczogYW55W10pIHtcbiAgICBpZiAoTG9nZ2VyLmxvZ0xldmVsICE9PSBcIm5vbmVcIiAmJiBMb2dnZXIubG9nTGV2ZWwgIT09IFwib25seS1lcnJvclwiKSB7XG4gICAgICBjb25zb2xlLndhcm4odGhpcy5wcmVmaXggKyBcIjogXCIgKyBtZXNzYWdlLCAuLi5wcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRlYnVnKG1lc3NhZ2U6IHN0cmluZywgLi4ucHJvcHM6IGFueVtdKSB7XG4gICAgaWYgKExvZ2dlci5sb2dMZXZlbCA9PT0gXCJkZWJ1Z1wiKSB7XG4gICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLnByZWZpeH06ICR7bWVzc2FnZX1gLCAuLi5wcm9wcyk7XG4gICAgfVxuICB9XG59XG4iXX0=