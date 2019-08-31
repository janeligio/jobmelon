import React, { Component } from 'react';
import watermelon from '../images/watermelon.svg';

import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

// Reactstrap
import {
  Navbar, NavbarBrand, NavbarToggler, Collapse,
  Nav, NavItem, NavLink, Media
} from 'reactstrap'

class Header extends Component {

  state = {
    isOpen: false
  }
  toggle = () => { this.setState({isOpen: !this.state.isOpen})}

    onLogoutClick = event => {
      event.preventDefault();
      // Passing in this parameter in order to redirect to home page
      this.props.logoutUser(this.props.history); 
    }

    render() {
      const whiteText = { color: '#FFF'};

      return (
        <Navbar style={{background:'#71A95A', color:'#FFF'}}  light expand="md">
          <NavbarBrand style={{...whiteText, fontSize:'2em'}}>
            JobMelon
            <img 
          id="logo"
          src={ watermelon } 
          alt="Watermelon Icon"
          style={{width:'1em',height:'1em', marginLeft:'.5em'}}/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem><Link style={{ color: 'white', margin:'1em' }} to="/">Home</Link></NavItem>
                <ProfileButton
                  isAuthenticated={this.props.auth.isAuthenticated}
                />
                <LogoutButton
                  isAuthenticated={this.props.auth.isAuthenticated}
                  action={this.onLogoutClick}
                />
                <LoginButton
                  isAuthenticated={this.props.auth.isAuthenticated}
                />
                <RegisterButton
                  isAuthenticated={this.props.auth.isAuthenticated}
                />
            </Nav>
          </Collapse>
        </Navbar>
      );      
    }
  }

const OldNav = (props) => {
  const style = {
    color: 'white'
  }
    return (
    <header style={{backgroundColor: "#71A95A"}} id="Header">
    <div className="header-layout">
      <Link to="/" className="header-item-1" style={style}><h1>
        JobMelon
      </h1>
      </Link>
      <img 
          id="logo"
          src={ watermelon } 
          alt="Watermelon Icon"/>
      <Greeting user={this.props.auth.user} isAuthenticated={this.props.auth.isAuthenticated} />
      <nav className="header-item-2">
          <Link style={{order: 5, color:'white'}} to="/">Home</Link>
          <ProfileButton 
            isAuthenticated={this.props.auth.isAuthenticated}
          />
          <LogoutButton 
            isAuthenticated={this.props.auth.isAuthenticated}
            action={this.onLogoutClick}
          />
          <LoginButton 
            isAuthenticated={this.props.auth.isAuthenticated}
          />
          <RegisterButton 
            isAuthenticated={this.props.auth.isAuthenticated}
          />
      </nav>
    </div>
  </header>

  );
}

// If authenticated will show user and their role
const Greeting = props => {
  const { role, name } = props.user;
  return (
    props.isAuthenticated
    ? <p style={{color:'white', paddingTop:'1em'}}>({role}) Hello, {name}</p>
    : null
    )
};

// These are used to render either "Log Out" or "Log In / Sign Up"
const LogoutButton = props => (
  props.isAuthenticated 
  ? <NavItem><Link to="/" onClick={props.action} style={{margin:'1em', order: 3, color:'white'}}>Log Out</Link></NavItem>
  : null
);
const LoginButton = props => (
  !props.isAuthenticated 
  ? <NavItem><Link style={{margin:'1em', order: 2, color:'white'}} to="/login">Log In</Link></NavItem>
  : null
);
const RegisterButton = props => (
  !props.isAuthenticated 
  ? <NavItem><Link style={{margin:'1em', order: 1, color:'white'}} to="/register">Sign Up</Link></NavItem>
  : null
);

const ProfileButton = props => (
  !!props.isAuthenticated
  ? <NavItem><Link style={{margin:'1em', order: 4, color:'white'}} to="/profile">Profile</Link></NavItem>
  : null
);


Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Header));
