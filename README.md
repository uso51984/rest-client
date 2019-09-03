## restful-request 是一个基于 Axios 的 HTTP 库，可以用在浏览器和 node.js 中
### 特性
1. 支持axios的所有特性
2. 统一request写法，让restful主体请求与底层无关，换句话说业务层不改变情况下Axios可还成其他。
3. loading 状态计算，提供统一的showLoading 和 hideLoading 监听函数
4. 提供定义HTTP Error，SystemError， BusinessError，BusinessSucess Cancel Request and timeout 函数

### 一、基本request使用
#### 1. 全局定义 createAPI
```js
// utils/createAPI.js
import createAPI from 'restful-request';

export default (method, url, fetchConfig) => createAPI(method, url, fetchConfig);
```
目的： 建立应用请求函数唯一入口， 方便统一处理共同业务及配置, fetchConfig为axios的config 非必须

#### 2. 调用createAPI 定义接口方法
`createAPI(httpMethod, url, fetchConfig)`  返回requestFunc
```js
// services/api.js
import { httpMethod } from 'restful-request';
import createAPI from 'utils/createAPI'

export const userGet = createRequestAPI(httpMethod.GET, '/user/');
export const userPut = createRequestAPI(httpMethod.PUT, '/user');
export const userPost = createRequestAPI(httpMethod.POST, '/user');
export const userDelete = createRequestAPI(httpMethod.DELETE, '/user');
export const classGet = createRequestAPI(httpMethod.PUT, '/class/{{id}}/user');
export const classPut = createRequestAPI(httpMethod.PUT, '/class/{{typeId}}/user');
```

#### 3. 调用接口
##### 普通url格式
`requestFunc(params)`  返回promise对象
###### get, delete请求
```js
import { userGet, userDelete } from 'services/api';

userGet({id: '23'}) // get request /user?id=23
  .then((res)=>  console.log(res))
  .catch((error)=> console.log(error))
userDelete({id: '23'}) // delete request /user?id=23
  .then((res)=>  console.log(res))
  .catch((error)=> console.log(error))
```

###### post, put
```js
import { userPost, userPut } from 'services/api';

userPost({id: '23'}) // post request /user, params {id: '23'}
  .then((res)=>  console.log(res))
  .catch((error)=> console.log(error))
userPut({id: '23'}) // put request /user, params {id: '23'}
  .then((res)=>  console.log(res))
  .catch((error)=> console.log(error))
```
##### 含模板url格式

```js
import { classGet, classGet } from 'services/api';

classGet({typeId: 23}, {id: '2'}) // get request /class/23/use?id=2
  .then((res)=>  console.log(res))
  .catch((error)=> console.log(error))
classPut({typeId: 23, {id: '23'}}) // put request /class/23/use, params {id: '23'}
  .then((res)=>  console.log(res))
  .catch((error)=> console.log(error))
```

### 二、loading
```js
import { loading } from 'restful-request';
// 获取当前loading状态
loading.isLoading()

// 重置loading 计数
loading.reset()

// 显示loading callbak
loading.showLoading = () => console.log(' show loading');
// 影藏loading callbak
loading.hideLoading = () => console.log(' hide loading');

loading.offLoading // true 关闭showLoading，hideLoading 回调， 默认值为：false
```
###. requestReponse
```js
import { requestReponse } from 'restful-request';

  requestReponse.isSuccess = (code) => {
    // 定义success code/ 默认返回 true
  }

  requestReponse.isSystemError = (code) => {
    // 定义SystemError code scope  默认返回 false
  }

  requestReponse.isValidationError = (code) => {
    // 定义 ValidationError code scope 默认返回 false
  }

  requestReponse.success = () => {
     // 定义success callback
  }
  requestReponse.httpError = (errorObj) => {
    // 定义httpError callback
  }
  requestReponse.systemError = (errorObj) => {
    // 定义systemError callback
  }
  requestReponse.businessError = (errorObj) => {
    // 定义businessError callback
  }

  requestReponse.parseResponseDat = (data) => {
    // 在传递给 then/catch 前，允许修改响应数据
    return data;
  }
```