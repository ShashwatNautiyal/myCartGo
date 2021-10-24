import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/Actions";
import { userInfo } from "../../utils/userInfo";
import "./Product.css";

const Product = ({ product }) => {
	const dispatch = useDispatch();
	const shorten = (text, max) => {
		return text && text.length > max ? text.slice(0, max).split(" ").slice(0, -1).join(" ") : text;
	};
	const { isLoggedIn } = useSelector((state) => state.authReducer);

	const addItem = (product) => {
		if (isLoggedIn) {
			const data = {
				productId: product._id,
				userId: userInfo()._id,
			};

			axios
				.post(process.env.REACT_APP_BASE_URL + "/cart", JSON.stringify(data), {
					headers: {
						"auth-token": localStorage.getItem("user"),
						"Content-Type": "application/json",
					},
				})
				.then((res) => console.log(res.data), dispatch(addToCart(product)));
		} else {
			dispatch(addToCart(product));
		}
	};

	return (
		<div className="product">
			<Link to={`/${product._id}`}>
				<img src={product.image} alt="" />
			</Link>

			<div className="product__info">
				<p>{shorten(product.title, 30)}</p>
				<p>₹{product.price}</p>
				<button onClick={() => addItem(product)}>Add to cart</button>
			</div>
		</div>
	);
};

export default Product;
