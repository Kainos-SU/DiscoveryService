"use strict";

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.regexp.exec.js");

var _sliceInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/slice");

var _Array$from = require("@babel/runtime-corejs3/core-js-stable/array/from");

var _Symbol = require("@babel/runtime-corejs3/core-js-stable/symbol");

var _getIteratorMethod = require("@babel/runtime-corejs3/core-js/get-iterator-method");

var _Array$isArray = require("@babel/runtime-corejs3/core-js-stable/array/is-array");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.calculateXorCrc = calculateXorCrc;
exports.checkXorCrc = checkXorCrc;
exports.decodeValue = decodeValue;
exports.encodeValue = encodeValue;
exports.filterResponse = filterResponse;
exports.parseDispenseData = parseDispenseData;
exports.parseStatus = parseStatus;
exports.prepareDataForDispense = prepareDataForDispense;

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _some = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/some"));

var _fill = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/fill"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _constants = require("./constants");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context4; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty2(_context4 = Object.prototype.toString.call(o)).call(_context4, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function calculateXorCrc(message) {
  var crc = 0;

  var _iterator = _createForOfIteratorHelper(message),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var num = _step.value;

      if (num > 255 || num < 0) {
        throw new Error("[XOR CRC] Error. Inputting array includes number less then 0 or greater than 255! ".concat(num));
      }

      crc ^= num;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return crc;
}

function checkXorCrc(message) {
  var temp = (0, _toConsumableArray2.default)(message);
  var crc = temp.pop();
  var calculatedCrc = calculateXorCrc(temp);
  return crc === calculatedCrc;
}

function parseStatus(data) {
  var primaryResponse = filterResponse(data);
  var messageToParse = [];
  var indexCMD = (0, _indexOf.default)(primaryResponse).call(primaryResponse, _constants.COMMAND_CODES.STATUS);
  var indexOfEXT = (0, _indexOf.default)(primaryResponse).call(primaryResponse, _constants.STANDART_BYTES.EXT, indexCMD);
  messageToParse = (0, _slice.default)(primaryResponse).call(primaryResponse, indexCMD + 1, indexOfEXT);
  var errorCode = decodeValue(messageToParse.shift() || 0x20);
  var error = errorCode <= 0 ? _constants.ERROR_CODES.get(errorCode) || "Unknown" : "No Error";
  var DISP0 = parseDISP0(messageToParse.shift() || 0x20);
  var DISP1 = parseDISP1(messageToParse.shift() || 0x20);
  var cassettes = [];

  for (var i = 0; i < messageToParse.length; i += 4) {
    var status = parseSTAT(messageToParse[i]);
    var inserted = Boolean(messageToParse[i + 1] - _constants.TYPE_CONSTANT);
    var billThickness = decodeValue(messageToParse[i + 2]);
    var billLength = decodeValue(messageToParse[i + 3]);
    var cassetteNumber = i / 4 + 1;
    cassettes.push({
      status: status,
      inserted: inserted,
      billThickness: billThickness,
      billLength: billLength,
      cassetteNumber: cassetteNumber
    });
  }

  return {
    error: error,
    errorCode: errorCode,
    DISP0: DISP0,
    DISP1: DISP1,
    cassettes: cassettes,
    rawResponse: primaryResponse
  };
}

function filterResponse(data) {
  var indexOfSOH = (0, _indexOf.default)(data).call(data, _constants.STANDART_BYTES.SOH);
  var indexOfEXT = (0, _indexOf.default)(data).call(data, _constants.STANDART_BYTES.EXT, indexOfSOH);
  var response = (0, _slice.default)(data).call(data, indexOfSOH, indexOfEXT + 2);

  if (!checkXorCrc(response)) {
    throw new Error("[ECDM] Error of checking CRC!");
  }

  var result = (0, _includes.default)(data).call(data, _constants.STANDART_BYTES.ACK) ? [_constants.STANDART_BYTES.ACK] : [];
  result.push.apply(result, (0, _toConsumableArray2.default)(response));
  return result;
}

