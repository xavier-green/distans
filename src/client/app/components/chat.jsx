import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { sendMessage } from '../actions';

const styles = {
  footer: {
    position: 'fixed',
    bottom: '0px',
    width: '133.333%',
    paddingLeft: '30px',
    height: '50px',
    left: '25.4%'
  },
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

var i = 0;

class Chat extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.routes[0].socket);
    this.state = {
      textfield: ""
    }
    console.log("PROPS:");
    console.log(this.props);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  _handleTextFieldChange(e) {
    this.setState({
      textfield: e.target.value
    });
  }
  componentDidUpdate() {
    var objDiv = document.getElementById("divscroll");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  sendMessage() {
    var data = {
      text: this.state.textfield,
      person: this.props.user.username
    };
    this.props.onSendMessage(data,this.props.routes[0].socket);
    this.setState({ textfield: ""});
  }
  render() {
    return (
      <div>
        <div className="style-5" id="divscroll" style={{width:'73%',height:'80%',overflowY:'scroll',overflowX:'hidden'}}>
          <List>
          {
            this.props.messages.map((el,i) => {
              return (<Message data={el} key={i} username={this.props.user.username}/>)
            })
          }
          </List>
        </div>
        <div style={styles.footer}>
          <TextField underlineStyle={{color:'rgb(0, 188, 212)'}} ref="chatmessage" value={this.state.textfield} hintText="Écrivez ici le message à envoyer" onChange={this._handleTextFieldChange} style={{width:'40%'}} />
          <FlatButton  label="Écrivez" primary={true} onClick={this.sendMessage} />
        </div>
      </div>
    )
  }
}

class Message extends React.Component {
  render() {
    return (
      <ListItem
        className="enjoy-css"
        style={this.props.data.person == this.props.username ? styles.right : styles.left}
        primaryText={this.props.data.text}
        disabled={true}
      />
    )
  }
}

const mapStateToProps = (state) => {
  console.log("STATE CHANGE");
  console.log(state);
  return {
    messages: state.messages,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSendMessage: (text,person) => {
      dispatch(sendMessage(text,person))
    }
  }
}

const ChatRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)

export default ChatRedux
