import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";

class cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      //   name: "",
      //   sname: "",
      //   sitem: "",
      //   quan: "",
      datt: []
    };
    // this.onChangename = this.onChangename.bind(this);
    // this.onChangequan = this.onChangequan.bind(this);

    this.logout = this.logout.bind(this);
    this.cart = this.cart.bind(this);

    // this.onSubmit = this.onSubmit.bind(this);
    // this.onSubmit1 = this.onSubmit1.bind(this);

    // this.sortBy = this.sortBy.bind(this);
    // this.retdata = this.retdata.bind(this);
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
    // localStorage.clear();
    this.props.history.push("/customer");
  }

  componentDidMount() {
    // this.getUser();
    // console.log(localStorage.getItem("id"));
    if (localStorage.getItem("id") === "customer") {
      this.setState({ email: localStorage.getItem("user") });
    } else if (
      localStorage.getItem("id") === "vendor" &&
      localStorage.getItem("user")
    ) {
      console.log("dsas");
      this.props.history.push("/Vendor");
    } else {
      console.log("rtlogin");

      this.props.history.push("/Login");
    }
    const newUser = {
      email: localStorage.getItem("user")
    };

    let str = "http://localhost:5000/userlist";
    axios.post(str, newUser).then(res => {
      // console.log(res.data);
      //   this.state.datt = res.data;
      this.setState({ datt: res.data });
      //   console.log(this.state.datt[0].sname);
    });
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item" value={this.state.email}>
                Email id of Vendor : {this.state.email}
              </li>
              <li className="navbar-item">
                <Link className="nav-link" onClick={this.logout}>
                  Logout
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="nav-link" onClick={this.cart}>
                  My Home
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Seller name</th>
                <th>sitem</th>
                <th>Quantity</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {this.state.datt.map((currentUser, i) => {
                return (
                  <tr>
                    <td>{currentUser.sname}</td>
                    <td>{currentUser.sitem}</td>
                    <td>{currentUser.quan}</td>
                    <td>{currentUser.state}</td>
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

export default cart;
