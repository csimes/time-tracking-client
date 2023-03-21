import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import { Button, Container, Typography, Divider, Table } from "@mui/material";



type AdminViewProps = {
  sessionToken: string | null
}

type AdminViewState = {
  companyId: number,
  companyTimesheets: [],
  companyEmployees: [] ,
}

class AdminView extends Component<AdminViewProps, AdminViewState> {
  constructor(props: AdminViewProps){
    super(props)
      this.state = { 
        companyId: 1,
        companyTimesheets: [],
        companyEmployees: [],
    }
  }
  
    fetchAllEmployees = async () => {
    await fetch(`${APIURL}/employee/bycompany/${this.state.companyId}`, {
      method: "GET",
      headers: new Headers ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`
      })
    })
    .then((res) => res.json())
    .then((res) => this.setState({companyEmployees: res.employees}))
    .catch((err) => (`error: ${err}`));
  }  
  fetchAllTimesheets = async () => {
    await fetch(`${APIURL}/timesheet/bycompany/${this.state.companyId}`, {
      method: "GET",
      headers: new Headers ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`
      })
    })
    .then((res) => res.json())
    .then((res) => this.setState({companyTimesheets: res}))
    .catch((err) => (`error: ${err}`));
  }

  deleteEmployee = async (employee: any) => {
    await fetch(`${APIURL}/employee/remove/${employee.id}`, {
        method: "DELETE",
        headers: new Headers ({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.props.sessionToken}`
        })
    })
    .then(() => this.fetchAllEmployees())
    .catch((err) => (`error: ${err}`));
}

  allTimesheetsMapper(){
    return this.state.companyTimesheets.map((timesheet: any, index) => {
        return (
            <tr key={index}>
                <th>{timesheet.id}</th>
                <th>{timesheet.EmployeeId}</th>
                <td>{timesheet.hours}</td>
                <td>{timesheet.timeType}</td>
                <td>{timesheet.date}</td>
            </tr>
        );
    })
  }

  allEmployeesMapper(){
    return this.state.companyEmployees.map((employee: any, index) => {
      return (
        <tr key={index}>
            <th>{employee.id}</th>
            <th>{employee.firstName}</th>
            <td>{employee.lastName}</td>
            <td>{employee.username}</td>
            <td>{employee.department}</td>
            <td>{employee.title}</td>
            <td>{employee.hireDate}</td>
            <td><Button onClick={() => this.deleteEmployee(employee)}>Delete Employee</Button></td>
        </tr>
        );
      })
  }

componentDidMount(){
  this.fetchAllTimesheets();
  this.fetchAllEmployees()
}
  render(){
    return(
      <Container >
       {this.state.companyEmployees.length >= 1 ? <Container>
          <Typography variant="h5">Company Employees</Typography>
        <Divider />
          <Table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Department</th>
                        <th>Title</th>
                        <th>Hire Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.allEmployeesMapper()}
                </tbody>
            </Table>
        <Typography variant="h5">Company Timesheets</Typography>
        <Divider />
              <Table>
                <thead>
                    <tr>
                        <th>Timesheet ID</th>
                        <th>Employee ID</th>
                        <th>Hours</th>
                        <th>Time Type</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.allTimesheetsMapper()}
                </tbody>
            </Table>
            </Container>
            : 
            <Typography variant="h6">Administrator access required for this page.</Typography>
            }
      </Container>
    )
  }
}

export default AdminView;