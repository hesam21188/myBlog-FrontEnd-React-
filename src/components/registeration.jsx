import React, { Component } from "react";
import axios from "axios";
import Input from "./input";
import * as yup from "yup";

class Registeration extends Component {
  state = {
    post: {
      username: "",
      password: "",
      email: "",
    },
    errors: [],
    sending: false,
  };

  schema = yup.object().shape({
    username: yup.string().required("فیلد username الزامی می باشد"),
    password: yup.string().required("فیلد password الزامی می باشد"),
    email: yup
      .string()
      .email("فرمت ایمیل نامعتبر است")
      .required("فیلد email الزامی است"),
  });

  validate = async () => {
    try {
      let result = await this.schema.validate(this.state.post, {
        abortEarly: false,
      });
      return result;
    } catch (error) {
      console.log(error.errors);
      this.setState({ errors: error.errors });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let result = await this.validate();
    console.log(result);
    if (result) {
      try {
        this.setState({ sending: true });
        const response = await axios.post(
          "http://localhost:8080/accounts/register/",
          result,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.setState({ sending: false });
        console.log(response);
        this.props.set_user(
          this.state.post.email,
          this.state.post.username,
          this.state.post.password
        );
        this.props.change_is_active();
      } catch (error) {
        this.setState({ sending: false });
        this.setState({ errors: ["مشکلی وجود دارد"] });
      }
    }
  };

  handleChange = async ({ currentTarget: input }) => {
    const post = { ...this.state.post };
    post[input.name] = input.value;
    this.setState({ post });
  };

  render() {
    const { username, password, email } = this.state.post;
    return (
      <>
        {this.state.errors.length !== 0 && (
          <div className="alert alert-danger">
            <ul>
              {this.state.errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={username}
            label="username"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={password}
            label="password"
            onChange={this.handleChange}
          />
          <Input
            name="email"
            value={email}
            label="email"
            onChange={this.handleChange}
          />
          <button disabled={this.state.sending} className="btn btn-primary">
            send code
          </button>
        </form>
      </>
    );
  }
}

export default Registeration;
