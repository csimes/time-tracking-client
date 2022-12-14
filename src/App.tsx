import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import APIURL from "./helpers/environment";
import Auth from "./components/auth/Auth";
import Nav from "./components/home/Nav";
import Home from "./components/home/Home";

type AppState = {
  sessionToken: string | null;
  employeeId: number | null;
};

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sessionToken: "",
      employeeId: null,
    };
    this.updateToken = this.updateToken.bind(this);
    this.clearToken = this.clearToken.bind(this);
  }

  fetchEmployeeId = async () => {
    await fetch(`${APIURL}/employee/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          employeeId: res.employeeProfile.id,
        })
      )
      .then((res) => console.log(res))
      .catch((err) => `error: ${err}`);
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: sessionStorage.getItem("token") });
      console.log(this.state.sessionToken);
    }
    this.fetchEmployeeId();
  }

  updateToken = (newToken: string) => {
    sessionStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
    console.log(this.state.sessionToken);
  };

  clearToken() {
    sessionStorage.clear();
    this.setState({ sessionToken: "" });
  }

  protectedViews() {
    return this.state.sessionToken === sessionStorage.getItem("token") ? (
      <Home />
    ) : (
      <Auth updateToken={this.updateToken} />
    );
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Nav
            fetchEmployeeId={this.fetchEmployeeId}
            employeeId={this.state.employeeId}
            updateToken={this.updateToken}
            protectedViews={this.protectedViews}
            sessionToken={this.state.sessionToken}
            clearToken={this.clearToken}
          />
        </Router>
        {/* {this.protectedViews()} */}
      </div>
    );
  }
}

export default App;
