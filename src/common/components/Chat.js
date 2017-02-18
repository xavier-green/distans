import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItemBeta';
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
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';

let backImage = '/assets/back.jpg';

const items = [
  <MenuItem key={1} value="physique" primaryText="Rendez-vous physique"/>,
  <MenuItem key={2} value="distance" primaryText="Rendez-vous à distance par appel vidéo"/>,
];

const backStyle = {
  height:'90vh',
  overflowY:'scroll',
  overflowX:'hidden',
  backgroundImage: 'url('+backImage+')',
  backgroundSize: 'cover',
  paddingLeft: '15px'
};

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
      dialog: false,
      rdv: false,
      message: '',
      phone: '',
      type: '',
      email: this.props.user.email || this.props.user.userObject.email || null,
      msgSent: false
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
  fermer() {
    this.setState({rdv: false});
  }
  _handleChange(element,e) {
    var data = {};
    data[element] = e.target.value;
    this.setState(data);
  }
  _selectChange(e, index, value) {
    this.setState({type: value})
  }
  rdv() {
    this.setState({rdv: true,dialog: false})
  }
  send() {
    let { email,message,phone,type } = this.state;
    let beginning = 'From: '+email+' ( '+phone+' )<br/>Type de rdv: '+type+'<br/><br/><br/>Message: ';
    this.props.dispatch(actions.contact(email, 'Prise de RDV', beginning+message));
    this.setState({msgSent: true, message: '', rdv: false});
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
        onTouchTap={::this.rdv}
      />,
      <FlatButton
        label="Non"
        primary={true}
        onTouchTap={::this.handleClose}
      />,
      <FlatButton
        label="Contact"
        onTouchTap={::this.gotoContact}
      />
    ];
    const okay = [
    <FlatButton
        label="Annuler"
        primary={true}
        onTouchTap={::this.fermer}
      />,
      <FlatButton
          label="Envoyer"
          secondary={true}
          onTouchTap={::this.send}
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
      <Card style={{marginTop:'25px',marginRight:'16px'}}>
        <CardTitle title="Bienvenue !" titleStyle={{fontSize:'30px'}} />
        <CardText style={{fontSize:'16px'}}>
          Cette plateforme est la toute première version de DistAns.<br/>
          Nous voulons donner la meilleure expérience possible à vous, psychologues, ainsi que tous les patients qui
          viendront à votre rencontre. C'est donc dans ce processus que vous nous demandons de nous faire part de toute
          suggestion ou bug afin que nous mettions le plus souvent à jour cet outil d'échange.<br/><br/>
          Nous vous remercions de nous avoir fait confiance, vous pouvez maintenant <b>choisir un patient sur la gauche</b>
        </CardText>
      </Card>
    );
    if (activeChannel !== "0") {
      backStyle.height = '85vh';
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
        <div id="sbottom" style={backStyle}>
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
        >
          Vous avez atteint la limite de 50 messages que vous pouviez envoyer gratuitement à votre psychologue.<br/>
          Si vous vous sentez prêt à prendre rendez-vous avec votre psychologue actuel veuillez confirmer en cliquant sur RDV
          ci-dessous. Si vous avez une hésitation (ou problème, tel que l'affectation des psychologues) n'hésitez pas à nous contacter !
        </Dialog>
        <Dialog
          title="Demande de RDV"
          actions={okay}
          modal={false}
          open={this.state.rdv}
          onRequestClose={this.fermer}
        >
          <TextField
                style={{width:'70%'}}
                value={this.state.email}
                hintText={
                  this.state.email == null ?
                  "Entrez un email de contact pour recevoir la réponse" :
                  ""
                }
                disabled={
                  this.state.email == null ?
                  false :
                  true
                }
                onChange={::this._handleChange.bind(this,'email')}
              />
            <br />
            <TextField
            style={{width:'70%'}}
              floatingLabelText="Entrez votre numéro de téléphone"
              value={this.state.phone}
              onChange={::this._handleChange.bind(this,'phone')}
            /><br />
            <SelectField
            floatingLabelText="Choisissez un type de RDV"
            value={this.state.type}
            onChange={::this._selectChange}
            style={{width:'70%'}}
          >
            {items}
          </SelectField>
            <TextField
              hintText="Ecrivez votre message"
              floatingLabelText="Message"
              multiLine={true}
              rows={3}
              style={{width:'70%'}}
              value={this.state.message}
              onChange={::this._handleChange.bind(this,'message')}
            /><br/><br/>
        </Dialog>
      </div>
    );
  }
}
