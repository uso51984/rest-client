import _extends from 'babel-runtime/helpers/extends';
import axios from 'axios';
import loading from './loading';
import ContentType from './consts/ContentTypeEnum';
import processHeaders from './processHeaders';
import RequestReponse from './requestReponse';
import { ErrorObj, ErrorType } from './error';

export default function request(path, method, data) {
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

  var axiosConfig = _extends({
    method: method,
    url: path,
    data: params,
    headers: processHeaders(method, headers)
  }, config);

  if (axiosConfig.headers['Content-Type'] !== ContentType.JSON) {
    params.ui_random = new Date().getTime();
    axiosConfig.params = params;
    delete axiosConfig.data;
  }

  loading.show();
  return axios(axiosConfig).then(function (response) {
    loading.hide();
    var resData = RequestReponse.parseResponseData(response.data);
    if (RequestReponse.isSuccess(resData.code)) {
      RequestReponse.success();
      return resData;
    }
    return Promise.reject(response);
  })['catch'](function (result) {
    loading.hide();
    var response = new RequestReponse(result.response || result);
    var status = response.status;


    if (response.isHttpError) {
      var _errorObj = new ErrorObj(ErrorType.HTTP, 'HTTP Error', {
        code: status,
        url: path,
        response: response
      });
      RequestReponse.httpError(_errorObj);
      return Promise.reject(_errorObj);
    }

    if (response.isSystemError) {
      var _errorObj2 = new ErrorObj(ErrorType.SERVICE, 'Service Error', {
        code: response.code,
        url: path,
        response: response
      });
      RequestReponse.systemError(_errorObj2);
      return Promise.reject(_errorObj2);
    }

    var errorObj = new ErrorObj(ErrorType.APP, 'Business Error', {
      code: response.code,
      url: path,
      response: response
    });

    RequestReponse.businessError(errorObj);
    return Promise.reject(errorObj);
  });
}