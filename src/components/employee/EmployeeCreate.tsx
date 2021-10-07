import React, { Component } from "react";
import { FormGroup, TextField, FormLabel, Button, Container, Typography, CssBaseline } from "@mui/material";
import APIURL from "../../helpers/environment";

type EmployeeCreateProps = {
  sessionToken: string | null
} 

type EmployeeCreateState = {
  firstName: string,
  lastName: string,
  username: string,
  department: string | null,
  title: string | null,
  hireDate: string,
  companyId: string | null,
  employeeId: Number | null
} 

class EmployeeCreate extends Component<EmployeeCreateProps, EmployeeCreateState> {
  constructor (props: EmployeeCreateProps) {
    super(props)
      this.state = { 
        firstName: "",
        lastName: "",
        username: "",
        department: "",
        title: "",
        hireDate: "",
        companyId: "",
        employeeId: null
      }
  }

  createEmployee = async (e: any) => {
    e.preventDefault();
    const { firstName, lastName, username, department, title, hireDate, companyId} = this.state
    
    await fetch(`${APIURL}/employee/create`, {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        department: department,
        title: title,
        hireDate: hireDate,
        companyId: companyId
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`
      }),
    })
    
    .then((res) => res.json())
    .catch((err) => (`error: ${err}`));
  }

  render() { 
    return (
        <Container className="" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5">Create Employee Profile</Typography>
        <form onSubmit={(e) => this.createEmployee(e)}>
        <FormGroup>
          <TextField
            variant="outlined"
            margin="normal"
            autoFocus
            label="First Name"
            onChange={(e) => this.setState({firstName: e.target.value})}
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
            onChange={(e) => this.setState({lastName: e.target.value})}
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
            onChange={(e) => this.setState({username: e.target.value})}
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
            onChange={(e) => this.setState({department: e.target.value})}
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
            onChange={(e) => this.setState({title: e.target.value})}
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
            onChange={(e) => this.setState({hireDate: e.target.value})}
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
        {/* <div>{this.state.employeeId}</div> */}
      </Container>
    );
  }
} 


export default EmployeeCreate;