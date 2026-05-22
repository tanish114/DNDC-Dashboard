import { useState, useEffect } from "react";
import users from "../data/users.json";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isMobile, setIsMobile] =
    useState(window.innerWidth < 768);

  const navigate = useNavigate();

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

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

      <div
        style={{
          ...styles.container,
          flexDirection: isMobile
            ? "column"
            : "row"
        }}
      >

        {/* LEFT */}

        <div
          style={{
            ...styles.leftSection,
            minHeight: isMobile
              ? "35vh"
              : "100vh"
          }}
        >

          <div style={styles.overlay}></div>

          <div
            style={{
              ...styles.leftContent,
              width: isMobile
                ? "90%"
                : "70%",
              textAlign: isMobile
                ? "center"
                : "left"
            }}
          >

            <div style={styles.logoBox}>
              DNDC
            </div>

            <h1
              style={{
                ...styles.brandTitle,
                fontSize: isMobile
                  ? "34px"
                  : "55px"
              }}
            >
              Teacher Dashboard
            </h1>

            <p
              style={{
                ...styles.brandText,
                fontSize: isMobile
                  ? "15px"
                  : "20px"
              }}
            >
              Manage Google Sheets,
              Uploads and Teacher Data
              in one centralized dashboard.
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div style={styles.rightSection}>

          <div
            style={{
              ...styles.card,
              padding: isMobile
                ? "30px 20px"
                : "50px"
            }}
          >

            <h2
              style={{
                ...styles.loginTitle,
                fontSize: isMobile
                  ? "28px"
                  : "38px"
              }}
            >
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
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
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
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
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
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    position: "absolute",
    top: "-100px",
    right: "-100px"
  },

  leftContent: {
    color: "white",
    zIndex: 2
  },

  logoBox: {
    width: "80px",
    height: "80px",
    borderRadius: "18px",
    background: "white",
    color: "#ff7b00",
    fontSize: "26px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "25px"
  },

  brandTitle: {
    marginBottom: "15px",
    lineHeight: "1.2"
  },

  brandText: {
    lineHeight: "1.7"
  },

  rightSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },

  card: {
    width: "100%",
    maxWidth: "430px",
    background: "white",
    borderRadius: "25px",
    boxShadow:
      "0 10px 40px rgba(0,0,0,0.08)"
  },

  loginTitle: {
    color: "#222",
    marginBottom: "10px"
  },

  loginSub: {
    color: "#777",
    marginBottom: "30px"
  },

  inputGroup: {
    marginBottom: "20px"
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#444",
    fontWeight: "600"
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    background: "#fafafa",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg,#ff7b00,#ff9500)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  }

};

export default Login;