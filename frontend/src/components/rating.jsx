import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";

class rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      datt: [],
      semail: "",
      semail1: localStorage.getItem("semail1"),
      quan: "",
      quan1: "",
      rev: "",
      item: localStorage.getItem("item")
    };
    this.logout = this.logout.bind(this);
    this.cart = this.cart.bind(this);
    this.rate = this.rate.bind(this);
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
  rate(key) {
    console.log(key.currentUser.email);
    if (key.currentUser.state === "Placed") {
      this.setState({ semail: key.currentUser.sname });
    } else if (key.currentUser.state === "Dispatched") {
      this.setState({ semail1: key.currentUser.sname });

      this.setState({ item: key.currentUser.sitem });
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
    let str = "http://localhost:5000/upuserlist";
    axios.post(str, newUser).then(res => {
      this.setState({ datt: res.data });
    });

    str = "http://localhost:5000/userlist";
    axios.post(str, newUser).then(res => {
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
    localStorage.removeItem("semail1");
    localStorage.removeItem("item");
    this.props.history.push("/cart");
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item" value={this.state.email}>
                <span class="navbar-text">Email id of Consumer :</span>
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
                  My Home
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <form onSubmit={this.onSubmit2}>
          <div className="form-group">
            <label> Buyer Name </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label> item Name </label>
            <input
              type="text"
              className="form-control"
              value={this.state.item}
            />
          </div>

          <div className="form-group">
            <label> Review </label>
            <input
              type="text"
              className="form-control"
              value={this.state.rev}
              onChange={this.onChangerev}
            />
          </div>
          <div className="form-group">
            <label> Rating </label>
            <input
              type="text"
              className="form-control"
              value={this.state.quan1}
              onChange={this.onChangequan1}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default rating;
