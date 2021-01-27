import React from 'react';
import {Navbar, Button, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";

export default (props) => (
    <Navbar bg="dark">
        <Navbar.Brand style={{color: "white"}}>
            <Link to="/dashboard">
                Hubble
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse className="justify-content-end">
            <Nav.Link href="/admin" style={{color: "white"}}>
                Admin
            </Nav.Link>
            <Nav.Link onClick={props.logout}>
                Log Out
            </Nav.Link>
        </Navbar.Collapse>
    </Navbar>
)



