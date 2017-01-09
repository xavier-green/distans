import React from 'react';
import {render} from 'react-dom';
import AppBar from 'material-ui/AppBar'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import LeftBar from './leftbar.jsx';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import { setUsername } from '../actions';

import LoginDialog from './logindialog.jsx';

class BarComponent extends React.Component {
  render () {
    var title = "Distans"
    if (this.props.user.username) {
      title += " (Logged in as "+this.props.user.username+")";
    }
    return  (
      <div>
        <AppBar
          title={title}
          iconElementRight={
            <IconButton iconClassName="muidocs-icon-custom-github" disabled={true} />
          }
        />
        <LeftBar />
        <LoginDialog onSend={this.props.setUsername} />
        <div style={{width:'100%',background:'#f7f7f7'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("MAIN CHANGE");
  console.log(state);
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (text) => {
      dispatch(setUsername(text))
    }
  }
}

const MainComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(BarComponent)

export default MainComponent
