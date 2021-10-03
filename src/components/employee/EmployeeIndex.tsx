import React, { Component } from "react";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeProfile from "./EmployeeProfile";


type EmployeeIndexProps = {
  sessionToken: string | null
}

type EmployeeIndexState = {
}

class EmployeeIndex extends Component<EmployeeIndexProps, EmployeeIndexState> {
  constructor(props: EmployeeIndexProps) {
    super(props)
    this.state = { 
    }
  }


  render() { 
    return (  
      <div>
        <EmployeeCreate sessionToken={this.props.sessionToken}/>
        <EmployeeProfile sessionToken={this.props.sessionToken}/>
      </div>
      
    );
  }
}

export default EmployeeIndex;