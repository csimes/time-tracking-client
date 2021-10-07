import React, { Component } from "react";
import { CssBaseline, Typography, Container, FormGroup, TextField, FormLabel, Button, Checkbox } from "@mui/material";
import APIURL from "../../helpers/environment";

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

  await fetch(`${APIURL}/user/register`, {
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
        .then((data) => {this.props.updateToken(data.sessionToken)})
        .catch((err) => (`error: ${err}`));
}

handleChange = (e: any) => {
  this.setState({isAdmin: e.target.checked})
}
  
  render() { 
    return ( 
      <Container className="auth" maxWidth="xs">
        <CssBaseline />
          <Typography component="h1" variant="h5">
            Register
          </Typography>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <FormGroup>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      autoComplete="email"
                      autoFocus
                      label="Email Address"
                      onChange={(e) => this.setState({email: e.target.value})}
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      type="email"
                      required
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      autoComplete="password"
                      autoFocus
                      label="Password"
                      onChange={(e) => this.setState({password: e.target.value})}
                      name="password"
                      type="password"
                      placeholder="Password"
                      // helperText="Helper text test"
                      // inputProps={{ pattern: "[a-z][A-Z][0-9]{8,16}" }}
                      value={this.state.password}
                      required
                    />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="Admin">
                  Admin User:
                  </FormLabel>
                  <Checkbox onChange={(e) => this.handleChange(e)}/>
                </FormGroup>
                <Button fullWidth type="submit" variant="contained"
                  color="primary">Register</Button>
            </form>
      </Container>

    );
  }
}

export default Register;