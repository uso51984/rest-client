'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports['default'] = processHeaders;

var _ContentTypeEnum = require('./consts/ContentTypeEnum');

var _ContentTypeEnum2 = _interopRequireDefault(_ContentTypeEnum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function processHeaders(method) {
  var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var contentType = {
    'Content-Type': method === 'post' || method === 'put' ? _ContentTypeEnum2['default'].JSON : _ContentTypeEnum2['default'].URL_ENCODED
  };

  var requestedWidth = {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*'
  };

  var finalHeaders = (0, _extends3['default'])({}, contentType, requestedWidth, headers);

  Object.keys(finalHeaders).forEach(function (key) {
    if (typeof finalHeaders[key] === 'object') {
      finalHeaders[key] = JSON.stringify(finalHeaders[key]);
    }
  });

  return finalHeaders;
}
module.exports = exports['default'];