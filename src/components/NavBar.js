import React from "react";
import "./css/NavBar.css";
import AppLink from "./util/AppLink";

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <AppLink to="films">Films</AppLink>
        </li>
        <li>
          <AppLink to="favourites">Favourites</AppLink>
        </li>
      </ul>
    </nav>
  );
}
