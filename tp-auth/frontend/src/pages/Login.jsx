import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <p className="eyebrow">Access</p>
          <h1 className="title">Login</h1>
          <p className="subtitle">Connectez-vous pour gérer les utilisateurs.</p>
        </div>

        <form className="form" onSubmit={handleLogin}>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>

          {error && <div className="error">{error}</div>}
        </form>

        <p className="muted">
          No account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
