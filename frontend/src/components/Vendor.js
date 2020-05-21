import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import UsersList from "./components/users-list.component";
// import CreateUser from "./components/create-user.component";
// import customer from "./components/customer";

class Vendor extends Component {
  // state = {  }
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      size: "",
      price: "",
      datt: [],
      datt1: [],
      uemail: "",
      uname: ""
    };

    // this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangename = this.onChangename.bind(this);
    this.onChangesize = this.onChangesize.bind(this);
    this.onChangeprice = this.onChangeprice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.logout = this.logout.bind(this);
    this.retdata = this.retdata.bind(this);
    this.delprod = this.delprod.bind(this);
    this.cart = this.cart.bind(this);
  }
  onChangename(event) {
    this.setState({ name: event.target.value });
  }
  cart(e) {
    e.preventDefault();
    console.log("sadas");
    this.props.history.push("/Vcart");
  }

  delprod(key) {
    console.log(key.currentUser);
    const newUser = {
      email: this.state.email,
      name: key.currentUser.name
    };
    // console.log(newUser);
    let str = "http://localhost:5000/dispatchproduct";
    axios.post(str, newUser).then(res => console.log("deleted"));
    const newUser1 = {
      email: this.state.email
    };
    let str1 = "http://localhost:5000/prlist";
    axios.post(str1, newUser1).then(res => {
      this.setState({ datt: res.data });
      // console.log(this.state.datt[0]);
    });
  }

  retdata(key) {
    console.log(key.currentUser);
    const newUser = {
      email: this.state.email,
      name: key.currentUser.name
    };
    console.log(newUser);
    let str = "http://localhost:5000/delproduct";
    axios.post(str, newUser).then(res => console.log("deleted"));
    const newUser1 = {
      email: this.state.email
    };
    let str1 = "http://localhost:5000/prlist";
    axios.post(str1, newUser1).then(res => {
      this.setState({ datt: res.data });
      // console.log(this.state.datt[0]);
    });
  }
  onChangesize(event) {
    this.setState({ size: parseInt(event.target.value) });
  }
  onChangeprice(event) {
    this.setState({ price: parseInt(event.target.value) });
  }
  logout(e) {
    e.preventDefault();

    console.log("sadas");
    localStorage.clear();
    this.props.history.push("/Login");
  }
  componentDidMount() {
    // this.getUser();
    console.log(localStorage.getItem("id"));
    if (localStorage.getItem("id") === "vendor") {
      this.setState({ email: localStorage.getItem("user") });
    } else if (
      localStorage.getItem("id") === "customer" &&
      localStorage.getItem("user")
    ) {
      console.log("dsas");
      this.props.history.push("/customer");
    } else {
      console.log("rtsignup");

      this.props.history.push("/Login");
    }
    const newUser = {
      email: localStorage.getItem("user")
    };
    let str = "http://localhost:5000/disproduct";
    axios.post(str, newUser).then(res => {
      this.setState({ datt1: res.data });
    });

    str = "http://localhost:5000/prlist";
    axios.post(str, newUser).then(res => {
      this.setState({ datt: res.data });
      console.log(res.data);
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      name: this.state.name,
      size: this.state.size,
      price: this.state.price
      // rating :
    };
    console.log(newUser);
    let str = "http://localhost:5000/product";
    axios.post(str, newUser).then(res => console.log(res.data));
    const newUser1 = {
      email: this.state.email
    };
    let str1 = "http://localhost:5000/prlist";
    axios.post(str1, newUser1).then(res => {
      this.setState({ datt: res.data });
      console.log(this.state.datt[0]);
    });
    this.setState({
      name: "",
      size: "",
      price: ""
    });
  }
  render() {
    const names = this.state.datt.map(p => p.name);

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
            <label>Bundle size </label>
            <input
              type="Number"
              className="form-control"
              value={this.state.size}
              onChange={this.onChangesize}
            />
          </div>
          <div className="form-group">
            <label>Bundle Price </label>
            <input
              type="Number"
              className="form-control"
              value={this.state.price}
              onChange={this.onChangeprice}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Enter Product"
              className="btn btn-primary"
            />
          </div>
        </form>
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.datt.map((currentUser, i) => {
                return (
                  <tr>
                    <td>{currentUser.name}</td>
                    <td>{currentUser.size}</td>
                    <td>{currentUser.price}</td>
                    <td
                      className="form-group"
                      onClick={() => this.retdata({ currentUser })}
                    >
                      <input
                        type="submit"
                        // name={curr}
                        value="Delete"
                        className="btn btn-danger"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Dispatch Status</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {this.state.datt1.map((currentUser, i) => {
                return (
                  <tr>
                    <td>{currentUser.name}</td>
                    <td
                      className="form-group"
                      onClick={() => this.delprod({ currentUser })}
                    >
                      <input
                        type="submit"
                        // name={curr}
                        value="Dispatch"
                        className="btn btn-danger"
                      />
                    </td>
                    <td
                      className="form-group"
                      onClick={() => this.retdata({ currentUser })}
                    >
                      <input
                        type="submit"
                        value="Cancel"
                        className="btn btn-danger"
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

export default Vendor;
