import React, { Component } from "react";
import {AppBar, Box, Toolbar, Typography, IconButton, Switch, FormControlLabel, FormGroup, MenuItem, Menu} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
interface NavigationProps {
  clearToken: () => void
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
          <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.auth}
              onChange={(e) => this.handleChange(e)}
              onClick={this.props.clearToken}
              aria-label="login switch"
            />
          }
          label={this.state.auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee Login
          </Typography> */}
          {this.state.auth && (
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
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>

    );
  }
}

export default Navigation;