import React, { Component } from "react";

import { CssBaseline, Typography, Container,FormGroup, TextField, Button } from "@mui/material";
import APIURL from "../../helpers/environment";

type EmployeeProfileProps = {
  sessionToken: string | null,
  employeeId: number | null,
}

type EmployeeProfileState = {
        firstName: string,
        lastName: string,
        username: string,
        department: string,
        title: string,
        hireDate: string,
        companyId: number | null,
        employeeId: number | null,
        userId: Number | null,
        updateActive: boolean,

      }

class EmployeeProfile extends Component<EmployeeProfileProps, EmployeeProfileState> {
  constructor(props: EmployeeProfileProps) {
    super(props)
    this.state = { 
        firstName: "",
        lastName: "",
        username: "",
        department: "",
        title: "",
        hireDate: "",
        companyId: null,
        employeeId: null,
        userId: null,
        updateActive: false,

      }
    }
  

  fetchEmployee = async () => {
    fetch(`${APIURL}/employee/`, {
      method: "GET",
      headers: new Headers ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`
      })
    })
    .then((res) => res.json())
    .then((res) => this.setState({
      firstName: res.employeeProfile.firstName,
      lastName: res.employeeProfile.lastName,
      username: res.employeeProfile.username,
      department: res.employeeProfile.department,
      title: res.employeeProfile.title,
      hireDate: res.employeeProfile.hireDate,
      companyId: res.employeeProfile.CompanyId,
      userId: res.employeeProfile.UserId,
      employeeId: res.employeeProfile.id
    }))
    .then((data) => console.log(data))
    .catch((err) => (`error: ${err}`));
    
  }
  componentDidMount(){
    this.fetchEmployee()
  }

    editEmployee = async (e: any) => {
    e.preventDefault();
    const { firstName, lastName, username, department, title, hireDate} = this.state
    
    fetch(`${APIURL}/employee/update/${this.state.employeeId}`, {
      method: "PUT",
      body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      username: username,
      department: department,
      title: title,
      hireDate: hireDate
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`
      }),
    })
    
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => (`error: ${err}`));
      }


  updateOn = () => {
        this.setState({updateActive: true});
    };

  updateOff = () => {
      this.setState({updateActive: false});
    };

  render() { 
    return (  

  
        <div>
        <Typography variant="h5">Welcome, {this.state.firstName}!</Typography>
        <Typography variant="h6">Employee Profile</Typography>

        {this.state.updateActive  ? 
        (
        <Container className="auth" maxWidth="xs">
        <CssBaseline />
        <form onSubmit={(e) => this.editEmployee(e)}>
          <FormGroup>
            <TextField
            variant="outlined"
            margin="normal"
            autoFocus 
            label="First Name"
            onChange={(e) => this.setState({firstName: e.target.value})}
            value={this.state.firstName}
            />
          </FormGroup>
          <FormGroup>
            <TextField 
            variant="outlined"
            margin="normal"
            autoFocus
            label="Last Name"
            onChange={(e) => this.setState({lastName: e.target.value})}
            value={this.state.lastName}
            />
          </FormGroup>
          <FormGroup>
              <TextField
              variant="outlined"
              margin="normal"
              autoFocus 
              label="Username"
              onChange={(e) => this.setState({username: e.target.value})}
              value={this.state.username}
              />
          </FormGroup>
          <FormGroup>
            <TextField
            variant="outlined"
            margin="normal"
            autoFocus 
            label="Department"
            onChange={(e) => this.setState({department: e.target.value})}
            value={this.state.department}
            />
          </FormGroup>
          <FormGroup>
            <TextField
            variant="outlined"
            margin="normal"
            autoFocus 
            label="Title"
            onChange={(e) => this.setState({title: e.target.value})}
            value={this.state.title}
            />
          </FormGroup>
          <FormGroup>
            <TextField
            variant="outlined"
            margin="normal"
            autoFocus 
            label="Hire Date"
            type="date"
            onChange={(e) => this.setState({hireDate: e.target.value})}
            value={this.state.hireDate}
            />
          </FormGroup>
          <Button type="submit">Save Profile</Button>
          <Button type="button" onClick={this.updateOff}>Close</Button>

        </form >
        </Container>
        )
        :
      (<div>
            First Name: {this.state.firstName}<br />
            Last Name: {this.state.lastName}<br />
            Username: {this.state.username}<br />
            Department: {this.state.department}<br />
            Title: {this.state.title}<br />
            Hire Date: {this.state.hireDate}<br />
            Company ID: {this.state.companyId}<br />
            User ID: {this.state.userId}<br />
            Employee ID: {this.state.employeeId}<br />
            <Button type="button" onClick={this.updateOn}>Edit Profile</Button>
        </div>)
      }
      </div>
      
    );
  }
}

export default EmployeeProfile;