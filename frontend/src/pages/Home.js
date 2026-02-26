import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1 style={{ marginBottom: "10px" }}>MERN Notes App</h1>
      <p style={{ marginBottom: "25px", color: "#555" }}>
        A simple full-stack notes application built with MongoDB, Express,
        React and Node.js.
      </p>

      <div>
        <Link to="/login">
          <button className="primary-btn" style={{ marginRight: "10px" }}>
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="logout-btn">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;