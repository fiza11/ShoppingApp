import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class addcart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("user"),
      name: "",
      sname: localStorage.getItem("sname"),
      sitem: localStorage.getItem("sitem"),
      quan: "",
      datt: []
    };
    this.onChangename = this.onChangename.bind(this);
    this.onChangequan = this.onChangequan.bind(this);
    this.logout = this.logout.bind(this);
    this.cart = this.cart.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.sortBy1 = this.sortBy.bind(this);

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
  sortB1y(key) {
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

  onSubmit1(e) {
    //   localStorage.
    e.preventDefault();
    console.log(this.state.sname);
    console.log(this.state.sitem);
    console.log(this.state.quan);
    const newUser3 = {
      email: this.state.sname,
      name: this.state.sitem,
      quan: this.state.quan
    };
    console.log(newUser3.quan);
    let str3 = "http://localhost:5000/upproduct";
    axios.post(str3, newUser3).then(res => {
      console.log("pass");
      // });
      if (res.data) {
        const newUser2 = {
          email: this.state.email,
          sname: this.state.sname,
          sitem: this.state.sitem,
          quan: this.state.quan,
          remain: res.data.size - this.state.quan,
          state: ""
        };
        console.log(newUser2.remain);
        console.log("item left+>");
        console.log(res.data.size - newUser2.quan);
        if (res.data.size - newUser2.quan === 0) {
          newUser2.state = "Placed";
        } else newUser2.state = "Waiting";

        let str2 = "http://localhost:5000/csrlist";
        axios.post(str2, newUser2).then(res => console.log(res.data));
        this.setState({
          sname: "",
          sitem: "",
          quan: ""
        });
      }
    });
    localStorage.removeItem("sname");
    localStorage.removeItem("sitem");
    this.props.history.push("/customer");
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
                  My Cart
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <form onSubmit={this.onSubmit1}>
          <div className="form-group">
            <label> Item Name </label>
            <input
              type="text"
              className="form-control"
              value={this.state.sitem}
            />
          </div>
          <div className="form-group">
            <label> Item seller </label>
            <input
              type="text"
              className="form-control"
              value={this.state.sname}
            />
          </div>
          <div className="form-group">
            <label> Quantity </label>
            <input
              type="text"
              className="form-control"
              value={this.state.quan}
              onChange={this.onChangequan}
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
export default addcart;
