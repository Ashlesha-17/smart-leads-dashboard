import { useEffect, useState } from "react";
import {
  getLeads,
  createLead,
  deleteLead,
  updateLead,
} from "../api/leadApi";

import useDebounce from "../hooks/useDebounce";
import { exportCSV } from "../utils/exportCSV";
import { useAuth } from "../context/AuthContext";
import "../index.css";

export default function Dashboard() {
  const { user } = useAuth(); 

  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const [darkMode, setDarkMode] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    status: "new",
    source: "website",
  });

  const [editForm, setEditForm] = useState({
    status: "",
    source: "",
  });

  const fetchLeads = async () => {
    const res = await getLeads({
      search: debouncedSearch,
      status,
      page,
      limit: 5,
    });

    setLeads(res.data.leads);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchLeads();
  }, [debouncedSearch, status, page]);

  const handleCreate = async () => {
    await createLead(form);

    setForm({
      name: "",
      email: "",
      company: "",
      status: "new",
      source: "website",
    });

    setShowForm(false);
    fetchLeads();
  };

  const handleDelete = async (id: string) => {
    await deleteLead(id);
    fetchLeads();
  };

  const handleUpdate = async () => {
    if (!editId) return;

    await updateLead(editId, editForm);

    setEditId(null);
    fetchLeads();
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Leads Dashboard</h2>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light ☀️" : "Dark 🌙"}
        </button>
      </div>

      <p style={{ opacity: 0.7 }}>
        Logged in as: <b>{user?.role}</b>
      </p>

      {user?.role === "admin" && (
        <button onClick={() => setShowForm(true)}>
          + Add Lead
        </button>
      )}

      <div className="controls">
        <input
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="lost">Lost</option>
        </select>

        <button onClick={() => exportCSV(leads)}>
          Export CSV
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Status</th>
            <th>Source</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.company}</td>

              <td>
                <span className={`badge ${lead.status}`}>
                  {lead.status}
                </span>
              </td>

              <td>{lead.source}</td>

              <td>
                {user?.role === "admin" && (
                  <button onClick={() => setEditId(lead._id)}>
                    Edit
                  </button>
                )}

                {(user?.role === "admin" ||
                  lead.assignedTo === user?._id) && (
                  <button
                    onClick={() => handleDelete(lead._id)}
                    style={{ marginLeft: "6px", color: "red" }}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {showForm && user?.role === "admin" && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h3>Add Lead</h3>

            <input
              placeholder="Name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              placeholder="Company"
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
            />

            <select
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
            </select>

            <select
              onChange={(e) =>
                setForm({ ...form, source: e.target.value })
              }
            >
              <option value="website">Website</option>
              <option value="linkedin">LinkedIn</option>
              <option value="referral">Referral</option>
            </select>

            <button onClick={handleCreate}>Save</button>
            <button onClick={() => setShowForm(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {editId && user?.role === "admin" && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h3>Edit Lead</h3>

            <select
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  status: e.target.value,
                })
              }
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
            </select>

            <select
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  source: e.target.value,
                })
              }
            >
              <option value="website">Website</option>
              <option value="linkedin">LinkedIn</option>
              <option value="referral">Referral</option>
            </select>

            <button onClick={handleUpdate}>
              Update
            </button>

            <button onClick={() => setEditId(null)}>
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}