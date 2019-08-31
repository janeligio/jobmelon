import React, { Component } from 'react';
import JobListing from "./JobListing";
import Header from '../../Header';
import Footer from '../../Footer';
import axios from 'axios';
import './HomePage.css';

import {Row, Col} from 'reactstrap';
class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      listings: []
    })
  }

  getDatabase = () => {
    axios.get('/api/listings')
    .then(res => {
      this.setState({listings: res.data})
    })
    .catch(err => {
      console.log(err);
    });
  }
  // Grab listings from Mongo
  componentDidMount() {
    this.getDatabase();
    this.timerID = setInterval(this.getDatabase, 500);    
  }
  
  componentWillUnmount = () => {
    clearInterval(this.timerId);
  }

  render() {
    
    const Listings = this.state.listings.map((listing) => {
      return !listing.complete ?<JobListing key={listing._id} data={listing}/> : null;
    });
    return (
      <div className="HomePage">
        <Header />
        <h1 style={{
          display:'flex',
          justifyContent:'center',
          alignItems: 'center',
          height:'2em'
        }}>Current Job Listings</h1>
        <div style={{padding:'1em'}}>
          {Listings}
        </div>
        <Footer />
      </div>
      );
  }
}

export default HomePage;
