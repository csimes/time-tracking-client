import React, { Component } from "react";
import EmployeeCreate from "./EmployeeCreate";

interface EmployeeIndexProps {
  
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
        <EmployeeCreate />
      </div>
    );
  }
}

export default EmployeeIndex;