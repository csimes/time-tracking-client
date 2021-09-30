import React, { Component } from "react";

// import { Button } from "@mui/material";
import APIURL from "../../helpers/environment";

interface EmployeeProfileProps {
  sessionToken: string | null
}

interface EmployeeProfileState {
        firstName: string,
        lastName: string,
        username: string,
        department: string,
        title: string,
        hireDate: string,
        companyId: Number | undefined,
        employeeId: Number | undefined,
        userId: Number | undefined
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
        companyId: undefined,
        employeeId: undefined,
        userId: undefined
    }
  }

  fetchEmployee = async () => {
    fetch(`http://${APIURL}/employee/`, {
      method: "GET",
      headers: new Headers ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`
      })
    })
    .then((res) => res.json())
    .then((res) => this.setState({
      firstName: res.firstName,
      lastName: res.lastName,
      username: res.username,
      department: res.department,
      title: res.title,
      hireDate: res.hiredate,
      companyId: res.CompanyId,
      userId: res.UserId,
      employeeId: res.id
    }))
    .catch((err) => (`error: ${err}`));
    
  }

  componentDidMount(){
    this.fetchEmployee()
  }

  render() { 
    return (  
      <div>
          {/* <Button onClick={this.fetchEmployee}>Fetch Employee</Button> */}
          <div>
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
      </div>
      
    );
  }
}

export default EmployeeProfile;