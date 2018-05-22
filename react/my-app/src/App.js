import React, { Component } from 'react';
import logo from './logo.svg';
import { HashRouter,Switch,Route,Link } from 'react-router-dom';
import './App.css';

class FullRoster extends React.Component{
  constructor(){
    super();
    this.item  = {
      id:1
    }
  }
  render(){
    return(
      <div>
        <ul>
          <li><Link to={`/roster/${this.item.id}`}>roster/1</Link></li>
          <li><Link to='/roster'>Roster</Link></li>
        </ul>
      </div>
      )
  }
  
}

class Player extends React.Component{
  constructor(props){
      super(props);
      console.log(props)
  }
  render(){
    return(
      <div>
        <h1>11111111</h1>
      </div>
      )
  }
}

class Home extends React.Component{
  constructor(){
    super();
    this.item  = {
      id:1
    }
  }
  render(){
    return(
      <div>
        <h1>Welcome to the Tornadoes Website!</h1>
      </div>
      )
  }
}

class Roster extends React.Component{
  constructor(){
    super();
    this.item  = {
      id:1
    }
  }
  render(){
    return(
      <Switch>
        <Route exact path='/roster' component={FullRoster}/>
        <Route path='/roster/:number' component={Player}/>
      </Switch>
      )
  }
}

class Schedule extends React.Component{
  render(){
    return(
      <div>
        <ul>
          <li>6/5 @ Evergreens</li>
          <li>6/8 vs Kickers</li>
          <li>6/14 @ United</li>
        </ul>
      </div>
      )
  }
}

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
        <header>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/roster'>Roster</Link></li>
              <li><Link to='/schedule'>Schedule</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/roster' component={Roster}/>
            <Route path='/schedule' component={Schedule}/>
          </Switch>
        </main>
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
