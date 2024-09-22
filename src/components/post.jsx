import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Comment from "./comment";

class Post extends Component {
  state = {
    post: {},
  };
  async componentDidMount() {
    const response = await axios.get(
      `http://localhost:8080/posts${window.location.pathname}`
    );
    console.log(response);
    this.setState({ post: response.data });
  }
  new_comment = (comment) => {
    new_post = { ...this.state.post };
    new_post.comments.append(comment);
    this.setState({ post: new_post });
  };
  render() {
    return (
      <>
        <div className="container text-center pt-5">
          {this.state.post.author == this.props.user.id && (
            <div>
              <Link
                to={`/${this.state.post.slug}/edit`}
                className="btn btn-warning m-2 mb-5"
              >
                Edit
              </Link>
              <Link
                to={`/${this.state.post.slug}/delete`}
                className="btn btn-danger m-2 mb-5"
              >
                Delete
              </Link>
            </div>
          )}
          <h2>{this.state.post.title}</h2>
          <h6>{this.state.post.description}</h6>
          <div className="pt-3">
            <p>{this.state.post.body}</p>
          </div>
          <div className="pt-2">
            {this.state.post.comments !== undefined && (
              <div>
                <p>comments :</p>
                <ul>
                  {this.state.post.comments.map((c, i) => (
                    <li style={{ listStyle: "none" }} key={i}>
                      {c.body}
                    </li>
                  ))}
                </ul>
                {Object.keys(this.props.user).length > 0 ? (
                  <Comment comment_new={this.new_comment} />
                ) : (
                  <Link to={"/login"}>Login to leave comment</Link>
                )}
                <Link className="btn btn-outline-dark" to={"/"}>
                  back
                </Link>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Post;
