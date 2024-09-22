import React, { Component } from "react";
import axios from "axios";
import Input from "./input";
import * as yup from "yup";

class Activation extends Component {
  state = {
    post: {
      code: "",
    },
    errors: [],
    sending: false,
  };

  schema = yup.object().shape({
    code: yup.string().required("فیلد code الزامی می باشد"),
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
      result = {
        ...result,
        email: this.props.email,
        username: this.props.username,
        password: this.props.password,
      };
      try {
        this.setState({ sending: true });
        const response = await axios.post(
          "http://localhost:8080/accounts/active/",
          result,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.setState({ sending: false });
        window.location.replace("/login");
        console.log(response);
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
    const { code } = this.state.post;
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
            name="code"
            value={code}
            label="code"
            onChange={this.handleChange}
          />
          <button disabled={this.state.sending} className="btn btn-primary">
            register
          </button>
        </form>
      </>
    );
  }
}

export default Activation;
