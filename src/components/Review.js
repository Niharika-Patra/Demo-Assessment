import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Form, Button, ToggleButtonGroup, ToggleButton, ButtonToolbar } from "react-bootstrap";
import db from '../config/configDb';
import axios from "axios";
import apikey from '../config/config';

class Review extends Component {
    constructor(props)
    {
      super(props);

      this.state = {
          value : 1,
          isSubmitted : false,
          movieStatus : true,
          title : '',
          year : '',
          type: '',
          poster: '',
          imdbRating:''
      }
    }

    componentDidMount(){
        let currentComponent = this;
        const imgId = this.props.match.params.id;
        console.log("Lifecycle");
        axios.get('http://www.omdbapi.com/?i='+imgId+'&apikey='+apikey)
            .then(function (response) {
                console.log(response);
                if(response.data.Response == "False")
                {
                    console.log("Error");
                    currentComponent.setState({movieStatus : false});
                    console.log(response.data.Error);
                }
                else
                {
                    currentComponent.setState({title : response.data.Title,
                                                year : response.data.Year,
                                                type : response.data.Genre,
                                                poster : response.data.Poster,
                                                imdbRating : response.data.imdbRating});
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    handleReviewSubmit=(e)=>{
        e.preventDefault()
        let userRating=e.target.userRating.value;
        let userChoice=e.target.userChoice.value;
        console.log(userRating);
        console.log(userChoice);

        db.review.add({imgId:this.props.match.params.id, 
                        email: localStorage.getItem("email"), 
                        title : this.state.title,
                        year : this.state.year,
                        type : this.state.type,
                        poster : this.state.poster,
                        imdbRating : this.state.imdbRating,
                        userRating : userRating,
                        userCategory: userChoice
                    }).catch(function(error) {
             console.log("Ooops: " + error);
          });
        this.setState({isSubmitted : true});
      }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    render() {
        if(!this.state.movieStatus)
        {
            return(<h3><br />Movie Not Found. To go back, <Link to="/Explore">click here</Link>.</h3>);
        }
        else
        {
            if(this.state.isSubmitted)
            {
                return (<Redirect to='/Dashboard' />);
            }
            else
            {
                return (
                    <div style={{ margin: "0% 0% 0% 20%", width: "50%" }} className="jumbotron">
                        <h3 style={{ textAlign: "center" }}>Add Review</h3>
                        <Form onSubmit={this.handleReviewSubmit}>
                        <Form.Group controlId="formBasicRating">
                            <Form.Label>Your Rating</Form.Label>
                            <Form.Control type="range" value={this.state.value} min="1" max="10" step="1" name="userRating" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicChoice">
                            <Form.Label>How likely you recommend the movie</Form.Label><br/>
                            <ButtonToolbar>
                                <ToggleButtonGroup type="radio" name="userChoice" defaultValue={"Less"} >
                                    <ToggleButton value={"Less"}>Less</ToggleButton>
                                    <ToggleButton value={"Very"}>Very</ToggleButton>
                                    <ToggleButton value={"Extremely Likely"}>Extremely Likely</ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonToolbar>
                        </Form.Group>
                        <Button style={{ marginLeft: "80%" }} variant="info" type="submit">
                            Submit
                        </Button>
                        </Form>
                    </div>
                );
            }
        }
    }
}

export default Review;