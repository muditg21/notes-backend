import { useState } from "react";
import axios from "axios"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/user/login",
                { email, password }
            );

            console.log("login success:", data);

            localStorage.setItem("userInfo", JSON.stringify(data));
            window.location.href ="/dashboard";

            alert("login Successfull");

        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

   return (
  <div className="container">
    <h2>Login</h2>

    <form onSubmit={submitHandler}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="primary-btn">
        Login
      </button>
    </form>
  </div>
);
}

export default Login;