import { useState } from "react";

const API_URL = "http://localhost:8081/api";

function Login({ onLogin }) {
    const [loginValue, setLoginValue] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [showRegister, setShowRegister] = useState(false);
    const [showForgot, setShowForgot] = useState(false);

    // =========================
    // LOGIN LOGIC - PRESERVED
    // =========================
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
            setMessage(
                "Invalid email/contact number or password."
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // FORGOT PASSWORD
    // =========================
    const handleForgotPassword = () => {
        setMessage(
            "Password reset request feature will be connected next."
        );
    };

    // =========================
    // REGISTER PAGE
    // =========================
    if (showRegister) {
        return (
            <div style={styles.page}>
                <div style={styles.simpleCard}>

                    <div style={styles.logo}>
                        N
                    </div>

                    <h1 style={styles.title}>
                        Register NGO
                    </h1>

                    <p style={styles.subtitle}>
                        Create your NGO Impact CRM account
                    </p>

                    <input
                        type="text"
                        placeholder="NGO Name"
                        style={styles.input}
                    />

                    <input
                        type="email"
                        placeholder="Registered NGO Email"
                        style={styles.input}
                    />

                    <input
                        type="tel"
                        placeholder="Registered Contact Number"
                        style={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Create Password"
                        style={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        style={styles.input}
                    />

                    <button
                        type="button"
                        style={styles.primaryButton}
                        onClick={() => {
                            alert(
                                "NGO registration will be connected to the backend next."
                            );
                        }}
                    >
                        Register NGO
                    </button>

                    <button
                        type="button"
                        style={styles.linkButton}
                        onClick={() => setShowRegister(false)}
                    >
                        ← Back to Login
                    </button>

                </div>
            </div>
        );
    }

    // =========================
    // FORGOT PASSWORD PAGE
    // =========================
    if (showForgot) {
        return (
            <div style={styles.page}>
                <div style={styles.simpleCard}>

                    <div style={styles.logo}>
                        N
                    </div>

                    <h1 style={styles.title}>
                        Forgot Password?
                    </h1>

                    <p style={styles.subtitle}>
                        Enter your registered NGO email or contact number.
                    </p>

                    <input
                        type="text"
                        placeholder="NGO Email / Registered Contact No."
                        style={styles.input}
                    />

                    <button
                        type="button"
                        style={styles.primaryButton}
                        onClick={handleForgotPassword}
                    >
                        Send Reset Request
                    </button>

                    <button
                        type="button"
                        style={styles.linkButton}
                        onClick={() => {
                            setShowForgot(false);
                            setMessage("");
                        }}
                    >
                        ← Back to Login
                    </button>

                    {message && (
                        <div style={styles.infoMessage}>
                            {message}
                        </div>
                    )}

                </div>
            </div>
        );
    }

    // =========================
    // MAIN LOGIN PAGE
    // =========================
    return (
        <div style={styles.page}>

            <div style={styles.loginContainer}>

                {/* ================= LEFT PANEL ================= */}

                <div style={styles.leftPanel}>

                    <div style={styles.brandRow}>
                        <div style={styles.brandLogo}>
                            N
                        </div>

                        <div>
                            <div style={styles.brandName}>
                                NGO Impact
                            </div>

                            <div style={styles.brandSub}>
                                CRM Platform
                            </div>
                        </div>
                    </div>

                    <div style={styles.leftContent}>

                        <div style={styles.eyebrow}>
                            SOCIAL IMPACT MANAGEMENT
                        </div>

                        <h1 style={styles.heroTitle}>
                            Empowering NGOs.
                            <br />
                            <span>Measuring Impact.</span>
                        </h1>

                        <p style={styles.heroText}>
                            Manage donors, donations, campaigns and
                            programmes from one powerful platform
                            designed for social-impact organizations.
                        </p>

                        <div style={styles.featureList}>

                            <div style={styles.featureItem}>
                                <div style={styles.featureIcon}>
                                    ✓
                                </div>

                                <div>
                                    <strong style={styles.featureTitle}>
                                        Donor Management
                                    </strong>

                                    <div style={styles.featureText}>
                                        Organize donor information and relationships.
                                    </div>
                                </div>
                            </div>

                            <div style={styles.featureItem}>
                                <div style={styles.featureIcon}>
                                    ✓
                                </div>

                                <div>
                                    <strong style={styles.featureTitle}>
                                        Campaign & Programme Tracking
                                    </strong>

                                    <div style={styles.featureText}>
                                        Track fundraising campaigns and programmes.
                                    </div>
                                </div>
                            </div>

                            <div style={styles.featureItem}>
                                <div style={styles.featureIcon}>
                                    ✓
                                </div>

                                <div>
                                    <strong style={styles.featureTitle}>
                                        Impact & Outcome Reporting
                                    </strong>

                                    <div style={styles.featureText}>
                                        Turn programme data into meaningful insights.
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div style={styles.leftFooter}>
                        Built for organizations creating positive social change.
                    </div>

                </div>


                {/* ================= RIGHT PANEL ================= */}

                <div style={styles.rightPanel}>

                    <div style={styles.formContainer}>

                        <div style={styles.mobileLogo}>
                            N
                        </div>

                        <div style={styles.welcomeBadge}>
                            NGO ADMINISTRATOR
                        </div>

                        <h2 style={styles.welcomeTitle}>
                            Welcome Back
                        </h2>

                        <p style={styles.welcomeText}>
                            Sign in to continue to your NGO dashboard.
                        </p>


                        <form onSubmit={handleLogin}>

                            {/* LOGIN ID */}

                            <div style={styles.fieldContainer}>

                                <label style={styles.label}>
                                    NGO Email / Registered Contact No.
                                </label>

                                <div
                                    style={{
                                        ...styles.inputWrapper,
                                        ...(loginValue
                                            ? styles.inputWrapperFocused
                                            : {}),
                                    }}
                                >

                                    <span style={styles.inputIcon}>
                                        @
                                    </span>

                                    <input
                                        type="text"
                                        value={loginValue}
                                        onChange={(e) =>
                                            setLoginValue(e.target.value)
                                        }
                                        placeholder="Enter email or contact number"
                                        required
                                        autoComplete="username"
                                        style={styles.formInput}
                                    />

                                </div>

                            </div>


                            {/* PASSWORD */}

                            <div style={styles.fieldContainer}>

                                <label style={styles.label}>
                                    Password
                                </label>

                                <div style={styles.inputWrapper}>

                                    <span style={styles.inputIcon}>
                                        •
                                    </span>

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter your password"
                                        required
                                        autoComplete="current-password"
                                        style={styles.formInput}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        style={styles.eyeButton}
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? "🙈" : "👁"}
                                    </button>

                                </div>

                            </div>


                            {/* FORGOT PASSWORD */}

                            <div style={styles.forgotRow}>

                                <button
                                    type="button"
                                    style={styles.forgotButton}
                                    onClick={() => {
                                        setShowForgot(true);
                                        setMessage("");
                                    }}
                                >
                                    Forgot Password?
                                </button>

                            </div>


                            {/* ERROR */}

                            {message && (
                                <div style={styles.errorMessage}>
                                    <span>!</span>
                                    {message}
                                </div>
                            )}


                            {/* LOGIN */}

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    ...styles.loginButton,
                                    ...(loading
                                        ? styles.loginButtonDisabled
                                        : {}),
                                }}
                            >
                                {loading
                                    ? "Signing in..."
                                    : "Sign In"}

                                {!loading && (
                                    <span style={styles.buttonArrow}>
                                        →
                                    </span>
                                )}
                            </button>

                        </form>


                        {/* REGISTER */}

                        <div style={styles.registerDivider}>
                            <span style={styles.dividerLine}></span>
                            <span style={styles.dividerText}>
                                New to NGO Impact CRM?
                            </span>
                            <span style={styles.dividerLine}></span>
                        </div>

                        <button
                            type="button"
                            style={styles.registerButton}
                            onClick={() => {
                                setShowRegister(true);
                                setMessage("");
                            }}
                        >
                            Register Your NGO
                        </button>


                        {/* SECURITY */}

                        <div style={styles.securityBox}>

                            <div style={styles.securityIcon}>
                                ✓
                            </div>

                            <div>
                                <strong style={styles.securityTitle}>
                                    Secure NGO Access
                                </strong>

                                <div style={styles.securityText}>
                                    Your account is protected for authorized
                                    NGO administrators.
                                </div>
                            </div>

                        </div>

                    </div>

                    <div style={styles.rightFooter}>
                        © 2026 NGO Impact CRM
                        <span>•</span>
                        Secure access for registered NGOs
                    </div>

                </div>

            </div>

        </div>
    );
}


