import React, { Component, PropTypes } from 'react';
import moment from 'moment';
moment.locale('fr');
import uuid from 'node-uuid';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button'

const styles = {
  footer: {
    position: 'fixed',
    bottom: '0px',
    width: '133.333%',
    paddingLeft: '30px',
    height: '50px',
    left: '25%',
    backgroundColor:'#f5f1ee',
    borderLeft:'1px solid grey'
  }
}

export default class MessageComposer extends Component {

  static propTypes = {
    activeChannel: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: '',
      typing: false
    };
  }
  handleSubmit(event) {
    const { user, socket, activeChannel, account} = this.props;
    const text = this.state.text.trim();
    var newMessage = {
      channelId: this.props.activeChannel,
      text: text,
      time: moment().format('lll')
    };
    if (account == 'psy') {
      newMessage.fromPsy = true;
    } else {
      newMessage.fromPsy = false;
    }
    socket.emit('new message', newMessage);
    socket.emit('stop typing', { user: user.username, channel: activeChannel });
    this.props.onSave(newMessage);
    this.setState({ text: '', typing: false });
  }
  handleChange(event) {
    const { socket, user, activeChannel } = this.props;
    this.setState({ text: event.target.value });
    if (event.target.value.length > 0 && !this.state.typing) {
      socket.emit('typing', { user: user.username, channel: activeChannel });
      this.setState({ typing: true});
    }
    if (event.target.value.length === 0 && this.state.typing) {
      socket.emit('stop typing', { user: user.username, channel: activeChannel });
      this.setState({ typing: false});
    }
  }
  render() {
    return (
      <div style={styles.footer}>
        <TextField
          autoFocus="true"
          underlineStyle={{color:'rgb(0, 188, 212)'}}
          ref="messageComposer"
          hintText="Écrivez ici le message à envoyer"
          value={this.state.text}
          onChange={::this.handleChange}
          onEnterKeyDown={::this.handleSubmit}
          style={{width:'40%'}}
        />
        <FlatButton label="Écrivez" primary={true} onClick={::this.handleSubmit} />
      </div>
    );
  }
}
