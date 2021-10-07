import React, { Component } from "react";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeProfile from "./EmployeeProfile";


type EmployeeIndexProps = {
  sessionToken: string | null
  employeeId: number | null
  fetchEmployeeId : () => void
}

class EmployeeIndex extends Component<EmployeeIndexProps, {}> {
  constructor(props: EmployeeIndexProps) {
    super(props)
    this.state = { 
    }
  }

componentDidMount(){
  this.props.fetchEmployeeId()
}

componentDidUpdate(){
  this.props.fetchEmployeeId()
}

  render() { 
    return (  
      <div>
        {this.props.employeeId !== null ? <EmployeeProfile fetchEmployeeId={this.props.fetchEmployeeId} sessionToken={this.props.sessionToken} employeeId={this.props.employeeId} /> : <EmployeeCreate sessionToken={this.props.sessionToken} /> }


      </div>
      
    );
  }
}

export default EmployeeIndex;