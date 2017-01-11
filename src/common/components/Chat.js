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
import LeftBar from './LeftBar';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class Chat extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    channels: PropTypes.array.isRequired,
    activeChannel: PropTypes.number.isRequired,
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
    console.log("Props:");
    console.log(this.props);
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
    console.log("update:");
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
  changeActiveChannel(channel) {
    const { socket, activeChannel, dispatch } = this.props;
    socket.emit('leave channel', activeChannel.id);
    socket.emit('join channel', channel.id);
    dispatch(actions.changeChannel(channel.id));
    dispatch(actions.fetchMessages(channel.id));
  }
  render() {
    const { messages, socket, channels, activeChannel, typers, dispatch, user, screenWidth} = this.props;
    //const filteredMessages = messages.filter(message => message.channelID === activeChannel);
    const filteredMessages = messages;
    const username = this.props.user.username;
    const styles = {
      right: {
        float:'right',
        paddingRight:'15px',
        background: '#01d999',
        textAlign: 'right',
        color:'white',
        lineHeight:'20px'
      },
      left: {
        background: '#0199d9',
        float:'left',
        textAlign: 'left',
        color:'white',
        lineHeight:'20px'
      }
    }
    var title = "Bonjour "+username;
    var el = (
      <h1>Veuillez selectionner un element sur la gauche</h1>
    );
    if (filteredMessages.length) {
      el = (
        <div className="main">
          <ul style={{wordWrap: 'break-word', margin: '0', overflowY: 'auto', padding: '0', paddingBottom: '1em', flexGrow: '1', order: '1'}} ref="messageList">
            {filteredMessages.map(message =>
              <MessageListItem message={message} key={message.id} />
            )}
          </ul>
          <MessageComposer socket={socket} activeChannel={activeChannel} user={user} onSave={::this.handleSave} />
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
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          }
        />
        <LeftBar socket={socket} onClick={::this.changeActiveChannel} channels={channels} messages={messages} dispatch={dispatch} />
        <div id="sbottom" style={{width:'73%',height:'80vh',overflowY:'scroll',overflowX:'hidden'}}>
          {el}
          <footer style={{fontSize: '1em', position: 'fixed', bottom: '0.2em', left: '21.5rem', color: '#000000', width: '100%', opacity: '0.5'}}>
            {typers.length === 1 &&
              <div>
                <span>
                  <TypingListItem username={typers[0]} key={1}/>
                  <span> is typing</span>
                </span>
              </div>}
            {typers.length === 2 &&
            <div>
              <span>
                <TypingListItem username={typers[0]} key={1}/>
                <span> and </span>
                <TypingListItem username={typers[1]} key={2}/>
                <span> are typing</span>
              </span>
            </div>}
            {typers.length > 2 &&
            <div>
              <span>Several people are typing</span>
            </div>}
          </footer>
        </div>
      </div>
    );
  }
}
