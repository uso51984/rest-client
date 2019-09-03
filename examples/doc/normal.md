# restful-request

## 1. 全局定义 createAPI, 定义api返回code === '0000' 为成功情况
```jsx
// utils/createAPI.js
import createAPI, { RequestReponse } from 'restful-request';

RequestReponse.isSuccess = code => code === '0000';

export default (method, url, fetchConfig) => createAPI(method, url, fetchConfig);
```
## 2. normal 调用
```jsx
import { httpMethod } from 'restful-request';
import createRequestAPI from 'utils/createAPI';

export const getUser = createRequestAPI(httpMethod.GET, 'https://www.fastmock.site/mock/a4676b8718662138dc75efb3b3a401e6/restclinet/rest/user');

getUser().then((res) => {
  this.setState({ normalSucess: res });
});

```


