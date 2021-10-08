import React, { Component } from "react";

import { CssBaseline, Typography, Container, FormGroup, TextField, Button } from "@mui/material";
import APIURL from "../../helpers/environment";

type EmployeeProfileProps = {
  sessionToken: string | null,
  employeeId: number | null,
  fetchEmployeeId : () => void
}

type EmployeeProfileState = {
        firstName: string,
        lastName: string,
        username: string,
        department: string,
        title: string,
        hireDate: string,
        companyId: number,
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
        companyId: 1,
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
      companyId: this.state.companyId,
      userId: res.employeeProfile.UserId,
      employeeId: this.props.employeeId
    }))
    .then((data) => console.log(data))
    .catch((err) => (`error: ${err}`));
    
  }
  componentDidMount(){
    this.props.fetchEmployeeId()
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

  
        <div className="profile">
          <div className="profileheading">
        <Typography variant="h5">Welcome, {this.state.firstName}!</Typography>
        <Typography variant="h6">Employee Profile</Typography>
          </div>
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
      (
      <Container className="auth" maxWidth="xs">
        <CssBaseline />
          <FormGroup>
            <TextField
            variant="outlined"
            margin="normal"
            disabled 
            label="First Name"
            onChange={(e) => this.setState({firstName: e.target.value})}
            value={this.state.firstName}
            />
          </FormGroup>
          <FormGroup>
            <TextField 
            variant="outlined"
            margin="normal"
            label="Last Name"
            value={this.state.lastName}
            disabled
            />
          </FormGroup>
          <FormGroup>
              <TextField
              variant="outlined"
              margin="normal"
              disabled 
              label="Username"
              onChange={(e) => this.setState({username: e.target.value})}
              value={this.state.username}
              />
          </FormGroup>
          <FormGroup>
            <TextField
            variant="outlined"
            margin="normal"
            disabled 
            label="Department"
            onChange={(e) => this.setState({department: e.target.value})}
            value={this.state.department}
            />
          </FormGroup>
          <FormGroup>
            <TextField
            variant="outlined"
            margin="normal"
            disabled 
            label="Title"
            onChange={(e) => this.setState({title: e.target.value})}
            value={this.state.title}
            />
          </FormGroup>
          <FormGroup>
            <TextField
            variant="outlined"
            margin="normal"
            disabled 
            label="Hire Date"
            value={this.state.hireDate}
            />
          </FormGroup>
            <Button className="profilebutton"type="button" onClick={this.updateOn}>Edit Profile</Button>
        </Container>
        )
      }
      </div>
      
    );
  }
}

export default EmployeeProfile;