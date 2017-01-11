import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/actions';
import {receiveAuth} from '../actions/authActions';
import Chat from '../components/Chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';

const socket = io('', { path: '/api/chat' });
const initialChannel = 123; // NOTE: I hard coded this value for my example.  Change this as you see fit

class ChatContainer extends Component {
  componentWillMount() {
    const { dispatch, user } = this.props;
    if(!user.username) {
      dispatch(receiveAuth());
    }
    dispatch(actions.start(initialChannel, user.username));
  }
  render() {
    return (
      <Chat {...this.props} socket={socket} />
    );
  }
}
ChatContainer.propTypes = {
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  channels: PropTypes.array.isRequired,
  activeChannel: PropTypes.number.isRequired,
  typers: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
      messages: state.messages.data,
      channels: state.channels.data,
      activeChannel: state.activeChannel.id,
      user: state.auth.user,
      typers: state.typers,
      screenWidth: state.environment.screenWidth
  }
}
export default connect(mapStateToProps)(ChatContainer)
