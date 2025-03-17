import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4" style={{ width: "350px" }}>
        {/* Logo */}
        <div className="text-center mb-3">
          <img
            src="/logo3.png"
            alt="Titan Equity Group"
            className="img-fluid mx-auto d-block"
            style={{ maxWidth: "180px" }}
          />
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-center mb-3">
            <a
              href="#"
              style={{
                color: "black",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => (e.target.style.color = "gray")}
              onMouseLeave={(e) => (e.target.style.color = "black")}
            >
              Forgot username or password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ transition: "background-color 0.3s ease-in-out" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#000")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
