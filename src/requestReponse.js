import * as responseCodes from './consts/responseCodes';

export default class RequestReponse {
  static isHttpError(status) {
    return status < 200 || status >= 300 || !status;
  }

  static isSuccess(code) {
    return code === responseCodes.SUCCESS;
  }

  static isSystemError(code) {
    return code === responseCodes.UNKNOWN_ERROR;
  }

  static isValidationError(code) {
    return code === 9008;
  }

  static success() {}
  static httpError() {}
  static systemError() {}
  static businessError() {}

  static parseResponseData(data) {
    return data;
  }

  constructor(jsonResponse) {
    this.isHttpError = RequestReponse.isHttpError(jsonResponse.status);
    if (this.isHttpError) {
      const { config, status, statusText, message } = jsonResponse;
      this.message = message;
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
}
