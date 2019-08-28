import ErrorType from './consts/ErrorType';

class ErrorObj {
  constructor(type = ErrorType.APP, title = '', data = {}) {
    this.type = type;
    this.title = title;
    this.data = data;
  }

  static isException(error) {
    return error instanceof Error;
  }

  static isErrorObj(error) {
    return error instanceof ErrorObj;
  }
}

export default ErrorObj;
