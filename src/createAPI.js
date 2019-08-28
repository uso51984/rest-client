
import request from './request';

const isObject = value => Object.prototype.toString.call(value) === '[object Object]';
const isString = value => Object.prototype.toString.call(value) === '[object String]';
const isFunction = value => Object.prototype.toString.call(value) === '[object Function]';
const isArray = value => Object.prototype.toString.call(value) === '[object Array]';

const exp = /\{\{([\s\S]+?)\}\}/g;
const hasTemplate = s => s.match(exp);
const findTemplate = (s) => {
  const m = exp.exec(s);
  return m ? m[1] : '';
};

const doTemplate = (url, param) => {
  if (isString(url) && isObject(param)) {
    let key = findTemplate(url);
    while (key) {
      let value = param[key] || '';
      if (isArray(value)) {
        value = value.join(',');
      }
      url = url.replace(`{{${key}}}`, value);
      key = findTemplate(url);
    }
  }

  return url;
};

const createAPI = (method, url, fetchConfig) => (params, content) => {
  let templateHandler;

  if (hasTemplate(url)) {
    templateHandler = doTemplate;
  }

  let restUrl = url;
  if (isFunction(templateHandler)) {
    restUrl = templateHandler(url, params);
  } else {
    content = params;
  }

  return request(restUrl, method, content, fetchConfig);
};


export default createAPI;
