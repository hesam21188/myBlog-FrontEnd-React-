import { Component } from "react";
import axios from "axios";
import Input from "./input";
import * as yup from "yup";
class New extends Component {
  state = {
    post: {
      title: "",
      body: "",
      description: "",
    },
    errors: [],
    sending: false,
  };

  schema = yup.object().shape({
    title: yup
      .string()
      .required("فیلد title الزامی می باشد")
      .max(100, "حداکثر طول title ۱۰۰ کاراکتر است"),
    body: yup.string().required("فیلد body الزامی می باشد"),
    description: yup
      .string()
      .required("فیلد description الزامی است")
      .max(200, "حداکثر طول description ۲۰۰ کاراکتر است"),
  });

  validate = async () => {
    try {
      const result = await this.schema.validate(this.state.post, {
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
          "http://localhost:8080/posts/create/",
          result,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.setState({ sending: false });
        console.log(response);
        window.location.replace("/");
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
    const { title, body, description } = this.state.post;
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
            name="title"
            value={title}
            label="title"
            onChange={this.handleChange}
          />
          <Input
            name="body"
            value={body}
            label="body"
            onChange={this.handleChange}
          />
          <Input
            name="description"
            value={description}
            label="description"
            onChange={this.handleChange}
          />
          <button disabled={this.state.sending} className="btn btn-primary">
            create
          </button>
        </form>
      </>
    );
  }
}

export default New;
