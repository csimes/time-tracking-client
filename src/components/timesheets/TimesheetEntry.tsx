import React, { Component } from "react";
import APIURL from "../../helpers/environment";


type TimesheetEntryProps = {
sessionToken: string | null
}

type TimesheetEntryState = {
  hours: Number,
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
      <div></div>
      );
  }
}

export default TimesheetEntry;