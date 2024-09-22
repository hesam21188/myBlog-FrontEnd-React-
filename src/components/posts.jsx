import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Posts extends Component {
  state = {
    posts: [],
  };
  async componentDidMount() {
    const response = await axios.get("http://localhost:8080/posts/");
    console.log(response);
    this.setState({ posts: response.data.results });
  }
  render() {
    return (
      <>
        <div className="container mt-5">
          {Object.keys(this.props.user).length !== 0 && (
            <div className="text-center pb-3">
              <Link className="btn btn-dark" to={"/new"}>
                Create new Post
              </Link>
            </div>
          )}
          {this.state.posts.map((post) => {
            return (
              <div key={post.id} className="card mb-4 text-center">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <Link className="btn btn-secondary" to={`/${post.slug}`}>
                    read more
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Posts;
