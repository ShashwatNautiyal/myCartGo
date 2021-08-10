import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../../redux/Actions";
import "./Cart.css";

const Cart = () => {
   const cart = useSelector((state) => state.cartReducer.cart);
   const dispatch = useDispatch();

   const decrementItem = (item) => {
      if (item.quantity > 1) {
         dispatch(decrementQuantity(item.id));
      }
   };

   const incrementItem = (item) => {
      if (item.quantity < 10) {
         dispatch(incrementQuantity(item.id));
      }
   };

   const countTotal = () => {
      const price = cart.map((item) => ({ price: item.price, quantity: item.quantity }));
      const result = price.map(({ price, quantity }) => price * quantity).reduce((a, b) => a + b, 0);
      console.log(result);
      return result;
   };

   return (
      <div className="cart">
         {cart.length !== 0 ? (
            <>
               <div className="cart__subtotal">
                  <h2>Your Cart</h2>
                  <div className="cart__total">
                     <h2>Subtotal:</h2>
                     <p>
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(countTotal())}
                     </p>
                  </div>
               </div>
               {cart.map((item) => (
                  <div className="cart__product">
                     <img src={item.image} alt="" />
                     <div className="cart__info">
                        <p>{item.title}</p>
                        <p>Price: ${item.price}</p>
                        <div className="cart__itemQuanity">
                           <button onClick={() => decrementItem(item)}>-</button>
                           <p>{item.quantity}</p>
                           <button onClick={() => incrementItem(item)}>+</button>
                        </div>
                        <button onClick={() => dispatch(removeFromCart(item.id))}>Remove from Cart</button>
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
