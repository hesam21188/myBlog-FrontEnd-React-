import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Delete extends Component {
  state = {
    post: {},
  };
  async componentDidMount() {
    const response = await axios.get(
      `http://localhost:8080/posts/${window.location.pathname.split("/")[1]}`
    );
    console.log(response);
    this.setState({ post: response.data });
  }
  async handleDelete() {
    const response = await axios.delete(
      `http://localhost:8080/posts/${window.location.pathname.split("/")[1]}`
    );
    console.log(response);
    window.location.replace("/");
  }
  render() {
    return (
      <div className="container text-center pt-5">
        {this.state.post.author == this.props.user.id && (
          <div>
            <h1>Are You Sure?</h1>
            <button
              onClick={this.handleDelete}
              className="btn btn-danger m-2 mb-3"
            >
              Yes, Delete
            </button>
            <Link
              className="btn btn-secondary m-2 mb-3"
              to={`/${window.location.pathname.split("/")[1]}`}
            >
              No
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Delete;
