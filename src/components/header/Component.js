import React, { Component } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import './styles.css'

export class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    }

    this.toggleNav = this.toggleNav.bind(this)
    this.toggleNavItem = this.toggleNavItem.bind(this)
    this.getWindowDimensions = this.getWindowDimensions.bind(this)
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    })
  }

  getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }

  toggleNavItem() {
    // only want this to work on medium devices and smaller
    // for the hamburger menu items.
    //
    // md = Medium ≥768px. Max container width 720px.
    const windowSize = this.getWindowDimensions()
    if (windowSize.width < 768) {
      this.setState({
        isNavOpen: !this.state.isNavOpen,
      })
    }
  }

  render() {
    return (
      <header key="app-header">
        <nav aria-label="Main Navigation">
          <Navbar
            className="navbar-dark app-navbar"
            variant="dark"
            expand="md"
            fixed="top"
            expanded={this.state.isNavOpen}
            onToggle={this.toggleNav}
          >
            <Container fluid>
              <Navbar.Toggle />
              <Navbar.Collapse>
                <Nav className="me-auto">
                  <Nav.Link as={NavLink} to="/" onClick={this.toggleNavItem}>
                    Home
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="https://platform.smarter.sh/"
                    onClick={this.toggleNavItem}
                    className=""
                  >
                    Platform
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="https://platform.smarter.sh/docs/"
                    onClick={this.toggleNavItem}
                    className=""
                  >
                    Documentation
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/contact" onClick={this.toggleNavItem}>
                    Contact
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </nav>
      </header>
    )
  }
}
