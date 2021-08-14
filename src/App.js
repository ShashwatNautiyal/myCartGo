import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Home from "./pages/Home/Home";
import Nav from "./components/Nav/Nav";
import { setProducts } from "./redux/Actions";

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      fetchProducts();
   }, []);

   const fetchProducts = () => {
      axios
         .get("https://fakestoreapi.com/products")
         .then((Response) => dispatch(setProducts(Response.data)))
         .catch((error) => console.log(error));
   };

   return (
      <Router>
         <div className="app">
            <Nav />
            <Switch>
               <Route path="/" exact component={Home} />
               <Route path="/checkout" exact component={Cart} />
               <Route path="/:productId" exact component={ProductDetails} />
            </Switch>
         </div>
      </Router>
   );
}

export default App;
