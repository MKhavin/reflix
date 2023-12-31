import React from "react";
import "../css/UserLogin.css";
import UsersCardsList from "./UsersCardsList";

export default function UserLogin({ usersList, userSelected }) {
  return (
    <div className="user-login">
      <h2>Choose User to login:</h2>
      <UsersCardsList usersList={usersList} userSelected={userSelected} />;
    </div>
  );
}
