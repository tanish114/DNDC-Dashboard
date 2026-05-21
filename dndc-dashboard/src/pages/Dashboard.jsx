import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {

  const loggedInUser = localStorage.getItem("loggedInUser");

  const storageKey = `sheets_${loggedInUser}`;

  const [sheetName, setSheetName] = useState("");
  const [sheetLink, setSheetLink] = useState("");
const [sheets, setSheets] = useState(() => {

  return JSON.parse(
    localStorage.getItem(storageKey)
  ) || [];

});
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedSheets, setSelectedSheets] = useState([]);

  useEffect(() => {

  localStorage.setItem(
    storageKey,
    JSON.stringify(sheets)
  );

}, [sheets, storageKey]);

  const handleUpload = () => {

    if (!sheetName || !sheetLink) {
      toast.error("Please fill all fields");
      return;
    }

    const newSheet = {
      id: Date.now(),
      name: sheetName,
      link: sheetLink,
    };

    setSheets([...sheets, newSheet]);

    setSheetName("");
    setSheetLink("");

    toast.success("Sheet Added");
  };

  const handleCheckbox = (id) => {

    if (selectedSheets.includes(id)) {

      setSelectedSheets(
        selectedSheets.filter((item) => item !== id)
      );

    } else {

      setSelectedSheets([
        ...selectedSheets,
        id
      ]);

    }
  };

  const handleDelete = () => {

    if (selectedSheets.length === 0) {
      toast.error("Select Sheets First");
      return;
    }

    const confirmDelete = window.confirm(
      "Delete Selected Sheets?"
    );

    if (confirmDelete) {

      const updatedSheets = sheets.filter(
        (sheet) =>
          !selectedSheets.includes(sheet.id)
      );

      setSheets(updatedSheets);

      setSelectedSheets([]);

      setDeleteMode(false);

      toast.success("Sheets Deleted");
    }
  };

  const handleLogout = () => {

    localStorage.removeItem("loggedInUser");

    window.location.href = "/";
  };

  return (
    <>
      <Toaster position="top-right" />

      <div style={styles.container}>

        {/* SIDEBAR */}

        <div style={styles.sidebar}>

          <h2 style={styles.logo}>
            DNDC
          </h2>

          <p style={styles.user}>
            {loggedInUser}
          </p>

          <button
            style={styles.logoutBtn}
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        {/* MAIN */}

        <div style={styles.main}>

          <div style={styles.topbar}>

            <h1 style={styles.heading}>
              Dashboard
            </h1>

          </div>

          {/* ADD SHEET */}

          <div style={styles.uploadCard}>

            <h2 style={styles.sectionTitle}>
              Add Google Sheet
            </h2>

            <input
              type="text"
              placeholder="Enter Sheet Name"
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Paste Google Sheet Link"
              value={sheetLink}
              onChange={(e) => setSheetLink(e.target.value)}
              style={styles.input}
            />

            <button
              style={styles.uploadBtn}
              onClick={handleUpload}
            >
              Upload Sheet
            </button>

          </div>

          {/* ACTION BUTTONS */}

          <div style={styles.actionBar}>

            <button
              style={styles.deleteBtn}
              onClick={() =>
                setDeleteMode(!deleteMode)
              }
            >
              {deleteMode
                ? "Cancel"
                : "Delete Mode"}
            </button>

            {deleteMode && (
              <button
                style={styles.confirmBtn}
                onClick={handleDelete}
              >
                Delete Selected
              </button>
            )}

          </div>

          {/* GRID */}

          <div style={styles.grid}>

            {sheets.length === 0 ? (

              <div style={styles.emptyCard}>
                No Sheets Uploaded Yet
              </div>

            ) : (

              sheets.map((sheet) => (

                <div
                  key={sheet.id}
                  style={styles.sheetCard}
                >

                  {deleteMode && (
                    <input
                      type="checkbox"
                      style={styles.checkbox}
                      checked={selectedSheets.includes(sheet.id)}
                      onChange={() =>
                        handleCheckbox(sheet.id)
                      }
                    />
                  )}

                  <div style={styles.fileIcon}>
                    📊
                  </div>

                  <h3 style={styles.sheetName}>
                    {sheet.name}
                  </h3>

                  <button
                    style={styles.openBtn}
                    onClick={() =>
                      window.open(sheet.link)
                    }
                  >
                    Open Sheet
                  </button>

                </div>

              ))

            )}

          </div>

        </div>

      </div>
    </>
  );
};

const styles = {

  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8f9fc"
  },

  sidebar: {
    width: "260px",
    background: "linear-gradient(180deg,#ff7b00,#ff9500)",
    padding: "30px",
    color: "white",
    display: "flex",
    flexDirection: "column"
  },

  logo: {
    fontSize: "35px",
    marginBottom: "30px"
  },

  user: {
    marginBottom: "20px",
    wordBreak: "break-word"
  },

  logoutBtn: {
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "white",
    color: "#ff7b00",
    fontWeight: "bold",
    cursor: "pointer"
  },

  main: {
    flex: 1,
    padding: "40px"
  },

  topbar: {
    marginBottom: "30px"
  },

  heading: {
    fontSize: "40px",
    color: "#222"
  },

  uploadCard: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
    marginBottom: "25px"
  },

  sectionTitle: {
    marginBottom: "20px",
    color: "#333"
  },

  input: {
    width: "100%",
    padding: "16px",
    marginBottom: "18px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    background: "#fafafa",
    fontSize: "15px"
  },

  uploadBtn: {
    padding: "15px 30px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#ff7b00,#ff9500)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  actionBar: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px"
  },

  deleteBtn: {
    padding: "14px 25px",
    border: "none",
    borderRadius: "12px",
    background: "#222",
    color: "white",
    cursor: "pointer"
  },

  confirmBtn: {
    padding: "14px 25px",
    border: "none",
    borderRadius: "12px",
    background: "#ff3b30",
    color: "white",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: "25px"
  },

  sheetCard: {
    background: "white",
    borderRadius: "20px",
    padding: "30px",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)"
  },

  checkbox: {
    position: "absolute",
    top: "18px",
    left: "18px",
    transform: "scale(1.4)"
  },

  fileIcon: {
    fontSize: "60px",
    marginBottom: "20px"
  },

  sheetName: {
    marginBottom: "20px",
    color: "#333"
  },

  openBtn: {
    padding: "14px 25px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#ff7b00,#ff9500)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  emptyCard: {
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    color: "#777"
  }

};

export default Dashboard;