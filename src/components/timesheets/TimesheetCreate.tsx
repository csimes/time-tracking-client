import React, { Component } from "react";
import { FormGroup, TextField, FormControl, FormControlLabel, FormLabel, Button, Radio, RadioGroup, Container, CssBaseline, Typography } from "@mui/material";
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
        <Container className="" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5">Timesheet Entry</Typography>
        <form onSubmit={(e) => this.handleSubmit(e)}>
        <FormGroup>
          <FormLabel htmlFor="hours">Hours</FormLabel>            
          <TextField
            variant="outlined"
            margin="normal"
            autoFocus
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
            variant="outlined"
            margin="normal"
            autoComplete="email"
            autoFocus
            type="date"
            onChange={(e) => this.setState({date: e.target.value})}
            name="Date"
            value={this.state.date}
            required 
            />
        </FormGroup>
          <Button type="submit">Submit Timesheet</Button>
        </form>
      </Container>
      );
  }
}

export default TimesheetCreate;