function prepareDataForDispense(dispenseData) {
  var _context, _context2, _context3;

  if (dispenseData.length > 4 || (0, _some.default)(dispenseData).call(dispenseData, function (el) {
    if (el.cassette > 4 || el.cassette < 1) {
      return true;
    }

    return el.count > 100;
  })) {
    throw new Error("[ECDM helper] Invalid value to dispense!");
  }

  var result = (0, _fill.default)(_context = new Array(4)).call(_context, 0x20);
  (0, _forEach.default)(dispenseData).call(dispenseData, function (el) {
    result[el.cassette - 1] = el.count + _constants.COEFFICIENT_OF_VALUES;
  });
  var reserved = (0, _fill.default)(_context2 = new Array(9)).call(_context2, 0x20);
  result.push.apply(result, (0, _concat.default)(_context3 = [// Enable Timeout (0x20 - disable, 0x1C - enable)
  0x20, // If timeout disabled - 0x20, else - from 0x30 to 0x39
  0x20]).call(_context3, (0, _toConsumableArray2.default)(reserved)));
  return result;
}
/**
 *
 * Функция для парсинга ответа от диспенсера.
 *
 * @param data Массив чисел(байтов) начиная (и включая) c SOH и заканчивая (также включая) BCC
 * @return IDispenseAnswer {
 *  crc: boolean;
 *  errorCode: number;
 *  errorText: string;
 *  cassettes: Array<{
 *    cassetteNumber: number;
 *    requestedBillCHK: number;   В этой модели диспенсера всегда равен значению EXIT
 *    requestedBillEXIT: number;
 *    rejectedBill: number;
 *    cassetteStatus: string;
 *  }>;
}
 */


function parseDispenseData(data) {
  var crc = checkXorCrc(data);
  var errorCode = decodeValue(data[4]);
  var errorText = _constants.ERROR_CODES.get(errorCode) || "";
  var cassettes = [];
  var indexOfCmd = (0, _indexOf.default)(data).call(data, _constants.COMMAND_CODES.DISPENSE);
  var dataToParse = (0, _slice.default)(data).call(data, indexOfCmd + 3, indexOfCmd + 15);

  for (var i = 0; i < dataToParse.length; i += 3) {
    var requestedBillEXIT = decodeValue(dataToParse[i]);
    var rejectedBill = decodeValue(dataToParse[i + 1]);
    var cassetteNumber = i / 3 + 1;
    cassettes.push({
      requestedBillEXIT: requestedBillEXIT,
      requestedBillCHK: requestedBillEXIT,
      rejectedBill: rejectedBill,
      cassetteNumber: cassetteNumber,
      cassetteStatus: "gud"
    });
  }

  return {
    ok: !errorCode,
    crc: crc,
    errorCode: errorCode,
    errorText: errorText,
    cassettes: cassettes
  };
}

function parseDISP0(byte) {
  var stat = {};

  for (var _i = 0, _Object$entries = (0, _entries.default)(_constants.DISP0_BIT_MASK); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        obj = _Object$entries$_i[1];

    var indexKey = key;
    stat[indexKey] = {
      description: obj.state,
      state: Boolean(obj.bit & byte)
    };
  }

  return stat;
}

function parseDISP1(byte) {
  var status = {};

  for (var _i2 = 0, _Object$entries3 = (0, _entries.default)(_constants.DISP1_BIT_MASK); _i2 < _Object$entries3.length; _i2++) {
    var _Object$entries3$_i = (0, _slicedToArray2.default)(_Object$entries3[_i2], 2),
        key = _Object$entries3$_i[0],
        obj = _Object$entries3$_i[1];

    var indexKey = key;
    status[indexKey] = {
      description: obj.state,
      state: Boolean(obj.bit & byte)
    };
  }

  return status;
}

function parseSTAT(byte) {
  var status = {};

  for (var _i3 = 0, _Object$entries4 = (0, _entries.default)(_constants.STAT_BIT_MASK); _i3 < _Object$entries4.length; _i3++) {
    var _Object$entries4$_i = (0, _slicedToArray2.default)(_Object$entries4[_i3], 2),
        key = _Object$entries4$_i[0],
        obj = _Object$entries4$_i[1];

    var indexKey = key;
    status[indexKey] = {
      description: obj.state,
      state: Boolean(obj.bit & byte)
    };
  }

  return status;
}

function decodeValue(byte) {
  if (byte > 255 || byte < _constants.COEFFICIENT_OF_VALUES) {
    throw new Error("[Decode Value] Incorrect input value");
  }

  return byte - _constants.COEFFICIENT_OF_VALUES;
}

