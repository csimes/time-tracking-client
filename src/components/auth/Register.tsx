import React, { Component } from "react";
import {FormGroup, TextField, FormLabel, Button} from "@mui/material"

type RegisterProps = {
  updateToken: (newToken: string) => void
}

type RegisterState = {
  email: string,
  password: string,
  isAdmin: boolean,
  sessionToken: string
}

class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps){
    super(props)
      this.state = { 
        email: "",
        password: "",
        isAdmin: false,
        sessionToken: ""
      }
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
    const { email, password, isAdmin } = this.state

fetch("http://localhost:3000/user/register", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        isAdmin: isAdmin
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
            <h1>Register</h1>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <FormGroup>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        label="email"
                        onChange={(e) => this.setState({email: e.target.value})}
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        type="email"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        label="password"
                        onChange={(e) => this.setState({password: e.target.value})}
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        required
                    />
                </FormGroup>
                <Button type="submit">Register</Button>
            </form>
        </div>
    );
  }
}

export default Register;