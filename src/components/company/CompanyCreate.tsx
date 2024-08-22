import React, { Component } from "react";
import {
  FormGroup,
  TextField,
  Button,
  Container,
  Typography,
  CssBaseline,
} from "@mui/material";
import APIURL from "../../helpers/environment";

type CompanyCreateProps = {
  sessionToken: string | null;
};

type CompanyCreateState = {
  companyName: string;
  location: string;
};

class CompanyCreate extends Component<CompanyCreateProps, CompanyCreateState> {
  constructor(props: CompanyCreateProps) {
    super(props);
    this.state = {
      companyName: "",
      location: "",
    };
  }

  createCompany = async (e: any) => {
    e.preventDefault();
    const { companyName, location } = this.state;

    await fetch(`${APIURL}/company/create`, {
      method: "POST",
      body: JSON.stringify({
        companyName: companyName,
        location: location,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .catch((err) => `error: ${err}`);
  };

  render() {
    return (
      <Container
        className=""
        maxWidth="xs"
      >
        <CssBaseline />
        <Typography
          component="h1"
          variant="h5"
        >
          Create Company Profile
        </Typography>
        <form onSubmit={(e) => this.createCompany(e)}>
          <FormGroup>
            <TextField
              variant="outlined"
              margin="normal"
              autoFocus
              label="Company Name"
              onChange={(e) => this.setState({ companyName: e.target.value })}
              name="First Name"
              value={this.state.companyName}
              required
            />
          </FormGroup>
          <FormGroup>
            <TextField
              variant="outlined"
              margin="normal"
              autoFocus
              label="Location"
              onChange={(e) => this.setState({ location: e.target.value })}
              name="Last Name"
              value={this.state.location}
              required
            />
          </FormGroup>
          <Button type="submit">Add Company</Button>
        </form>
      </Container>
    );
  }
}

export default CompanyCreate;
