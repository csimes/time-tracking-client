import React , { Component } from 'react';
import './App.css';
import  {BrowserRouter as Router
} from 'react-router-dom';
import Auth from './components/auth/Auth';
import EmployeeIndex from './components/employee/EmployeeIndex';
import Nav from "./components/home/Nav"

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
      <Router>
        <Nav updateToken={this.updateToken} protectedViews={this.protectedViews} sessionToken={this.state.sessionToken} clearToken={this.clearToken}/>
      </Router>
      {/* {this.protectedViews()} */}
    </div>
  );
  }
  
}

export default App;
