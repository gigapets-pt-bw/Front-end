import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { login, register, fetchChildren } from "../../actions/index.js";

const PageStyle = styled.div`
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  form {
    opacity: 0.96;
    height: 90vh;
    width: 40%;
    box-shadow: 5px 5px 4px 4px #696F71;
    border-radius: 12.5px;
    background-color: #31393c;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-around;
    .logo-wrapper {
      display: flex;
      justify-content: center;
      align-content: flex-start;
      width: 100%;
      .logo {
        width: 200px;
        margin-top: 15px;
        margin-bottom: 40px;
      }
    }
    input {
      border-radius: 5px;
      background-color: #8AC926;
      color: #31393C;
      padding-left: 10px;
      width: 45%;
      height: 10%;
      font-size: 18px;
      font-weight: bolder;
      margin-bottom: 15px;
    }
    h2 {
      font-family: 'Londrina Shadow', cursive;
      color: #8ac926;
      width: 45%;
      font-size: 40px;
      font-weight: bolder;
      align-self: center;
      margin-top: 5px;
      margin-bottom: 10px;
    }

    button {
      font-family: 'Capriola', sans-serif;
      background-color: #8ac926;
      color: white;
      cursor: pointer;
      border-radius: 3px;
      border: 1px solid lightgray;
      margin: 10% 20px;
      height: 60px;
      width: 140px;
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
      password: ""
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

  redirect = event => {
    this.props.history.push('/home');
  }

  fetch = event => {
    this.props.fetchChildren(this.props.user.id);
  }

  loginHandler = event => {
    event.preventDefault();
    this.props.login(this.state.login, this.redirect, this.fetch);
    this.setState({ login: { username: "", password: "" } });
  };

  signupHandler = event => {
    event.preventDefault();
    this.props.register(this.state.signup, this.redirect, this.fetch);
    this.setState({
      signup: { username: "", password: ""},
      newSignup: false
    });
  };

  backButton = event => {
    event.preventDefault();
    this.setState({newSignup: false});
  }

  signupButton = event => {
    event.preventDefault();
    this.setState({ newSignup: true });
  };

  render() {
    let loginform =
        <PageStyle>
          <form onSubmit={this.loginHandler}>
            <div className="logo-wrapper">  
              <img className="logo" src={process.env.PUBLIC_URL + '/GigaPet-Logo.png'} alt="GigaPet Logo"></img>
            </div>
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
            <button type="submit">Log In</button>
            <button onClick={this.signupButton}>Sign Up</button>
          </form>
        </PageStyle>
    
    let signupform =
        <PageStyle>
            <form onSubmit={this.signupHandler}>
                <div className="logo-wrapper">
                  <img className="logo" src={process.env.PUBLIC_URL + '/GigaPet-Logo.png'} alt="GigaPet Logo"></img>
                </div>
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
                <button type="submit">Create Account</button>
                <button onClick={this.backButton}>Back</button>
              </form>
        </PageStyle>
        
        return (
          <>
          { this.state.newSignup ? signupform : loginform }
          </>
        );
    }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  { login, register, fetchChildren }
)(Login);
