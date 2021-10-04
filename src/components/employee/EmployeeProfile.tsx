import { type } from "os";
import React, { Component } from "react";

// import { Button } from "@mui/material";
import APIURL from "../../helpers/environment";
import EmployeeCreate from "./EmployeeCreate";

type EmployeeProfileProps = {
  sessionToken: string | null
}

type EmployeeProfileState = {
          firstName: string,
        lastName: string,
        username: string,
        department: string,
        title: string,
        hireDate: string,
        companyId: Number | null,
        employeeId: Number | null,
        userId: Number | null
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
        userId: null
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
      hireDate: res.employeeProfile.hiredate,
      companyId: res.employeeProfile.CompanyId,
      userId: res.employeeProfile.UserId,
      employeeId: res.employeeProfile.id
    }))
    .then((res) => console.log(res))
    .catch((err) => (`error: ${err}`));
    
  }

  componentDidMount(){
    this.fetchEmployee()

  }

  render() { 
    return (  

      /* Ternary to show employee create if no employee profile */
      <div>
        <h1>Employee Profile</h1>
            First Name: {this.state.firstName}<br />
            Last Name: {this.state.lastName}<br />
            Username: {this.state.username}<br />
            Department: {this.state.department}<br />
            Title: {this.state.title}<br />
            Hire Date: {this.state.hireDate}<br />
            Company ID: {this.state.companyId}<br />
            User ID: {this.state.userId}<br />
            Employee ID: {this.state.employeeId}
      </div>
      
    );
  }
}

export default EmployeeProfile;