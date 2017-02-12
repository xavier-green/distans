import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/actions';
import {receiveAuth} from '../actions/authActions';
import Chat from '../components/Chat';
import UserProfile from '../components/UserProfile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';

const socket = io('', { path: '/api/chat' });
const initialChannel = "123"; // NOTE: I hard coded this value for my example.  Change this as you see fit

class ChatContainer extends Component {
  componentWillMount() {
    const { dispatch, user, account, history } = this.props;
    if(!user.id) {
      history.replace('/login')
    } else {
      dispatch(actions.start(user, account, socket));
    }
  }
  render() {
    if (this.props.user.id == null) {
      return (
        <p>Chargement...</p>
      )
    }
    var element = (<p>Chargement...</p>);
    if (this.props.route.path == "/chat") {
      element = (<Chat {...this.props} socket={socket} />);
    } else if (this.props.route.path == "/edit") {
      element = (<UserProfile {...this.props} socket={socket} app='edit' />)
    } else if (this.props.route.path == "/contact") {
      element = (<UserProfile {...this.props} socket={socket} app='contact' />)
    }
    return (
      element
    );
  }
}
ChatContainer.propTypes = {
  messages: PropTypes.array.isRequired,
  errors: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  channels: PropTypes.array.isRequired,
  account: PropTypes.string.isRequired,
  activeChannel: PropTypes.string.isRequired,
  typers: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
      messages: state.messages.data,
      errors: state.errors.errors,
      channels: state.channels.data,
      activeChannel: state.activeChannel.id,
      user: state.auth.user,
      account: state.auth.account,
      typers: state.typers,
      screenWidth: state.environment.screenWidth
  }
}
export default connect(mapStateToProps)(ChatContainer)
