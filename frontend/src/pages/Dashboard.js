import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        if (!userInfo) {
            window.location.href = "/login";
            return;
        }

        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(
                "http://localhost:5000/api/notes", config
            );

            setNotes(data);
        }
        catch (error) {
            console.log(error);
            alert("failed to fetch notes");
        }
    };

    const createNoteHandler = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.post(
                "http://localhost:5000/api/notes",
                { title, content }, config
            );

            setTitle("");
            setContent("");

            fetchNotes();
        } catch (error) {
            alert("failed to create note");
        }
    };

    const deleteNoteHandler = async (id) => {
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.delete(
                `http://localhost:5000/api/notes/${id}` , config
            );

            fetchNotes();
        }catch(error){
           alert("failed to delete Note");
        }
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <form onSubmit={createNoteHandler}>
                <div>
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Create Note</button>
            </form>

            <hr />

            {notes.length === 0 && <p>No notes yet.</p>}

            {notes.map((note) => (
                <div key={note._id}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <button onClick={()=>deleteNoteHandler(note._id)}>Delete
                    </button>
                    <hr />
                </div>
            ))}
        </div>
    );
};


export default Dashboard;