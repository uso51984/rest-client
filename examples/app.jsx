import React from 'react';
import { testGet, testGet1, testPost, testPut, source } from './api';

export default class Home extends React.PureComponent {
  componentDidMount() {
    // historyMethod.push('/about')
    testGet({ a: 'test' }).then((res) => {
      console.log(res);
      return res;
    }).catch((res) => {
      console.log('res', res);
    });

    testGet1({ a: 'test' }).then((res) => {
      console.log(res);
      return res;
    }).catch((res) => {
      console.log('res', res);
    });

    testPost({ a: 'testPost' }).then((res) => {
      console.log(res);
    }).catch((res) => {
      console.log(res);
    });


    // testPut({ id: '3232' }, { name: 'yang', age: 23 }).then((res) => {
    //   console.log(res);
    // });
  }

  render() {
    return (
      <div className="test">
        测试数据
      </div>
    );
  }
}
