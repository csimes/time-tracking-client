import React, { Component } from "react";
import APIURL from "../../helpers/environment";


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
    await fetch(`${APIURL}/bycompany/${this.state.companyId}`, {
      method: "GET",
      headers: new Headers ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.props.sessionToken}`
      })
    })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => (`error: ${err}`));
  }

  render(){
    return(
      <div>
        Admin view
      </div>
    )
  }
}


export default AdminView;