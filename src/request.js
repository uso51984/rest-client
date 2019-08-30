import axios from 'axios';
import loading from './loading';
import ContentType from './consts/ContentTypeEnum';
import processHeaders from './processHeaders';
import RequestReponse from './requestReponse';
import { ErrorObj, ErrorType } from './error';

export default function request(path, method, data, config = {}) {
  let { headers = {} } = config;
  delete config.headers;

  let params = {};
  if (data) {
    if (data.body) {
      headers = data.headers || {};
      params = data.body;
    } else {
      params = data;
    }
  }

  const axiosConfig = {
    method,
    url: path,
    data: params,
    headers: processHeaders(method, headers),
    ...config,
  };

  if (axiosConfig.headers['Content-Type'] !== ContentType.JSON) {
    params.ui_random = new Date().getTime();
    axiosConfig.params = params;
    delete axiosConfig.data;
  }

  loading.show();
  return axios(axiosConfig)
    .then((response) => {
      loading.hide();
      const resData = RequestReponse.parseResponseData(response.data);
      if (RequestReponse.isSuccess(resData.code)) {
        RequestReponse.success();
        return resData;
      }

      return Promise.reject(response);
    })
    .catch((result) => {
      loading.hide();
      if (axios.isCancel(result)) {
        const error = { result, title: 'Cancel Request' };
        return Promise.reject(error);
      }

      const response = new RequestReponse(result.response || result);
      const { status } = response;

      if (response.isHttpError) {
        const errorObj = new ErrorObj(ErrorType.HTTP, 'HTTP Error', {
          message: response.message || '',
          code: status,
          url: path,
          response
        });
        RequestReponse.httpError(errorObj);
        return Promise.reject(errorObj);
      }

      if (response.isSystemError) {
        const errorObj = new ErrorObj(ErrorType.SERVICE, 'Service Error', {
          message: response.message || '',
          code: response.code,
          url: path,
          response
        });
        RequestReponse.systemError(errorObj);
        return Promise.reject(errorObj);
      }

      const errorObj = new ErrorObj(ErrorType.APP, 'Business Error', {
        message: response.message || '',
        code: response.code,
        url: path,
        response
      });

      RequestReponse.businessError(errorObj);
      return Promise.reject(errorObj);
    });
}
