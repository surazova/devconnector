// Class-based component
// For the other profiles in the dev connector 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions'; // Import action

class Profiles extends Component {

  // We want to get profiles as soon as the component is mounted 
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems; // initialize

    if (profiles === null || loading) { // Function for if there are no profiles found or if the page is loading 
      profileItems = <Spinner />; // Spinner if the page is loading 
    }
    else {
      if (profiles.length > 0) { // If there are no profiles 
        // The profiles are displayed if length is more than 0 
        profileItems = <h1>PROFILES HERE</h1>
      }
      else {
        profileItems = <h4>No Profiles Found...</h4> // Message if there are no profiles found at all
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center"> Developer Profiles</h1>
              <p className="lead text-center">
              Browse and connect with developers!
              </p>
              {profileItems}
              </div>
            </div>
          </div>
        </div>
    )
  }
}

// Add prop-types
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

// Add Profiles state 
const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);
