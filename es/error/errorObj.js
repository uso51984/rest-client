import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import ErrorType from './consts/ErrorType';

var ErrorObj = function () {
  function ErrorObj() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ErrorType.APP;
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, ErrorObj);

    this.type = type;
    this.title = title;
    this.data = data;
  }

  _createClass(ErrorObj, null, [{
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

export default ErrorObj;