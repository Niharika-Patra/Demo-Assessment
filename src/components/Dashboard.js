import React, { Component } from 'react';
import { Badge, Container, Row, Col, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

class Dashboard extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      isLoggedin : true
    }
  }

  navigate = () => {
    this.setState({isLoggedin:false});
    //<h4 style={{ textAlign: "right" }}><Button variant="outline-danger" type="submit" onClick={this.navigate.bind(this)}>Logout</Button></h4>
  }

  render() {
    if(!this.state.isLoggedin)
    {
      return (<Redirect to='/Login' />);
    }
    else
    {
      return (
        <>
          <div className="jumbotron">
            <h3 style={{ textAlign: "center" }}>Dashboard</h3>
          </div>
          <Container>
              <Row>
                  <Col><h4>Welcome <Badge variant="primary">{localStorage.getItem("fullName")}</Badge></h4></Col>
                  <Col></Col>
              </Row>
          </Container>
          <br />
          <h5 style={{ textAlign: "center" }}>No Reviews. To explore & review <Link to="/Explore">click here</Link>.</h5>
        </>
      );
    }
  }
}

export default Dashboard;
