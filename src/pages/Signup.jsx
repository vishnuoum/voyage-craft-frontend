import { useState } from "react";
import "../css/Form.css";
import { registerNewUser } from "../services/api";
import { replace, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Signup() {

    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { setToken, setUserId } = useAppContext();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const result = await registerNewUser({ username: username, mail: mail, phone: phone, password: password });
            console.log(result)
            if (result && result.token && result.userId) {
                setToken(result.token);
                setUserId(result.userId);
                console.log("setting token completed")
                navigate("/", { repalce: true });
            } else {
                alert("Incorrect username or password");
            }
        } catch (e) {
            console.log("Error while signup");
            console.error(e);
            alert("Error while signing up");
        }
    }

    const navigateToLogin = (e) => {
        e.preventDefault();
        navigate('/login', { replace: true })
    }


    return (
        <div className="container-holder">
            <div className="container">
                <form onSubmit={handleSignup}>
                    <h2 className="project-title">VoyageCraft</h2>
                    <input type="text" name="username" id="username" className="text" placeholder="Username" value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                    <input type="mail" name="mail" id="mail" className="text" placeholder="Mail Id" value={mail}
                        onChange={(e) => setMail(e.target.value)} />
                    <input type="tel" name="phone" id="phone" className="text" placeholder="Phone no." value={phone}
                        onChange={(e) => setPhone(e.target.value)} />
                    <input type="password" name="password" id="password" className="text" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="Signup" />
                    <span className="redirect-link">Already a User? <a onClick={navigateToLogin} href="/login">Login Here!!</a></span>
                </form>
            </div>
        </div>
    );
}

export default Signup;