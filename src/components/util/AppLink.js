import React from "react";
import { Link } from "react-router-dom";
import "./css/AppLink.css";

export default function AppLink({ to, className, children }) {
  return (
    <Link to={to} className={`app-link ${className || ""}`}>
      {children}
    </Link>
  );
}
