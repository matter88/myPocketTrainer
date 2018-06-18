import React from 'react';
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Footer = () => {
    return (
        <div>
        {/* <div className="header-header">
          <Nav className="headerLink" bsStyle="pills" activeKey={1}>
            <Link className="headerLink" to="/">Contact</Link>
            <Link className="headerLink" to="/">GitHub</Link>
          </Nav>
        </div> */}
        <div className="copyright">
        Copyright 2018 myPocketTrainer LLC
        </div>
      </div>
    )
}

export default Footer;