import React, { Component } from "react";
import Registeration from "./registeration";
import Activation from "./activation";

class Register extends Component {
  state = { is_active: false, email: "", username: "", password: "" };

  render() {
    return (
      <>
        {this.state.is_active ? (
          <Activation
            email={this.state.email}
            username={this.state.username}
            password={this.state.password}
          />
        ) : (
          <Registeration
            change_is_active={this.is_active_true}
            set_user={this.user_set}
          />
        )}
      </>
    );
  }
  is_active_true = () => {
    this.setState({ is_active: true });
    console.log(this.state.is_active);
  };
  user_set = (email, username, password) => {
    this.setState({ email: email, username: username, password: password });
  };
}

export default Register;
