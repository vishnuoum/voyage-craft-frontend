import { useState } from "react";
import "../css/Form.css";
import { authenticateUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { setToken } = useAppContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await authenticateUser({ username: username, password: password });
            console.log(result)
            if (result && result.token) {
                setToken(result.token);
                console.log("setting token completed")
                navigate("/", { repalce: true });
            } else {
                alert("Incorrect username or password");
            }
        } catch (e) {
            console.log("Error while login");
            console.error(e);
            alert("Error while login");
        }
    }

    const navigateToSignup = (e) => {
        e.preventDefault();
        navigate('/signup', { replace: true })
    }

    return (
        <div className="container-holder">
            <div className="container">
                <form onSubmit={handleLogin}>
                    <h2 className="project-title">VoyageCraft</h2>
                    <input type="text" name="username" id="username" className="text" placeholder="Username" value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" name="password" id="password" className="text" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="Login" />
                    <span className="redirect-link">New User? <a onClick={navigateToSignup} href="/signup">Signup Here!!</a></span>
                </form>
            </div>
        </div>
    );
}

export default Login;