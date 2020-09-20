import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      img: "",
      content: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  post = () => {
    axios
      .post(`/api/posts/${this.props.userId}`, this.state)
      .then((res) => this.props.history.push("/dashboard"));
  };

  render() {
    return (
      <section>
        <div>
          <p>Title:</p>
          <input name="title" onChange={this.handleChange} />
        </div>
        <div>
          <img />
          <p>Image URL:</p>
          <input name="img" onChange={this.handleChange} />
        </div>
        <div>
          <p>Content:</p>
          <input name="content" onChange={this.handleChange} />
        </div>
        <button onClick={this.post}>Post</button>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
  };
}

export default connect(mapStateToProps)(Form);
