import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Login from "./Login";

class UserRegistrationPage extends Component{
    state = {
        isRegistered : false
    };

    handleSubmit=(event)=>{
        event.preventDefault()
        //pasword validation
      if(event.target.password.value !== event.target.confirmPassword.value){
        alert("Passwords doesn't match");
          return false; // The form won't submit
      }
      else{
          //storing the data in local storage
        // let fullName=[];
        // fullName.push(event.target.fullName.value);
        // localStorage.setItem("fullName",JSON.stringify(fullName));
        let fullName=event.target.fullName.value;
        localStorage.setItem("fullName",fullName);
        let email=event.target.email.value;
        localStorage.setItem("email",email);
        let mobileNo=event.target.mobileNo.value;
        localStorage.setItem("mobileNo",mobileNo);
        let address=event.target.address.value;
        localStorage.setItem("address",address);
        let password=event.target.password.value;
        localStorage.setItem("password",password);
        let confirmPassword=event.target.confirmPassword.value;
        this.setState({isRegistered:true});
        alert("You have registered successfully");
      }
  }
  render(){
    if(this.state.isRegistered)
    {
        return (<Redirect to='/Login' />);
    }
    else
    {
      return (
          <div className="jumbotron" style={{ margin: "5% 5% 5% 28%", width: "45%" }}>
          <h5 style={{ textAlign: "center" }}>Registration</h5>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" name="fullName" required/>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" required />
            </Form.Group>
            <Form.Group controlId="formContactNo">
              <Form.Label>Mobile number</Form.Label>
              <Form.Control type="text" placeholder="Please ener 10 digit mobile no"  name="mobileNo" required pattern="[1-9]{1}[0-9]{9}"/>
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Address" name="address" required />
            </Form.Group>
      
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" required/>
            </Form.Group>
            <Form.Group controlId="formConfrimPassword">
              <Form.Label>Confrim Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" required />
            </Form.Group>
      
            <Button variant="primary" type="submit">
              Submit
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Link to="/">Back to login</Link>
          </Form>
        </div>
        )
    }
  }
}


export default UserRegistrationPage;

