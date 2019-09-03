import React from 'react';
import ReactMarkdown from 'react-markdown';
import Button from 'antd/lib/button';
import CodeBlock from './doc/codeBlack';
import input from './doc/normal.md';
import { getUser } from './api';

export const Markdown = ({ docData }) => <ReactMarkdown source={docData} escapeHtml={false} renderers={{ code: CodeBlock }} />;

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      normalSucess: ''
    };
  }

  getUser=() => {
    getUser().then((res) => {
      this.setState({ normalSucess: res });
    });
  }

  render() {
    return (
      <div className="example">
        <Markdown docData={input} />
        <Button type="primary" onClick={this.getUser}>getUser</Button>
        <h2>get result</h2>
        <p>{this.state.normalSucess && JSON.stringify(this.state.normalSucess)}</p>
      </div>
    );
  }
}
