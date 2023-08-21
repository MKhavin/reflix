import React from "react";
import "./css/NavBar.css";
import AppLink from "./util/AppLink";
import { useLocation } from "react-router-dom";

export default function NavBar({ userId }) {
  const links = {
    films: `user/${userId}/films`,
    "rented films": `user/${userId}/rented`,
    "log out": "/",
  };

  const currentPath = useLocation().pathname;

  if (currentPath === "/") {
    return null;
  }

  return (
    <nav>
      <ul>
        {Object.keys(links).map((key, id) => (
          <AppLink to={links[key]} className="navbar-link" key={id}>
            {key.toUpperCase()}
          </AppLink>
        ))}
      </ul>
    </nav>
  );
}
