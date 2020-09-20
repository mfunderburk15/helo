import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser, logout } from "./../../ducks/reducer";
import axios from "axios";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    axios.get("/auth/me").then((res) => {
      this.props.updateUser(res.data);
    });
  };

  logout = () => {
    axios.post("/auth/logout").then((res) => {
      this.props.logout();
    });
  };

  render() {
    return (
      <section>
        <div>
          <img src={this.props.proPic} />
          <p>{this.props.username}</p>
        </div>
        <div>
          <Link to="/dashboard">Home</Link>
          <Link to="/new">New Post</Link>
          <Link to="/" onClick={this.logout}>
            Logout
          </Link>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(
  connect(mapStateToProps, { updateUser, logout })(Nav)
);
