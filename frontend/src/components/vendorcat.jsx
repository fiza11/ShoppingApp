import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";

class Vcart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      datt: []
    };
    this.logout = this.logout.bind(this);
    this.cart = this.cart.bind(this);
  }
  logout(e) {
    e.preventDefault();
    console.log("sadas");
    localStorage.clear();
    this.props.history.push("/Login");
  }
  cart(e) {
    e.preventDefault();
    console.log("sadas");
    this.props.history.push("/Vendor");
  }

  componentDidMount() {
    if (localStorage.getItem("id") === "vendor") {
      this.setState({ email: localStorage.getItem("user") });
    } else if (
      localStorage.getItem("id") === "customer" &&
      localStorage.getItem("user")
    ) {
      console.log("dsas");
      this.props.history.push("/customer");
    } else {
      console.log("rtlogin");

      this.props.history.push("/Login");
    }
    const newUser = {
      email: localStorage.getItem("user")
    };
    let str = "http://localhost:5000/vendorlist";
    // str = "http://localhost:5000/userlist";
    axios.post(str, newUser).then(res => {
      this.setState({ datt: res.data });
    });
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item" value={this.state.email}>
                {/* Email id of Vendor : {this.state.email}
                 */}
                <span class="navbar-text"></span>
                <span class="navbar-brand">{this.state.email}</span>
              </li>
              <li className="navbar-item">
                <Link className="nav-link" onClick={this.logout}>
                  Logout
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="nav-link" onClick={this.cart}>
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Type</th>
                <th>Buyer</th>
                <th>Review</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {this.state.datt.map((currentUser, i) => {
                return (
                  <tr>
                    <td>{currentUser.name}</td>
                    <td>{currentUser.type}</td>
                    <td>{currentUser.buyer}</td>
                    <td>{currentUser.review}</td>
                    <td>{currentUser.Rating}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Vcart;
