import React, { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import Logo from "../../assets/Image/logo.png";
import s from "./Admin.module.css";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("adminLoggedIn") === "true";
  });
  const [candidates, setCandidates] = useState([]);
  const [hoveredDesc, setHoveredDesc] = useState(null);
  const [currentView, setCurrentView] = useState("candidates");

  const [form, setForm] = useState({
    name: "",
    org: "SSG",
    position: "President",
    desc: "",
    imageFile: null,
    imagePreview: null,
  });

  useEffect(() => {
    if (isLoggedIn) {
      fetchCandidates();
    }
  }, [isLoggedIn]);

  const fetchCandidates = async () => {
    try {
      const response = await fetch("/api/candidates");
      const data = await response.json();
      setCandidates(data);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    }
  };

  const handleLoginSuccess = () => {
    localStorage.setItem("adminLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("org", form.org);
    formData.append("position", form.position);
    formData.append("desc", form.desc);
    if (form.imageFile) formData.append("image", form.imageFile);

    try {
      const response = await fetch("/api/candidates", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setForm({
          name: "",
          org: "SSG",
          position: "President",
          desc: "",
          imageFile: null,
          imagePreview: null,
        });
        fetchCandidates();
        alert("Candidate registered!");
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        const response = await fetch(`/api/candidates/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setCandidates(candidates.filter((c) => c.id !== id));
        }
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className={s.dashboardWrapper}>
      <aside className={s.sidebar}>
        <div className={s.sideHeader}>
          <img src={Logo} alt="Naga Parochial School Logo" />
        </div>
        <nav className={s.sideNav}>
          <div
            className={`${s.navItem} ${currentView === "candidates" ? s.navActive : ""}`}
            onClick={() => setCurrentView("candidates")}
          >
            Manage Candidates
          </div>
          <div
            className={`${s.navItem} ${currentView === "reports" ? s.navActive : ""}`}
            onClick={() => setCurrentView("reports")}
          >
            Reports
          </div>
        </nav>
        <button onClick={handleLogout} className={s.logoutBtn}>
          Logout
        </button>
      </aside>

      <main className={s.mainContent}>
        {currentView === "candidates" ? (
          <>
            <header className={s.mainHeader}>
              <h1>Candidate Management</h1>
              <p>Add and oversee participants for the 2026 Election</p>
            </header>

            <section className={s.contentGrid}>
              <div className={s.formCard}>
                <h3>Add New Candidate</h3>
                <form onSubmit={handleAddCandidate} className={s.adminForm}>
                  <div className={s.imageUploadSection}>
                    <div className={s.imagePreview}>
                      {form.imagePreview ? (
                        <img src={form.imagePreview} alt="Preview" />
                      ) : (
                        <div className={s.placeholderImg}>📸</div>
                      )}
                    </div>
                    <div className={s.fileInputWrapper}>
                      <label htmlFor="candidate-img" className={s.fileLabel}>
                        Choose Photo
                      </label>
                      <input
                        id="candidate-img"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={s.hiddenInput}
                      />
                    </div>
                  </div>

                  <div className={s.inputGroup}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      placeholder="e.g. Jose Rizal"
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className={s.row}>
                    <div className={s.inputGroup}>
                      <label>Organization</label>
                      <select
                        value={form.org}
                        onChange={(e) =>
                          setForm({ ...form, org: e.target.value })
                        }
                      >
                        <option value="SSG">SSG</option>
                        <option value="SCO">SCO</option>
                      </select>
                    </div>
                    <div className={s.inputGroup}>
                      <label>Position</label>
                      <select
                        value={form.position}
                        onChange={(e) =>
                          setForm({ ...form, position: e.target.value })
                        }
                      >
                        <option value="President">President</option>
                        <option value="Vice President">Vice President</option>
                        <option value="Secretary">Secretary</option>
                        <option value="Treasurer">Treasurer</option>
                      </select>
                    </div>
                  </div>

                  <div className={s.inputGroup}>
                    <label>Description</label>
                    <textarea
                      value={form.desc}
                      placeholder="Platform..."
                      onChange={(e) =>
                        setForm({ ...form, desc: e.target.value })
                      }
                      required
                    />
                  </div>

                  <button type="submit" className={s.addBtn}>
                    Register Candidate
                  </button>
                </form>
              </div>

              <div className={s.listCard}>
                <h3>Current Candidates ({candidates.length})</h3>
                <div className={s.candidateTableWrapper}>
                  <table className={s.table}>
                    <thead>
                      <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Org</th>
                        <th>Position</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidates.map((c) => (
                        <tr key={c.id} className={s.tableRow}>
                          <td>
                            <div className={s.tableAvatar}>
                              {c.image ? (
                                <img
                                  src={`http://localhost:5000/uploads/${c.image}`}
                                  alt={c.name}
                                />
                              ) : (
                                "👤"
                              )}
                            </div>
                          </td>
                          <td style={{ fontWeight: "800" }}>{c.name}</td>
                          <td>
                            <span className={s.badge}>{c.org}</span>
                          </td>
                          <td>{c.position}</td>
                          <td className={s.descCell}>
                            <span
                              className={s.seeMore}
                              onMouseEnter={() => setHoveredDesc(c)}
                              onMouseLeave={() => setHoveredDesc(null)}
                            >
                              See more...
                            </span>
                            {hoveredDesc?.id === c.id && (
                              <div className={s.descModal}>
                                <p>{c.description || c.desc}</p>
                              </div>
                            )}
                          </td>
                          <td>
                            <button
                              className={s.deleteBtn}
                              onClick={() => handleDelete(c.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Reports Layout */
          <>
            <div className={s.reportLayoutWrapper}>
              {/* Giant Rectangle Box */}
              <div className={s.reportGiantBox}>
                <h2 className={s.reportTitleText}>
                  Election Data Not Available
                </h2>
              </div>

              {/* Buttons placed completely outside the box */}
              <div className={s.reportActionWrapper}>
                <button className={s.reportPdfBtn}>Export as PDF</button>
                <button className={s.reportExcelBtn}>Export as Excel</button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
