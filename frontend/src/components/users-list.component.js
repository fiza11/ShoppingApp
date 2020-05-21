import React, { Component } from "react";
import axios from "axios";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import StyledRadio from "@material-ui/core/Radio";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      type: "customer"
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangetype = this.onChangetype.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangepassword(event) {
    this.setState({ password: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  onChangetype(event) {
    this.setState({ type: event.target.value });
  }
  componentDidMount() {
    // this.getUser();
    console.log(localStorage.getItem("id"));
    if (
      localStorage.getItem("id") === "customer" &&
      localStorage.getItem("user")
    ) {
      this.props.history.push("/customer");
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
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
      type: this.state.type
    };
    let str = "http://localhost:5000/login";
    axios.post(str, newUser).then(res => {
      // console.log(res.data.type);
      if (res.data.type === "customer") {
        localStorage.setItem("id", res.data.type);
        console.log(localStorage.getItem("id"));
        localStorage.setItem("user", res.data.email);
        // console.log(localStorage.getItem("user"));
        this.props.history.push("/customer");
      } else if (res.data.type === "vendor") {
        //   localStorage.setItem("example-jwt-jwt", res.dataa,acces);
        localStorage.setItem("id", res.data.type);
        console.log(localStorage.getItem("id"));

        localStorage.setItem("user", res.data.email);
        this.props.history.push("/Vendor");
      } else {
        alert("Invalid Credentials");
      }
    });

    this.setState({
      email: "",
      password: "",
      type: ""
    });
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/Login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* </div> */}
        {/* <div> */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangepassword}
            />
          </div>

          <div className="form-group">
            <FormLabel component="legend">Type of User: </FormLabel>
            <RadioGroup
              defaultValue={this.state.type}
              aria-label="gender"
              name="customized-radios"
              onChange={this.onChangetype}
            >
              <FormControlLabel
                value="customer"
                control={<StyledRadio />}
                label="Customer"
              />
              <FormControlLabel
                value="vendor"
                control={<StyledRadio />}
                label="Vendor"
              />
            </RadioGroup>
          </div>

          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
