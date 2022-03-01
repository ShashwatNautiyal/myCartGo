import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	decrementQuantity,
	incrementQuantity,
	removeFromCart,
	setCartProducts,
} from "../../redux/Actions";
import "./Cart.css";
import { userInfo } from "../../utils/userInfo";
import { useEffect, useState } from "react";
import CustomLoader from "../../components/Loader/Loader";

const Cart = () => {
	const cart = useSelector((state) => state.cartReducer.cart);
	const dispatch = useDispatch();
	const { isLoggedIn } = useSelector((state) => state.authReducer);
	const [handleLoader, setHandleLoader] = useState(false);

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
		}
		// eslint-disable-next-line
	}, [isLoggedIn]);

	const decrementItem = (item) => {
		if (item.quantity > 1) {
			dispatch(decrementQuantity(item._id));
		}
	};

	const incrementItem = (item) => {
		if (item.quantity < 10) {
			dispatch(incrementQuantity(item._id));
		}
	};

	const removeItem = (item) => {
		if (isLoggedIn) {
			setHandleLoader(true);
			axios
				.delete(process.env.REACT_APP_BASE_URL + "/cart/" + item._id, {
					headers: {
						"auth-token": localStorage.getItem("user"),
					},
				})
				.then((res) => {
					setHandleLoader(false);
					dispatch(removeFromCart(item._id));
				});
		} else {
			dispatch(removeFromCart(item._id));
		}
	};

	const countTotal = () => {
		const price = cart.map((item) => ({ price: item.price, quantity: item.quantity }));
		const result = price
			.map(({ price, quantity }) => price * quantity)
			.reduce((a, b) => a + b, 0);
		return result;
	};

	return (
		<div className="cart">
			{handleLoader && <CustomLoader />}
			{cart.length !== 0 ? (
				<>
					<div className="cart__subtotal">
						<h2>Your Cart</h2>
						<div className="cart__total">
							<h2>Subtotal:</h2>
							<p>
								{new Intl.NumberFormat("en-IN", {
									style: "currency",
									currency: "INR",
								}).format(countTotal())}
							</p>
						</div>
					</div>
					{cart.map((item) => (
						<div key={item._id} className="cart__product">
							<img src={item.image} alt="" />
							<div className="cart__info">
								<p>{item.title}</p>
								<p>Price: ₹{item.price}</p>
								<div className="cart__itemQuanity">
									<button onClick={() => decrementItem(item)}>-</button>
									<p>{item.quantity}</p>
									<button onClick={() => incrementItem(item)}>+</button>
								</div>
								<button onClick={() => removeItem(item)}>Remove from Cart</button>
							</div>
						</div>
					))}
				</>
			) : (
				<div className="cart__product">
					<h2>Your Cart is Empty!</h2>
				</div>
			)}
		</div>
	);
};

export default Cart;
