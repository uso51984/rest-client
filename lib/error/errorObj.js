'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ErrorType = require('./consts/ErrorType');

var _ErrorType2 = _interopRequireDefault(_ErrorType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ErrorObj = function () {
  function ErrorObj() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ErrorType2['default'].APP;
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck3['default'])(this, ErrorObj);

    this.type = type;
    this.title = title;
    this.data = data;
  }

  (0, _createClass3['default'])(ErrorObj, null, [{
    key: 'isException',
    value: function isException(error) {
      return error instanceof Error;
    }
  }, {
    key: 'isErrorObj',
    value: function isErrorObj(error) {
      return error instanceof ErrorObj;
    }
  }]);
  return ErrorObj;
}();

exports['default'] = ErrorObj;
module.exports = exports['default'];