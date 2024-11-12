import React, { Component } from "react";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeProfile from "./EmployeeProfile";

type EmployeeIndexProps = {
  sessionToken: string | null;
  employeeId: number | null;
  fetchEmployeeId: () => void;
};

class EmployeeIndex extends Component<EmployeeIndexProps, {}> {
  constructor(props: EmployeeIndexProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.sessionToken) {
      //Check props instead of state
      this.props.fetchEmployeeId();
    }
  }

  render() {
    return (
      <div>
        {this.props.employeeId !== null ? (
          <EmployeeProfile
            fetchEmployeeId={this.props.fetchEmployeeId}
            sessionToken={this.props.sessionToken}
            employeeId={this.props.employeeId}
          />
        ) : (
          <EmployeeCreate
            sessionToken={this.props.sessionToken}
            fetchEmployeeId={this.props.fetchEmployeeId}
          />
        )}
      </div>
    );
  }
}

export default EmployeeIndex;
