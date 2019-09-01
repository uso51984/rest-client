import ContentType from './consts/ContentType';
import httpMethod from './consts/httpMethod';

export default function processHeaders(method, headers = {}) {
  const contentType = {
    'Content-Type': ((method === httpMethod.POST || method === httpMethod.PUT) ? ContentType.JSON : ContentType.URL_ENCODED),
  };

  const requestedWidth = {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
  };

  const finalHeaders = { ...contentType, ...requestedWidth, ...headers };

  Object.keys(finalHeaders).forEach((key) => {
    if (typeof finalHeaders[key] === 'object') {
      finalHeaders[key] = JSON.stringify(finalHeaders[key]);
    }
  });

  return finalHeaders;
}
