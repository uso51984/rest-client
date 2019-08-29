import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";

var Loading = function () {
  function Loading() {
    _classCallCheck(this, Loading);

    var noop = function noop() {};

    this.counter = 0;
    this.offLoading = false;
    this.showLoading = noop;
    this.hideLoading = noop;
  }

  _createClass(Loading, [{
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

export default new Loading();