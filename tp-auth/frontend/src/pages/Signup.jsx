import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [cin, setCin] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
        age: age ? Number(age) : null,
        cin: cin || null,
      });

      navigate("/login");
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <p className="eyebrow">Onboarding</p>
          <h1 className="title">Create account</h1>
          <p className="subtitle">Une inscription rapide et sécurisée.</p>
        </div>

        <form className="form" onSubmit={handleSignup}>
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="form-row">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-row">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="form-row">
            <label htmlFor="age">Age (optional)</label>
            <input
              id="age"
              type="number"
              placeholder="18"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="0"
            />
          </div>

          <div className="form-row">
            <label htmlFor="cin">CIN (optional)</label>
            <input
              id="cin"
              type="text"
              placeholder="CIN"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              Create account
            </button>
          </div>

          {error && <div className="error">{error}</div>}
        </form>

        <p className="muted">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
