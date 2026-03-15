import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadUsers = async () => {
    setError("");
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      setError("Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
    loadUsers();
  };

  const editUser = async (user) => {
    const name = prompt("New name:", user.name ?? "");
    if (name === null) return;
    const email = prompt("New email:", user.email ?? "");
    if (email === null) return;
    const ageInput = prompt("New age:", user.age ?? "");
    if (ageInput === null) return;
    const cin = prompt("New CIN:", user.cin ?? "");
    if (cin === null) return;

    const age = ageInput === "" ? null : Number(ageInput);

    await api.put(`/users/${user.id}`, { name, email, age, cin });
    loadUsers();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page">
      <div className="card card--wide">
        <div className="topbar">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="title">Users Dashboard</h1>
            <p className="subtitle">Gérer les utilisateurs en temps réel.</p>
          </div>
          <button className="btn btn-ghost" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="table-wrap">
          {users.length === 0 ? (
            <div className="empty">No users found.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>CIN</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age ?? ""}</td>
                    <td>{user.cin ?? ""}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn btn-ghost"
                          onClick={() => editUser(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
