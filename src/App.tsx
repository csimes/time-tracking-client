import React , { Component } from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import Clock from './components/Clock';
import EmployeeIndex from './components/employee/EmployeeIndex';
import Nav from "./components/home/Nav"

let testProp = "This is a test. This is only a test";
type AppProps = {
  // clearToken: () => void
}

type AppState = {
  sessionToken: string | null
}

class App extends Component<AppProps, AppState> {  
  constructor(props: AppProps){
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
  return (this.state.sessionToken === localStorage.getItem("token") ? <EmployeeIndex sessionToken={this.state.sessionToken} employeeId={null}/> : <Auth updateToken={this.updateToken} /> )
}

  render() {
    return (
    <div className="App">
      <Nav clearToken={this.clearToken}/>
      <Clock testProp={testProp} />
      {this.protectedViews()}
      {/* <Auth updateToken={this.updateToken} /> */}
      {/* <EmployeeIndex sessionToken={this.state.sessionToken}/> */}
    </div>
  );
  }
  
}

export default App;
