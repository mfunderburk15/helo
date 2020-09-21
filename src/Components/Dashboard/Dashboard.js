import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    let url = "/api/posts/";

    if (myPosts && !search) {
      url += "?user_posts=true&search=";
    } else if (!myPosts && search) {
      url += `?user_posts=false&search=${search}`;
    } else if (myPosts && search) {
      url += `?user_posts=true&search=${search}`;
    } else if (!myPosts && !search) {
      url += "?user_posts=false&search=";
    }
    axios.get(url).then((res) => {
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
    let url = "/api/posts/";
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
        <Link className="post" to={`/post/${e.id}`} key={e.id}>
          <h3>{e.title}</h3>
          <div className="author-box">
            <div>by {e.username}</div>
            <img src={e.profile_pic} />
          </div>
        </Link>
      );
    });

    return (
      <section className="Dashboard">
        <div className="content-box filter">
          <div className="search-div">
            <input
              className="search-bar"
              name="search"
              placeholder="Search by Title"
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <img
              src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/search_logo.png"
              className="search-box"
              onClick={this.getPosts}
            />
            <button className="button-reset" onClick={this.reset}>
              Reset
            </button>
          </div>
          <div className="checkbox-div">
            <p>My Posts</p>
            <input
              checked={this.state.myPosts}
              type="checkbox"
              onChange={() =>
                this.setState({ myPosts: !this.state.myPosts }, this.getPosts)
              }
            />
          </div>
        </div>
        <section className="post-box">{mapPosts}</section>
      </section>
    );
  }
}

export default Dashboard;
