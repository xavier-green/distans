import React, { PropTypes } from 'react';
import Avatar from 'react-avatar';

export default class MessageListItem extends React.Component {
  static propTypes = {
    message: PropTypes.object.isRequired
  };
  render() {
    var avatar = null;
    const { message, account } = this.props;
    var time = {
      fontSize: "0.7rem",
      color: "#ccc"
    };
    var styles = {
      borderRadius:'10px',
      padding:'5px',
      backgroundColor:'rgba(220, 248, 198, 0.86)'
    };
    var listyle = {
      maxWidth:'70%',
      marginBottom:'10px',
      display: 'inline-block'
    }
    var avatarFirst = true;
    if (account == 'psy') {
      if (!message.fromPsy) {
        avatar = (<Avatar name={this.props.patient} round={true} size={30} style={{float:"right",paddingRight:'15px'}} />);
        listyle.textAlign = 'right';
        listyle.float = 'right';
        styles.backgroundColor = 'white';
        avatarFirst = false;
      } else {
        avatar = (<Avatar name={this.props.name} round={true} style={{float:"left"}} size={30} />);
      }
    } else {
      if (message.fromPsy) {
        avatar = (<Avatar value="Psy" round={true} size={30} style={{float:"right",paddingRight:'15px'}} />);
        listyle.textAlign = 'right';
        listyle.float = 'right';
        styles.backgroundColor = 'white';
        avatarFirst = false;
      } else {
        avatar = (<Avatar name={this.props.name} round={true} style={{float:"left"}} size={30} />);
      }
    }
    var listItem = (
    <li key={message._id} style={listyle}>
        <div style={styles}>
          <div style={{clear: 'both', paddingTop: '0.1em', marginTop: '-1px', paddingBottom: '0.3em'}}>{message.text}</div>
          <span style={time}>
            <i style={{color: '#aad', opacity: '0.8'}}>{message.time}</i>
          </span>
        </div>
      </li>
    );
    var oderLeft = (<div>{avatar}{listItem}</div>);
    return (
      <div style={{display:'inline-block',width:'100%'}}>
      {oderLeft}
      <br/>
      </div>
    );
  }
}
