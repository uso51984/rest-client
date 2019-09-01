import axios from 'axios';
import { httpMethod } from '../src';
import createRequestAPI from './createRequestAPI';

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();

export const userGet = createRequestAPI(httpMethod.GET, '/user');
export const userPut = createRequestAPI(httpMethod.PUT, '/user');
export const userPost = createRequestAPI(httpMethod.POST, '/user');
export const userDelete = createRequestAPI(httpMethod.DELETE, '/user');

// export const testGet = createRequestAPI('get', 'ekec/index.php?route=catalog/banner/bannerlist');
// export const testGet1 = createRequestAPI('get', 'https://www.fastmock.site/mock/a4676b8718662138dc75efb3b3a401e6/restclinet/api/username', { cancelToken: source.token });
// export const testGet2 = createRequestAPI('get', 'https://www.fastmock.site/mock/a4676b8718662138dc75efb3b3a401e6/restclinet/api/username', { timeout: 10, });
// export const testPost = createRequestAPI('post', 'https://restclinet/api/login');
// export const testPut = createRequestAPI('put', 'jiekec/index.php?route=catalog/{{id}}/bannerlist');
