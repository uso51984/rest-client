import _extends from 'babel-runtime/helpers/extends';
import ContentType from './consts/ContentTypeEnum';

export default function processHeaders(method) {
  var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var contentType = {
    'Content-Type': method === 'post' || method === 'put' ? ContentType.JSON : ContentType.URL_ENCODED
  };

  var requestedWidth = {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*'
  };

  var finalHeaders = _extends({}, contentType, requestedWidth, headers);

  Object.keys(finalHeaders).forEach(function (key) {
    if (typeof finalHeaders[key] === 'object') {
      finalHeaders[key] = JSON.stringify(finalHeaders[key]);
    }
  });

  return finalHeaders;
}