// ======================================================
// STYLES
// ======================================================

const styles = {

    page: {
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
        background: "#f1f5f9",
    },

    loginContainer: {
        width: "100%",
        maxWidth: "1420px",
        height: "calc(100vh - 48px)",
        minHeight: "620px",
        minHeight: "760px",
        display: "flex",
        background: "#ffffff",
        borderRadius: "28px",
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(15, 23, 42, 0.18)",
        border: "1px solid rgba(226, 232, 240, 0.8)",
        boxSizing: "border-box",
    },

    // ================= LEFT =================

    leftPanel: {
        width: "56%",
        backgroundImage:
            'linear-gradient(90deg, rgba(0, 35, 30, 0.82) 0%, rgba(0, 65, 55, 0.58) 48%, rgba(0, 100, 85, 0.18) 100%), url("/ngo-login-bg.png")', backgroundRepeat: "no-repeat",
        color: "#ffffff",
        padding: "48px 56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
    },

    brandRow: {
        display: "flex",
        alignItems: "center",
        gap: "13px",
    },

    brandLogo: {
        width: "48px",
        height: "48px",
        borderRadius: "13px",
        background: "rgba(255,255,255,0.14)",
        border: "1px solid rgba(255,255,255,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "22px",
        fontWeight: "800",
        color: "#ffffff",
        boxShadow:
            "0 8px 25px rgba(0,0,0,0.15)",
    },

    brandName: {
        fontSize: "19px",
        fontWeight: "750",
        letterSpacing: "-0.3px",
    },

    brandSub: {
        marginTop: "2px",
        fontSize: "12px",
        color: "#99f6e4",
        letterSpacing: "0.5px",
    },

    leftContent: {
        maxWidth: "490px",
        marginTop: "40px",
        marginBottom: "40px",
    },

    eyebrow: {
        fontSize: "11px",
        fontWeight: "800",
        letterSpacing: "1.5px",
        color: "#5eead4",
        marginBottom: "16px",
    },

    heroTitle: {
        fontSize: "42px",
        lineHeight: "1.12",
        letterSpacing: "-1.6px",
        margin: "0 0 20px",
        fontWeight: "800",
        color: "#ffffff",
    },

    heroTitleSpan: {
        color: "#bfdbfe",
    },

    heroText: {
        fontSize: "15px",
        lineHeight: "1.7",
        color: "#d1fae5",
        margin: "0 0 34px",
        maxWidth: "450px",
    },

    featureList: {
        display: "flex",
        flexDirection: "column",
        gap: "18px",
    },

    featureItem: {
        display: "flex",
        alignItems: "flex-start",
        gap: "13px",
    },

    featureIcon: {
        flexShrink: 0,
        width: "27px",
        height: "27px",
        borderRadius: "50%",
        background: "rgba(94,234,212,0.12)",
        color: "#5eead4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        fontWeight: "800",
        border: "1px solid rgba(94,234,212,0.22)",
    },

    featureTitle: {
        display: "block",
        fontSize: "14px",
        color: "#ffffff",
        marginBottom: "3px",
    },

    featureText: {
        fontSize: "12px",
        color: "#94a3b8",
        lineHeight: "1.5",
    },

    leftFooter: {
        fontSize: "11px",
        color: "#94a3b8",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        paddingTop: "18px",
    },

    // ================= RIGHT =================

    rightPanel: {
        width: "44%",
        background: "#ffffff",
        padding: "52px 64px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxSizing: "border-box",
    },

    formContainer: {
        width: "100%",
        maxWidth: "440px",
        margin: "0 auto",
    },

    mobileLogo: {
        width: "46px",
        height: "46px",
        borderRadius: "12px",
        background: "#0f8b82",
        color: "#ffffff",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "21px",
        fontWeight: "800",
        marginBottom: "24px",
    },

    welcomeBadge: {
        display: "inline-flex",
        padding: "6px 10px",
        borderRadius: "999px",
        background: "#0f8b82",
        fontSize: "10px",
        fontWeight: "800",
        letterSpacing: "0.8px",
        marginBottom: "14px",
    },

    welcomeTitle: {
        margin: "0",
        color: "#0f172a",
        fontSize: "34px",
        lineHeight: "1.2",
        letterSpacing: "-1px",
        fontWeight: "800",
    },

    welcomeText: {
        margin: "9px 0 32px",
        color: "#64748b",
        fontSize: "14px",
        lineHeight: "1.6",
    },

    fieldContainer: {
        marginBottom: "20px",
    },

    label: {
        display: "block",
        marginBottom: "8px",
        fontSize: "13px",
        fontWeight: "700",
        color: "#334155",
    },

    inputWrapper: {
        width: "100%",
        height: "52px",
        display: "flex",
        alignItems: "center",
        border: "1px solid #cbd5e1",
        borderRadius: "11px",
        background: "#ffffff",
        boxSizing: "border-box",
        transition: "all 0.15s ease",
    },

    inputWrapperFocused: {
        border: "1px solid #2563eb",
        boxShadow: "0 0 0 3px rgba(37,99,235,0.10)",
    },

    inputIcon: {
        width: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#94a3b8",
        fontSize: "17px",
        fontWeight: "700",
        flexShrink: 0,
    },

    formInput: {
        flex: 1,
        height: "100%",
        minWidth: 0,
        border: "none",
        outline: "none",
        background: "transparent",
        fontSize: "14px",
        color: "#0f172a",
        padding: "0 10px 0 0",
        boxSizing: "border-box",
    },

    eyeButton: {
        width: "45px",
        height: "100%",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },

    forgotRow: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "-5px",
        marginBottom: "22px",
    },

    forgotButton: {
        border: "none",
        background: "transparent",
        color: "#0f8b82",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: "650",
        padding: "3px",
    },

    errorMessage: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "#fef2f2",
        color: "#b91c1c",
        border: "1px solid #fecaca",
        padding: "11px 13px",
        borderRadius: "9px",
        marginBottom: "16px",
        fontSize: "13px",
    },

    loginButton: {
        width: "100%",
        height: "53px",
        border: "none",
        borderRadius: "11px",
        background: "#0f8b82",
        color: "#ffffff",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "750",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        boxShadow:
            "0 8px 20px rgba(15,139,130,0.22)",
    },

    loginButtonDisabled: {
        background: "#7cc9c3",
        cursor: "not-allowed",
        boxShadow: "none",
    },

    buttonArrow: {
        fontSize: "18px",
        lineHeight: "1",
    },

    registerDivider: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "28px 0 16px",
    },

    dividerLine: {
        flex: 1,
        height: "1px",
        background: "#e2e8f0",
    },

    dividerText: {
        color: "#94a3b8",
        fontSize: "11px",
        whiteSpace: "nowrap",
    },

    registerButton: {
        width: "100%",
        height: "48px",
        border: "1px solid #cbd5e1",
        borderRadius: "10px",
        background: "#ffffff",
        color: "#0f8b82",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "700",
    },

    securityBox: {
        display: "flex",
        alignItems: "center",
        gap: "11px",
        marginTop: "25px",
        padding: "13px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
    },

    securityIcon: {
        width: "27px",
        height: "27px",
        borderRadius: "50%",
        background: "#dcfce7",
        color: "#15803d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "800",
        flexShrink: 0,
    },

    securityTitle: {
        display: "block",
        fontSize: "12px",
        color: "#334155",
        marginBottom: "2px",
    },

    securityText: {
        fontSize: "10px",
        color: "#94a3b8",
        lineHeight: "1.4",
    },

    rightFooter: {
        textAlign: "center",
        color: "#94a3b8",
        fontSize: "10px",
        marginTop: "30px",
    },

    // ================= SIMPLE PAGES =================

    simpleCard: {
        width: "420px",
        maxWidth: "100%",
        background: "#ffffff",
        padding: "42px",
        borderRadius: "18px",
        boxShadow:
            "0 20px 50px rgba(15,23,42,0.12)",
        boxSizing: "border-box",
        textAlign: "center",
    },

    logo: {
        width: "58px",
        height: "58px",
        background: "#2563eb",
        color: "#ffffff",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 18px",
        fontSize: "27px",
        fontWeight: "800",
    },

    title: {
        margin: "0 0 8px",
        fontSize: "28px",
        color: "#0f172a",
        fontWeight: "800",
    },

    subtitle: {
        margin: "0 0 28px",
        fontSize: "14px",
        color: "#64748b",
        lineHeight: "1.6",
    },

    input: {
        width: "100%",
        height: "50px",
        padding: "0 14px",
        marginBottom: "14px",
        border: "1px solid #cbd5e1",
        borderRadius: "9px",
        boxSizing: "border-box",
        fontSize: "14px",
        outline: "none",
    },

    primaryButton: {
        width: "100%",
        height: "51px",
        marginTop: "6px",
        border: "none",
        borderRadius: "9px",
        background: "#2563eb",
        color: "#ffffff",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "700",
    },

    linkButton: {
        border: "none",
        background: "transparent",
        color: "#2563eb",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "13px",
        padding: "12px",
    },

    infoMessage: {
        background: "#e7f6f3",
        color: "#0f766e",
        padding: "11px",
        borderRadius: "8px",
        marginTop: "15px",
        fontSize: "13px",
    },
};

export default Login;