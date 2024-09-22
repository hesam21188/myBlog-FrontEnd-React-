import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Posts from "./components/posts";
import Post from "./components/post";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Register from "./components/register";
import New from "./components/new";
import Edit from "./components/edit";
import Delete from "./components/delete";
import axios from "axios";

if (localStorage.getItem("token")) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Token ${localStorage.getItem("token")}`;
}
class App extends Component {
  state = { user: {} };

  async componentDidMount() {
    if (localStorage.getItem("token")) {
      const response = await axios.get(
        "http://localhost:8080/accounts/profile/"
      );
      console.log(response);
      this.setState({ user: response.data });
    }
  }

  render() {
    return (
      <>
        <Navbar user={this.state.user} />
        <Routes>
          <Route path="/new" element={<New />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:id/edit" element={<Edit />} />
          <Route
            path="/:id/delete"
            element={<Delete user={this.state.user} />}
          />
          <Route path="/:id" element={<Post user={this.state.user} />} />
          <Route path="/" element={<Posts user={this.state.user} />} />
        </Routes>
      </>
    );
  }
}

export default App;
