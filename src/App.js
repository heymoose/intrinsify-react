import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import IntrinsifyContainer from './containers/IntrinsifyContainer/IntrinsifyContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <IntrinsifyContainer />
        </Layout>
      </div>
    );
  }
}

export default App;
