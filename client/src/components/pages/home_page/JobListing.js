import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

// Reactstrap
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class JobListing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  routeChange = () => {
    const linkToJob = '/job/' + this.props.data._id;
    this.props.history.push(linkToJob);
  }

  render() {
    const {
        _id,
        jobName,
        price,
        cityName,
        stateCode,
        description,
        datePosted
      } = this.props.data;
    let formattedDate = moment(datePosted).format("dddd, MMMM Do YYYY, hA");

    return (
      <Card style={{margin:'1em'}}>
        <CardBody>
          <CardTitle><h3 style={{fontSize:'1.5em'}}>{jobName}</h3> {formattedDate}</CardTitle>
          <CardSubtitle>${price} - {cityName}, {stateCode}</CardSubtitle>
          <CardText>{description}</CardText>
          <Button onClick={this.routeChange}>View</Button>
        </CardBody>
      </Card>
      );
  }
}

const OldJobListing = (props) => {
  const listingStyle = {
    borderBottom: "0.1px solid grey",
    paddingBottom: "1em"
  };

  return (
    <div onClick={props.routeChange} style={props.listingStyle} className="Homepage-Listing">
      <h3>{props.jobName}</h3>
      <h4>${props.price}</h4>
      <p>{props.cityName}, {props.stateCode}</p>
      <p>{props.description}</p>
      <p>Posted: {props.formattedDate}</p>
    </div>);
}

export default withRouter(JobListing);
