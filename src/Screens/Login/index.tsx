import '/src/assets/styles/global.scss';
import '/src/assets/styles/login.scss';

import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useAuth } from "../../contexts/loginContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await login({ email, password });

    if (response.success && response.user) {
      if (response.user.role === "BENEFICIARIO") {
        navigate("/dashboard/visualizar");
      } else {
        navigate("/dashboard");
      }
    } else {
      alert("Dados invalidos tente novamente!");
    }
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="position-relative" style={{ width: "400px" }}>
        <div className="d-flex justify-content-start">
          <BiArrowBack />
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};