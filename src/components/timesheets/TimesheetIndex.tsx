import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import { Container, CssBaseline } from "@mui/material";

import TimesheetCreate from "./TimesheetCreate";
import Clock from "./Clock"
import TimesheetTable from "./TimesheetTable";
import TimesheetEdit from "./TimesheetEdit";


type TimesheetIndexProps = {
sessionToken: string | null
employeeId: number | null
}

type TimesheetIndexState = {
  results: [],
  updateActive: boolean,
  timesheetToUpdate: {}
}

class TimesheetIndex extends Component<TimesheetIndexProps, TimesheetIndexState> {
  constructor(props: TimesheetIndexProps) {
    super(props)
    this.state = {
      results: [],
      updateActive: false,
      timesheetToUpdate: {}
      }
  }
  
    fetchTimesheets = async () => {

    await fetch(`${APIURL}/timesheet/${this.props.employeeId}`, {
      method: "GET",
  
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`
      }),
    })
    
    .then((res) => res.json())
    .then((res) => this.setState({
      results: res.employeeTimesheets,
    }))
    .catch((err) => (`error: ${err}`));
    console.log(this.state.results)
  }


    editTimesheet = (timesheet : any) => {
        this.setState({timesheetToUpdate: this.state.results});
        console.log(timesheet);
    }

    updateOn = () => {
        this.setState({ updateActive: true});
    }
    updateOff = () => {
    this.setState({ updateActive: false});
    }
    

  componentDidMount() {
    this.fetchTimesheets()
  }
  
  render() { 
    return (
      <Container maxWidth="md">
        <CssBaseline />
        <Clock />
    <TimesheetCreate employeeId={this.props.employeeId} fetchTimesheets={this.fetchTimesheets} sessionToken={this.props.sessionToken}/>
    <TimesheetTable fetchTimesheets={this.fetchTimesheets} editTimesheet={this.editTimesheet} results={this.state.results} updateOn={this.updateOn} employeeId={this.props.employeeId} sessionToken={this.props.sessionToken}/>
    {this.state.updateActive ? <TimesheetEdit timesheetToUpdate={this.state.timesheetToUpdate} updateOff={this.updateOff} fetchTimesheets={this.fetchTimesheets} sessionToken={this.props.sessionToken} />: <></>}
      </Container>
      );
  }
}

export default TimesheetIndex;