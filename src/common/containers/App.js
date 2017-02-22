import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {initEnvironment} from '../actions/actions';
import { connect } from 'react-redux';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class App extends React.Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(initEnvironment());
  }

  render() {
    const {screenHeight, isMobile, screenWidth} = this.props.environment;
    if (isMobile) {
      return (
        <div style={{height: `${screenHeight}px`, width: `${screenWidth}px`, backgroundColor:'lightblue'}}>
          {this.props.children}
        </div>
      );
    }
    return (
      <div style={{height: '100vh', backgroundColor:'#e1f5ff'}} >
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    environment: state.environment
  }
}

export default connect(mapStateToProps)(App)
