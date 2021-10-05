import React, { Component } from "react";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import {AppBar, Box, Toolbar, Typography, IconButton, FormControlLabel, FormGroup, MenuItem, Menu, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import EmployeeIndex from "../employee/EmployeeIndex";
import Login from "../auth/Login"
import Register from "../auth/Register"
interface NavigationProps {
  clearToken: () => void,
  sessionToken: string | null,
  protectedViews: () => void,
  updateToken: (newToken: string) => void
}

interface NavigationState {
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

            {this.props.sessionToken ? (
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
                  <MenuItem onClick={this.handleClose}><Link to="/employee/timesheets">Timesheets</Link></MenuItem>
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
                    <EmployeeIndex sessionToken={this.props.sessionToken} employeeId={null}/>
              </Route>
            </Switch>
        </div>
      </div>
    );
  }
}

export default Navigation;