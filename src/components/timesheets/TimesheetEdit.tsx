import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import { Container, Button, Dialog, Box, Typography, TextField, FormGroup, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from "@mui/material";

type TimesheetEditProps = {
  sessionToken: string | null
  fetchTimesheets : () => void
  timesheetToUpdate: any
  updateOff : () => void
}

type TimesheetEditState = {
  hours: number ,
  timeType: string,
  date: string,
  open: boolean
}

class TimesheetEdit extends Component<TimesheetEditProps, TimesheetEditState> {
  constructor(props: TimesheetEditProps){
    super(props) 
      this.state = { 
      hours: this.props.timesheetToUpdate.hours,
      timeType: this.props.timesheetToUpdate.timeType,
      date: this.props.timesheetToUpdate.date,
      open: true,
      
    }
  }

timesheetUpdate = async (e: any) => {
  e.preventDefault();
  const { hours, timeType, date } = this.state
    
    await fetch(`${APIURL}/timesheet/update/${this.props.timesheetToUpdate.id}`, {
      method: "PUT",
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
    .then((res) => this.props.fetchTimesheets())
    .then((res) => this.props.updateOff())
    .then((res) => console.log(res))
    .catch((err) => (`error: ${err}`));
      }

handleOpen = () => {
  this.setState({open: true})
}

handleClose = () => {
  this.setState({open: false})
}

  render() { 
    return (

    <Container className="timesheet" maxWidth="lg">
      <Dialog fullWidth={true} className="timesheet-edit" open={this.state.open} onClose={this.handleClose}>
                <Box >
                  <Typography variant="h6">Edit Timesheet</Typography>
              <form onSubmit={(e) => this.timesheetUpdate(e)}>
              <FormGroup>
                <FormLabel htmlFor="hours">Edit Hours</FormLabel>            
                <TextField
                  variant="outlined"
                  margin="normal"
                  autoFocus
                  type="number"
                  label="Hours"
                  onChange={(e) => this.setState({hours: parseInt(e.target.value, 10)})}
                  name="Hours"
                  defaultValue={this.props.timesheetToUpdate.hours}
                  required 
                  />
              </FormGroup>
              <FormGroup>
              <FormControl component="fieldset">
                <FormLabel component="legend" htmlFor="timeType">Edit Time Type</FormLabel>            
                <RadioGroup
                  aria-label="timeType"
                  defaultValue={this.props.timesheetToUpdate.timeType}
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
                <FormLabel htmlFor="date">Edit Date</FormLabel>            
                <TextField
                  variant="outlined"
                  margin="normal"
                  autoComplete="email"
                  autoFocus
                  type="date"
                  onChange={(e) => this.setState({date: e.target.value})}
                  name="Date"
                  defaultValue={this.props.timesheetToUpdate.date}
                  required 
                  />
              </FormGroup>
                <Button type="submit">Update Timesheet</Button>
                <Button onClick={this.handleClose} >Cancel</Button>
              </form>
                </Box>
              </Dialog>
    </Container>
      );
  }
}

export default TimesheetEdit;