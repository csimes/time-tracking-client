import React, { Component } from "react";
import {
  Alert,
  FormGroup,
  TextField,
  FormLabel,
  Button,
  Container,
  Typography,
  CssBaseline,
} from "@mui/material";
import APIURL from "../../helpers/environment";

type EmployeeCreateProps = {
  sessionToken: string | null;
  fetchEmployeeId: () => void;
};

type EmployeeCreateState = {
  firstName: string;
  lastName: string;
  username: string;
  department: string | null;
  title: string | null;
  hireDate: string;
  companyId: string | null;
  employeeId: number | null;
  error: boolean;
  message: string | null;
};

class EmployeeCreate extends Component<
  EmployeeCreateProps,
  EmployeeCreateState
> {
  constructor(props: EmployeeCreateProps) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      department: "",
      title: "",
      hireDate: "",
      companyId: "",
      employeeId: null,
      error: false,
      message: "",
    };
  }

  createEmployee = async (e: any) => {
    e.preventDefault();
    console.log("Creating employee with token:", this.props.sessionToken);
    console.log("Stored token:", sessionStorage.getItem("token"))
    const {
      firstName,
      lastName,
      username,
      department,
      title,
      hireDate,
      companyId,
    } = this.state;

    try {
      const response = await fetch(`${APIURL}/employee/create`, {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          department,
          title,
          hireDate,
          companyId,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.sessionToken}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({
          message: data.message,
          error: false,
        });
        this.props.fetchEmployeeId();
      } else {
        this.setState({
          message: data.message,
          error: true,
        });
      }
    } catch (err) {
      this.setState({
        message: "An error occurred while creating profile",
        error: true,
      });
    }
  };

  render() {
    return (
      <Container maxWidth="xs">
        {this.state.message && (
          <Alert
            severity={this.state.error ? "error" : "success"}
            sx={{ mt: 2, mb: 2 }}
          >
            {this.state.message}
          </Alert>
        )}
        <CssBaseline />
        <Typography
          component="h1"
          variant="h5"
        >
          Create Employee Profile
        </Typography>
        <form onSubmit={(e) => this.createEmployee(e)}>
          <FormGroup>
            <TextField
              variant="outlined"
              margin="normal"
              autoFocus
              label="First Name"
              onChange={(e) => this.setState({ firstName: e.target.value })}
              name="First Name"
              value={this.state.firstName}
              required
            />
          </FormGroup>
          <FormGroup>
            <TextField
              variant="outlined"
              margin="normal"
              autoFocus
              label="Last Name"
              onChange={(e) => this.setState({ lastName: e.target.value })}
              name="Last Name"
              value={this.state.lastName}
              required
            />
          </FormGroup>
          <FormGroup>
            <TextField
              variant="outlined"
              margin="normal"
              autoFocus
              label="Username"
              onChange={(e) => this.setState({ username: e.target.value })}
              name="Username"
              value={this.state.username}
              required
            />
          </FormGroup>
          <FormGroup>
            <TextField
              variant="outlined"
              margin="normal"
              autoFocus
              label="Department"
              onChange={(e) => this.setState({ department: e.target.value })}
              name="Department"
              value={this.state.department}
            />
          </FormGroup>
          <FormGroup>
            <TextField
              variant="outlined"
              margin="normal"
              autoFocus
              label="Job Title"
              onChange={(e) => this.setState({ title: e.target.value })}
              name="Title"
              value={this.state.title}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Hire Date</FormLabel>
            <TextField
              variant="outlined"
              margin="normal"
              autoFocus
              onChange={(e) => this.setState({ hireDate: e.target.value })}
              name="hireDate"
              value={this.state.hireDate}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Company Id</FormLabel>
            <TextField
              variant="outlined"
              margin="normal"
              autoFocus
              label="Company Id"
              name="hireDate"
              value="1"
              /* Keeping value hardcoded in until app is expanded to include other companies */
              // onChange={(e) => this.setState({companyId: e.target.value})}
              // value={this.state.companyId}
              required
            />
          </FormGroup>
          <Button type="submit">Add Employee</Button>
        </form>
      </Container>
    );
  }
}

export default EmployeeCreate;
