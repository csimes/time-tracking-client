import React, { Component } from "react";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeProfile from "./EmployeeProfile";


type EmployeeIndexProps = {
  sessionToken: string | null
  employeeId: Number | null
}

class EmployeeIndex extends Component<EmployeeIndexProps, {}> {
  constructor(props: EmployeeIndexProps) {
    super(props)
    this.state = { 
    }
  }

  render() { 
    return (  
      <div>
        {this.props.employeeId !== null ? <EmployeeProfile sessionToken={this.props.sessionToken} employeeId={this.props.employeeId} /> : <EmployeeCreate sessionToken={this.props.sessionToken} /> }


      </div>
      
    );
  }
}

export default EmployeeIndex;