import React, { Component } from "react";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeProfile from "./EmployeeProfile";


interface EmployeeIndexProps {
  sessionToken: string | null
}

interface EmployeeIndexState {
  // employeeId : Number | null
}

class EmployeeIndex extends Component<EmployeeIndexProps, EmployeeIndexState> {
  constructor(props: EmployeeIndexProps) {
    super(props)
    this.state = { 
      // employeeId: null
    }
  }

  // fetchEmployee = async () => {
  //   fetch(`http://localhost:3000/employee/`, {
  //     method: "GET",
  //     headers: new Headers ({
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${this.props.sessionToken}`
  //     })
  //   })
  //   .then((res) => res.json())
  //   .then((res) => console.log(res))
  //   // .then((res) => this.setState({employeeId: res.id}))
  //   .catch((err) => (`error: ${err}`));
    
  // }

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