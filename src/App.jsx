import React from "react";
import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";

import "./App.css";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import Cart from "./Cart";
import { useSelector } from "react-redux";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Profile from "./Profice";
import BlogPost from "./BlogPost";
import Orders from "./Orders";
import Register from "./Register";
import Login from "./Login";
import Pagenation from "./Pagenation";
import Addition from "./Addition";

function App() {
  let cartItems = useSelector((globalState) => globalState.cart);
  let totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <>
      <BrowserRouter>
        <nav className="menu-bar">
          <Link to="/" style={{ color: "red" }}>
            Home
          </Link>
          <Link to="/veg">
            <i class="fa-solid fa-apple-whole"></i>Veg-Items
          </Link>
          <Link to="/nonveg">
            {" "}
            <i className="fas fa-drumstick-bite"></i> NonVeg-Items
          </Link>
          <Link to="/cart">Cart {totalQuantity} </Link>

          <Link to="/orders"> Orders</Link>

          <Link to="/register"> Register</Link>
          <Link to="/login"> Login</Link>
          <Link to="/page"> Pagenation</Link>
          <Link to="/add"> Add</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/page" element={<Pagenation />} />
          <Route path="/add" element={<Addition />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
