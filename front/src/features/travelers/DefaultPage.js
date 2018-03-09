import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import SearchPage from '../common/SearchPage';

export class DefaultPage extends Component {
  static propTypes = {
    travelers: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="travelers-default-page">
        <SearchPage entities={this.props.travelers.travelers} />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    travelers: {
      ...state.travelers,
      travelers: state.travelers.travelers.map(id => state.common.users[id])
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
