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
      <section className="Nav">
        <div className="profile-container">
          <img className="profile-pic" src={this.props.profile_pic} />
          <p>{this.props.username}</p>
        </div>
        <div className="nav-icons">
          <Link className="nav-img-home" to="/dashboard" />
          <Link className="nav-img-post" to="/new" />
        </div>
        <Link className="nav-img-logout" to="/" onClick={this.logout} />
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
