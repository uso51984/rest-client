import React from 'react';
// import { testGet, testGet1, testGet2, testPost, testPut, source } from './api';
import { testGet, testGet1, testGet2, testPost, testPut, source } from './api';

export default class Home extends React.PureComponent {
  componentDidMount() {
    userGet({ id: '23' });
    // historyMethod.push('/about')
    // testGet({ a: 'test' }).then((res) => {
    //   console.log(res);
    //   return res;
    // }).catch((res) => {
    //   console.log('res', res);
    // });

    // testGet1({ a: 'test' }).then((res) => {
    //   console.log(res);
    //   return res;
    // }).catch((res) => {
    //   console.log('res', res);
    // });
    // setTimeout(() => {
    //   source.cancel();
    // });

    // testGet2({ a: 'test' }).then((res) => {
    //   console.log(res);
    //   return res;
    // }).catch((res) => {
    //   console.log('res', res);
    // });


    // testPost({ username: 'admin', password: '123456' }).then((res) => {
    //   console.log(res);
    // }).catch((res) => {
    //   console.log(res);
    // });


    // testPut({ id: '3232' }, { name: 'yang', age: 23 }).then((res) => {
    //   console.log(res);
    // });
  }

  render() {
    return (
      <div className="test">
asdf
      </div>
    );
  }
}
