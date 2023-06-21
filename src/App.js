import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/GetStarted/Login";
import SignUp from "./Pages/GetStarted/SignUp";
import ForgotPassword from "./Pages/GetStarted/ForgotPassword";
import Offers from "./Pages/Offers/Offers";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./Pages/CreateList/CreateList";
import EditListing from "./Pages/CreateList/EditListing";
import Listing from "./Pages/CreateList/Listing";
import Category from "./Pages/Category/Category"
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";


function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<PrivateRoute />}>
            <Route exact path="/profile" element={<Profile />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/reset" element={<ForgotPassword />} />
          <Route exact path="/create-listing" element={<PrivateRoute />}>
            <Route exact path="/create-listing" element={<CreateListing />} />
          </Route>
          <Route exact path="/edit-listing" element={<PrivateRoute />}>
            <Route
              exact
              path="/edit-listing/:listingId"
              element={<EditListing />}
            />
          </Route>
          <Route exact path="/offers" element={<Offers />} />
          <Route exact path="/category/:categoryName" element={<Category />} />
          <Route exact 
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </React.Fragment>
  ); 
}

export default App;
