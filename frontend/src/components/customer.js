import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      sname: "",
      sitem: "",
      quan: "",
      datt: []
    };
    this.onChangename = this.onChangename.bind(this);
    this.onChangequan = this.onChangequan.bind(this);
    this.logout = this.logout.bind(this);
    this.cart = this.cart.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.onSubmit1 = this.onSubmit1.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.sortBy1 = this.sortBy1.bind(this);
    this.sortBy2 = this.sortBy2.bind(this);
    this.retdata = this.retdata.bind(this);
  }
  onChangename(event) {
    this.setState({ name: event.target.value });
  }
  onChangequan(event) {
    this.setState({ quan: event.target.value });
  }
  sortBy(key) {
    this.setState({
      datt: this.state.datt.sort(
        (a, b) => parseFloat(b[key]) - parseFloat(a[key])
      )
    });
  }
  sortBy1(key) {
    this.setState({
      datt: this.state.datt.sort(
        (a, b) => parseFloat(b[key]) - parseFloat(a[key])
      )
    });
  }
  sortBy2(key) {
    this.setState({
      datt: this.state.datt.sort(
        (a, b) => parseFloat(b[key]) - parseFloat(a[key])
      )
    });
  }

  retdata(key) {
    console.log(key.currentUser.email);
    this.setState({ sname: key.currentUser.email });
    this.setState({ sitem: key.currentUser.name });
    localStorage.setItem("sname", key.currentUser.email);
    localStorage.setItem("sitem", key.currentUser.name);
    // localStorage.setItem("quan", this.state.quan);
    this.props.history.push("/addcart");
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
    this.props.history.push("/Cart");
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.sname);
    const newUser1 = {
      name: this.state.name
    };
    let str1 = "http://localhost:5000/srlist";
    axios.post(str1, newUser1).then(res => {
      this.setState({ datt: res.data });
    });
    this.setState({
      name: ""
    });
  }
  componentDidMount() {
    // this.getUser();
    console.log(localStorage.getItem("id"));
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
    const newUser1 = {
      name: ""
    };
    let str1 = "http://localhost:5000/ssrlist";
    axios.post(str1, newUser1).then(res => {
      this.setState({ datt: res.data });
    });
    this.setState({
      name: ""
    });
  }
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item" value={this.state.email}>
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
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> Item Name </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangename}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Search" className="btn btn-primary" />
          </div>
        </form>
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>
                  <button onClick={() => this.sortBy1("size")}>Size </button>
                </th>
                <th>
                  <button onClick={() => this.sortBy("price")}>Price </button>
                </th>
                <th>Seller</th>
                <th>
                  <button onClick={() => this.sortBy2("rating")}>
                    Rating{" "}
                  </button>
                </th>
                <th>Order</th>
              </tr>
            </thead>
            <tbody>
              {this.state.datt.map((currentUser, i) => {
                return (
                  <tr>
                    <td>{currentUser.name}</td>
                    <td>{currentUser.size}</td>
                    <td>{currentUser.price}</td>
                    <td>{currentUser.email}</td>
                    <td>{currentUser.rating}</td>
                    <td
                      className="form-group"
                      onClick={() => this.retdata({ currentUser })}
                    >
                      <input
                        type="submit"
                        value="Buy"
                        className="btn btn-primary"
                      />
                    </td>
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
export default customer;
