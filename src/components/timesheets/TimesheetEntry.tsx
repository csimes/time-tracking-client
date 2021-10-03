import React, { Component } from "react";
import { FormGroup, TextField, FormLabel, Button } from "@mui/material";
import APIURL from "../../helpers/environment";


type TimesheetEntryProps = {
sessionToken: string | null
}

type TimesheetEntryState = {
  hours: Number | 0,
  timeType: string,
  date: string,
}

class TimesheetEntry extends Component<TimesheetEntryProps, TimesheetEntryState> {
  constructor(props: TimesheetEntryProps) {
    super(props)
    this.state = {
      hours: 0,
      timeType: "",
      date: ""
      }
  }
  
  handleSubmit = async (e: any) => {
    e.preventDefault();
    const { hours, timeType, date} = this.state
    
    fetch(`${APIURL}/employee/create`, {
      method: "POST",
      body: JSON.stringify({
        hours: hours,
        timeType: timeType,
        date: date,
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
                <h1>Timesheet Entry</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
        <FormGroup>
          <FormLabel htmlFor="hours">Hours</FormLabel>            
          <TextField
            type="number"
            label="Hours"
            onChange={(e) => this.setState({hours: parseInt(e.target.value, 10)})}
            name="Hours"
            value={this.state.hours}
            required 
            />
        </FormGroup>
                <FormGroup>
          <FormLabel htmlFor="timeType">Time Type</FormLabel>            
          <TextField
            label="Time Type"
            onChange={(e) => this.setState({timeType: e.target.value})}
            name="Time Type"
            value={this.state.timeType}
            required 
            />
        </FormGroup>
                <FormGroup>
          <FormLabel htmlFor="date">Date</FormLabel>            
          <TextField
            label="Date"
            onChange={(e) => this.setState({date: e.target.value})}
            name="Date"
            value={this.state.date}
            required 
            />
        </FormGroup>
          <Button type="submit">Submit Timesheet</Button>
        </form>
      </div>
      );
  }
}

export default TimesheetEntry;