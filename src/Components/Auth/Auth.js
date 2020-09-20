import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "./../../ducks/reducer";

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLogin = () => {
    axios.post("/auth/login", this.state).then((res) => {
      this.props.updateUser(res.data);
      this.props.history.push("/dashboard");
    });
  };

  handleRegister = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/register", { username, password })
      .then((res) => {
        this.props.updateUSer(res.data);
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  render() {
    return (
      <section className="Auth">
        <section className="login-container">
          <img
            src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/helo_logo.png"
            alt="logo"
            className="logo-img"
          />
          <h1 className="logo-title">Helo</h1>
          <div className="login-input-box">
            <p>Username:</p>
            <input
              name="username"
              onChange={(e) => {
                this.handleInput(e);
              }}
            />
          </div>
          <div className="login-input-box">
            <p>Password:</p>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                this.handleInput(e);
              }}
            />
          </div>
          <div className="buttons">
            <button className="button" onClick={this.handleLogin}>
              Login
            </button>
            <button className="button" onClick={this.handleRegister}>
              Register
            </button>
          </div>
        </section>
      </section>
    );
  }
}

export default connect(null, { updateUser })(Auth);
