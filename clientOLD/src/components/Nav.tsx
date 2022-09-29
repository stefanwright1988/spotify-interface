import React from "react";
import { Navbar } from "react-bootstrap";

const Nav = ({ children }) => {
  return <Navbar className="row">{children}</Navbar>;
};

export default Nav;
