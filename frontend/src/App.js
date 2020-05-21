import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from "./components/users-list.component";
import CreateUser from "./components/create-user.component";
import customer from "./components/customer";
import Vendor from "./components/Vendor";
import cart from "./components/cart";
import Vcart from "./components/vendorcat";
import addcart from "./components/addcart";
import review from "./components/review";
import rating from "./components/rating";
import edit from "./components/edit";

// import AuthComponent from "./components/authuser";

function App() {
  return (
    <Router>
      <div className="container">
        <Redirect from="/" to="/Login" />

        <br />
        <Route path="/Login" exact component={UsersList} />
        <Route path="/create" exact component={CreateUser} />
        <Route path="/customer" exact component={customer} />
        <Route path="/Vendor" exact component={Vendor} />
        <Route path="/Cart" exact component={cart} />
        <Route path="/Vcart" exact component={Vcart} />
        <Route path="/addcart" exact component={addcart} />
        <Route path="/review" exact component={review} />
        <Route path="/rating" exact component={rating} />
        <Route path="/edit" exact component={edit} />
      </div>
    </Router>
  );
}

export default App;
