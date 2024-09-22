import { Component } from "react";
import axios from "axios";
import Input from "./input";
import * as yup from "yup";
class Login extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: [],
    sending: false,
  };

  schema = yup.object().shape({
    username: yup.string().required("فیلد ایمیل الزامی می باشد"),
    password: yup
      .string()
      .required("فیلد پسورد الزامی می باشد")
      .min(6, "پسورد باید حداقل چهار کاراکتر باشد"),
  });

  validate = async () => {
    try {
      const result = await this.schema.validate(this.state.account, {
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
    const result = await this.validate();
    console.log(result);
    if (result) {
      try {
        this.setState({ sending: true });
        const response = await axios.post(
          "http://localhost:8080/accounts/login/",
          result,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.setState({ sending: false });
        console.log(response);
        localStorage.setItem("token", response.data.token);
        window.location.replace("/");
      } catch (error) {
        this.setState({ sending: false });
        this.setState({ errors: ["ایمیل یا پسورد صحیح نمی باشد"] });
      }
    }
  };

  handleChange = async ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { username, password } = this.state.account;
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
            label="Password"
            onChange={this.handleChange}
          />
          <button disabled={this.state.sending} className="btn btn-primary">
            Login
          </button>
        </form>
      </>
    );
  }
}

export default Login;
