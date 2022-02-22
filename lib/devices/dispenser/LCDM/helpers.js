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

exports.calculateCRC = calculateCRC;
exports.checkCRC = checkCRC;
exports.checkSensor0 = checkSensor0;
exports.checkSensor1 = checkSensor1;
exports.handleLDCMAnswer = handleLDCMAnswer;
exports.parseDispense = parseDispense;
exports.parseStatus = parseStatus;

require("core-js/modules/es.array.join.js");

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _replaceAll = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/replace-all"));

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/parse-int"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _constants = require("./constants");

var _logger = require("../../../helpers/logger");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context6; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty2(_context6 = Object.prototype.toString.call(o)).call(_context6, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var log = new _logger.Logger("[LCDM-helper]");

function calculateCRC(message) {
  var crc = 0;

  var _iterator = _createForOfIteratorHelper(message),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var i = _step.value;

      if (i < 0 || i > 255) {
        throw new RangeError("Values of message need to be between 0 and 255, get " + i);
      }

      crc ^= i;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return crc;
}

function checkCRC(message) {
  var temp = (0, _toConsumableArray2.default)(message);
  var crc = temp.pop();
  var calculatedCRC = calculateCRC(temp);
  return crc === calculatedCRC;
}

function handleLDCMAnswer(response) {
  if (!response || response.length === 0) {
    log.debug("Invalid LCDM response", response);
    return {
      ack: false,
      error: true,
      crc: false,
      data: []
    };
  }

  if (response[0] === 0x04) {
    log.debug("Error forvardin 0x04");
  }

  response = (0, _filter.default)(response).call(response, function (it) {
    return it !== 0xff;
  });
  var soh = (0, _indexOf.default)(response).call(response, _constants.STANDART_BYTES.SOH);
  var ext = (0, _indexOf.default)(response).call(response, _constants.STANDART_BYTES.EXT, soh);
  var data = soh === -1 || ext === -1 ? [] : (0, _slice.default)(response).call(response, soh, ext + 2);
  var responseAck = (0, _indexOf.default)(response).call(response, _constants.STANDART_BYTES.ACK);

  if (data.length < 4) {
    if (responseAck !== -1) {
      return {
        ack: true,
        crc: false,
        error: false,
        data: data
      };
    }

    log.debugError("Error on handle answer. Data is:", response);
    return {
      ack: false,
      error: true,
      crc: false,
      data: []
    };
  }

  var crc = calculateCRC((0, _slice.default)(data).call(data, 0, -1));
  var error = data[3] === _constants.COMMAND_CODES.UPPER_DISPENSE ? data[8] : data[4];
  var payload = {
    ack: response[0] === _constants.STANDART_BYTES.ACK,
    crc: crc === data[data.length - 1],
    error: false,
    errorCode: error,
    data: data
  };
  return payload;
}

function parseStatus(response, type) {
  var errorCode = response[5];

  var _checkSensor = checkSensor0(response[6]),
      _checkSensor2 = (0, _slicedToArray2.default)(_checkSensor, 2),
      sensor0StatusHumanReadable = _checkSensor2[0],
      sensor0Status = _checkSensor2[1];

  var _checkSensor3 = checkSensor1(response[7], type),
      _checkSensor4 = (0, _slicedToArray2.default)(_checkSensor3, 2),
      sensor1StatusHumanReadable = _checkSensor4[0],
      sensor1Status = _checkSensor4[1];

  var errorStatus = _constants.ERROR_CODES.get(errorCode) || "";
  var ok = errorStatus === "Good" || errorStatus === "Normal Stop";
  return {
    ok: ok,
    errorStatus: errorStatus,
    errorCode: errorCode,
    sensor0Status: sensor0Status,
    sensor1Status: sensor1Status,
    sensor0StatusHumanReadable: sensor0StatusHumanReadable,
    sensor1StatusHumanReadable: sensor1StatusHumanReadable
  };
}

function checkSensor0(code) {
  var result = {};
  var resultHumanReadable = "Sensor 0 Status:\n";

  for (var _i = 0, _Object$entries = (0, _entries.default)(_constants.SENSOR_STATUS.SENSOR_0); _i < _Object$entries.length; _i++) {
    var _context;

    var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    result[key] = Boolean(value & code);
    resultHumanReadable += (0, _concat.default)(_context = "".concat((0, _replaceAll.default)(key).call(key, "_", " "), ": ")).call(_context, result[key] ? "OFF" : "ON", "\n");
  }

  return [resultHumanReadable, result];
}

function checkSensor1(code, type) {
  var result = {};
  var resultHumanReadable = "Sensor 1 Status:\n";
  var base = {};

  if (type === "LCDM-1000") {
    base = _constants.SENSOR_STATUS.SENSOR_1_LCDM_1000;
  } else {
    base = _constants.SENSOR_STATUS.SENSOR_1_LCDM_2000;
  }

  for (var _i2 = 0, _Object$entries3 = (0, _entries.default)(base); _i2 < _Object$entries3.length; _i2++) {
    var _context2;

    var _Object$entries3$_i = (0, _slicedToArray2.default)(_Object$entries3[_i2], 2),
        key = _Object$entries3$_i[0],
        value = _Object$entries3$_i[1];

    result[key] = Boolean(value & code);

    if (key === "REJECT_TRAY_S_W") {
      resultHumanReadable += "Reject tray S/W: ".concat(result[key] ? "No Reject tray" : "Reject tray is on", "\n");
      continue;
    }

    resultHumanReadable += (0, _concat.default)(_context2 = "".concat((0, _replaceAll.default)(key).call(key, "_", " "), ": ")).call(_context2, result[key] ? "OFF" : "ON", "\n");
  }

  return [resultHumanReadable, result];
}

function parseDispense(response) {
  var startIndex = (0, _indexOf.default)(response).call(response, _constants.STANDART_BYTES.STX);
  var backIndex = (0, _indexOf.default)(response).call(response, _constants.STANDART_BYTES.EXT);
  var cmd = response[startIndex + 1];
  var numberOfDispenses = 0;

  if (cmd === _constants.COMMAND_CODES.LOWER_DISPENSE || cmd === _constants.COMMAND_CODES.UPPER_DISPENSE) {
    numberOfDispenses = 1;
  } else if (cmd === _constants.COMMAND_CODES.UPPER_AND_LOWER_DISPENSE) {
    numberOfDispenses = 2;
  }

  var startOfData = (0, _indexOf.default)(response).call(response, cmd) + 1;
  var endOfData = startOfData + numberOfDispenses * 4;
  var dispenseData = (0, _slice.default)(response).call(response, startOfData, endOfData);
  var startOfRejectData = endOfData + numberOfDispenses + 1;
  var rejectData = (0, _slice.default)(response).call(response, startOfRejectData, backIndex);
  var errorCode = response[endOfData];
  var errorText = _constants.ERROR_CODES.get(errorCode) || "";
  var result = {
    ok: _constants.CODES_OF_ERRORS["Good"] === errorCode || _constants.CODES_OF_ERRORS["Normal Stop"] === errorCode,
    errorCode: errorCode,
    errorText: errorText,
    crc: checkCRC(response),
    cassettes: []
  };

  for (var i = 1; i <= numberOfDispenses; i++) {
    var _context3, _context4, _context5;

    var requestedBillCHK = (0, _parseInt2.default)((0, _map.default)(_context3 = (0, _splice.default)(dispenseData).call(dispenseData, 0, 2)).call(_context3, function (num) {
      return String.fromCharCode(num);
    }).join(""));
    var requestedBillEXIT = (0, _parseInt2.default)((0, _map.default)(_context4 = (0, _splice.default)(dispenseData).call(dispenseData, 0, 2)).call(_context4, function (num) {
      return String.fromCharCode(num);
    }).join(""));
    var rejectedBill = (0, _parseInt2.default)((0, _map.default)(_context5 = (0, _splice.default)(rejectData).call(rejectData, 0, 2)).call(_context5, function (num) {
      return String.fromCharCode(num);
    }).join(""));
    var cassetteStatus = _constants.STATUS_OF_CASSETTE[endOfData + i];
    result.cassettes.push({
      cassetteNumber: numberOfDispenses > 1 ? i : getCassetteNumber(cmd),
      requestedBillCHK: requestedBillCHK,
      requestedBillEXIT: requestedBillEXIT,
      rejectedBill: rejectedBill,
      cassetteStatus: cassetteStatus
    });
  }

  return result;
}

function getCassetteNumber(cmd) {
  if (_constants.COMMAND_CODES.UPPER_DISPENSE === cmd) {
    return 1;
  }

  if (_constants.COMMAND_CODES.LOWER_DISPENSE === cmd) {
    return 2;
  }

  return -1;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZXZpY2VzL2Rpc3BlbnNlci9MQ0RNL2hlbHBlcnMudHMiXSwibmFtZXMiOlsibG9nIiwiTG9nZ2VyIiwiY2FsY3VsYXRlQ1JDIiwibWVzc2FnZSIsImNyYyIsImkiLCJSYW5nZUVycm9yIiwiY2hlY2tDUkMiLCJ0ZW1wIiwicG9wIiwiY2FsY3VsYXRlZENSQyIsImhhbmRsZUxEQ01BbnN3ZXIiLCJyZXNwb25zZSIsImxlbmd0aCIsImRlYnVnIiwiYWNrIiwiZXJyb3IiLCJkYXRhIiwiaXQiLCJzb2giLCJTVEFOREFSVF9CWVRFUyIsIlNPSCIsImV4dCIsIkVYVCIsInJlc3BvbnNlQWNrIiwiQUNLIiwiZGVidWdFcnJvciIsIkNPTU1BTkRfQ09ERVMiLCJVUFBFUl9ESVNQRU5TRSIsInBheWxvYWQiLCJlcnJvckNvZGUiLCJwYXJzZVN0YXR1cyIsInR5cGUiLCJjaGVja1NlbnNvcjAiLCJzZW5zb3IwU3RhdHVzSHVtYW5SZWFkYWJsZSIsInNlbnNvcjBTdGF0dXMiLCJjaGVja1NlbnNvcjEiLCJzZW5zb3IxU3RhdHVzSHVtYW5SZWFkYWJsZSIsInNlbnNvcjFTdGF0dXMiLCJlcnJvclN0YXR1cyIsIkVSUk9SX0NPREVTIiwiZ2V0Iiwib2siLCJjb2RlIiwicmVzdWx0IiwicmVzdWx0SHVtYW5SZWFkYWJsZSIsIlNFTlNPUl9TVEFUVVMiLCJTRU5TT1JfMCIsImtleSIsInZhbHVlIiwiQm9vbGVhbiIsImJhc2UiLCJTRU5TT1JfMV9MQ0RNXzEwMDAiLCJTRU5TT1JfMV9MQ0RNXzIwMDAiLCJwYXJzZURpc3BlbnNlIiwic3RhcnRJbmRleCIsIlNUWCIsImJhY2tJbmRleCIsImNtZCIsIm51bWJlck9mRGlzcGVuc2VzIiwiTE9XRVJfRElTUEVOU0UiLCJVUFBFUl9BTkRfTE9XRVJfRElTUEVOU0UiLCJzdGFydE9mRGF0YSIsImVuZE9mRGF0YSIsImRpc3BlbnNlRGF0YSIsInN0YXJ0T2ZSZWplY3REYXRhIiwicmVqZWN0RGF0YSIsImVycm9yVGV4dCIsIkNPREVTX09GX0VSUk9SUyIsImNhc3NldHRlcyIsInJlcXVlc3RlZEJpbGxDSEsiLCJudW0iLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJqb2luIiwicmVxdWVzdGVkQmlsbEVYSVQiLCJyZWplY3RlZEJpbGwiLCJjYXNzZXR0ZVN0YXR1cyIsIlNUQVRVU19PRl9DQVNTRVRURSIsInB1c2giLCJjYXNzZXR0ZU51bWJlciIsImdldENhc3NldHRlTnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBV0E7Ozs7Ozs7O0FBRUEsSUFBTUEsR0FBRyxHQUFHLElBQUlDLGNBQUosQ0FBVyxlQUFYLENBQVo7O0FBRU8sU0FBU0MsWUFBVCxDQUFzQkMsT0FBdEIsRUFBc0Q7QUFDM0QsTUFBSUMsR0FBRyxHQUFHLENBQVY7O0FBRDJELDZDQUUzQ0QsT0FGMkM7QUFBQTs7QUFBQTtBQUUzRCx3REFBeUI7QUFBQSxVQUFkRSxDQUFjOztBQUN2QixVQUFJQSxDQUFDLEdBQUcsQ0FBSixJQUFTQSxDQUFDLEdBQUcsR0FBakIsRUFBc0I7QUFDcEIsY0FBTSxJQUFJQyxVQUFKLENBQWUseURBQXlERCxDQUF4RSxDQUFOO0FBQ0Q7O0FBQ0RELE1BQUFBLEdBQUcsSUFBSUMsQ0FBUDtBQUNEO0FBUDBEO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBUTNELFNBQU9ELEdBQVA7QUFDRDs7QUFFTSxTQUFTRyxRQUFULENBQWtCSixPQUFsQixFQUFtRDtBQUN4RCxNQUFNSyxJQUFJLG9DQUFPTCxPQUFQLENBQVY7QUFDQSxNQUFNQyxHQUFHLEdBQUdJLElBQUksQ0FBQ0MsR0FBTCxFQUFaO0FBQ0EsTUFBTUMsYUFBYSxHQUFHUixZQUFZLENBQUNNLElBQUQsQ0FBbEM7QUFDQSxTQUFPSixHQUFHLEtBQUtNLGFBQWY7QUFDRDs7QUFFTSxTQUFTQyxnQkFBVCxDQUEwQkMsUUFBMUIsRUFBb0U7QUFDekUsTUFB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QUcxRCxDQUEvQixDQUEvQjtBQUNBdUMsSUFBQUEsTUFBTSxDQUFDeUIsU0FBUCxDQUFpQlUsSUFBakIsQ0FBc0I7QUFDcEJDLE1BQUFBLGNBQWMsRUFBRXJCLGlCQUFpQixHQUFHLENBQXBCLEdBQXdCdEQsQ0FBeEIsR0FBNEI0RSxpQkFBaUIsQ0FBQ3ZCLEdBQUQsQ0FEekM7QUFFcEJZLE1BQUFBLGdCQUFnQixFQUFoQkEsZ0JBRm9CO0FBR3BCSyxNQUFBQSxpQkFBaUIsRUFBakJBLGlCQUhvQjtBQUlwQkMsTUFBQUEsWUFBWSxFQUFaQSxZQUpvQjtBQUtwQkMsTUFBQUEsY0FBYyxFQUFkQTtBQUxvQixLQUF0QjtBQU9EOztBQUVELFNBQU9qQyxNQUFQO0FBQ0Q7O0FBRUQsU0FBU3FDLGlCQUFULENBQTJCdkIsR0FBM0IsRUFBd0M7QUFDdEMsTUFBSS9CLHlCQUFjQyxjQUFkLEtBQWlDOEIsR0FBckMsRUFBMEM7QUFDeEMsV0FBTyxDQUFQO0FBQ0Q7O0FBQ0QsTUFBSS9CLHlCQUFjaUMsY0FBZCxLQUFpQ0YsR0FBckMsRUFBMEM7QUFDeEMsV0FBTyxDQUFQO0FBQ0Q7O0FBQ0QsU0FBTyxDQUFDLENBQVI7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENPREVTX09GX0VSUk9SUyxcbiAgQ09NTUFORF9DT0RFUyxcbiAgRVJST1JfQ09ERVMsXG4gIFNFTlNPUl9TVEFUVVMsXG4gIFNUQU5EQVJUX0JZVEVTLFxuICBTVEFUVVNfT0ZfQ0FTU0VUVEVcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBJTENETVBvcnRBbnN3ZXIsIElMQ0RNU3RhdHVzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IElEaXNwZW5zZUFuc3dlciB9IGZyb20gXCIuLi8uLi9tb2RlbC9JRGlzcGVuc2VyXCI7XG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuLi8uLi8uLi9oZWxwZXJzL2xvZ2dlclwiO1xuXG5jb25zdCBsb2cgPSBuZXcgTG9nZ2VyKFwiW0xDRE0taGVscGVyXVwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUNSQyhtZXNzYWdlOiBBcnJheTxudW1iZXI+KTogbnVtYmVyIHtcbiAgbGV0IGNyYyA9IDA7XG4gIGZvciAoY29uc3QgaSBvZiBtZXNzYWdlKSB7XG4gICAgaWYgKGkgPCAwIHx8IGkgPiAyNTUpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiVmFsdWVzIG9mIG1lc3NhZ2UgbmVlZCB0byBiZSBiZXR3ZWVuIDAgYW5kIDI1NSwgZ2V0IFwiICsgaSk7XG4gICAgfVxuICAgIGNyYyBePSBpO1xuICB9XG4gIHJldHVybiBjcmM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0NSQyhtZXNzYWdlOiBBcnJheTxudW1iZXI+KTogYm9vbGVhbiB7XG4gIGNvbnN0IHRlbXAgPSBbLi4ubWVzc2FnZV07XG4gIGNvbnN0IGNyYyA9IHRlbXAucG9wKCk7XG4gIGNvbnN0IGNhbGN1bGF0ZWRDUkMgPSBjYWxjdWxhdGVDUkModGVtcCk7XG4gIHJldHVybiBjcmMgPT09IGNhbGN1bGF0ZWRDUkM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVMRENNQW5zd2VyKHJlc3BvbnNlOiBBcnJheTxudW1iZXI+KTogSUxDRE1Qb3J0QW5zd2VyIHtcbiAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5sZW5ndGggPT09IDApIHtcbiAgICBsb2cuZGVidWcoXCJJbnZhbGlkIExDRE0gcmVzcG9uc2VcIiwgcmVzcG9uc2UpO1xuICAgIHJldHVybiB7XG4gICAgICBhY2s6IGZhbHNlLFxuICAgICAgZXJyb3I6IHRydWUsXG4gICAgICBjcmM6IGZhbHNlLFxuICAgICAgZGF0YTogW11cbiAgICB9O1xuICB9XG5cbiAgaWYgKHJlc3BvbnNlWzBdID09PSAweDA0KSB7XG4gICAgbG9nLmRlYnVnKFwiRXJyb3IgZm9ydmFyZGluIDB4MDRcIik7XG4gIH1cblxuICByZXNwb25zZSA9IHJlc3BvbnNlLmZpbHRlcigoaXQpID0+IGl0ICE9PSAweGZmKTtcbiAgY29uc3Qgc29oID0gcmVzcG9uc2UuaW5kZXhPZihTVEFOREFSVF9CWVRFUy5TT0gpO1xuICBjb25zdCBleHQgPSByZXNwb25zZS5pbmRleE9mKFNUQU5EQVJUX0JZVEVTLkVYVCwgc29oKTtcblxuICBjb25zdCBkYXRhID0gc29oID09PSAtMSB8fCBleHQgPT09IC0xID8gW10gOiByZXNwb25zZS5zbGljZShzb2gsIGV4dCArIDIpO1xuICBjb25zdCByZXNwb25zZUFjayA9IHJlc3BvbnNlLmluZGV4T2YoU1RBTkRBUlRfQllURVMuQUNLKTtcblxuICBpZiAoZGF0YS5sZW5ndGggPCA0KSB7XG4gICAgaWYgKHJlc3BvbnNlQWNrICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWNrOiB0cnVlLFxuICAgICAgICBjcmM6IGZhbHNlLFxuICAgICAgICBlcnJvcjogZmFsc2UsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH07XG4gICAgfVxuICAgIGxvZy5kZWJ1Z0Vycm9yKFwiRXJyb3Igb24gaGFuZGxlIGFuc3dlci4gRGF0YSBpczpcIiwgcmVzcG9uc2UpO1xuICAgIHJldHVybiB7XG4gICAgICBhY2s6IGZhbHNlLFxuICAgICAgZXJyb3I6IHRydWUsXG4gICAgICBjcmM6IGZhbHNlLFxuICAgICAgZGF0YTogW11cbiAgICB9O1xuICB9XG5cbiAgY29uc3QgY3JjID0gY2FsY3VsYXRlQ1JDKGRhdGEuc2xpY2UoMCwgLTEpKTtcbiAgY29uc3QgZXJyb3IgPSBkYXRhWzNdID09PSBDT01NQU5EX0NPREVTLlVQUEVSX0RJU1BFTlNFID8gZGF0YVs4XSA6IGRhdGFbNF07XG4gIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgYWNrOiByZXNwb25zZVswXSA9PT0gU1RBTkRBUlRfQllURVMuQUNLLFxuICAgIGNyYzogY3JjID09PSBkYXRhW2RhdGEubGVuZ3RoIC0gMV0sXG4gICAgZXJyb3I6IGZhbHNlLFxuICAgIGVycm9yQ29kZTogZXJyb3IsXG4gICAgZGF0YTogZGF0YVxuICB9O1xuICByZXR1cm4gcGF5bG9hZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3RhdHVzKHJlc3BvbnNlOiBBcnJheTxudW1iZXI+LCB0eXBlOiBzdHJpbmcpOiBJTENETVN0YXR1cyB7XG4gIGNvbnN0IGVycm9yQ29kZSA9IHJlc3BvbnNlWzVdO1xuICBjb25zdCBbc2Vuc29yMFN0YXR1c0h1bWFuUmVhZGFibGUsIHNlbnNvcjBTdGF0dXNdID0gY2hlY2tTZW5zb3IwKHJlc3BvbnNlWzZdKTtcbiAgY29uc3QgW3NlbnNvcjFTdGF0dXNIdW1hblJlYWRhYmxlLCBzZW5zb3IxU3RhdHVzXSA9IGNoZWNrU2Vuc29yMShyZXNwb25zZVs3XSwgdHlwZSk7XG4gIGNvbnN0IGVycm9yU3RhdHVzID0gRVJST1JfQ09ERVMuZ2V0KGVycm9yQ29kZSkgfHwgXCJcIjtcbiAgY29uc3Qgb2sgPSBlcnJvclN0YXR1cyA9PT0gXCJHb29kXCIgfHwgZXJyb3JTdGF0dXMgPT09IFwiTm9ybWFsIFN0b3BcIjtcbiAgcmV0dXJuIHtcbiAgICBvayxcbiAgICBlcnJvclN0YXR1cyxcbiAgICBlcnJvckNvZGUsXG4gICAgc2Vuc29yMFN0YXR1cyxcbiAgICBzZW5zb3IxU3RhdHVzLFxuICAgIHNlbnNvcjBTdGF0dXNIdW1hblJlYWRhYmxlLFxuICAgIHNlbnNvcjFTdGF0dXNIdW1hblJlYWRhYmxlXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1NlbnNvcjAoY29kZTogbnVtYmVyKTogW3N0cmluZywgeyBbczogc3RyaW5nXTogYm9vbGVhbiB9XSB7XG4gIGxldCByZXN1bHQ6IHsgW3M6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuICBsZXQgcmVzdWx0SHVtYW5SZWFkYWJsZSA9IFwiU2Vuc29yIDAgU3RhdHVzOlxcblwiO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhTRU5TT1JfU1RBVFVTLlNFTlNPUl8wKSkge1xuICAgIHJlc3VsdFtrZXldID0gQm9vbGVhbih2YWx1ZSAmIGNvZGUpO1xuICAgIHJlc3VsdEh1bWFuUmVhZGFibGUgKz0gYCR7a2V5LnJlcGxhY2VBbGwoXCJfXCIsIFwiIFwiKX06ICR7cmVzdWx0W2tleV0gPyBcIk9GRlwiIDogXCJPTlwifVxcbmA7XG4gIH1cbiAgcmV0dXJuIFtyZXN1bHRIdW1hblJlYWRhYmxlLCByZXN1bHRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tTZW5zb3IxKGNvZGU6IG51bWJlciwgdHlwZTogc3RyaW5nKTogW3N0cmluZywgeyBbczogc3RyaW5nXTogYm9vbGVhbiB9XSB7XG4gIGxldCByZXN1bHQ6IHsgW3M6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuICBsZXQgcmVzdWx0SHVtYW5SZWFkYWJsZSA9IFwiU2Vuc29yIDEgU3RhdHVzOlxcblwiO1xuICBsZXQgYmFzZTogeyBbczogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcbiAgaWYgKHR5cGUgPT09IFwiTENETS0xMDAwXCIpIHtcbiAgICBiYXNlID0gU0VOU09SX1NUQVRVUy5TRU5TT1JfMV9MQ0RNXzEwMDA7XG4gIH0gZWxzZSB7XG4gICAgYmFzZSA9IFNFTlNPUl9TVEFUVVMuU0VOU09SXzFfTENETV8yMDAwO1xuICB9XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoYmFzZSkpIHtcbiAgICByZXN1bHRba2V5XSA9IEJvb2xlYW4odmFsdWUgJiBjb2RlKTtcbiAgICBpZiAoa2V5ID09PSBcIlJFSkVDVF9UUkFZX1NfV1wiKSB7XG4gICAgICByZXN1bHRIdW1hblJlYWRhYmxlICs9IGBSZWplY3QgdHJheSBTL1c6ICR7cmVzdWx0W2tleV0gPyBcIk5vIFJlamVjdCB0cmF5XCIgOiBcIlJlamVjdCB0cmF5IGlzIG9uXCJ9XFxuYDtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXN1bHRIdW1hblJlYWRhYmxlICs9IGAke2tleS5yZXBsYWNlQWxsKFwiX1wiLCBcIiBcIil9OiAke3Jlc3VsdFtrZXldID8gXCJPRkZcIiA6IFwiT05cIn1cXG5gO1xuICB9XG4gIHJldHVybiBbcmVzdWx0SHVtYW5SZWFkYWJsZSwgcmVzdWx0XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGlzcGVuc2UocmVzcG9uc2U6IEFycmF5PG51bWJlcj4pOiBJRGlzcGVuc2VBbnN3ZXIge1xuICBjb25zdCBzdGFydEluZGV4ID0gcmVzcG9uc2UuaW5kZXhPZihTVEFOREFSVF9CWVRFUy5TVFgpO1xuICBjb25zdCBiYWNrSW5kZXggPSByZXNwb25zZS5pbmRleE9mKFNUQU5EQVJUX0JZVEVTLkVYVCk7XG4gIGNvbnN0IGNtZCA9IHJlc3BvbnNlW3N0YXJ0SW5kZXggKyAxXTtcbiAgbGV0IG51bWJlck9mRGlzcGVuc2VzOiBudW1iZXIgPSAwO1xuXG4gIGlmIChjbWQgPT09IENPTU1BTkRfQ09ERVMuTE9XRVJfRElTUEVOU0UgfHwgY21kID09PSBDT01NQU5EX0NPREVTLlVQUEVSX0RJU1BFTlNFKSB7XG4gICAgbnVtYmVyT2ZEaXNwZW5zZXMgPSAxO1xuICB9IGVsc2UgaWYgKGNtZCA9PT0gQ09NTUFORF9DT0RFUy5VUFBFUl9BTkRfTE9XRVJfRElTUEVOU0UpIHtcbiAgICBudW1iZXJPZkRpc3BlbnNlcyA9IDI7XG4gIH1cblxuICBjb25zdCBzdGFydE9mRGF0YSA9IHJlc3BvbnNlLmluZGV4T2YoY21kKSArIDE7XG4gIGNvbnN0IGVuZE9mRGF0YSA9IHN0YXJ0T2ZEYXRhICsgbnVtYmVyT2ZEaXNwZW5zZXMgKiA0O1xuICBjb25zdCBkaXNwZW5zZURhdGEgPSByZXNwb25zZS5zbGljZShzdGFydE9mRGF0YSwgZW5kT2ZEYXRhKTtcbiAgY29uc3Qgc3RhcnRPZlJlamVjdERhdGEgPSBlbmRPZkRhdGEgKyBudW1iZXJPZkRpc3BlbnNlcyArIDE7XG4gIGNvbnN0IHJlamVjdERhdGEgPSByZXNwb25zZS5zbGljZShzdGFydE9mUmVqZWN0RGF0YSwgYmFja0luZGV4KTtcblxuICBjb25zdCBlcnJvckNvZGUgPSByZXNwb25zZVtlbmRPZkRhdGFdO1xuICBjb25zdCBlcnJvclRleHQgPSBFUlJPUl9DT0RFUy5nZXQoZXJyb3JDb2RlKSB8fCBcIlwiO1xuXG4gIGNvbnN0IHJlc3VsdDogSURpc3BlbnNlQW5zd2VyID0ge1xuICAgIG9rOiAoQ09ERVNfT0ZfRVJST1JTW1wiR29vZFwiXSA9PT0gZXJyb3JDb2RlKSB8fCAoQ09ERVNfT0ZfRVJST1JTW1wiTm9ybWFsIFN0b3BcIl0gPT09IGVycm9yQ29kZSksXG4gICAgZXJyb3JDb2RlLFxuICAgIGVycm9yVGV4dCxcbiAgICBjcmM6IGNoZWNrQ1JDKHJlc3BvbnNlKSxcbiAgICBjYXNzZXR0ZXM6IFtdXG4gIH07XG5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbnVtYmVyT2ZEaXNwZW5zZXM7IGkrKykge1xuICAgIGNvbnN0IHJlcXVlc3RlZEJpbGxDSEs6IG51bWJlciA9IHBhcnNlSW50KFxuICAgICAgZGlzcGVuc2VEYXRhXG4gICAgICAgIC5zcGxpY2UoMCwgMilcbiAgICAgICAgLm1hcCgobnVtKSA9PiBTdHJpbmcuZnJvbUNoYXJDb2RlKG51bSkpXG4gICAgICAgIC5qb2luKFwiXCIpXG4gICAgKTtcbiAgICBjb25zdCByZXF1ZXN0ZWRCaWxsRVhJVDogbnVtYmVyID0gcGFyc2VJbnQoXG4gICAgICBkaXNwZW5zZURhdGFcbiAgICAgICAgLnNwbGljZSgwLCAyKVxuICAgICAgICAubWFwKChudW0pID0+IFN0cmluZy5mcm9tQ2hhckNvZGUobnVtKSlcbiAgICAgICAgLmpvaW4oXCJcIilcbiAgICApO1xuICAgIGNvbnN0IHJlamVjdGVkQmlsbDogbnVtYmVyID0gcGFyc2VJbnQoXG4gICAgICByZWplY3REYXRhXG4gICAgICAgIC5zcGxpY2UoMCwgMilcbiAgICAgICAgLm1hcCgobnVtKSA9PiBTdHJpbmcuZnJvbUNoYXJDb2RlKG51bSkpXG4gICAgICAgIC5qb2luKFwiXCIpXG4gICAgKTtcbiAgICBjb25zdCBjYXNzZXR0ZVN0YXR1czogc3RyaW5nID0gU1RBVFVTX09GX0NBU1NFVFRFW2VuZE9mRGF0YSArIGldO1xuICAgIHJlc3VsdC5jYXNzZXR0ZXMucHVzaCh7XG4gICAgICBjYXNzZXR0ZU51bWJlcjogbnVtYmVyT2ZEaXNwZW5zZXMgPiAxID8gaSA6IGdldENhc3NldHRlTnVtYmVyKGNtZCksXG4gICAgICByZXF1ZXN0ZWRCaWxsQ0hLLFxuICAgICAgcmVxdWVzdGVkQmlsbEVYSVQsXG4gICAgICByZWplY3RlZEJpbGwsXG4gICAgICBjYXNzZXR0ZVN0YXR1c1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2Fzc2V0dGVOdW1iZXIoY21kOiBudW1iZXIpIHtcbiAgaWYgKENPTU1BTkRfQ09ERVMuVVBQRVJfRElTUEVOU0UgPT09IGNtZCkge1xuICAgIHJldHVybiAxO1xuICB9XG4gIGlmIChDT01NQU5EX0NPREVTLkxPV0VSX0RJU1BFTlNFID09PSBjbWQpIHtcbiAgICByZXR1cm4gMjtcbiAgfVxuICByZXR1cm4gLTE7XG59XG4iXX0=