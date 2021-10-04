import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import TimesheetIndex from "../timesheets/TimesheetIndex";
import EmployeeProfile from "./EmployeeProfile";


type EmployeeIndexProps = {
  sessionToken: string | null
  employeeId: Number | null
}

type EmployeeIndexState = {
  employeeId: Number | null,
}

class EmployeeIndex extends Component<EmployeeIndexProps, EmployeeIndexState> {
  constructor(props: EmployeeIndexProps) {
    super(props)
    this.state = { 
        employeeId: null,
    }
  }
  fetchEmployeeId = async () => {
    fetch(`${APIURL}/employee/`, {
      method: "GET",
      headers: new Headers ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`
      })
    })
    .then((res) => res.json())
    .then((res) => this.setState({
      employeeId: res.employeeProfile.id
    }))
    .then((res) => console.log(res))
    .catch((err) => (`error: ${err}`));
    
  }

  componentDidMount(){
    this.fetchEmployeeId()
  }

  render() { 
    return (  
      <div>
        <EmployeeProfile  sessionToken={this.props.sessionToken} />
        <TimesheetIndex employeeId={this.state.employeeId} sessionToken={this.props.sessionToken}/>
        
      </div>
      
    );
  }
}

export default EmployeeIndex;