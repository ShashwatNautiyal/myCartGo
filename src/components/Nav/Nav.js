import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/Actions";
import "./Nav.css";
import { userInfo } from "../../utils/userInfo";
import { useState } from "react";

const Nav = () => {
	const cart = useSelector((state) => state.cartReducer.cart);
	const { isLoggedIn } = useSelector((state) => state.authReducer);
	const dispatch = useDispatch();
	const [showAcc, setShowAcc] = useState(false);

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
							Hello, {userInfo.name}
						</p>
						{showAcc && (
							<div
								onMouseEnter={() => setShowAcc(true)}
								onMouseLeave={() => setShowAcc(false)}
								className="accountDropDown"
							>
								<Link to="#">
									<i class="fas fa-user"></i> Account
								</Link>
								<Link onClick={() => dispatch(logout(null), localStorage.removeItem("user"))} to="/">
									<i class="fas fa-sign-out-alt"></i> Logout
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
