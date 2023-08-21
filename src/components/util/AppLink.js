import React from "react";
import { Link } from "react-router-dom";
import "./css/AppLink.css";

export default function AppLink({ to, className, onClick, children }) {
  return (
    <Link to={to} className={`app-link ${className || ""}`} onClick={onClick}>
      {children}
    </Link>
  );
}
