import React from "react";
import "../css/UsersCardsList.css";
import UsersCard from "./UsersCard";

export default function UsersCardsList({ usersList, userSelected }) {
  return (
    <div className="users-cards-list">
      {usersList.map((user) => (
        <UsersCard
          userData={user}
          key={crypto.randomUUID()}
          onClick={userSelected}
        />
      ))}
    </div>
  );
}
