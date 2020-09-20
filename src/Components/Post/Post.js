import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      profile_pic: "",
      title: "",
      img: "",
      content: "",
    };
  }

  componentDidMount() {
    axios.get(`/api/post/${this.props.match.params.postid}`).then((res) => {
      this.setState({ ...res.data[0] });
    });
  }

  delete = () => {
    axios.delete(`/api/post/${this.props.match.params.postid}`).then((res) => {
      this.props.history.push("/dashboard");
    });
  };

  render() {
    console.log(this.state);
    return (
      <section>
        <div>
          <h2>{this.state.title}</h2>
          <div>
            <p>by {this.state.username}</p>
            <img src={this.state.profile_pic} />
          </div>
        </div>
        <div>
          <img src={this.state.img} />
          <p>{this.state.content}</p>
        </div>
        <div>
          <button onClick={this.delete}>Delete</button>
        </div>
      </section>
    );
  }
}

export default withRouter(Post);
