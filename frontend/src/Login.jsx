import { useState } from "react";

const API_URL = "http://localhost:8081/api";

function Login({ onLogin }) {
    const [loginValue, setLoginValue] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/ngo/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: loginValue,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error("Invalid login details");
            }

            const ngo = await response.json();

            const loggedInNgoData = {
                ...ngo,
                ngoName: ngo.ngoName || ngo.name || "NGO",
            };

            sessionStorage.setItem(
                "ngoUser",
                JSON.stringify(loggedInNgoData)
            );

            onLogin(loggedInNgoData);

        } catch (error) {
            console.error("Login error:", error);
            setMessage("Invalid email/contact number or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                {/* LOGO */}
                <div className="login-brand-mark">
                    N
                </div>

                {/* TITLE */}
                <h1 className="login-title">
                    NGO Impact CRM
                </h1>

                <p className="login-subtitle">
                    NGO Login Portal
                </p>

                {/* LOGIN FORM */}
                <form onSubmit={handleLogin}>

                    {/* EMAIL / CONTACT */}
                    <div className="login-field">
                        <label className="login-label">
                            NGO Email / Registered Contact No.
                        </label>

                        <input
                            type="text"
                            value={loginValue}
                            onChange={(e) =>
                                setLoginValue(e.target.value)
                            }
                            placeholder="Enter email or contact number"
                            required
                            autoComplete="username"
                            className="login-input"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="login-field">
                        <label className="login-label">
                            Password
                        </label>

                        <div className="login-password-wrapper">

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter password"
                                required
                                autoComplete="current-password"
                                className="login-input login-password-input"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="login-password-toggle"
                                title={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>

                        </div>
                    </div>

                    {/* FORGOT PASSWORD */}
                    <div className="login-forgot-row">
                        <button
                            type="button"
                            className="login-text-button"
                            onClick={() =>
                                setMessage(
                                    "Password reset feature will be connected next."
                                )
                            }
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* ERROR MESSAGE */}
                    {message && (
                        <div className="login-message">
                            {message}
                        </div>
                    )}

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="login-submit"
                    >
                        {loading ? "Logging in..." : "LOGIN"}
                    </button>

                </form>

                {/* REGISTER */}
                <div className="login-register">
                    <p className="login-register-copy">
                        Don't have an NGO account?
                    </p>

                    <button
                        type="button"
                        className="login-text-button login-register-button"
                        onClick={() =>
                            setMessage(
                                "NGO registration feature will be connected next."
                            )
                        }
                    >
                        Register NGO
                    </button>
                </div>

                {/* FOOTER */}
                <div className="login-security-note">
                    Secure access for registered NGOs
                </div>

            </div>
        </div>
    );
}

export default Login;