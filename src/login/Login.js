import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import { dbReg } from '../config/configDb';

class Login extends Component{
  state = {
      isLoggedin : false
  };

  handleLoginSubmit=(e)=>{
    e.preventDefault()
    let userName=e.target.userName.value;
    let password=e.target.password.value;
    let currentComponent = this;

    dbReg.registration.where({email: userName, password: password})
          .first(function (userData) {
              console.log(userData);
              if(userData !== undefined)
              {
                localStorage.setItem("fullName",userData.name);
                localStorage.setItem("email",userData.email);
                localStorage.setItem("mobileNo",userData.mobile);
                localStorage.setItem("address",userData.address);
                localStorage.setItem("password",userData.password);

                currentComponent.setState({isLoggedin:true});
              }
              else{
                alert("Invalid credential");
                return false;
              }
    });
  }
  
  render(){
    if(this.state.isLoggedin)
    {
      return (<Redirect to='/Dashboard' />);
    }
    else
    {
      return(
        <div style={{ margin: "5% 5% 5% 28%", width: "40%" }} className="jumbotron">
        <h3 style={{ textAlign: "center" }}>Login</h3>
        <Form onSubmit={this.handleLoginSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="userName" required />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" required/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Link to="/UserRegistrationPage">New to us ! Register</Link>
        </Form>
      </div>
      )
    }
  }
}

export default Login;
