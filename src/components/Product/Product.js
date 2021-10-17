import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/Actions";
import "./Product.css";

const Product = ({ product }) => {
	const dispatch = useDispatch();
	const shorten = (text, max) => {
		return text && text.length > max ? text.slice(0, max).split(" ").slice(0, -1).join(" ") : text;
	};

	return (
		<div className="product">
			<Link to={`/${product._id}`}>
				<img src={product.image} alt="" />
			</Link>

			<div className="product__info">
				<p>{shorten(product.title, 30)}</p>
				<p>₹{product.price}</p>
				<button
					onClick={() => {
						dispatch(addToCart(product));
					}}
				>
					Add to cart
				</button>
			</div>
		</div>
	);
};

export default Product;
