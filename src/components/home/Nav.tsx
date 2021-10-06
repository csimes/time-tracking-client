import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import {AppBar, Toolbar, Typography, IconButton, MenuItem, Menu, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import EmployeeIndex from "../employee/EmployeeIndex";
import EmployeeProfile from "../employee/EmployeeProfile";
import TimesheetIndex from "../timesheets/TimesheetIndex";
import Login from "../auth/Login"
import Register from "../auth/Register"

type NavigationProps = {
  clearToken: () => void,
  sessionToken: string | null,
  protectedViews: () => void,
  updateToken: (newToken: string) => void,
  employeeId: Number | null,
}

type NavigationState = {
  auth: boolean,
  anchorEl: string | null | undefined
}

class Navigation extends Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps) {
    super(props)
      this.state = {   
        auth: true,
        anchorEl: null
      }

  }

  handleChange = (e : any) => {
    this.setState({auth: e.target.checked});
  };

  handleMenu = (e : any) => {
    this.setState({anchorEl: e.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  }



  render() { 
    return (
      <div>
        <div>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}

            {this.props.sessionToken !== "" ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(e) => this.handleMenu(e)}
                  color="inherit"
                >
                  <AccountCircle />
                  <Typography variant="h6" component="h2">
                      &nbsp; My Account
                  </Typography>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  // anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}><Link to="/employee/profile">My Profile</Link></MenuItem>
                  <MenuItem onClick={this.handleClose}><Link to="/employee/timesheet">Timesheets</Link></MenuItem>
                  <MenuItem onClick={this.handleClose}>
                      <Link to="" onClick={this.props.clearToken}>
                          Logout
                      </Link>
                  </MenuItem>
                </Menu>
              </div>
            )
          : (
            <div>
            <Button onClick={this.handleClose}><Link to="/login">Login</Link></Button> 
            or
            <Button onClick={this.handleClose}><Link to="/register">Register</Link></Button>
            </div>
          )
          }
          </Toolbar>
        </AppBar>
        </div>
        <div>
            <Switch>
              <Route exact path="/login">
                <Login updateToken={this.props.updateToken}/>
              </Route>
              <Route exact path="/register">
                <Register updateToken={this.props.updateToken}/>
              </Route>
              <Route exact path="/employee/profile"> 
                  <EmployeeProfile sessionToken={this.props.sessionToken} employeeId={this.props.employeeId}/>
              </Route>
              <Route exact path="/employee/timesheet"> 
                <TimesheetIndex employeeId={this.props.employeeId} sessionToken={this.props.sessionToken}/>
              </Route>
            </Switch>
        </div>
      </div>
    );
  }
}

export default Navigation;