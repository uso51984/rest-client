'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _responseCodes = require('./consts/responseCodes');

var responseCodes = _interopRequireWildcard(_responseCodes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RequestReponse = function () {
  (0, _createClass3['default'])(RequestReponse, null, [{
    key: 'isHttpError',
    value: function isHttpError(status) {
      return status < 200 || status >= 300;
    }
  }, {
    key: 'isSuccess',
    value: function isSuccess(code) {
      return code === responseCodes.SUCCESS;
    }
  }, {
    key: 'isSystemError',
    value: function isSystemError(code) {
      return code === responseCodes.UNKNOWN_ERROR;
    }
  }, {
    key: 'isValidationError',
    value: function isValidationError(code) {
      return code === 9008;
    }
  }, {
    key: 'success',
    value: function success() {}
  }, {
    key: 'httpError',
    value: function httpError() {}
  }, {
    key: 'systemError',
    value: function systemError() {}
  }, {
    key: 'businessError',
    value: function businessError() {}
  }, {
    key: 'parseResponseData',
    value: function parseResponseData(data) {
      return data;
    }
  }]);

  function RequestReponse(jsonResponse) {
    (0, _classCallCheck3['default'])(this, RequestReponse);

    this.isHttpError = RequestReponse.isHttpError(jsonResponse.status);
    if (this.isHttpError) {
      var config = jsonResponse.config,
          status = jsonResponse.status,
          statusText = jsonResponse.statusText;

      this.config = config;
      this.status = status;
      this.statusText = statusText;
      return false;
    }

    this.data = RequestReponse.parseResponseData(jsonResponse.data);
    this.code = this.data.code;
    this.success = RequestReponse.isSuccess(this.code);
    this.isSystemError = RequestReponse.isSystemError(this.code);
    this.isBusinessError = !this.success && !this.isSystemError;
    this.isValidationError = RequestReponse.isValidationError(this.code);
  }

  return RequestReponse;
}();

exports['default'] = RequestReponse;
module.exports = exports['default'];