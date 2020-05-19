import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}
      className="uk-background-primary uk-padding-small"
    >
      <Link to="/">
        <h3 style={{ margin: 0, color: "white" }}>Rapid Documentation</h3>
      </Link>
      <h4 style={{ margin: 0, color: "white" }}>Ankit Karna</h4>
    </div>
  );
}
