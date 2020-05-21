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
      datt: [],
      semail: "",
      semail1: "",
      quan: 0,
      quan1: 0,
      rev: "",
      item: ""
    };
    this.logout = this.logout.bind(this);
    this.cart = this.cart.bind(this);
    this.rate = this.rate.bind(this);
    this.edit = this.edit.bind(this);

    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);

    this.onChangerev = this.onChangerev.bind(this);
    this.onChangequan1 = this.onChangequan1.bind(this);

    this.onChangequan = this.onChangequan.bind(this);
  }
  onChangequan(event) {
    this.setState({ quan: event.target.value });
  }
  onChangequan1(event) {
    this.setState({ quan1: event.target.value });
  }

  onChangerev(event) {
    this.setState({ rev: event.target.value });
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
    this.props.history.push("/customer");
  }
  edit(key) {
    console.log(key.currentUser.email);
    if (key.currentUser.state === "Waiting") {
      this.setState({ semail: key.currentUser.sname });
      localStorage.setItem("sname", key.currentUser.sname);
      localStorage.setItem("sitem", key.currentUser.sitem);
      localStorage.setItem("email", this.state.email);
      localStorage.setItem("quan", key.currentUser.quan);
      localStorage.setItem("remain", key.currentUser.remain);

      this.props.history.push("/edit");
    }
    // this.setState({ sitem: key.currentUser.name });
  }

  rate(key) {
    console.log(key.currentUser.email);
    if (key.currentUser.state === "Placed") {
      this.setState({ semail: key.currentUser.sname });
      localStorage.setItem("semail", key.currentUser.sname);
      // this.history
      this.props.history.push("/review");
    } else if (key.currentUser.state === "Dispatched") {
      localStorage.setItem("semail1", key.currentUser.sname);
      localStorage.setItem("item", key.currentUser.sitem);

      this.setState({ semail1: key.currentUser.sname });

      this.setState({ item: key.currentUser.sitem });
      this.props.history.push("/rating");
    }
    // this.setState({ sitem: key.currentUser.name });
  }

  componentDidMount() {
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
    const newUser1 = {
      sname: "",
      sitem: ""
    };

    let str = "http://localhost:5000/upuserlist";
    axios.post(str, newUser).then(res => {
      this.setState({ datt: res.data });
    });

    str = "http://localhost:5000/userlist";
    axios.post(str, newUser).then(res => {
      newUser1.sname = res.data.sname;
      newUser1.sitem = res.data.sitem;
      console.log(newUser1);

      this.setState({ datt: res.data });
    });
  }
  onSubmit1(e) {
    e.preventDefault();
    const newUser1 = {
      name: this.state.semail,
      quan: this.state.quan
    };
    let str1 = "http://localhost:5000/venrat";
    if (newUser1.name != "")
      axios.post(str1, newUser1).then(res => {
        this.setState(res => console.log(res.data));
      });
    this.setState({
      semail: "",
      quan: ""
    });
  }
  onSubmit2(e) {
    e.preventDefault();
    const newUser1 = {
      name: this.state.semail1,
      buyer: this.state.email,
      item: this.state.item,
      rev: this.state.rev,
      quan: this.state.quan1
      // quan: this.state.quan
    };
    let str1 = "http://localhost:5000/uprev";
    if (newUser1.name != "")
      axios.post(str1, newUser1).then(res => {
        this.setState(res => console.log(res.data));
      });
    this.setState({
      semail1: "",
      quan1: "",
      rev: ""
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

                {/* Email id of Vendor : {this.state.email} */}
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
                <th>Item</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Quantity Left</th>
                <th>Edit</th>
                <th>Review</th>
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
                    <td>{currentUser.remain}</td>
                    <td
                      className="form-group"
                      onClick={() => this.edit({ currentUser })}
                    >
                      <input
                        type="Edit"
                        value="Edit"
                        className="btn btn-primary"
                      />
                    </td>

                    <td
                      className="form-group"
                      onClick={() => this.rate({ currentUser })}
                    >
                      <input
                        type="submit"
                        value="Rate/Review"
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

export default cart;
