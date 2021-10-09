import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import { Button } from "@mui/material"


type AdminViewProps = {
  sessionToken: string | null
}

type AdminViewState = {
  companyId: number
}

class AdminView extends Component<AdminViewProps, AdminViewState> {
  constructor(props: AdminViewProps){
    super(props)
      this.state = { 
        companyId: 1
    }
  }
  
  fetchAllTimesheets = async () => {
    await fetch(`${APIURL}/timesheet/bycompany/${this.state.companyId}`, {
      method: "GET",
      headers: new Headers ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`
      })
    })
    .then((res) => res.json())
    .catch((err) => (`error: ${err}`));
  }


  deleteEmployee = async (employee: any) => {
    await fetch(`${APIURL}/employee/remove/${employee.id}`, {
        method: "DELETE",
        headers: new Headers ({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.props.sessionToken}`
        })
    })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => (`error: ${err}`));
}

  allTimesheetsMapper(){

  }

  allEmployeesMapper(){

  }
componentDidMount(){
  this.fetchAllTimesheets()
}
  render(){
    return(
      <div>
        Admin view
        <Button onClick={this.fetchAllTimesheets}>Gimme Timesheets</Button>
      </div>
    )
  }
}


export default AdminView;