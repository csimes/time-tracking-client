import React, { Component } from "react";
import {FormGroup, TextField, FormLabel, Button} from "@mui/material"

interface EmployeeCreateProps {
  sessionToken: string | null
} 


interface EmployeeCreateState {
  firstName: string,
  lastName: string,
  username: string,
  department: string | null,
  title: string | null,
  hireDate: string,
  CompanyId: string | null,
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
        CompanyId: "",
        employeeId: null
      }
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
    const { firstName, lastName, username, department, title, hireDate, CompanyId} = this.state
    
    fetch("http://localhost:3000/employee/create", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        department: department,
        title: title,
        hireDate: hireDate,
        CompanyId: CompanyId
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
      <div>
        <h1>Create Employee Record</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
        <FormGroup>
          <FormLabel htmlFor="firstName">First Name</FormLabel>            
          <TextField
            label="First Name"
            onChange={(e) => this.setState({firstName: e.target.value})}
            name="First Name"
            value={this.state.firstName}
            required 
            />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>            
          <TextField
            label="Last Name"
            onChange={(e) => this.setState({lastName: e.target.value})}
            name="Last Name"
            value={this.state.lastName}
            required 
          />
          </FormGroup>
          <FormGroup>
          <FormLabel htmlFor="username">UserName</FormLabel>            
          <TextField
            label="Username"
            onChange={(e) => this.setState({username: e.target.value})}
            name="Username"
            value={this.state.username}
            required 
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Department</FormLabel>
            <TextField
            label="Department"
            onChange={(e) => this.setState({department: e.target.value})}
            name="Department"
            value={this.state.department}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Title</FormLabel>
            <TextField
            label="Title"
            onChange={(e) => this.setState({title: e.target.value})}
            name="Title"
            value={this.state.title}
          />
          </FormGroup>
          <FormGroup>
          <FormLabel>Hire Date</FormLabel>
            <TextField
            // label="Hire Date"
            onChange={(e) => this.setState({hireDate: e.target.value})}
            name="hireDate"
            value={this.state.hireDate}
            type="date"
          />
        </FormGroup>
        <FormGroup>
            <FormLabel>Company Id</FormLabel>
            <TextField
            label="Company Id"
            onChange={(e) => this.setState({CompanyId: e.target.value})}
            name="hireDate"
            value={this.state.CompanyId}
            required
          />
        </FormGroup>
          <Button type="submit">Add Employee</Button>
        </form>
        {/* <div>{this.state.employeeId}</div> */}
      </div>
    );
  }
} 


export default EmployeeCreate;