import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {

  const loggedInUser =
    localStorage.getItem("loggedInUser");

  const [isMobile, setIsMobile] =
    useState(window.innerWidth < 768);

  const storageKey = "globalSheets";
  const activityKey = "activityLogs";

  const [sheetName, setSheetName] =
    useState("");

  const [sheetLink, setSheetLink] =
    useState("");

  const [category, setCategory] =
    useState("Attendance Sheet");

  const [activeCategory, setActiveCategory] =
    useState("Attendance Sheet");

  const [deleteMode, setDeleteMode] =
    useState(false);

  const [selectedSheets, setSelectedSheets] =
    useState([]);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [openedSheet, setOpenedSheet] =
    useState(null);

  const [sheets, setSheets] = useState(() => {

    return JSON.parse(
      localStorage.getItem(storageKey)
    ) || [];

  });

  const [activityLogs, setActivityLogs] =
    useState(() => {

      return JSON.parse(
        localStorage.getItem(activityKey)
      ) || [];

    });

  // RESPONSIVE
  useEffect(() => {

    const handleResize = () => {

      setIsMobile(
        window.innerWidth < 768
      );

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

  // SAVE SHEETS
  useEffect(() => {

    localStorage.setItem(
      storageKey,
      JSON.stringify(sheets)
    );

  }, [sheets]);

  // SAVE ACTIVITY
  useEffect(() => {

    localStorage.setItem(
      activityKey,
      JSON.stringify(activityLogs)
    );

  }, [activityLogs]);

  // UPLOAD
  const handleUpload = () => {

    if (!sheetName || !sheetLink) {

      toast.error(
        "Please fill all fields"
      );

      return;

    }

    const newSheet = {

      id: Date.now(),

      name: sheetName,

      link: sheetLink,

      category: category

    };

    setSheets([
      ...sheets,
      newSheet
    ]);

    // ACTIVITY
    const newActivity = {

      id: Date.now(),

      action: "uploaded",

      user: loggedInUser,

      sheet: sheetName,

      category: category,

      time:
        new Date().toLocaleString()

    };

    setActivityLogs([
      newActivity,
      ...activityLogs
    ]);

    setSheetName("");
    setSheetLink("");

    toast.success(
      "Sheet Uploaded"
    );

  };

  // CHECKBOX
  const handleCheckbox = (id) => {

    if (
      selectedSheets.includes(id)
    ) {

      setSelectedSheets(

        selectedSheets.filter(
          (item) => item !== id
        )

      );

    } else {

      setSelectedSheets([
        ...selectedSheets,
        id
      ]);

    }
  };

  // DELETE
  const handleDelete = () => {

    if (
      selectedSheets.length === 0
    ) {

      toast.error(
        "Select Sheets First"
      );

      return;

    }

    const confirmDelete =
      window.confirm(
        "Delete Selected Sheets?"
      );

    if (confirmDelete) {

      const sheetsToDelete =
        sheets.filter(
          (sheet) =>
            selectedSheets.includes(
              sheet.id
            )
        );

      const deleteActivities =
        sheetsToDelete.map(
          (sheet) => ({

            id:
              Date.now() +
              Math.random(),

            action: "deleted",

            user: loggedInUser,

            sheet: sheet.name,

            category:
              sheet.category,

            time:
              new Date().toLocaleString()

          })
        );

      setActivityLogs([
        ...deleteActivities,
        ...activityLogs
      ]);

      const updatedSheets =
        sheets.filter(
          (sheet) =>
            !selectedSheets.includes(
              sheet.id
            )
        );

      setSheets(updatedSheets);

      setSelectedSheets([]);

      setDeleteMode(false);

      toast.success(
        "Sheets Deleted"
      );

    }
  };

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem(
      "loggedInUser"
    );

    window.location.href = "/";

  };

  // FILTER
  const filteredSheets =
    sheets.filter(

      (sheet) =>
        sheet.category ===
        activeCategory

    );

  return (
    <>

      <Toaster position="top-right" />

      <div
        style={{
          ...styles.container,
          flexDirection:
            isMobile
              ? "column"
              : "row"
        }}
      >

        {/* SIDEBAR */}

        <div
          style={{
            ...styles.sidebar,
            width:
              isMobile
                ? "100%"
                : "240px"
          }}
        >

          <div>

            <h1 style={styles.logo}>
              DNDC
            </h1>

            <p style={styles.user}>
              {loggedInUser}
            </p>

            <div
              style={{
                ...styles.menu,
                flexDirection:
                  isMobile
                    ? "row"
                    : "column"
              }}
            >

              {[
                "Attendance Sheet",
                "Marks Sheet",
                "Batch Timing",
                "Student Data Sheet"
              ].map((item) => (

                <div
                  key={item}

                  style={
                    activeCategory ===
                    item

                      ? styles.activeMenuItem

                      : styles.menuItem
                  }

                  onClick={() =>
                    setActiveCategory(
                      item
                    )
                  }
                >
                  {item}
                </div>

              ))}

            </div>

          </div>

          <button
            style={styles.logoutBtn}
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        {/* MAIN */}

        <div
          style={{
            ...styles.main,
            padding:
              isMobile
                ? "15px"
                : "22px"
          }}
        >

          {/* TOPBAR */}

          <div style={styles.topbar}>

            <h1
              style={{
                ...styles.heading,
                fontSize:
                  isMobile
                    ? "22px"
                    : "30px"
              }}
            >
              {activeCategory}
            </h1>

            <button
              style={styles.activityBtn}
              onClick={() =>
                setDrawerOpen(true)
              }
            >
              Activity
            </button>

          </div>

          {/* DRAWER */}

          {drawerOpen && (

            <div
              style={{
                ...styles.drawer,
                width:
                  isMobile
                    ? "100%"
                    : "400px"
              }}
            >

              <div
                style={styles.drawerTop}
              >

                <h2>
                  Activity Logs
                </h2>

                <button
                  style={
                    styles.closeBtn
                  }

                  onClick={() =>
                    setDrawerOpen(
                      false
                    )
                  }
                >
                  ✕
                </button>

              </div>

              <div
                style={
                  styles.activityContainer
                }
              >

                {activityLogs.length ===
                0 ? (

                  <p>
                    No Activity Yet
                  </p>

                ) : (

                  activityLogs.map(
                    (log) => (

                      <div
                        key={log.id}

                        style={
                          styles.activityCard
                        }
                      >

                        <h4>
                          {log.user}
                        </h4>

                        <p>
                          {log.action}
                          {" "}
                          sheet:
                        </p>

                        <strong>
                          {log.sheet}
                        </strong>

                        <p>
                          Category:
                          {" "}
                          {
                            log.category
                          }
                        </p>

                        <small>
                          {log.time}
                        </small>

                      </div>

                    )
                  )

                )}

              </div>

            </div>

          )}

          {/* SHEET VIEWER */}

          {openedSheet && !isMobile && (

            <div style={styles.viewerContainer}>

              <div style={styles.viewerTop}>

                <h3>
                  {openedSheet.name}
                </h3>

                <button
                  style={
                    styles.closeSheetBtn
                  }

                  onClick={() =>
                    setOpenedSheet(null)
                  }
                >
                  Close
                </button>

              </div>

              <iframe
                src={openedSheet.link}
                title="sheet"
                style={styles.iframe}
              />

            </div>

          )}

          {/* UPLOAD */}

          <div style={styles.uploadCard}>

            <h2
              style={
                styles.sectionTitle
              }
            >
              Upload New Sheet
            </h2>

            <input
              type="text"
              placeholder="Enter Sheet Name"
              value={sheetName}
              onChange={(e) =>
                setSheetName(
                  e.target.value
                )
              }

              style={styles.input}
            />

            <input
              type="text"
              placeholder="Paste Google Sheet Link"
              value={sheetLink}
              onChange={(e) =>
                setSheetLink(
                  e.target.value
                )
              }

              style={styles.input}
            />

            <select
              style={styles.input}

              value={category}

              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
            >

              <option>
                Attendance Sheet
              </option>

              <option>
                Marks Sheet
              </option>

              <option>
                Batch Timing
              </option>

              <option>
                Student Data Sheet
              </option>

            </select>

            <button
              style={styles.uploadBtn}

              onClick={handleUpload}
            >
              Upload Sheet
            </button>

          </div>

          {/* ACTIONS */}

          <div style={styles.actionBar}>

            <button
              style={styles.deleteBtn}

              onClick={() =>
                setDeleteMode(
                  !deleteMode
                )
              }
            >

              {deleteMode
                ? "Cancel"
                : "Delete Mode"}

            </button>

            {deleteMode && (

              <button
                style={
                  styles.confirmBtn
                }

                onClick={
                  handleDelete
                }
              >
                Delete Selected
              </button>

            )}

          </div>

          {/* GRID */}

          <div
            style={{
              ...styles.grid,

              gridTemplateColumns:
                isMobile

                  ? "1fr"

                  : "repeat(auto-fit,minmax(220px,1fr))"
            }}
          >

            {filteredSheets.length ===
            0 ? (

              <div
                style={
                  styles.emptyCard
                }
              >
                No Sheets Available
              </div>

            ) : (

              filteredSheets.map(
                (sheet) => (

                  <div
                    key={sheet.id}

                    style={
                      styles.sheetCard
                    }
                  >

                    {deleteMode && (

                      <input
                        type="checkbox"

                        style={
                          styles.checkbox
                        }

                        checked={
                          selectedSheets.includes(
                            sheet.id
                          )
                        }

                        onChange={() =>
                          handleCheckbox(
                            sheet.id
                          )
                        }
                      />

                    )}

                    <div
                      style={
                        styles.fileIcon
                      }
                    >
                      📊
                    </div>

                    <h3
                      style={
                        styles.sheetName
                      }
                    >
                      {sheet.name}
                    </h3>

                    <button
                      style={
                        styles.openBtn
                      }

                      onClick={() => {

                        if (isMobile) {

                          window.open(
                            sheet.link,
                            "_blank"
                          );

                        } else {

                          setOpenedSheet(
                            sheet
                          );

                        }

                      }}
                    >
                      Open Sheet
                    </button>

                  </div>

                )
              )

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
    background: "#f8f9fc",
    fontFamily: "Arial"
  },

  sidebar: {
    background:
      "linear-gradient(180deg,#ff7b00,#ff9500)",
    padding: "20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "15px"
  },

  logo: {
    fontSize: "28px",
    marginBottom: "15px"
  },

  user: {
    marginBottom: "20px"
  },

  menu: {
    display: "flex",
    gap: "10px",
    overflowX: "auto"
  },

  menuItem: {
    padding: "12px",
    borderRadius: "12px",
    cursor: "pointer",
    background:
      "rgba(255,255,255,0.15)",
    minWidth: "140px"
  },

  activeMenuItem: {
    padding: "12px",
    borderRadius: "12px",
    background: "white",
    color: "#ff7b00",
    fontWeight: "bold",
    cursor: "pointer",
    minWidth: "140px"
  },

  logoutBtn: {
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    background: "white",
    color: "#ff7b00",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px"
  },

  main: {
    flex: 1,
    position: "relative"
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  heading: {
    color: "#222"
  },

  activityBtn: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg,#ff7b00,#ff9500)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  drawer: {
    height: "100vh",
    background: "white",
    position: "fixed",
    top: 0,
    right: 0,
    boxShadow:
      "-5px 0 20px rgba(0,0,0,0.1)",
    zIndex: 1000,
    padding: "20px",
    overflowY: "auto"
  },

  drawerTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },

  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "22px",
    cursor: "pointer"
  },

  activityContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  activityCard: {
    background: "#fff7f0",
    padding: "15px",
    borderRadius: "12px"
  },

  viewerContainer: {
    background: "white",
    padding: "18px",
    borderRadius: "18px",
    marginBottom: "20px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.08)"
  },

  viewerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },

  closeSheetBtn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    background: "#ff3b30",
    color: "white",
    cursor: "pointer"
  },

  iframe: {
    width: "100%",
    height: "600px",
    border: "none",
    borderRadius: "12px"
  },

  uploadCard: {
    background: "white",
    padding: "18px",
    borderRadius: "18px",
    marginBottom: "20px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.08)"
  },

  sectionTitle: {
    marginBottom: "18px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    background: "#fafafa"
  },

  uploadBtn: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg,#ff7b00,#ff9500)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  actionBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },

  deleteBtn: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#222",
    color: "white",
    cursor: "pointer"
  },

  confirmBtn: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#ff3b30",
    color: "white",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gap: "18px"
  },

  sheetCard: {
    background: "white",
    borderRadius: "18px",
    padding: "18px",
    textAlign: "center",
    position: "relative",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.08)"
  },

  checkbox: {
    position: "absolute",
    top: "15px",
    left: "15px",
    transform: "scale(1.3)"
  },

  fileIcon: {
    fontSize: "38px",
    marginBottom: "15px"
  },

  sheetName: {
    marginBottom: "15px"
  },

  openBtn: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg,#ff7b00,#ff9500)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  emptyCard: {
    background: "white",
    padding: "30px",
    borderRadius: "18px",
    textAlign: "center"
  }

};

export default Dashboard;