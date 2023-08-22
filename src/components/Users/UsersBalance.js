import React from "react";
import "../css/UsersBalance.css";
import { useParams } from "react-router-dom";

export default function UsersBalance({ usersList }) {
  const { userId } = useParams();

  return (
    <div className="users-balance">
      <span>Current balance: </span>
      <span>{usersList[Number(userId) - 1].balance}$</span>
    </div>
  );
}
