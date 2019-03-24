import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import apikey from '../config/config';

class ListTable extends Component {

    constructor(props)
    {
        super(props);
        this.searchInput = React.createRef();

        this.state = {
            movies_list : [],
            errorMessage : '',
            totalDataSize: 0,
            sizePerPage: 10,
            currentPage: 1
        };
    }

    componentDidMount(){
        let currentComponent = this;
        axios.get('http://www.omdbapi.com/?s=one&page=1&apikey='+apikey)
            .then(function (response) {
                if(response.data.Response)
                {
                    currentComponent.setState({movies_list : response.data.Search,
                                            totalDataSize : parseInt(response.data.totalResults)
                                           });
                }
                else
                {
                    console.log(response.data.Error);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    imageFormatter = (cell, row) => {
        return "<img src='"+cell+"' width='40' height='40' />" ;
    }

    linkFormatter = (cell, row) => {
        return "<a href='/Details/"+cell+"'>View Details</a>" ;
    }

    onPageChange(page, sizePerPage) {
        console.log(this.searchInput.current.value); 
        let search = this.searchInput.current.value !== '' ? this.searchInput.current.value : 'one';
        let currentComponent = this;
        axios.get('http://www.omdbapi.com/?s='+search+'&page='+page+'&apikey='+apikey)
            .then(function (response) {
                if(response.data.Response)
                {
                    currentComponent.setState({movies_list : response.data.Search,
                                            totalDataSize : parseInt(response.data.totalResults),
                                            currentPage: page
                                           });
                }
                else
                {
                    console.log(response.data.Error);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    getSearchResult = (event) => {
        console.log(event.target.value);
        let search = event.target.value !== '' ? event.target.value : 'one';
        let currentComponent = this;

        axios.get('http://www.omdbapi.com/?s='+search+'&page=1&apikey='+apikey)
            .then(function (response) {
                if(response.data.Response === "True")
                {
                    console.log(response);
                    currentComponent.setState({movies_list : response.data.Search, 
                                                errorMessage: '',
                                                totalDataSize : parseInt(response.data.totalResults),
                                                currentPage: 1
                                            });
                }
                else
                {
                    console.log(response.data.Error);
                    currentComponent.setState({movies_list : [], 
                                                errorMessage: response.data.Error,
                                                totalDataSize : 0,
                                                currentPage: 1
                                            });
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    render() {
      return (
        <>
        <br/>
        <Container>
            <Row>
                <Col><h3>Movie List :</h3></Col>
                <Col><h4 style={{ textAlign: "right" }}><Link to="/Dashboard">Dashboard</Link></h4></Col>
            </Row>
            <Row>
                <Col><br/>
                    <input type="text" size="7" className="form-control" name="seacrBox" id="seacrBox" placeholder="Search By Title..." onChange={this.getSearchResult} ref={this.searchInput} />
                    <span id="errorSpan" style={{ color:"red", fontWeight: "bold" }}>{this.state.errorMessage}</span>
                </Col>
                <Col></Col>
            </Row>
        </Container>
        <BootstrapTable data={ this.state.movies_list } options={ { noDataText: 'No Data Available' } } remote={ true } pagination={ true }
                      fetchInfo={ { dataTotalSize: this.state.totalDataSize } }
                      options={ { sizePerPage: this.state.sizePerPage,
                                  paginationSize: 10,  // the pagination bar size.
                                  onPageChange: this.onPageChange.bind(this),
                                  page: this.state.currentPage,
                                  hideSizePerPage: true,
                                  paginationPosition: 'top' } }>
            <TableHeaderColumn width={'40%'} dataField='Title'>Title</TableHeaderColumn>
            <TableHeaderColumn width={'15%'} dataField='Year'>Year</TableHeaderColumn>
            <TableHeaderColumn width={'15%'} dataField='Type'>Type</TableHeaderColumn>
            <TableHeaderColumn width={'15%'} dataField='Poster' dataFormat={this.imageFormatter}>Poster Image</TableHeaderColumn>
            <TableHeaderColumn width={'15%'} dataField='imdbID' isKey={true} dataFormat={this.linkFormatter}>Action</TableHeaderColumn>
        </BootstrapTable>
        </>
      );
    }
}

export default ListTable;