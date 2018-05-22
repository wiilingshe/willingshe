import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state  = {
      value:'test',
      list:[1,2,3,4,5],
    }
  }
  handle(){
    this.setState({
      value:2
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.{this.props.color}.{this.state.value}
        </p>
        <button onClick={() => this.handle()}>改变value的值</button>
        <p>{this.state.list}</p>
      </div>
    );
  }
}

class App2 extends Component{
  render() {
    return <App color="red"/>
  }
}

export default App2;
