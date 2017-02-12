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
import Snackbar from 'material-ui/lib/snackbar';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

export default class Chat extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    errors: PropTypes.array.isRequired,
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
      currentPatient: null,
      error: false,
      errorMessage: '',
      dialog: false
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
    console.log(this.props);
    if (this.props.errors.length && !this.state.error) {
      this.setState({
        error: true,
        errorMessage: this.props.errors[0]
      })
    }
    var objDiv = document.getElementById("sbottom");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  handleSave(newMessage) {
    const { dispatch, socket } = this.props;
    if (newMessage.text.length !== 0) {
      dispatch(actions.createMessage(newMessage, socket));
    }
  }
  handleSignOut() {
    const { dispatch } = this.props;
    dispatch(authActions.signOut());
  }
  myAccount() {
    this.props.history.push('/edit');
  }
  gotoChat() {
    this.props.history.push('/chat');
  }
  gotoContact() {
    this.props.history.push('/contact');
  }
  changeActiveChannel(channel) {
    const { socket, activeChannel, dispatch } = this.props;
    this.currentPatient = channel.utilisateur.name;
    socket.emit('leave channel', activeChannel);
    socket.emit('join channel', channel._id);
    dispatch(actions.changeChannel(channel._id));
    dispatch(actions.fetchMessages(channel._id));
  }
  handleActionTouchTap() {
    this.setState({
      error: false,
      dialog: true
    });
  }
  handleRequestClose() {
    this.setState({
      error: false,
    });
  }
  handleClose() {
    this.setState({dialog: false});
  }
  render() {
    const { messages, socket, channels, activeChannel, account, typers, dispatch, user, screenWidth, history, currentPatient } = this.props;
    //const filteredMessages = messages.filter(message => message.channelID === activeChannel);
    const filteredMessages = messages;
    const actions = [
      <FlatButton
        label="RDV"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={::this.handleClose}
      />,
      <FlatButton
        label="Non"
        primary={true}
        onTouchTap={::this.handleClose}
      />,
      <FlatButton
        label="Contact"
        onTouchTap={::this.handleClose}
      />
    ];
    var title = null;
    var name = null;
    if (account == 'user') {
      name = this.props.user.username;
      title = "Bonjour "+name+" ! ";
    } else {
      name = this.props.user.name;
      title = "Bonjour "+name+" ! ";
    }
    var el = (
      <h1>Veuillez selectionner un element sur la gauche</h1>
    );
    if (activeChannel !== "0") {
      el = (
        <div className="main">
          <ul style={{wordWrap: 'break-word', margin: '0', overflowY: 'auto', padding: '0', paddingBottom: '1em', flexGrow: '1', order: '1'}} ref="messageList">
            {filteredMessages.map(message =>
              <MessageListItem patient={currentPatient} name={name} account={account} message={message} key={message._id} />
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
          <LeftBarPsy gotoContact={::this.gotoContact} gotoChat={::this.gotoChat} myAccount={::this.myAccount} history={history} socket={socket} onClick={::this.changeActiveChannel} channels={channels} messages={messages} dispatch={dispatch} /> :
          <LeftBarUser gotoContact={::this.gotoContact} gotoChat={::this.gotoChat} myAccount={::this.myAccount} history={history} socket={socket} messages={messages} dispatch={dispatch} />
        }
        <div id="sbottom" style={{height:'85vh',overflowY:'scroll',overflowX:'hidden'}}>
          {el}
        </div>
        <Snackbar
          open={this.state.error}
          message={this.state.errorMessage}
          action="Ok"
          autoHideDuration={5000}
          onActionTouchTap={::this.handleActionTouchTap}
          onRequestClose={::this.handleRequestClose}
        />
        <Dialog
          title="Limite de messages atteinte"
          actions={actions}
          modal={false}
          open={this.state.dialog}
          onRequestClose={::this.handleClose}
        >
          Vous avez atteint la limite de 50 messages que vous pouviez envoyer gratuitement à votre psychologue.<br/>
          Si vous vous sentez prêt à prendre rendez-vous avec votre psychologue actuel veuillez confirmer en cliquant sur RDV
          ci-dessous. Si vous avez une hésitation (ou problème, tel que l'affectation des psychologues, n'hésitez pas à nous contacter !
        </Dialog>
      </div>
    );
  }
}
