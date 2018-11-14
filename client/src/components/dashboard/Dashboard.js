import React, { Component } from 'react'; // classbased component
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  //Lifecycle method 
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />
    }
    else {
      // Check if logged in user has profile data 
      if (Object.keys(profile).length > 0) { // takes keys of the profile object and checks if there is any in there 
        dashboardContent = <h4>TODo: DISPLAY PROFILE</h4>
      }
      else {
        // user is logged in but has no profile 
        dashboardContent = (
          <div> 
        <div className ="lead text-muted">
          <p>Welcome { user.name }</p>
            <p>You have not yet set up a profile, please add some  info </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile 
            </Link>
        </div> 
        </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
        <div className="row">
        <div className="col-md-12">
        <div className="display-4"><h1>Dashboard</h1>
        {dashboardContent}
        </div>
        </div>
        </div>
      </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
