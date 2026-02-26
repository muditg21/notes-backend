import { useState } from "react";
import axios from "axios"

function Login() {
    const [email, SetEmail] = useState("");
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
        <div>
            <h2>Login</h2>

            <form onSubmit={submitHandler}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => SetEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;