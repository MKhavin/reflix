import React from "react";
import "./css/NavBar.css";
import AppLink from "./util/AppLink";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const links = ["films", "favourites"];

  const currentPath = useLocation().pathname;

  if (currentPath === "/") {
    return null;
  }

  return (
    <nav>
      <ul>
        {links.map((link, id) => (
          <AppLink to={link} className="navbar-link" key={id}>
            {link.toUpperCase()}
          </AppLink>
        ))}
      </ul>
    </nav>
  );
}
