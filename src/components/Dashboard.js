import React, { Component } from 'react';
import { Badge, Container, Row, Col, Button } from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Link, Redirect } from "react-router-dom";
import db from '../config/configDb';

class Dashboard extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      isLoggedin : true,
      reviewList1: [],
      isLoaded: false
    }
  }

  getData(){
    const reviewList = [];
    db.review.where('email').equals(localStorage.getItem("email"))
          .each(function (review) {
              console.log(review);
              reviewList.push({title:review.title,
                              year:review.year,
                              type:review.type,
                              poster:review.poster,
                              imgId:review.imgId,
                              imdbRating:review.imdbRating,
                              userRating:review.userRating,
                              userCategory:review.userCategory});
    });

    setTimeout(() => {
      console.log('Our data is fetched');
      this.setState({
        reviewList1: reviewList,
        isLoaded: true
      })
    }, 1000)
  }

  componentDidMount(){
    this.getData();
  }

  navigate = () => {
    this.setState({isLoggedin:false});
    //<h4 style={{ textAlign: "right" }}><Button variant="outline-danger" type="submit" onClick={this.navigate.bind(this)}>Logout</Button></h4>
  }

  imageFormatter = (cell, row) => {
      return "<img src='"+cell+"' width='40' height='40' />" ;
  }

  render() {
    if(!this.state.isLoggedin)
    {
      return (<Redirect to='/Login' />);
    }
    else if (!this.state.isLoaded) {
      return <div>Loading...</div>;
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
          <h5 style={{ textAlign: "center" }}>To explore & review <Link to="/Explore">click here</Link>.</h5>
          <br />
          <h4>Review List:</h4><br />
          <BootstrapTable data={ this.state.reviewList1 } options={ { noDataText: 'No Data Available' } } >
            <TableHeaderColumn width={'20%'} dataField='title'>Title</TableHeaderColumn>
            <TableHeaderColumn width={'10%'} dataField='year'>Year</TableHeaderColumn>
            <TableHeaderColumn width={'15%'} dataField='type'>Type</TableHeaderColumn>
            <TableHeaderColumn width={'10%'} dataField='poster' dataFormat={this.imageFormatter}>Poster Image</TableHeaderColumn>
            <TableHeaderColumn width={'0%'} dataField='imgId' isKey={true} hidden={true}>Action</TableHeaderColumn>
            <TableHeaderColumn width={'10%'} dataField='imdbRating'>IMDB Rating</TableHeaderColumn>
            <TableHeaderColumn width={'10%'} dataField='userRating'>User Rating</TableHeaderColumn>
            <TableHeaderColumn width={'10%'} dataField='userCategory'>User Category</TableHeaderColumn>
        </BootstrapTable>
        </>
      );
    }
  }
}

export default Dashboard;
