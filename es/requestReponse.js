import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import * as responseCodes from './consts/responseCodes';

var RequestReponse = function () {
  _createClass(RequestReponse, null, [{
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
    _classCallCheck(this, RequestReponse);

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

export default RequestReponse;