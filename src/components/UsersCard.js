import React from "react";
import "./css/UsersCard.css";
import AppLink from "./util/AppLink";

export default function UsersCard({ userData }) {
  function getBackgroundColor() {
    const colors = ["orange", "white", "yellow"];

    const colorId = Math.trunc(Math.random() * 3);

    console.log(colorId);
    return colors[colorId];
  }

  return (
    <div
      className="users-card"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <AppLink to={`user/${userData.id}`}>{userData.name}</AppLink>
    </div>
  );
}
