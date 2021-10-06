import React, { Component } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material"
import Register from "./Register";
import Login from "./Login";

type AuthProps = {
    updateToken: (newToken: string) => void
}

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type AuthState = {
  value: number
}
class Auth extends Component<AuthProps, AuthState> {
  constructor(props: AuthProps){
    super(props)
      this.state = {
        value: 0
      }
  }

  TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



handleChange = (e: React.SyntheticEvent, newValue: number) => {
    this.setState({value: newValue});
  };
  a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
  render() { 
    return ( 

    <div>
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={this.state.value} onChange={(e) => this.handleChange(e, this.state.value)} aria-label="basic tabs example">
          <Tab label="Item One" {...this.a11yProps(0)} />
          <Tab label="Item Two" {...this.a11yProps(1)} />
        </Tabs>
      </Box>
      <this.TabPanel value={this.state.value} index={0}>
      <Login updateToken={this.props.updateToken} />
      </this.TabPanel>
      <this.TabPanel value={this.state.value} index={1}>
      <Register updateToken={this.props.updateToken} />
      </this.TabPanel>
    </Box>
    </div> 
    
    );
  }
}

export default Auth;

function newValue(e: any, newValue: any) {
  throw new Error("Function not implemented.");
}
