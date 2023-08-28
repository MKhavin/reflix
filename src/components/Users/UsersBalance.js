import React from "react";
import "../css/UsersBalance.css";

export default function UsersBalance({ userBalance }) {
  return (
    <div className="users-balance">
      <span>Current balance: </span>
      <span>{userBalance}$</span>
    </div>
  );
}
