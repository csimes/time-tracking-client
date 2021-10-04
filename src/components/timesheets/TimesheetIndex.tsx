import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import { Button } from "@mui/material";

import TimesheetCreate from "./TimesheetCreate";


type TimesheetIndexProps = {
sessionToken: string | null
employeeId: Number | null
}

type TimesheetIndexState = {
  hours: Number | 0,
  timeType: string,
  date: string,
  employeeId: Number | null,
  projectId: Number | null,
  companyId: Number | null,
  results: [] | undefined
}

class TimesheetIndex extends Component<TimesheetIndexProps, TimesheetIndexState> {
  constructor(props: TimesheetIndexProps) {
    super(props)
    this.state = {
      hours: 0,
      timeType: "",
      date: "",
      employeeId: null,
      projectId: null,
      companyId: null,
      results: []
      }
  }
  
    fetchTimesheets = async () => {

    fetch(`${APIURL}/timesheet/${this.props.employeeId}`, {
      method: "GET",
  
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`
      }),
    })
    
    .then((res) => res.json())
    .then((res) => this.setState({
      results: res.employeeTimesheets,
      hours: res.employeeTimesheets[0].hours,
      timeType: res.employeeTimesheets[0].timeType,
      date: res.employeeTimesheets[0].date,
      employeeId: res.employeeTimesheets[0].EmployeeId,
      projectId: res.employeeTimesheets[0].ProjectId,
      companyId: res.employeeTimesheets[0].CompanyId,
    }))
    .catch((err) => (`error: ${err}`));
    console.log(this.state.results)
  }


  componentDidMount() {
    this.fetchTimesheets()
  
  }
  
  render() { 
    return (
      <div>
    <TimesheetCreate sessionToken={this.props.sessionToken}/>

        <h1>Timesheets</h1>
        Hours: {this.state.hours}
        Time Type: {this.state.timeType}
        Date: {this.state.date}
        Employee Id: {this.state.employeeId}
        Project Id: {this.state.projectId}
        Company Id: {this.state.companyId}
        <Button onClick={this.fetchTimesheets}>Get Timesheets</Button>
      </div>
      );
  }
}

export default TimesheetIndex;