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

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      num: "",
      password: "",
      type: "customer"
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangetype = this.onChangetype.bind(this);
    this.onChangenum = this.onChangenum.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  onChangepassword(event) {
    this.setState({ password: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  onChangenum(event) {
    this.setState({ num: event.target.value });
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

      this.props.history.push("/create");
    }
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.type);
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      num: this.state.num,
      password: this.state.password,
      type: this.state.type
    };
    let str = "http://localhost:5000/add";
    axios.post(str, newUser).then(res => {
      console.log(res.data);
      if (res.data.error) {
        alert("Already existed or Empty fields ");
      }
    });
    this.setState({
      username: "",
      email: "",
      num: "",
      type: "customer",
      password: ""
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
        {/* </div>
<div> */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
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
              type="type"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangepassword}
            />
          </div>
          <div className="form-group">
            <label>Mobile Number: </label>
            <input
              type="Number"
              className="form-control"
              value={this.state.num}
              onChange={this.onChangenum}
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
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
