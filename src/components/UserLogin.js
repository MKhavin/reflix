import React from "react";
import "./css/UserLogin.css";
import UsersCardsList from "./UsersCardsList";

export default function UserLogin() {
  const userList = [
    { name: "Michael", id: 2 },
    { name: "Rone", id: 1 },
  ];

  return (
    <div className="user-login">
      <h2>Choose User to login:</h2>
      <UsersCardsList usersList={userList} />;
    </div>
  );
}
