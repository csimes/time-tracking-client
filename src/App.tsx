import React , { Component } from 'react';
import './App.css';
import  {BrowserRouter as Router
} from 'react-router-dom';
import APIURL from "./helpers/environment";
import Auth from './components/auth/Auth';
import EmployeeIndex from './components/employee/EmployeeIndex';
import Nav from "./components/home/Nav"

type AppProps = {
  // clearToken: () => void
}

type AppState = {
  sessionToken: string | null,
  employeeId: Number | null

}

class App extends Component<AppProps, AppState> {  
  constructor(props: AppProps){
    super(props)
      this.state = { 
        sessionToken : "",
        employeeId: null
      }
    this.updateToken = this.updateToken.bind(this)
    this.clearToken = this.clearToken.bind(this)
  }


    fetchEmployeeId = async () => {
    fetch(`${APIURL}/employee/`, {
      method: "GET",
      headers: new Headers ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.state.sessionToken}`
      })
    })
    .then((res) => res.json())
    .then((res) => this.setState({
      employeeId: res.employeeProfile.id,
    }))
    .then((res) => console.log(res))
    .catch((err) => (`error: ${err}`));
    
  }
  componentDidMount(){
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token")});
      console.log(this.state.sessionToken)
    }
  this.fetchEmployeeId()

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
  return (this.state.sessionToken === localStorage.getItem("token") ? <EmployeeIndex sessionToken={this.state.sessionToken} employeeId={this.state.employeeId}/> : <Auth updateToken={this.updateToken} /> )
}

  render() {
    return (
    <div className="App">
      <Router>
        <Nav employeeId={this.state.employeeId} updateToken={this.updateToken} protectedViews={this.protectedViews} sessionToken={this.state.sessionToken} clearToken={this.clearToken}/>
      </Router>
      {/* {this.protectedViews()} */}
    </div>
  );
  }
  
}

export default App;
