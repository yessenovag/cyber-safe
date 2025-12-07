import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav("/profile");
    } catch (e: any) {
      setErr(e?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={submit} className="form">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
        {err && <div className="error">{err}</div>}
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}
