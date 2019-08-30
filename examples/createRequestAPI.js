
import createAPI, { loading, RequestReponse } from '../src';

loading.showLoading = () => console.log(' show loading');
loading.hideLoading = () => console.log(' hide loading');

export default (method, url, fetchConfig) => createAPI(method, url, fetchConfig);
