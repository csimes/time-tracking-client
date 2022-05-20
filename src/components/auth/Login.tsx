import React, { Component } from "react";
import {
  CssBaseline,
  Typography,
  Container,
  FormGroup,
  TextField,
  Button,
} from "@mui/material";
import APIURL from "../../helpers/environment";

type LoginProps = {
  updateToken: (newToken: string) => void;
};

type LoginState = {
  email: string;
  password: string;
};

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (e: any) => {
    const { email, password } = this.state;
    e.preventDefault();
    await fetch(`${APIURL}/login`, {
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
      .then((data) => {
        this.props.updateToken(data.sessionToken);
      })
      .catch((err) => `error: ${err}`);
  };

  render() {
    return (
      <Container className="auth" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <FormGroup>
            <TextField
              variant="outlined"
              margin="normal"
              autoComplete="email"
              autoFocus
              label="Email Address"
              onChange={(e) => this.setState({ email: e.target.value })}
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
              onChange={(e) => this.setState({ password: e.target.value })}
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              required
            />
          </FormGroup>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </Container>
    );
  }
}

export default Login;
