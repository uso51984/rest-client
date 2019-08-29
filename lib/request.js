'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports['default'] = request;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _loading = require('./loading');

var _loading2 = _interopRequireDefault(_loading);

var _ContentTypeEnum = require('./consts/ContentTypeEnum');

var _ContentTypeEnum2 = _interopRequireDefault(_ContentTypeEnum);

var _processHeaders = require('./processHeaders');

var _processHeaders2 = _interopRequireDefault(_processHeaders);

var _requestReponse = require('./requestReponse');

var _requestReponse2 = _interopRequireDefault(_requestReponse);

var _error = require('./error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function request(path, method, data) {
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _config$headers = config.headers,
      headers = _config$headers === undefined ? {} : _config$headers;

  delete config.headers;

  var params = {};
  if (data) {
    if (data.body) {
      headers = data.headers || {};
      params = data.body;
    } else {
      params = data;
    }
  }

  var axiosConfig = (0, _extends3['default'])({
    method: method,
    url: path,
    data: params,
    headers: (0, _processHeaders2['default'])(method, headers)
  }, config);

  if (axiosConfig.headers['Content-Type'] !== _ContentTypeEnum2['default'].JSON) {
    params.ui_random = new Date().getTime();
    axiosConfig.params = params;
    delete axiosConfig.data;
  }

  _loading2['default'].show();
  return (0, _axios2['default'])(axiosConfig).then(function (response) {
    _loading2['default'].hide();
    var resData = _requestReponse2['default'].parseResponseData(response.data);
    if (_requestReponse2['default'].isSuccess(resData.code)) {
      _requestReponse2['default'].success();
      return resData;
    }
    return Promise.reject(response);
  })['catch'](function (result) {
    _loading2['default'].hide();
    var response = new _requestReponse2['default'](result.response || result);
    var status = response.status;


    if (response.isHttpError) {
      var _errorObj = new _error.ErrorObj(_error.ErrorType.HTTP, 'HTTP Error', {
        code: status,
        url: path,
        response: response
      });
      _requestReponse2['default'].httpError(_errorObj);
      return Promise.reject(_errorObj);
    }

    if (response.isSystemError) {
      var _errorObj2 = new _error.ErrorObj(_error.ErrorType.SERVICE, 'Service Error', {
        code: response.code,
        url: path,
        response: response
      });
      _requestReponse2['default'].systemError(_errorObj2);
      return Promise.reject(_errorObj2);
    }

    var errorObj = new _error.ErrorObj(_error.ErrorType.APP, 'Business Error', {
      code: response.code,
      url: path,
      response: response
    });

    _requestReponse2['default'].businessError(errorObj);
    return Promise.reject(errorObj);
  });
}
module.exports = exports['default'];