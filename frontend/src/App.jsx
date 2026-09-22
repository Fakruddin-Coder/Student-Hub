import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api/students";

  const [students, setStudents] = useState([]);

  // Add form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");

  // Edit modal
  const [editingStudent, setEditingStudent] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editCourse, setEditCourse] = useState("");
  const [editYear, setEditYear] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("studenthub-theme") === "dark"
  );

  const courses = [
    "Computer Engineering",
    "Information Technology",
    "Artificial Intelligence & ML",
    "Data Science",
    "Electronics & Telecommunication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
  ];

  const years = ["1", "2", "3", "4"];

  // Apply theme
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";

    localStorage.setItem(
      "studenthub-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // Get students
  const getStudents = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Add student
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !course || !year) {
      alert("Please fill all fields");
      return;
    }

    const student = {
      name,
      email,
      course,
      year: Number(year),
    };

    try {
      setSaving(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      clearAddForm();
      await getStudents();

      alert("Student added successfully");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Unable to add student");
    } finally {
      setSaving(false);
    }
  };

  // Open edit modal
  const openEditModal = (student) => {
    setEditingStudent(student);

    setEditName(student.name);
    setEditEmail(student.email);
    setEditCourse(student.course);
    setEditYear(String(student.year));
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingStudent(null);

    setEditName("");
    setEditEmail("");
    setEditCourse("");
    setEditYear("");
  };

  // Save edited student
  const saveEdit = async (e) => {
    e.preventDefault();

    if (!editName || !editEmail || !editCourse || !editYear) {
      alert("Please fill all fields");
      return;
    }

    const updatedStudent = {
      name: editName,
      email: editEmail,
      course: editCourse,
      year: Number(editYear),
    };

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/${editingStudent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStudent),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      closeEditModal();
      await getStudents();

      alert("Student updated successfully");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Unable to update student");
    } finally {
      setSaving(false);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    const student = students.find(
      (item) => item.id === id
    );

    const confirmDelete = window.confirm(
      `Delete ${student?.name || "this student"}?\n\nThis action cannot be undone.`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      await getStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Unable to delete student");
    }
  };

  // Clear add form
  const clearAddForm = () => {
    setName("");
    setEmail("");
    setCourse("");
    setYear("");
  };

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setCourseFilter("");
    setYearFilter("");
  };

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        student.name.toLowerCase().includes(searchText) ||
        student.email.toLowerCase().includes(searchText) ||
        student.course.toLowerCase().includes(searchText);

      const matchesCourse =
        !courseFilter ||
        student.course === courseFilter;

      const matchesYear =
        !yearFilter ||
        String(student.year) === yearFilter;

      return (
        matchesSearch &&
        matchesCourse &&
        matchesYear
      );
    });
  }, [students, search, courseFilter, yearFilter]);

  return (
    <div className="app">

      {/* Animated Background */}
      <div className="bg-circle circle-one"></div>
      <div className="bg-circle circle-two"></div>
      <div className="bg-circle circle-three"></div>

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo-section">
          <div className="logo-icon">
            🎓
          </div>

          <div>
            <h2>
              Student<span>Hub</span>
            </h2>

            <p>
              Student Record System
            </p>
          </div>
        </div>

        <div className="nav-right">

          <div className="online-status">
            <span></span>
            System Online
          </div>

          <button
            className="theme-button"
            onClick={() => setDarkMode(!darkMode)}
            title={
              darkMode
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"
            }
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>

      </nav>

      {/* Main */}
      <main className="container">

        {/* Hero */}
        <section className="hero">

          <div className="hero-content">

            <p className="small-title">
              STUDENT MANAGEMENT SYSTEM
            </p>

            <h1>
              Manage Your
              <span> Students</span>
            </h1>

            <p className="hero-text">
              Add, update, search and manage student
              records from one simple dashboard.
            </p>

            <div className="hero-points">
              <span>✓ Easy Management</span>
              <span>✓ Fast Search</span>
              <span>✓ Secure Records</span>
            </div>

          </div>

          <div className="hero-card">
            <div className="hero-card-icon">
              🎓
            </div>

            <div className="hero-card-line"></div>

            <p>
              Student<br />
              Management
            </p>
          </div>

        </section>

        {/* Statistics */}
        <section className="stats">

          <div className="stat-card">
            <div className="stat-icon blue-icon">
              👨‍🎓
            </div>

            <div>
              <p>Total Students</p>
              <h2>{students.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green-icon">
              ✓
            </div>

            <div>
              <p>System Status</p>
              <h2 className="active-text">
                Active
              </h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple-icon">
              ⚡
            </div>

            <div>
              <p>Backend</p>
              <h2>Express</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange-icon">
              💾
            </div>

            <div>
              <p>Storage</p>
              <h2>Array</h2>
            </div>
          </div>

        </section>

        {/* Add Student */}
        <section className="card">

          <div className="section-heading">

            <div className="heading-icon">
              +
            </div>

            <div>
              <h2>
                Add New Student
              </h2>

              <p>
                Enter student information below
              </p>
            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="input-box">
                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter student name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </div>

              <div className="input-box">
                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              <div className="input-box">
                <label>
                  Course
                </label>

                <select
                  value={course}
                  onChange={(e) =>
                    setCourse(e.target.value)
                  }
                >
                  <option value="">
                    Select Course
                  </option>

                  {courses.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-box">
                <label>
                  Year
                </label>

                <select
                  value={year}
                  onChange={(e) =>
                    setYear(e.target.value)
                  }
                >
                  <option value="">
                    Select Year
                  </option>

                  {years.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                      {item === "1"
                        ? "st"
                        : item === "2"
                        ? "nd"
                        : item === "3"
                        ? "rd"
                        : "th"}{" "}
                      Year
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div className="button-row">

              <button
                type="submit"
                className="primary-button"
                disabled={saving}
              >
                {saving
                  ? "Adding..."
                  : "+ Add Student"}
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={clearAddForm}
              >
                Clear
              </button>

            </div>

          </form>

        </section>

        {/* Student Records */}
        <section className="card records-card">

          <div className="table-heading">

            <div>
              <h2>
                Student Records
              </h2>

              <p>
                Showing{" "}
                <strong>
                  {filteredStudents.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {students.length}
                </strong>{" "}
                registered students
              </p>
            </div>

            <button
              className="refresh-button"
              onClick={getStudents}
              disabled={loading}
            >
              ↻ {loading ? "Loading..." : "Refresh"}
            </button>

          </div>

          {/* Search + Filters */}
          <div className="filter-panel">

            <div className="search-wrapper">

              <span className="search-icon">
                🔎
              </span>

              <input
                type="text"
                placeholder="Search by name, email or course..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch("")}
                >
                  ×
                </button>
              )}

            </div>

            <div className="filter-control">

              <label>
                Course
              </label>

              <select
                value={courseFilter}
                onChange={(e) =>
                  setCourseFilter(e.target.value)
                }
              >
                <option value="">
                  All Courses
                </option>

                {courses.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

            </div>

            <div className="filter-control">

              <label>
                Year
              </label>

              <select
                value={yearFilter}
                onChange={(e) =>
                  setYearFilter(e.target.value)
                }
              >
                <option value="">
                  All Years
                </option>

                {years.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    Year {item}
                  </option>
                ))}
              </select>

            </div>

            <button
              className="clear-filter-button"
              onClick={clearFilters}
            >
              ↻ Clear
            </button>

          </div>

          {/* Student Table */}
          {loading ? (

            <div className="loading">
              <div className="spinner"></div>

              <p>
                Loading students...
              </p>
            </div>

          ) : students.length === 0 ? (

            <div className="empty">

              <div className="empty-icon">
                👨‍🎓
              </div>

              <h3>
                No Students Yet
              </h3>

              <p>
                Add your first student using
                the form above.
              </p>

            </div>

          ) : filteredStudents.length === 0 ? (

            <div className="empty">

              <div className="empty-icon">
                🔍
              </div>

              <h3>
                No Matching Students
              </h3>

              <p>
                Try changing your search or filters.
              </p>

              <button
                className="empty-clear-button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          ) : (

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredStudents.map(
                    (student) => (

                      <tr key={student.id}>

                        <td>
                          <span className="id-badge">
                            #{student.id}
                          </span>
                        </td>

                        <td>
                          <div className="student-info">

                            <div className="avatar">
                              {student.name
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <strong>
                                {student.name}
                              </strong>

                              <small>
                                Student ID #{student.id}
                              </small>
                            </div>

                          </div>
                        </td>

                        <td className="email">
                          {student.email}
                        </td>

                        <td>
                          <span className="course-badge">
                            {student.course}
                          </span>
                        </td>

                        <td>
                          <span className="year-badge">
                            Year {student.year}
                          </span>
                        </td>

                        <td>

                          <div className="actions">

                            <button
                              className="edit-button"
                              onClick={() =>
                                openEditModal(student)
                              }
                              title="Edit Student"
                            >
                              ✏️
                            </button>

                            <button
                              className="delete-button"
                              onClick={() =>
                                deleteStudent(student.id)
                              }
                              title="Delete Student"
                            >
                              🗑️
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

        {/* Footer */}
        <footer>

          <p>
            © 2026 StudentHub · Student Record
            Management System
          </p>

          <p>
            React + Express · JavaScript Array
          </p>

        </footer>

      </main>

      {/* EDIT MODAL */}
      {editingStudent && (

        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeEditModal();
            }
          }}
        >

          <div className="edit-modal">

            <div className="modal-header">

              <div className="modal-title">

                <div className="modal-icon">
                  ✏️
                </div>

                <div>
                  <h2>
                    Edit Student
                  </h2>

                  <p>
                    Update student information
                  </p>
                </div>

              </div>

              <button
                className="modal-close"
                onClick={closeEditModal}
              >
                ×
              </button>

            </div>

            <div className="modal-student-id">
              Editing Student #{editingStudent.id}
            </div>

            <form onSubmit={saveEdit}>

              <div className="modal-form-grid">

                <div className="input-box">
                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={editName}
                    onChange={(e) =>
                      setEditName(e.target.value)
                    }
                  />
                </div>

                <div className="input-box">
                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) =>
                      setEditEmail(e.target.value)
                    }
                  />
                </div>

                <div className="input-box">
                  <label>
                    Course
                  </label>

                  <select
                    value={editCourse}
                    onChange={(e) =>
                      setEditCourse(e.target.value)
                    }
                  >
                    <option value="">
                      Select Course
                    </option>

                    {courses.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-box">
                  <label>
                    Year
                  </label>

                  <select
                    value={editYear}
                    onChange={(e) =>
                      setEditYear(e.target.value)
                    }
                  >
                    <option value="">
                      Select Year
                    </option>

                    {years.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        Year {item}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <div className="modal-buttons">

                <button
                  type="button"
                  className="modal-cancel"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-save"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "✓ Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;