import React, { Component } from "react";
import Register from "./Register";
import Login from "./Login";

type AuthProps = {
    updateToken: (newToken: string) => void
}
class Auth extends Component<AuthProps, {}> {
  constructor(props: AuthProps){
    super(props)
      this.state = {}
  }

  render() { 
    return ( 

    <div>
      <Register updateToken={this.props.updateToken} />
      <Login updateToken={this.props.updateToken} />
    </div> 
    );
  }
}

export default Auth;