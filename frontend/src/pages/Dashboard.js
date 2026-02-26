import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState(null);

   

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("userInfo"));

  if (!storedUser) {
    window.location.href = "/login";
    return;
  }

  const fetchNotes = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      };

      const { data } = await axios.get(
        "https://copy-pen.onrender.com/api/notes",
        config
      );

      setNotes(data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch notes");
    }
  };

  fetchNotes();
}, []);

      const createNoteHandler = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            //update a note

            if (editingId !==null) {
                await axios.put(
                    `https://copy-pen.onrender.com/api/notes/${editingId}`,
                    { title, content },
                    config
                );
               
            }
            //create A new post
            else {
                await axios.post(
                    "https://copy-pen.onrender.com/api/notes",
                    { title, content }, config
                );
            }
            setEditingId(null);
            setTitle("");
            setContent("");
            fetchNotes();

        } catch (error) {
            alert("failed to create note");
        }
    };

    const deleteNoteHandler = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.delete(
                `https://copy-pen.onrender.com/api/notes/${id}`, config
            );

            fetchNotes();
        } catch (error) {
            alert("failed to delete Note");
        }
    }

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
                    {editingId!==null ? "Update Note" : "Create Note"}
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
                        className="delete-btn"
                        onClick={() => deleteNoteHandler(note._id)}
                    >
                        Delete
                    </button>
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
                </div>
            ))}
        </div>
    );
};


export default Dashboard;