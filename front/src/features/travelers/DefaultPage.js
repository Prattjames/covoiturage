import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'query-string';
import * as actions from './redux/actions';

import SearchPage from '../common/SearchPage';
import { ShowUser } from '../common';

export class DefaultPage extends Component {
  static propTypes = {
    travelers: PropTypes.object.isRequired,
    traveler: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="travelers-default-page">
        {!this.props.traveler
            ? <SearchPage entities={this.props.travelers.travelers} />
            : <ShowUser user={this.props.traveler} title="Voyageur" />
        }
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  const searchValue = state.common.search.value.toLowerCase();
  const travelerId = qs.parse(state.router.location.search);
  if (searchValue) {
    return {
        traveler: state.common.users[travelerId.id],
        travelers: {
            ...state.travelers,
            travelers: state.travelers.travelers
                .map(id => state.common.users[id])
                .filter(tl => (
                    tl.firstName.toLowerCase().includes(searchValue) ||
                    tl.lastName.toLowerCase().includes(searchValue) ||
                    tl.postalCode.toLowerCase().includes(searchValue) ||
                    tl.meetingPlace.toLowerCase().includes(searchValue)
                ))
        },
    };
  }
  return {
    traveler: state.common.users[travelerId.id],
    travelers: {
      ...state.travelers,
      travelers: state.travelers.travelers.map(id => state.common.users[id]),
    },
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
