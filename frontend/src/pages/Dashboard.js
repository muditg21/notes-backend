import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API_URL = "https://copy-pen.onrender.com";

  const fetchNotes = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("userInfo"));

      if (!storedUser) {
        window.location.href = "/login";
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      };

      const { data } = await axios.get(
        `${API_URL}/api/notes`,
        config
      );

      setNotes(data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNoteHandler = async (e) => {
    e.preventDefault();

    try {
      const storedUser = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      };

      if (editingId !== null) {
        await axios.put(
          `${API_URL}/api/notes/${editingId}`,
          { title, content },
          config
        );
      } else {
        await axios.post(
          `${API_URL}/api/notes`,
          { title, content },
          config
        );
      }

      setEditingId(null);
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
      alert("Operation failed");
    }
  };

  const deleteNoteHandler = async (id) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      };

      await axios.delete(
        `${API_URL}/api/notes/${id}`,
        config
      );

      fetchNotes();
    } catch (error) {
      alert("Failed to delete note");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <button className="logout-btn" onClick={logoutHandler}>
        Logout
      </button>

      <hr />

      <form onSubmit={createNoteHandler}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit" className="primary-btn">
          {editingId !== null ? "Update Note" : "Create Note"}
        </button>

        {editingId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setTitle("");
              setContent("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      {notes.length === 0 && <p>No notes yet.</p>}

      {notes.map((note) => (
        <div key={note._id} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <button
            className="primary-btn"
            onClick={() => {
              setTitle(note.title);
              setContent(note.content);
              setEditingId(note._id);
            }}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => deleteNoteHandler(note._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;