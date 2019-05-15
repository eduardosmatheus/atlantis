import React from 'react';
import { Badge, Nav } from 'reactstrap';
import { Dropdown } from 'react-bootstrap';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/sygnet.svg'

class CustomToggle extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <div className="header-dropdown-toggle" onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}

function Header(props) {
  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logo, width: 150.176, height: 20.384, alt: 'CoreUI Logo' }}
        minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />
      <Nav className="ml-auto" navbar>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            <i className="fa fa-user" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Header className="text-center"><strong>Account</strong></Dropdown.Header>
            {/* <Dropdown.Item><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></Dropdown.Item>
            <Dropdown.Item><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></Dropdown.Item>
            <Dropdown.Item><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></Dropdown.Item>
            <Dropdown.Item><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></Dropdown.Item>
            <Dropdown.Header className="text-center"><strong>Settings</strong></Dropdown.Header>
            <Dropdown.Item><i className="fa fa-user"></i> Profile</Dropdown.Item>
            <Dropdown.Item><i className="fa fa-wrench"></i> Settings</Dropdown.Item>
            <Dropdown.Item><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></Dropdown.Item>
            <Dropdown.Item><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></Dropdown.Item>
            <Dropdown.Divider /> 
            <Dropdown.Item><i className="fa fa-shield"></i> Lock Account</Dropdown.Item>*/}
            <Dropdown.Item onClick={props.onSignOut}>
              <i className="fa fa-lock" />
              {' '}
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </React.Fragment>
  );
}

export default Header;
