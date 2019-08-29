"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Loading = function () {
  function Loading() {
    (0, _classCallCheck3["default"])(this, Loading);

    var noop = function noop() {};

    this.counter = 0;
    this.offLoading = false;
    this.showLoading = noop;
    this.hideLoading = noop;
  }

  (0, _createClass3["default"])(Loading, [{
    key: "isLoading",
    value: function isLoading() {
      return this.counter > 0;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.counter = 0;
    }
  }, {
    key: "show",
    value: function show() {
      if (this.offLoading) {
        return;
      }

      if (this.counter === 0) {
        this.showLoading();
      }

      this.counter = this.counter + 1;
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this.offLoading) {
        return;
      }

      if (this.counter > 0) {
        this.counter = this.counter - 1;

        if (this.counter === 0) {
          this.hideLoading();
        }
      }
    }
  }]);
  return Loading;
}();

exports["default"] = new Loading();
module.exports = exports['default'];