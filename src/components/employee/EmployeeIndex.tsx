import React, { Component } from "react";
import EmployeeCreate from "./EmployeeCreate";

interface EmployeeIndexProps {
  sessionToken: string | null
}

interface EmployeeIndexState {
  
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
      </div>
    );
  }
}

export default EmployeeIndex;