function encodeValue(byte) {
  if (byte > 255 - _constants.COEFFICIENT_OF_VALUES || byte < 0) {
    throw new Error("[Encode Value] Incorrect input value");
  }

  return byte + _constants.COEFFICIENT_OF_VALUES;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZXZpY2VzL2Rpc3BlbnNlci9FQ0RNL2hlbHBlcnMudHMiXSwibmFtZXMiOlsiY2FsY3VsYXRlWG9yQ3JjIiwibWVzc2FnZSIsImNyYyIsIm51bSIsIkVycm9yIiwiY2hlY2tYb3JDcmMiLCJ0ZW1wIiwicG9wIiwiY2FsY3VsYXRlZENyYyIsInBhcnNlU3RhdHVzIiwiZGF0YSIsInByaW1hcnlSZXNwb25zZSIsImZpbHRlclJlc3BvbnNlIiwibWVzc2FnZVRvUGFyc2UiLCJpbmRleENNRCIsIkNPTU1BTkRfQ09ERVMiLCJTVEFUVVMiLCJpbmRleE9mRVhUIiwiU1RBTkRBUlRfQllURVMiLCJFWFQiLCJlcnJvckNvZGUiLCJkZWNvZGVWYWx1ZSIsInNoaWZ0IiwiZXJyb3IiLCJFUlJPUl9DT0RFUyIsImdldCIsIkRJU1AwIiwicGFyc2VESVNQMCIsIkRJU1AxIiwicGFyc2VESVNQMSIsImNhc3NldHRlcyIsImkiLCJsZW5ndGgiLCJzdGF0dXMiLCJwYXJzZVNUQVQiLCJpbnNlcnRlZCIsIkJvb2xlYW4iLCJUWVBFX0NPTlNUQU5UIiwiYmlsbFRoaWNrbmVzcyIsImJpbGxMZW5ndGgiLCJjYXNzZXR0ZU51bWJlciIsInB1c2giLCJyYXdSZXNwb25zZSIsImluZGV4T2ZTT0giLCJTT0giLCJyZXNwb25zZSIsInJlc3VsdCIsIkFDSyIsInByZXBhcmVEYXRhRm9yRGlzcGVuc2UiLCJkaXNwZW5zZURhdGEiLCJlbCIsImNhc3NldHRlIiwiY291bnQiLCJBcnJheSIsIkNPRUZGSUNJRU5UX09GX1ZBTFVFUyIsInJlc2VydmVkIiwicGFyc2VEaXNwZW5zZURhdGEiLCJlcnJvclRleHQiLCJpbmRleE9mQ21kIiwiRElTUEVOU0UiLCJkYXRhVG9QYXJzZSIsInJlcXVlc3RlZEJpbGxFWElUIiwicmVqZWN0ZWRCaWxsIiwicmVxdWVzdGVkQmlsbENISyIsImNhc3NldHRlU3RhdHVzIiwib2siLCJieXRlIiwic3RhdCIsIkRJU1AwX0JJVF9NQVNLIiwia2V5Iiwib2JqIiwiaW5kZXhLZXkiLCJkZXNjcmlwdGlvbiIsInN0YXRlIiwiYml0IiwiRElTUDFfQklUX01BU0siLCJTVEFUX0JJVF9NQVNLIiwiZW5jb2RlVmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFJTyxTQUFTQSxlQUFULENBQXlCQyxPQUF6QixFQUF5RDtBQUM5RCxNQUFJQyxHQUFHLEdBQUcsQ0FBVjs7QUFEOEQsNkNBRTVDRCxPQUY0QztBQUFBOztBQUFBO0FBRTlELHdEQUEyQjtBQUFBLFVBQWhCRSxHQUFnQjs7QUFDekIsVUFBSUEsR0FBRyxHQUFHLEdBQU4sSUFBYUEsR0FBRyxHQUFHLENBQXZCLEVBQTBCO0FBQ3hCLGNBQU0sSUFBSUMsS0FBSiw2RkFBK0ZELEdBQS9GLEVBQU47QUFDRDs7QUFDREQsTUFBQUEsR0FBRyxJQUFJQyxHQUFQO0FBQ0Q7QUFQNkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFROUQsU0FBT0QsR0FBUDtBQUNEOztBQUVNLFNBQVNHLFdBQVQsQ0FBcUJKLE9BQXJCLEVBQXNEO0FBQzNELE1BQU1LLElBQUksb0NBQU9MLE9BQVAsQ0FBVjtBQUNBLE1BQU1DLEdBQUcsR0FBR0ksSUFBSSxDQUFDQyxHQUFMLEVBQVo7QUFDQSxNQUFNQyxhQUFhLEdBQUdSLGVBQWUsQ0FBQ00sSUFBRCxDQUFyQztBQUNBLFNBQU9KLEdBQUcsS0FBS00sYUFBZjtBQUNEOztBQUVNLFNBQVNDLFdBQVQsQ0FBcUJDLElBQXJCLEVBQXVEO0FBQzVELE1BQUlDLGVBQWUsR0FBR0MsY0FBYyxDQUFDRixJQUFELENBQXBDO0FBQ0EsTUFBSUcsY0FBNkIsR0FBRyxFQUFwQztBQUNBLE1BQU1DLFFBQVEsR0FBRyxzQkFBQUgsZUFBZSxNQUFmLENBQUFBLGVBQWUsRUFBU0kseUJBQWNDLE1BQXZCLENBQWhDO0FBQ0EsTUFBTUMsVUFBVSxHQUFHLHNCQUFBTixlQUFlLE1B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QUFJakMsTUFBTSxHQUFHLEVBQWI7O0FBQ0EsdUNBQXlCLHNCQUFlMkMsd0JBQWYsQ0FBekIsd0NBQXdEO0FBQW5EO0FBQUEsUUFBT1AsR0FBUDtBQUFBLFFBQVlDLEdBQVo7O0FBQ0gsUUFBTUMsUUFBUSxHQUFHRixHQUFqQjtBQUNBcEMsSUFBQUEsTUFBTSxDQUFDc0MsUUFBRCxDQUFOLEdBQW1CO0FBQ2pCQyxNQUFBQSxXQUFXLEVBQUVGLEdBQUcsQ0FBQ0csS0FEQTtBQUVqQkEsTUFBQUEsS0FBSyxFQUFFckMsT0FBTyxDQUFDa0MsR0FBRyxDQUFDSSxHQUFKLEdBQVVSLElBQVg7QUFGRyxLQUFuQjtBQUlEOztBQUNELFNBQU9qQyxNQUFQO0FBQ0Q7O0FBRU0sU0FBU1osV0FBVCxDQUFxQjZDLElBQXJCLEVBQTJDO0FBQ2hELE1BQUlBLElBQUksR0FBRyxHQUFQLElBQWNBLElBQUksR0FBR1osZ0NBQXpCLEVBQWdEO0FBQzlDLFVBQU0sSUFBSWxELEtBQUosQ0FBVSxzQ0FBVixDQUFOO0FBQ0Q7O0FBQ0QsU0FBTzhELElBQUksR0FBR1osZ0NBQWQ7QUFDRDs7QUFFTSxTQUFTdUIsV0FBVCxDQUFxQlgsSUFBckIsRUFBMkM7QUFDaEQsTUFBSUEsSUFBSSxHQUFHLE1BQU1aLGdDQUFiLElBQXNDWSxJQUFJLEdBQUcsQ0FBakQsRUFBb0Q7QUFDbEQsVUFBTSxJQUFJOUQsS0FBSixDQUFVLHNDQUFWLENBQU47QUFDRDs7QUFDRCxTQUFPOEQsSUFBSSxHQUFHWixnQ0FBZDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ09FRkZJQ0lFTlRfT0ZfVkFMVUVTLCBDT01NQU5EX0NPREVTLCBESVNQMF9CSVRfTUFTSywgRElTUDFfQklUX01BU0ssIFNUQVRfQklUX01BU0ssIFNUQU5EQVJUX0JZVEVTLCBFUlJPUl9DT0RFUywgVFlQRV9DT05TVEFOVCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQklUU19ESVNQMCwgSURJU1AwU3RhdHVzLCBJRElTUDFTdGF0dXMsIElFQ0RNQ2Fzc2V0dGVTdGF0dXMsIElFQ0RNU1RBVFN0YXR1cywgSUVDRE1TdGF0dXMsIFNlbnNvclN0YXR1cyB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBJRGlzcGVuc2VBbnN3ZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWwvSURpc3BlbnNlclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlWG9yQ3JjKG1lc3NhZ2U6IEFycmF5PG51bWJlcj4pOiBudW1iZXIge1xuICBsZXQgY3JjID0gMDtcbiAgZm9yIChjb25zdCBudW0gb2YgbWVzc2FnZSkge1xuICAgIGlmIChudW0gPiAyNTUgfHwgbnVtIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbWE9SIENSQ10gRXJyb3IuIElucHV0dGluZyBhcnJheSBpbmNsdWRlcyBudW1iZXIgbGVzcyB0aGVuIDAgb3IgZ3JlYXRlciB0aGFuIDI1NSEgJHtudW19YCk7XG4gICAgfVxuICAgIGNyYyBePSBudW07XG4gIH1cbiAgcmV0dXJuIGNyYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrWG9yQ3JjKG1lc3NhZ2U6IEFycmF5PG51bWJlcj4pOiBib29sZWFuIHtcbiAgY29uc3QgdGVtcCA9IFsuLi5tZXNzYWdlXTtcbiAgY29uc3QgY3JjID0gdGVtcC5wb3AoKTtcbiAgY29uc3QgY2FsY3VsYXRlZENyYyA9IGNhbGN1bGF0ZVhvckNyYyh0ZW1wKTtcbiAgcmV0dXJuIGNyYyA9PT0gY2FsY3VsYXRlZENyYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3RhdHVzKGRhdGE6IEFycmF5PG51bWJlcj4pOiBJRUNETVN0YXR1cyB7XG4gIGxldCBwcmltYXJ5UmVzcG9uc2UgPSBmaWx0ZXJSZXNwb25zZShkYXRhKTtcbiAgbGV0IG1lc3NhZ2VUb1BhcnNlOiBBcnJheTxudW1iZXI+ID0gW107XG4gIGNvbnN0IGluZGV4Q01EID0gcHJpbWFyeVJlc3BvbnNlLmluZGV4T2YoQ09NTUFORF9DT0RFUy5TVEFUVVMpO1xuICBjb25zdCBpbmRleE9mRVhUID0gcHJpbWFyeVJlc3BvbnNlLmluZGV4T2YoU1RBTkRBUlRfQllURVMuRVhULCBpbmRleENNRCk7XG4gIG1lc3NhZ2VUb1BhcnNlID0gcHJpbWFyeVJlc3BvbnNlLnNsaWNlKGluZGV4Q01EICsgMSwgaW5kZXhPZkVYVCk7XG5cbiAgY29uc3QgZXJyb3JDb2RlID0gZGVjb2RlVmFsdWUobWVzc2FnZVRvUGFyc2Uuc2hpZnQoKSB8fCAweDIwKTtcbiAgY29uc3QgZXJyb3IgPSBlcnJvckNvZGUgPD0gMCA/IEVSUk9SX0NPREVTLmdldChlcnJvckNvZGUpIHx8IFwiVW5rbm93blwiIDogXCJObyBFcnJvclwiO1xuICBjb25zdCBESVNQMCA9IHBhcnNlRElTUDAobWVzc2FnZVRvUGFyc2Uuc2hpZnQoKSB8fCAweDIwKTtcbiAgY29uc3QgRElTUDEgPSBwYXJzZURJU1AxKG1lc3NhZ2VUb1BhcnNlLnNoaWZ0KCkgfHwgMHgyMCk7XG5cbiAgY29uc3QgY2Fzc2V0dGVzOiBBcnJheTxJRUNETUNhc3NldHRlU3RhdHVzPiA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1lc3NhZ2VUb1BhcnNlLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgY29uc3Qgc3RhdHVzID0gcGFyc2VTVEFUKG1lc3NhZ2VUb1BhcnNlW2ldKTtcbiAgICBjb25zdCBpbnNlcnRlZCA9IEJvb2xlYW4obWVzc2FnZVRvUGFyc2VbaSArIDFdIC0gVFlQRV9DT05TVEFOVCk7XG4gICAgY29uc3QgYmlsbFRoaWNrbmVzcyA9IGRlY29kZVZhbHVlKG1lc3NhZ2VUb1BhcnNlW2kgKyAyXSk7XG4gICAgY29uc3QgYmlsbExlbmd0aCA9IGRlY29kZVZhbHVlKG1lc3NhZ2VUb1BhcnNlW2kgKyAzXSk7XG4gICAgY29uc3QgY2Fzc2V0dGVOdW1iZXIgPSBpIC8gNCArIDE7XG4gICAgY2Fzc2V0dGVzLnB1c2goe1xuICAgICAgc3RhdHVzLFxuICAgICAgaW5zZXJ0ZWQsXG4gICAgICBiaWxsVGhpY2tuZXNzLFxuICAgICAgYmlsbExlbmd0aCxcbiAgICAgIGNhc3NldHRlTnVtYmVyXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGVycm9yLFxuICAgIGVycm9yQ29kZSxcbiAgICBESVNQMCxcbiAgICBESVNQMSxcbiAgICBjYXNzZXR0ZXMsXG4gICAgcmF3UmVzcG9uc2U6IHByaW1hcnlSZXNwb25zZVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyUmVzcG9uc2UoZGF0YTogQXJyYXk8bnVtYmVyPik6IEFycmF5PG51bWJlcj4ge1xuICBjb25zdCBpbmRleE9mU09IID0gZGF0YS5pbmRleE9mKFNUQU5EQVJUX0JZVEVTLlNPSCk7XG4gIGNvbnN0IGluZGV4T2ZFWFQgPSBkYXRhLmluZGV4T2YoU1RBTkRBUlRfQllURVMuRVhULCBpbmRleE9mU09IKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBkYXRhLnNsaWNlKGluZGV4T2ZTT0gsIGluZGV4T2ZFWFQgKyAyKTtcbiAgaWYgKCFjaGVja1hvckNyYyhyZXNwb25zZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJbRUNETV0gRXJyb3Igb2YgY2hlY2tpbmcgQ1JDIVwiKTtcbiAgfVxuICBjb25zdCByZXN1bHQgPSBkYXRhLmluY2x1ZGVzKFNUQU5EQVJUX0JZVEVTLkFDSykgPyBbU1RBTkRBUlRfQllURVMuQUNLXSA6IFtdO1xuICByZXN1bHQucHVzaCguLi5yZXNwb25zZSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlRGF0YUZvckRpc3BlbnNlKGRpc3BlbnNlRGF0YTogQXJyYXk8eyBjYXNzZXR0ZTogbnVtYmVyOyBjb3VudDogbnVtYmVyIH0+KTogQXJyYXk8bnVtYmVyPiB7XG4gIGlmIChcbiAgICBkaXNwZW5zZURhdGEubGVuZ3RoID4gNCB8fFxuICAgIGRpc3BlbnNlRGF0YS5zb21lKChlbCkgPT4ge1xuICAgICAgaWYgKGVsLmNhc3NldHRlID4gNCB8fCBlbC5jYXNzZXR0ZSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWwuY291bnQgPiAxMDA7XG4gICAgfSlcbiAgKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiW0VDRE0gaGVscGVyXSBJbnZhbGlkIHZhbHVlIHRvIGRpc3BlbnNlIVwiKTtcbiAgfVxuICBjb25zdCByZXN1bHQ6IEFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPig0KS5maWxsKDB4MjApO1xuICBkaXNwZW5zZURhdGEuZm9yRWFjaCgoZWwpID0+IHtcbiAgICByZXN1bHRbZWwuY2Fzc2V0dGUgLSAxXSA9IGVsLmNvdW50ICsgQ09FRkZJQ0lFTlRfT0ZfVkFMVUVTO1xuICB9KTtcbiAgY29uc3QgcmVzZXJ2ZWQgPSBuZXcgQXJyYXkoOSkuZmlsbCgweDIwKTtcbiAgcmVzdWx0LnB1c2goXG4gICAgLy8gRW5hYmxlIFRpbWVvdXQgKDB4MjAgLSBkaXNhYmxlLCAweDFDIC0gZW5hYmxlKVxuICAgIDB4MjAsXG4gICAgLy8gSWYgdGltZW91dCBkaXNhYmxlZCAtIDB4MjAsIGVsc2UgLSBmcm9tIDB4MzAgdG8gMHgzOVxuICAgIDB4MjAsXG4gICAgLy8gUmVzZXJ2ZWQgYnl0ZXNcbiAgICAuLi5yZXNlcnZlZFxuICApO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqXG4gKiDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QsNGA0YHQuNC90LPQsCDQvtGC0LLQtdGC0LAg0L7RgiDQtNC40YHQv9C10L3RgdC10YDQsC5cbiAqXG4gKiBAcGFyYW0gZGF0YSDQnNCw0YHRgdC40LIg0YfQuNGB0LXQuyjQsdCw0LnRgtC+0LIpINC90LDRh9C40L3QsNGPICjQuCDQstC60LvRjtGH0LDRjykgYyBTT0gg0Lgg0LfQsNC60LDQvdGH0LjQstCw0Y8gKNGC0LDQutC20LUg0LLQutC70Y7Rh9Cw0Y8pIEJDQ1xuICogQHJldHVybiBJRGlzcGVuc2VBbnN3ZXIge1xuICogIGNyYzogYm9vbGVhbjtcbiAqICBlcnJvckNvZGU6IG51bWJlcjtcbiAqICBlcnJvclRleHQ6IHN0cmluZztcbiAqICBjYXNzZXR0ZXM6IEFycmF5PHtcbiAqICAgIGNhc3NldHRlTnVtYmVyOiBudW1iZXI7XG4gKiAgICByZXF1ZXN0ZWRCaWxsQ0hLOiBudW1iZXI7ICAg0JIg0Y3RgtC+0Lkg0LzQvtC00LXQu9C4INC00LjRgdC/0LXQvdGB0LXRgNCwINCy0YHQtdCz0LTQsCDRgNCw0LLQtdC9INC30L3QsNGH0LXQvdC40Y4gRVhJVFxuICogICAgcmVxdWVzdGVkQmlsbEVYSVQ6IG51bWJlcjtcbiAqICAgIHJlamVjdGVkQmlsbDogbnVtYmVyO1xuICogICAgY2Fzc2V0dGVTdGF0dXM6IHN0cmluZztcbiAqICB9Pjtcbn1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEaXNwZW5zZURhdGEoZGF0YTogQXJyYXk8bnVtYmVyPik6IElEaXNwZW5zZUFuc3dlciB7XG4gIGNvbnN0IGNyYyA9IGNoZWNrWG9yQ3JjKGRhdGEpO1xuICBjb25zdCBlcnJvckNvZGUgPSBkZWNvZGVWYWx1ZShkYXRhWzRdKTtcbiAgY29uc3QgZXJyb3JUZXh0ID0gRVJST1JfQ09ERVMuZ2V0KGVycm9yQ29kZSkgfHwgXCJcIjtcbiAgY29uc3QgY2Fzc2V0dGVzOiBBcnJheTx7XG4gICAgY2Fzc2V0dGVOdW1iZXI6IG51bWJlcjtcbiAgICByZXF1ZXN0ZWRCaWxsQ0hLOiBudW1iZXI7XG4gICAgcmVxdWVzdGVkQmlsbEVYSVQ6IG51bWJlcjtcbiAgICByZWplY3RlZEJpbGw6IG51bWJlcjtcbiAgICBjYXNzZXR0ZVN0YXR1czogc3RyaW5nO1xuICB9PiA9IFtdO1xuICBjb25zdCBpbmRleE9mQ21kID0gZGF0YS5pbmRleE9mKENPTU1BTkRfQ09ERVMuRElTUEVOU0UpO1xuICBjb25zdCBkYXRhVG9QYXJzZSA9IGRhdGEuc2xpY2UoaW5kZXhPZkNtZCArIDMsIGluZGV4T2ZDbWQgKyAxNSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YVRvUGFyc2UubGVuZ3RoOyBpICs9IDMpIHtcbiAgICBjb25zdCByZXF1ZXN0ZWRCaWxsRVhJVCA9IGRlY29kZVZhbHVlKGRhdGFUb1BhcnNlW2ldKTtcbiAgICBjb25zdCByZWplY3RlZEJpbGwgPSBkZWNvZGVWYWx1ZShkYXRhVG9QYXJzZVtpICsgMV0pO1xuICAgIGNvbnN0IGNhc3NldHRlTnVtYmVyID0gaSAvIDMgKyAxO1xuICAgIGNhc3NldHRlcy5wdXNoKHtcbiAgICAgIHJlcXVlc3RlZEJpbGxFWElULFxuICAgICAgcmVxdWVzdGVkQmlsbENISzogcmVxdWVzdGVkQmlsbEVYSVQsXG4gICAgICByZWplY3RlZEJpbGwsXG4gICAgICBjYXNzZXR0ZU51bWJlcixcbiAgICAgIGNhc3NldHRlU3RhdHVzOiBcImd1ZFwiXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG9rOiAhZXJyb3JDb2RlLFxuICAgIGNyYyxcbiAgICBlcnJvckNvZGUsXG4gICAgZXJyb3JUZXh0LFxuICAgIGNhc3NldHRlc1xuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZURJU1AwKGJ5dGU6IG51bWJlcik6IElESVNQMFN0YXR1cyB7XG4gIGxldCBzdGF0ID0ge30gYXMgSURJU1AwU3RhdHVzO1xuICBmb3IgKGNvbnN0IFtrZXksIG9ial0gb2YgT2JqZWN0LmVudHJpZXMoRElTUDBfQklUX01BU0spKSB7XG4gICAgY29uc3QgaW5kZXhLZXkgPSBrZXkgYXMga2V5b2YgSURJU1AwU3RhdHVzO1xuICAgIHN0YXRbaW5kZXhLZXldID0ge1xuICAgICAgZGVzY3JpcHRpb246IG9iai5zdGF0ZSxcbiAgICAgIHN0YXRlOiBCb29sZWFuKG9iai5iaXQgJiBieXRlKVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHN0YXQgYXMgSURJU1AwU3RhdHVzO1xufVxuXG5mdW5jdGlvbiBwYXJzZURJU1AxKGJ5dGU6IG51bWJlcik6IElESVNQMVN0YXR1cyB7XG4gIGxldCBzdGF0dXMgPSB7fSBhcyBJRElTUDFTdGF0dXM7XG4gIGZvciAoY29uc3QgW2tleSwgb2JqXSBvZiBPYmplY3QuZW50cmllcyhESVNQMV9CSVRfTUFTSykpIHtcbiAgICBjb25zdCBpbmRleEtleSA9IGtleSBhcyBrZXlvZiBJRElTUDFTdGF0dXM7XG4gICAgc3RhdHVzW2luZGV4S2V5XSA9IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBvYmouc3RhdGUsXG4gICAgICBzdGF0ZTogQm9vbGVhbihvYmouYml0ICYgYnl0ZSlcbiAgICB9O1xuICB9XG4gIHJldHVybiBzdGF0dXM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlU1RBVChieXRlOiBudW1iZXIpOiBJRUNETVNUQVRTdGF0dXMge1xuICBsZXQgc3RhdHVzID0ge30gYXMgSUVDRE1TVEFUU3RhdHVzO1xuICBmb3IgKGNvbnN0IFtrZXksIG9ial0gb2YgT2JqZWN0LmVudHJpZXMoU1RBVF9CSVRfTUFTSykpIHtcbiAgICBjb25zdCBpbmRleEtleSA9IGtleSBhcyBrZXlvZiBJRUNETVNUQVRTdGF0dXM7XG4gICAgc3RhdHVzW2luZGV4S2V5XSA9IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBvYmouc3RhdGUsXG4gICAgICBzdGF0ZTogQm9vbGVhbihvYmouYml0ICYgYnl0ZSlcbiAgICB9O1xuICB9XG4gIHJldHVybiBzdGF0dXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWNvZGVWYWx1ZShieXRlOiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoYnl0ZSA+IDI1NSB8fCBieXRlIDwgQ09FRkZJQ0lFTlRfT0ZfVkFMVUVTKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiW0RlY29kZSBWYWx1ZV0gSW5jb3JyZWN0IGlucHV0IHZhbHVlXCIpO1xuICB9XG4gIHJldHVybiBieXRlIC0gQ09FRkZJQ0lFTlRfT0ZfVkFMVUVTO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlVmFsdWUoYnl0ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKGJ5dGUgPiAyNTUgLSBDT0VGRklDSUVOVF9PRl9WQUxVRVMgfHwgYnl0ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJbRW5jb2RlIFZhbHVlXSBJbmNvcnJlY3QgaW5wdXQgdmFsdWVcIik7XG4gIH1cbiAgcmV0dXJuIGJ5dGUgKyBDT0VGRklDSUVOVF9PRl9WQUxVRVM7XG59XG4iXX0=