import React from "react";
import { useAuth } from "../services/auth";

export default function Profile() {
  const { user, token } = useAuth();

  if (!token) {
    return <div className="card"><h3>Please login</h3></div>;
  }

  return (
    <div className="card">
      <h2>Profile</h2>
      <div><strong>ID:</strong> {user?.id}</div>
      <div><strong>Email:</strong> {user?.email}</div>
      <div><strong>Role:</strong> {user?.role}</div>
    </div>
  );
}
