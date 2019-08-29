'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var isObject = function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
};
var isString = function isString(value) {
  return Object.prototype.toString.call(value) === '[object String]';
};
var isFunction = function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]';
};
var isArray = function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
};

var exp = /\{\{([\s\S]+?)\}\}/g;
var hasTemplate = function hasTemplate(s) {
  return s.match(exp);
};
var findTemplate = function findTemplate(s) {
  var m = exp.exec(s);
  return m ? m[1] : '';
};

var doTemplate = function doTemplate(url, param) {
  if (isString(url) && isObject(param)) {
    var key = findTemplate(url);
    while (key) {
      var value = param[key] || '';
      if (isArray(value)) {
        value = value.join(',');
      }
      url = url.replace('{{' + key + '}}', value);
      key = findTemplate(url);
    }
  }

  return url;
};

var createAPI = function createAPI(method, url, fetchConfig) {
  return function (params, content) {
    var templateHandler = void 0;

    if (hasTemplate(url)) {
      templateHandler = doTemplate;
    }

    var restUrl = url;
    if (isFunction(templateHandler)) {
      restUrl = templateHandler(url, params);
    } else {
      content = params;
    }

    return (0, _request2['default'])(restUrl, method, content, fetchConfig);
  };
};

exports['default'] = createAPI;
module.exports = exports['default'];