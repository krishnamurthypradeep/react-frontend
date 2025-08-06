// src/Login.jsx
import React, { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import {useNavigate} from "react-router-dom";



export default function Login() {

    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();
        setMsg("");
        try {
            await login(email, password);
            setMsg("Login successful!");
            navigate("/");
        } catch {
            setMsg("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 350, margin: "2rem auto" }}>
            <h3>Login</h3>
            <input type="email" placeholder="Email" value={email} required
                   onChange={e => setEmail(e.target.value)} className="form-control mb-2" />
            <input type="password" placeholder="Password" value={password} required
                   onChange={e => setPassword(e.target.value)} className="form-control mb-2" />
            <button className="btn btn-primary" type="submit">Login</button>
            {msg && <div className="mt-2">{msg}</div>}
        </form>
    );
}
