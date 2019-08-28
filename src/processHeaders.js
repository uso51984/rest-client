import ContentType from './consts/ContentTypeEnum';

export default function processHeaders(method, headers = {}) {
  const contentType = {
    'Content-Type': ((method === 'post' || method === 'put') ? ContentType.JSON : ContentType.URL_ENCODED),
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
