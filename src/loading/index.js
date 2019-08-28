
class Loading {
  constructor() {
    const noop = () => { };

    this.counter = 0;
    this.offLoading = false;
    this.showLoading = noop;
    this.hideLoading = noop;
  }

  isLoading() {
    return this.counter > 0;
  }

  reset() {
    this.counter = 0;
  }

  show() {
    if (this.offLoading) {
      return;
    }

    if (this.counter === 0) {
      this.showLoading();
    }

    this.counter = this.counter + 1;
  }

  hide() {
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
}

export default new Loading();
