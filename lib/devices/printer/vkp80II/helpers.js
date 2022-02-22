"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.parseStatus = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

var _constants = require("./constants");

var parseStatus = function parseStatus(message) {
  if (message.length > 6) {
    throw new Error("Invalid length of message");
  }

  var DLE = Boolean(message[0] === 0x10);
  var SECOND_BYTE = Boolean(message[1] === 0x0F);
  var result = {
    DLE: DLE,
    SECOND_BYTE: SECOND_BYTE,
    PAPER_STATUS: {},
    USER_STATUS: {},
    RECOVERABLE_STATUS: {},
    UNRECOVERABLE_ERROR: {},
    rawStatus: message
  };

  var _loop = function _loop(i, j) {
    var _context;

    var printerStatusKey = _constants.BYTES_AT_STATUS[j.toString()];

    (0, _forEach.default)(_context = (0, _entries.default)(_constants.FULL_PRINTER_STATUS[printerStatusKey])).call(_context, function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          keyString = _ref2[0],
          value = _ref2[1];

      var key = keyString; // @ts-ignore

      result[printerStatusKey][key] = Boolean(message[i] & value);
    });
  };

  for (var i = 2, j = 0; i < message.length; i++, j++) {
    _loop(i, j);
  }

  return result;
};

exports.parseStatus = parseStatus;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZXZpY2VzL3ByaW50ZXIvdmtwODBJSS9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbInBhcnNlU3RhdHVzIiwibWVzc2FnZSIsImxlbmd0aCIsIkVycm9yIiwiRExFIiwiQm9vbGVhbiIsIlNFQ09ORF9CWVRFIiwicmVzdWx0IiwiUEFQRVJfU1RBVFVTIiwiVVNFUl9TVEFUVVMiLCJSRUNPVkVSQUJMRV9TVEFUVVMiLCJVTlJFQ09WRVJBQkxFX0VSUk9SIiwicmF3U3RhdHVzIiwiaSIsImoiLCJwcmludGVyU3RhdHVzS2V5IiwiQllURVNfQVRfU1RBVFVTIiwidG9TdHJpbmciLCJGVUxMX1BSSU5URVJfU1RBVFVTIiwia2V5U3RyaW5nIiwidmFsdWUiLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFTTyxJQUFNQSxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDQyxPQUFELEVBQThDO0FBQ3ZFLE1BQUlBLE9BQU8sQ0FBQ0MsTUFBUixHQUFpQixDQUFyQixFQUF3QjtBQUN0QixVQUFNLElBQUlDLEtBQUosQ0FBVSwyQkFBVixDQUFOO0FBQ0Q7O0FBRUQsTUFBTUMsR0FBRyxHQUFHQyxPQUFPLENBQUNKLE9BQU8sQ0FBQyxDQUFELENBQVAsS0FBZSxJQUFoQixDQUFuQjtBQUNBLE1BQU1LLFdBQVcsR0FBR0QsT0FBTyxDQUFDSixPQUFPLENBQUMsQ0FBRCxDQUFQLEtBQWUsSUFBaEIsQ0FBM0I7QUFDQSxNQUFNTSxNQUF3QixHQUFHO0FBQy9CSCxJQUFBQSxHQUFHLEVBQUhBLEdBRCtCO0FBRS9CRSxJQUFBQSxXQUFXLEVBQVhBLFdBRitCO0FBRy9CRSxJQUFBQSxZQUFZLEVBQUUsRUFIaUI7QUFJL0JDLElBQUFBLFdBQVcsRUFBRSxFQUprQjtBQUsvQkMsSUFBQUEsa0JBQWtCLEVBQUUsRUFMVztBQU0vQkMsSUFBQUEsbUJBQW1CLEVBQUUsRUFOVTtBQU8vQkMsSUFBQUEsU0FBUyxFQUFFWDtBQVBvQixHQUFqQzs7QUFQdUUsNkJBaUI5RFksQ0FqQjhELEVBaUJ2REMsQ0FqQnVEO0FBQUE7O0FBa0JyRSxRQUFNQyxnQkFBZ0IsR0FBR0MsMkJBQWdCRixDQUFDLENBQUNHLFFBQUYsRUFBaEIsQ0FBekI7O0FBQ0EsMkRBQWVDLCtCQUFvQkgsZ0JBQXBCLENBQWYsa0JBQ1MsZ0JBQTBCO0FBQUE7QUFBQSxVQUF2QkksU0FBdUI7QUFBQSxVQUFaQyxLQUFZOztBQUNqQyxVQUFNQyxHQUFHLEdBQUdGLFNBQVosQ0FEaUMsQ0FFakM7O0FBQ0FaLE1BQUFBLE1BQU0sQ0FBQ1EsZ0JBQUQsQ0FBTixDQUF5Qk0sR0FBekIsSUFBZ0NoQixPQUFPLENBQUNKLE9BQU8sQ0FBQ1ksQ0FBRCxDQUFQLEdBQWFPLEtBQWQsQ0FBdkM7QUFDRCxLQUxEO0FBbkJxRTs7QUFpQnZFLE9BQUssSUFBSVAsQ0FBQyxHQUFHLENBQVIsRUFBV0MsQ0FBQyxHQUFHLENBQXBCLEVBQXVCRCxDQUFDLEdBQUdaLE9BQU8sQ0FBQ0MsTUFBbkMsRUFBMkNXLENBQUMsSUFBSUMsQ0FBQyxFQUFqRCxFQUFxRDtBQUFBLFVBQTVDRCxDQUE0QyxFQUFyQ0MsQ0FBcUM7QUFRcEQ7O0FBRUQsU0FBT1AsTUFBUDtBQUNELENBNUJNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRlVMTF9QUklOVEVSX1NUQVRVUywgQllURVNfQVRfU1RBVFVTLCBJUHJpbnRlclN0YXR1c0J5dGVzIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBJVktQODBGdWxsU3RhdHVzLFxuICBQYXBlclN0YXR1c0ZpZWxkcyxcbiAgUmVjb3ZlcmFibGVTdGF0dXNlcyxcbiAgVW5yZWNvdmVyYWJsZVN0YXR1c2VzLFxuICBVc2VyU3RhdHVzRmllbGRzXG59IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBwYXJzZVN0YXR1cyA9IChtZXNzYWdlOiBBcnJheTxudW1iZXI+KTogSVZLUDgwRnVsbFN0YXR1cyA9PiB7XG4gIGlmIChtZXNzYWdlLmxlbmd0aCA+IDYpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGxlbmd0aCBvZiBtZXNzYWdlXCIpO1xuICB9XG5cbiAgY29uc3QgRExFID0gQm9vbGVhbihtZXNzYWdlWzBdID09PSAweDEwKTtcbiAgY29uc3QgU0VDT05EX0JZVEUgPSBCb29sZWFuKG1lc3NhZ2VbMV0gPT09IDB4MEYpO1xuICBjb25zdCByZXN1bHQ6IElWS1A4MEZ1bGxTdGF0dXMgPSB7XG4gICAgRExFLFxuICAgIFNFQ09ORF9CWVRFLFxuICAgIFBBUEVSX1NUQVRVUzoge30gYXMgUmVjb3JkPFBhcGVyU3RhdHVzRmllbGRzLCBib29sZWFuPixcbiAgICBVU0VSX1NUQVRVUzoge30gYXMgUmVjb3JkPFVzZXJTdGF0dXNGaWVsZHMsIGJvb2xlYW4+LFxuICAgIFJFQ09WRVJBQkxFX1NUQVRVUzoge30gYXMgUmVjb3JkPFJlY292ZXJhYmxlU3RhdHVzZXMsIGJvb2xlYW4+LFxuICAgIFVOUkVDT1ZFUkFCTEVfRVJST1I6IHt9IGFzIFJlY29yZDxVbnJlY292ZXJhYmxlU3RhdHVzZXMsIGJvb2xlYW4+LFxuICAgIHJhd1N0YXR1czogbWVzc2FnZVxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAyLCBqID0gMDsgaSA8IG1lc3NhZ2UubGVuZ3RoOyBpKyssIGorKykge1xuICAgIGNvbnN0IHByaW50ZXJTdGF0dXNLZXkgPSBCWVRFU19BVF9TVEFUVVNbai50b1N0cmluZygpXTtcbiAgICBPYmplY3QuZW50cmllcyhGVUxMX1BSSU5URVJfU1RBVFVTW3ByaW50ZXJTdGF0dXNLZXldKVxuICAgIC5mb3JFYWNoKChbIGtleVN0cmluZywgdmFsdWUgXSkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0ga2V5U3RyaW5nIGFzIGFueTtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHJlc3VsdFtwcmludGVyU3RhdHVzS2V5XVtrZXldID0gQm9vbGVhbihtZXNzYWdlW2ldICYgdmFsdWUpO1xuICAgIH0pXG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufSJdfQ==