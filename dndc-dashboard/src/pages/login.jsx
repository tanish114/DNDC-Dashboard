import { useState } from "react";
import users from "../data/users.json";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {

    e.preventDefault();

    const validUser = users.find(
      (user) =>
        user.username === username &&
        user.password === password
    );

    if (validUser) {

      toast.success("Login Successful 🚀");

      localStorage.setItem(
        "loggedInUser",
        username
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } else {

      toast.error("Wrong Username or Password");

    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div style={styles.container}>

        {/* LEFT SIDE */}

        <div style={styles.leftSection}>

          <div style={styles.overlay}></div>

          <div style={styles.leftContent}>

            <div style={styles.logoBox}>
              DNDC
            </div>

            <h1 style={styles.brandTitle}>
              Teacher Dashboard
            </h1>

            <p style={styles.brandText}>
              Manage Google Sheets, Uploads and Teacher Data
              in one centralized dashboard.
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div style={styles.rightSection}>

          <div style={styles.card}>

            <h2 style={styles.loginTitle}>
              Welcome Back 👋
            </h2>

            <p style={styles.loginSub}>
              Login to access your dashboard
            </p>

            <form onSubmit={handleLogin}>

              <div style={styles.inputGroup}>

                <label style={styles.label}>
                  Username
                </label>

                <input
                  type="email"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                />

              </div>

              <div style={styles.inputGroup}>

                <label style={styles.label}>
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                />

              </div>

              <button
                type="submit"
                style={styles.button}
              >
                Login to Dashboard
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
};

const styles = {

  container: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    background: "#f8f9fc",
    fontFamily: "Arial"
  },

  leftSection: {
    flex: 1,
    background:
      "linear-gradient(180deg,#ff7b00,#ff9500)",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },

  overlay: {
    width: "700px",
    height: "700px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    position: "absolute",
    top: "-200px",
    right: "-200px"
  },

  leftContent: {
    width: "70%",
    color: "white",
    zIndex: 2
  },

  logoBox: {
    width: "90px",
    height: "90px",
    borderRadius: "20px",
    background: "white",
    color: "#ff7b00",
    fontSize: "30px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
  },

  brandTitle: {
    fontSize: "55px",
    marginBottom: "20px",
    lineHeight: "1.2"
  },

  brandText: {
    fontSize: "20px",
    opacity: 0.95,
    lineHeight: "1.7"
  },

  rightSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    background: "white",
    padding: "50px",
    borderRadius: "30px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)"
  },

  loginTitle: {
    fontSize: "38px",
    color: "#222",
    marginBottom: "10px"
  },

  loginSub: {
    color: "#777",
    marginBottom: "40px",
    fontSize: "16px"
  },

  inputGroup: {
    marginBottom: "25px"
  },

  label: {
    display: "block",
    marginBottom: "10px",
    color: "#444",
    fontWeight: "600"
  },

  input: {
    width: "100%",
    padding: "17px",
    borderRadius: "14px",
    border: "1px solid #e2e2e2",
    background: "#fafafa",
    outline: "none",
    fontSize: "15px",
    transition: "0.3s"
  },

  button: {
    width: "100%",
    padding: "18px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg,#ff7b00,#ff9500)",
    color: "white",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 10px 25px rgba(255,123,0,0.3)"
  }

};

export default Login;