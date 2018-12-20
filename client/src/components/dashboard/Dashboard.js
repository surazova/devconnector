import React, { Component } from 'react'; // classbased component
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  //Lifecycle method 
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  //button method 
  onDeleteClick(e) {
    this.props.deleteAccount();
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
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} /> 
            <Education education={profile.education} />
            <div style={{ marginBottom: '60px'}} />
            <button onClick={this.onDeleteClick.bind(this)}className="btn btn-danger">Delete My Account</button>
          </div>
        );
      }
      else {
        // user is logged in but has no profile 
        dashboardContent = (
          <div> 
        <div>
          <p className ="lead text-muted">Welcome { user.name }</p>
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
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
