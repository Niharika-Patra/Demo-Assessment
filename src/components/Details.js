import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import apikey from '../config/config';

class DetailsTable extends Component {

    constructor(props)
    {
        super(props);
        //console.log(props);
    
        this.state = {
            movies_details : null,
            isError : '',
            isLoaded: false,
            reviewUrl: "/Review/"+this.props.match.params.id
        };
    }

    componentDidMount(){
        let currentComponent = this;
        const imgId = this.props.match.params.id;

        axios.get('http://www.omdbapi.com/?i='+imgId+'&apikey='+apikey)
            .then(function (response) {
                if(response.data.Response === "True")
                {
                    currentComponent.setState({movies_details : response.data, isLoaded: true});
                    console.log(response.data);
                }
                else
                {
                    currentComponent.setState({isError : response.data.Error, isLoaded: true});
                    console.log(response.data.Error);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    render() {
      if(this.state.isError !== '')
      {
        return (
            <>
                <br/>
                <Container>
                    <Row>
                        <Col><h3>Movie Details :</h3></Col>
                        <Col><h4 style={{ textAlign: "right" }}><Link to="/Explore">Go Back</Link></h4></Col>
                    </Row>
                    <Row>
                        <Col>
                            <br/><br/>
                            <h5 style={{ textAlign: "center" }}>{this.state.isError}</h5></Col>
                        <Col></Col>
                    </Row>
                </Container>
            </>
          );
      }
      else if (!this.state.isLoaded) {
        return <div>Loading...</div>;
      }
      else
      {
        return (
            <>
                <br/>
                <Container>
                    <Row>
                        <Col><h4>Movie Details :</h4></Col>
                        <Col><h4 style={{ textAlign: "center" }}><Link to={this.state.reviewUrl}><Button variant="success" type="button">Add Review</Button></Link></h4></Col>
                        <Col><h4 style={{ textAlign: "right" }}><Link to="/Explore">Go Back</Link></h4></Col>
                    </Row>
                    <Row>
                        <Col colSpan="3">
                            <br/>
                            <Table striped bordered hover responsive>
                                <tbody>
                                    <tr>
                                        <td colSpan="2" style={{ fontWeight:"bold" }}>Title</td>
                                        <td colSpan="2">{this.state.movies_details.Title}</td>
                                        <td colSpan="2"><img src={this.state.movies_details.Poster} alt="No Image" width='50' height='50' /></td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight:"bold" }}>Year</td>
                                        <td>{this.state.movies_details.Year}</td>
                                        <td style={{ fontWeight:"bold" }}>Rated</td>
                                        <td>{this.state.movies_details.Rated}</td>
                                        <td style={{ fontWeight:"bold" }}>Released</td>
                                        <td>{this.state.movies_details.Released}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight:"bold" }}>Runtime</td>
                                        <td>{this.state.movies_details.Runtime}</td>
                                        <td style={{ fontWeight:"bold" }}>Genre</td>
                                        <td>{this.state.movies_details.Genre}</td>
                                        <td style={{ fontWeight:"bold" }}>Director</td>
                                        <td>{this.state.movies_details.Director}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight:"bold" }}>Writer</td>
                                        <td colSpan="5">{this.state.movies_details.Writer}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight:"bold" }}>Actors</td>
                                        <td colSpan="2">{this.state.movies_details.Actors}</td>
                                        <td style={{ fontWeight:"bold" }}>Plot</td>
                                        <td colSpan="2">{this.state.movies_details.Plot}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight:"bold" }}>Language</td>
                                        <td>{this.state.movies_details.Language}</td>
                                        <td style={{ fontWeight:"bold" }}>Country</td>
                                        <td>{this.state.movies_details.Country}</td>
                                        <td style={{ fontWeight:"bold" }}>Awards</td>
                                        <td>{this.state.movies_details.Awards}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </>
          );
      }
    }
}

export default DetailsTable;