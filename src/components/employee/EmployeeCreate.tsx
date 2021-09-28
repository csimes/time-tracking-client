import React, { Component } from "react";
import {FormGroup, TextField, FormLabel, Button} from "@mui/material"

interface EmployeeCreateProps {
  
} 


interface EmployeeCreateState {
  UserId: string,
  firstName: string,
  lastName: string,
  username: string,
  department: string | null,
  title: string | null,
  hireDate: string,
  CompanyId: string | null
} 

class EmployeeCreate extends Component<EmployeeCreateProps, EmployeeCreateState> {
  constructor (props: EmployeeCreateProps) {
    super(props)
      this.state = { 
        UserId: "",
        firstName: "",
        lastName: "",
        username: "",
        department: "",
        title: "",
        hireDate: "",
        CompanyId: ""
      }

  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
    const { UserId, firstName, lastName, username, department, title, hireDate, CompanyId} = this.state
    
    fetch("http://localhost:3000/employee/create", {
      method: "POST",
      body: JSON.stringify({
        UserId: UserId,
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
      }),
    })
    
    .then((res) => res.json())
    .then((createData) => console.log(createData))
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
            label="Last Name"
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
            required 
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
            label="Hire Date"
            onChange={(e) => this.setState({hireDate: e.target.value})}
            name="hireDate"
            value={this.state.hireDate}
            required 
          />
        </FormGroup>
          <Button type="submit">Add Employee</Button>
        </form>
      </div>
    );
  }
} 


export default EmployeeCreate;