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

export default class Chat extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    channels: PropTypes.array.isRequired,
    account: PropTypes.string.isRequired,
    activeChannel: PropTypes.string.isRequired,
    typers: PropTypes.array.isRequired,
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
    const { socket, user, dispatch, activeChannel } = this.props;
    socket.emit('chat mounted', user);
    // socket.emit('join channel', 123);
    socket.on('new bc message', msg =>
      dispatch(actions.receiveRawMessage(msg))
    );
    socket.on('typing bc', user =>
      dispatch(actions.typing(user))
    );
    socket.on('stop typing bc', user =>
      dispatch(actions.stopTyping(user))
    );
    socket.on('new channel', channel =>
      dispatch(actions.receiveRawChannel(channel))
    );
    socket.on('receive socket', socketID =>
      dispatch(authActions.receiveSocket(socketID))
    );
    socket.on('receive private channel', channel =>
      dispatch(actions.receiveRawChannel(channel))
    );
  }
  componentDidUpdate() {
    console.log("Update");
    console.log(this.props);
    var objDiv = document.getElementById("sbottom");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  handleSave(newMessage) {
    const { dispatch } = this.props;
    if (newMessage.text.length !== 0) {
      dispatch(actions.createMessage(newMessage));
    }
  }
  handleSignOut() {
    const { dispatch } = this.props;
    dispatch(authActions.signOut());
  }
  myAccount() {
    console.log(this.props);
    console.log(this.props.history);
    this.props.history.push('/edit');
  }
  changeActiveChannel(channel) {
    const { socket, activeChannel, dispatch } = this.props;
    socket.emit('leave channel', activeChannel);
    socket.emit('join channel', channel._id);
    dispatch(actions.changeChannel(channel._id));
    dispatch(actions.fetchMessages(channel._id));
  }
  render() {
    const { messages, socket, channels, activeChannel, account, typers, dispatch, user, screenWidth, history} = this.props;
    //const filteredMessages = messages.filter(message => message.channelID === activeChannel);
    const filteredMessages = messages;
    var title = null;
    if (account == 'user') {
      title = "Bonjour "+this.props.user.username+" !";
    } else {
      title = "Bonjour "+this.props.user.name+" !";
    }
    var el = (
      <h1>Veuillez selectionner un element sur la gauche</h1>
    );
    if (activeChannel !== "0") {
      el = (
        <div className="main">
          <ul style={{wordWrap: 'break-word', margin: '0', overflowY: 'auto', padding: '0', paddingBottom: '1em', flexGrow: '1', order: '1'}} ref="messageList">
            {filteredMessages.map(message =>
              <MessageListItem account={account} message={message} key={message.time+message.text} />
            )}
          </ul>
          <MessageComposer account={account} socket={socket} activeChannel={activeChannel} user={user} onSave={::this.handleSave} />
        </div>
      )
    }
    return (
      <div>
        <AppBar
          title={title}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem onClick={::this.myAccount} primaryText="Mon compte" />
              <MenuItem onClick={::this.handleSignOut} primaryText="Déconnexion" />
            </IconMenu>
          }
        />
        {
          account == 'psy' ?
          <LeftBarPsy history={history} socket={socket} onClick={::this.changeActiveChannel} channels={channels} messages={messages} dispatch={dispatch} /> :
          <LeftBarUser history={history} socket={socket} messages={messages} dispatch={dispatch} />
        }
        <div id="sbottom" style={{width:'73%',height:'80vh',overflowY:'scroll',overflowX:'hidden'}}>
          {el}
        </div>
      </div>
    );
  }
}
