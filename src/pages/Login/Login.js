import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginFail, loginSuccess, logout } from "../../redux/Actions";
import "./Login.css";

const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { isLoggedIn } = useSelector((state) => state.authReducer);
	let history = useHistory();

	const dispatch = useDispatch();

	const handleLogin = (e) => {
		e.preventDefault();

		const loginData = {
			email,
			password,
		};

		axios
			.post(process.env.REACT_APP_BASE_URL + "/user/login", JSON.stringify(loginData), {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				localStorage.setItem("user", JSON.stringify(response.data));
				dispatch(loginSuccess(response.data));
				history.push("/");
			})
			.catch((error) => {
				alert(error.response.data);
				dispatch(loginFail(null));
			});
	};

	return (
		<div className="login">
			{!isLoggedIn ? (
				<form className="card">
					<p>Login</p>
					<div className="inputs">
						<div>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="text"
								placeholder="Email"
							/>
							<i className="fas fa-envelope"></i>
						</div>
						<div>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								placeholder="Password"
							/>
							<i className="fas fa-lock"></i>
						</div>
					</div>
					<button onClick={handleLogin}>LOGIN</button>
					<p>
						Don't have an account? <Link to="/signup">Sign up now</Link>
					</p>
				</form>
			) : (
				<div className="card">
					<p>Already Logged IN</p>
					<button onClick={() => dispatch(logout(null), localStorage.removeItem("user"))}>Logout</button>
				</div>
			)}
		</div>
	);
};

export default Login;
