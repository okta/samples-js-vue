import React, { Component } from 'react';
import ClaimApp from './ClaimApp';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to FHIR Callout Service</h1>
        <ClaimApp />
      </div>
    );
  }
}

export default App;
