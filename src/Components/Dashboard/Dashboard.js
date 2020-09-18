import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      search: "",
      myPosts: true,
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    let { search, myPosts } = this.state;
    let url = `/api/posts/${this.props.userId}`;

    if (myPosts && !search) {
      url += "?user_posts=true&search=";
    } else if (myPosts === false && search) {
      url += `?user_posts=false&search=${search}`;
    } else if (myPosts && search) {
      url += `?user_posts=true&search=${search}`;
    }
    console.log(search);
    console.log(url);
    axios.get(url).then((res) => {
      console.log(res.data);
      this.setState({
        posts: res.data,
      });
    });
  };

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  reset = () => {
    let { myPosts } = this.state;
    let url = `/api/posts/${this.props.userId}`;
    if (myPosts) {
      url += "?user_posts=true&search=";
    }
    axios.get(url).then((res) => {
      console.log(this.state);
      this.setState({ posts: res.data, search: "" });
    });
  };

  render() {
    const mapPosts = this.state.posts.map((e) => {
      return (
        <div key={e.id}>
          <div>{e.title}</div>
          <div>{e.username}</div>
          <div>{e.profile_pic}</div>
        </div>
      );
    });
    return (
      <div>
        <section>
          <div>
            <input
              name="search"
              placeholder="Search by Title"
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <button onClick={this.getPosts}>Search</button>
            <button onClick={this.reset}>Reset</button>
          </div>
          <div>
            <p>My Posts</p>
            <input
              checked={this.state.myPosts}
              type="checkbox"
              onChange={() =>
                this.setState({ myPosts: !this.state.myPosts }, this.getPosts)
              }
            />
          </div>
        </section>
        <section>{mapPosts}</section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
  };
}

export default connect(mapStateToProps)(Dashboard);
