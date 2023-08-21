import React from "react";
import "./css/UserLogin.css";
import UsersCardsList from "./UsersCardsList";

export default function UserLogin({ usersList }) {
  return (
    <div className="user-login">
      <h2>Choose User to login:</h2>
      <UsersCardsList usersList={usersList} />;
    </div>
  );
}
