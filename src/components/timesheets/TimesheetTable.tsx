import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import { Button, Table, Divider } from "@mui/material";

type TimesheetTableProps = {
sessionToken: string | null
employeeId: number | null
results: []
fetchTimesheets : () => void
updateOn : () => void
editTimesheet : (timesheet: any) => void
}

type TimesheetTableState = {
  hours: number | 0,
  timeType: string,
  date: string,  
}

class TimesheetTable extends Component<TimesheetTableProps, TimesheetTableState> {
  constructor(props: TimesheetTableProps) {
    super(props)
    this.state = {
      hours: 0,
      timeType: "",
      date: "",
      }
      console.log(this.props.results)
  }

deleteTimesheet = async (timesheet: any) => {
    await fetch(`http://localhost:3000/remove/${timesheet.id}`, {
        method: "DELETE",
        headers: new Headers ({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.props.sessionToken}`
        })
    })
    .then((res) => this.props.fetchTimesheets())
}

  timesheetMapper = () => {
    return this.props.results.map((timesheet: any, index) => {
        return (
            <tr key={index}>
                <th>{timesheet.id}</th>
                <td>{timesheet.hours}</td>
                <td>{timesheet.timeType}</td>
                <td>{timesheet.date}</td>
                <td>
                    <Button onClick={() => {this.props.editTimesheet(timesheet); this.props.updateOn()}}>
                      Update
                      </Button>
                    <Button onClick={()=> this.deleteTimesheet(timesheet)}>
                        Delete
                    </Button>
                </td>
            </tr>
        );
    })
}

  componentDidMount(){
  this.props.fetchTimesheets()
  }
  
  render() { 
    return (
      <div>
            <h3>Timesheet History</h3>
            <Divider />
            <Table>
                <thead>
                    <tr>
                        <th>Timesheet ID</th>
                        <th>Hours</th>
                        <th>Time Type</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.timesheetMapper()}
                </tbody>
            </Table>
      </div>
      );
  }
}

export default TimesheetTable;