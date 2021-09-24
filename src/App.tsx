import React , { Component } from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import Clock from './components/Clock';

let testProp = "This is a test. This is only a test";

type AppState = {
  sessionToken: string | null
}

class App extends Component<{},AppState> {  
  constructor(props: any){
    super(props)
      this.state = { 
        sessionToken : ""
      }
    this.updateToken = this.updateToken.bind(this)
    this.clearToken = this.clearToken.bind(this)
  }

  componentDidMount(){
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token")});
      console.log(this.state.sessionToken)
    }
  }

  updateToken = (newToken : string) => {
    localStorage.setItem("token", newToken);
    this.setState({sessionToken: newToken});
    console.log(this.state.sessionToken);
  }

  clearToken(){
    localStorage.clear();
    this.setState({sessionToken: ""})
  }

protectedViews(){
  // return (this.state.sessionToken === localStorage.getItem("token") ? "Go to dashboard" : <Auth updateToken={this.updateToken} /> )
}

  render() {
    return (
    <div className="App">
      <Clock testProp={testProp} />
      {this.protectedViews()}
      <Auth updateToken={this.updateToken} />
    </div>
  );
  }
  
}

export default App;
