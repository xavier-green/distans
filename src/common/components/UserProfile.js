import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import * as actions from '../actions/actions';
import * as authActions from '../actions/authActions';
import TypingListItem from './TypingListItem';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import AppBar from 'material-ui/lib/app-bar';
import LeftBarUser from './LeftBarUtilisateur';
import LeftBarPsy from './LeftBarPsy';
import MenuItem from 'material-ui/lib/menus/menu-item';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditUser from './edit/EditUser';
import EditPsy from './edit/EditUser';

export default class EditProfile extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    channels: PropTypes.array.isRequired,
    account: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      privateChannelModal: false,
      targetedUser: ''
    }
  }

  componentDidMount() {
    const { user } = this.props;
    console.log("Edit");
    console.log(this.props);
  }

  handleSignOut() {
    const { dispatch } = this.props;
    dispatch(authActions.signOut());
  }
  changeActiveChannel(channel) {
    const { socket, activeChannel, dispatch } = this.props;
    socket.emit('leave channel', activeChannel);
    socket.emit('join channel', channel._id);
    dispatch(actions.changeChannel(channel._id));
    dispatch(actions.fetchMessages(channel._id));
  }
  render() {
    const { messages, socket, channels, account, dispatch, user } = this.props;

    return (
      <div>
        <AppBar
          title="Mon compte"
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Mon compte" />
              <MenuItem onClick={::this.handleSignOut} primaryText="Déconnexion" />
            </IconMenu>
          }
        />
        {
          account == 'psy' ?
          <LeftBarPsy socket={socket} onClick={::this.changeActiveChannel} channels={channels} messages={messages} dispatch={dispatch} /> :
          <LeftBarUser socket={socket} messages={messages} dispatch={dispatch} />
        }
        <div id="sbottom" style={{width:'73%',height:'80vh',overflowY:'scroll',overflowX:'hidden'}}>
        {
          account == 'psy' ?
          <EditPsy user={user} dispatch={dispatch} /> :
          <EditUser user={user} dispatch={dispatch} />
        }
        </div>
      </div>
    );
  }
}
