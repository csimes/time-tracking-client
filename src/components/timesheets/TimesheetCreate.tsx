import React, { Component } from "react";
import { FormGroup, TextField, FormControl, FormControlLabel, FormLabel, Button, Radio, RadioGroup } from "@mui/material";
import APIURL from "../../helpers/environment";


type TimesheetCreateProps = {
sessionToken: string | null
}

type TimesheetCreateState = {
  hours: Number | 0,
  timeType: string,
  date: string,
  employeeId: Number | undefined,
  projectId: Number | undefined,
  companyId: Number | undefined,
}

class TimesheetCreate extends Component<TimesheetCreateProps, TimesheetCreateState> {
  constructor(props: TimesheetCreateProps) {
    super(props)
    this.state = {
      hours: 0,
      timeType: "Regular",
      date: "",
      employeeId: undefined,
      projectId: undefined,
      companyId: undefined,
      }
  }
  
  handleSubmit = async (e: any) => {
    e.preventDefault();
    const { hours, timeType, date, employeeId, projectId, companyId } = this.state
    
    fetch(`${APIURL}/timesheet/new`, {
      method: "POST",
      body: JSON.stringify({
        hours: hours,
        timeType: timeType,
        date: date,
        employeeId: employeeId,
        projectId: projectId,
        companyId: companyId,
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
        <FormControl component="fieldset">
          <FormLabel component="legend" htmlFor="timeType">Time Type</FormLabel>            
          <RadioGroup
            aria-label="timeType"
            defaultValue="Regular"
            name="radio-buttons-group"
            onChange={(e) => this.setState({timeType: e.target.value})}
          >
            <FormControlLabel value="Regular" control={<Radio />} label="Regular" />
            <FormControlLabel value="Vacation" control={<Radio />} label="Vacation" />
            <FormControlLabel value="Personal" control={<Radio />} label="Personal" />
            <FormControlLabel value="Sick" control={<Radio />} label="Sick" />
          </RadioGroup>
          </FormControl>
        </FormGroup>
                <FormGroup>
          <FormLabel htmlFor="date">Date</FormLabel>            
          <TextField
            type="date"
            // label="Date"
            onChange={(e) => this.setState({date: e.target.value})}
            name="Date"
            value={this.state.date}
            required 
            />
        </FormGroup>
                {/* <FormGroup>
          <FormLabel htmlFor="companyId">Company ID</FormLabel>            
          <TextField
            type="number"
            label="Company Id"
            onChange={(e) => this.setState({companyId: e.target.value})}
            name="companyId"
            value={this.state.companyId}
            />
        </FormGroup> */}
          <Button type="submit">Submit Timesheet</Button>
        </form>
      </div>
      );
  }
}

export default TimesheetCreate;