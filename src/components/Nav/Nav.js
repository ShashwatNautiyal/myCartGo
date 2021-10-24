import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, setCartProducts } from "../../redux/Actions";
import "./Nav.css";
import { userInfo } from "../../utils/userInfo";
import { useEffect, useState } from "react";
import axios from "axios";

const Nav = () => {
	const cart = useSelector((state) => state.cartReducer.cart);
	const { isLoggedIn } = useSelector((state) => state.authReducer);

	const dispatch = useDispatch();
	const [showAcc, setShowAcc] = useState(false);

	useEffect(() => {
		if (isLoggedIn) {
			axios
				.get(process.env.REACT_APP_BASE_URL + "/cart/" + userInfo()._id, {
					headers: {
						"auth-token": localStorage.getItem("user"),
					},
				})
				.then((response) => {
					dispatch(setCartProducts([...response.data]));
				});
		} else {
			dispatch(setCartProducts([]));
		}
		// eslint-disable-next-line
	}, [isLoggedIn]);

	console.log(showAcc);

	return (
		<div className="nav">
			<Link to="/">
				<h2>MyCartGo</h2>
			</Link>
			<div style={{ display: "flex" }}>
				{isLoggedIn ? (
					<div style={{ position: "relative" }}>
						<p
							style={{ cursor: "pointer" }}
							onMouseEnter={() => setShowAcc(true)}
							onMouseLeave={() => setShowAcc(false)}
						>
							Hello, {userInfo().name}
						</p>
						{showAcc && (
							<div
								onMouseEnter={() => setShowAcc(true)}
								onMouseLeave={() => setShowAcc(false)}
								className="accountDropDown"
							>
								<Link onClick={() => setShowAcc(false)} to="#">
									<i className="fas fa-user"></i> Account
								</Link>
								<Link
									onClick={() => {
										dispatch(logout(null));
										localStorage.removeItem("user");
										setShowAcc(false);
									}}
									to="/"
								>
									<i className="fas fa-sign-out-alt"></i> Logout
								</Link>
							</div>
						)}
					</div>
				) : (
					<>
						<Link to="/login">
							<i className="fas fa-sign-in-alt"></i> Login
						</Link>
						<span style={{ margin: "0 8px" }}>|</span>
						<Link to="/signup">
							<i className="fas fa-user-plus"></i> Sign Up
						</Link>
					</>
				)}
				<span style={{ margin: "0 8px" }}>|</span>
				<Link to="/cart">
					<i className="fas fa-shopping-cart"></i>
					{` Cart(${cart.length})`}
				</Link>
			</div>
		</div>
	);
};

export default Nav;
