import React,  { Component } from "react";
import {FormGroup, TextField, FormLabel, Input, Button} from "@mui/material"

type LoginProps = {
  updateToken: (newToken: string) => void
}

type LoginState = {
  email: string,
  password: string,
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props)
    this.state = {  
      email: "",
      password: "",
    }
  }

  handleSubmit = (e: any) => {
    const { email, password } = this.state
    e.preventDefault();
fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
    
        .then((res) => res.json())
        .then((data) => {this.props.updateToken(data.sessionToken)
        })
        .catch((err) => (`error: ${err}`));
}
  
  render() { 
    return ( 
              <div>
            <h1>Login</h1>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <FormGroup>
                    {/* <FormLabel htmlFor="email">Email</FormLabel> */}
                    <TextField
                        label="Email"
                        onChange={(e) => this.setState({email: e.target.value})}
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        type="email"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    {/* <FormLabel htmlFor="password">Password</FormLabel> */}
                    <TextField
                        label="Password"
                        onChange={(e) => this.setState({password: e.target.value})}
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        required
                    />
                </FormGroup>
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
  }
}

export default Login;