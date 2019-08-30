import axios from 'axios';


import createRequestAPI from './createRequestAPI';

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();
console.log('source', source);


export const testGet = createRequestAPI('get', 'http://wwe.com/jiekec/index.php?route=catalog/banner/bannerlist');
export const testGet1 = createRequestAPI('get', './testGet.json', { cancelToken: source.token });
export const testPost = createRequestAPI('post', 'jiekec/index.php?route=catalog/banner/bannerlist');
export const testPut = createRequestAPI('put', 'jiekec/index.php?route=catalog/{{id}}/bannerlist');
