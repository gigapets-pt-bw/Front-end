import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { login } from "../actions/index.js";

const PageStyle = styled.div`
  height: 768px;
  width: 1028px;
  margin: 0 auto;
  background-image: url("http://worldartsme.com/images/forest-landscape-clipart-1.jpg");
  background-fill: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .switch {
  }
  form {
    opacity: 0.9;
    height: 60%;
    width: 50%;
    border-radius: 5px;
    background-color: #31393c;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    input {
      width: 45%;
      height: 10%;
      font-size: 18px;
    }

    h2 {
      color: #8ac926;
      width: 45%;
      font-size: 24px;
      font-weight: bolder;
    }

    button {
      background-color: #8ac926;
      color: white;
      cursor: pointer;
      border-radius: 3px;
      border: 1px solid lightgray;
      margin: 5% 20px;
      height: 40px;
      width: 100px;
      transition: 0.2s;

      &:hover {
        opacity: 0.85;
        box-shadow: 0px 5px 5px 0px rgba(176, 170, 176, 1);
        transform: translateY(-2px);
        transition: 0.2s;
      }

      &:active {
        transform: translateY(2px);
        box-shadow: none;
        transition: 0.2s;
      }
    }
  }
`;

class Login extends React.Component {
  state = {
    login: {
      username: "",
      password: ""
    },
    signup: {
      username: "",
      password: "",
      email: ""
    },
    newSignup: false
  };

  inputHandlerLogin = event => {
    this.setState({
      login: { ...this.state.login, [event.target.name]: event.target.value }
    });
  };

  inputHandlerSignup = event => {
    this.setState({
      signup: { ...this.state.signup, [event.target.name]: event.target.value }
    });
  };

  loginHandler = event => {
    event.preventDefault();
    this.props.login(this.state.login);
    this.setState({ login: { username: "", password: "" } });
  };

  signupHandler = event => {
    event.preventDefault();
    if (
      this.state.signup.username &&
      this.state.signup.password &&
      this.state.signup.email
    ) {
      this.setState({
        signup: { username: "", password: "", email: "" },
        newSignup: false
      });
    } else {
      alert("All fields must have an entry");
    }
  };

  signupButton = event => {
    event.preventDefault();
    this.setState({ newSignup: true });
  };

  render() {
    if (this.state.newSignup === false) {
      return (
        <PageStyle>
          <form onSubmit={this.loginHandler}>
            <h2>Username</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.inputHandlerLogin}
              value={this.state.login.username}
            />
            <h2>Password</h2>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.inputHandlerLogin}
              value={this.state.login.password}
            />
            <button>Log In</button>
            <button onClick={this.signupButton}>Sign Up</button>
          </form>
        </PageStyle>
      );
    }
    return (
      <PageStyle>
        <form onSubmit={this.signupHandler}>
          <h2>Username</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.inputHandlerSignup}
            value={this.state.signup.username}
          />
          <h2>Password</h2>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.inputHandlerSignup}
            value={this.state.signup.password}
          />
          <h2>Email</h2>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={this.inputHandlerSignup}
            value={this.state.signup.email}
          />
          <button>Create Account</button>
        </form>
      </PageStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};
export default connect(
  mapStateToProps,
  { login }
)(Login);
