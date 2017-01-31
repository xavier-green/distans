import React, { PropTypes } from 'react';

export default class MessageListItem extends React.Component {
  static propTypes = {
    message: PropTypes.object.isRequired
  };
  render() {
    const { message, account } = this.props;
    var styles = {
      borderRadius:'10px',
      padding:'5px',
      backgroundColor:'rgba(220, 248, 198, 0.86)'
    };
    var listyle = {
      maxWidth:'70%',
      marginBottom:'10px',
      display: 'inline-block',
      paddingRight: '15px'
    }
    if (account == 'psy') {
      if (!message.fromPsy) {
        listyle.textAlign = 'right';
        listyle.paddingLeft = '30%';
        listyle.float = 'right';
        styles.backgroundColor = 'white';
      }
    } else {
      if (message.fromPsy) {
        listyle.textAlign = 'right';
        listyle.float = 'right';
        listyle.paddingLeft = '30%';
        styles.backgroundColor = 'white';
      }
    }
    return (
      <div>
      <li key={message._id} style={listyle}>
        <div style={styles}>
          <span>
            <i style={{color: '#aad', opacity: '0.8'}}>{message.time}</i>
          </span>
          <div style={{clear: 'both', paddingTop: '0.1em', marginTop: '-1px', paddingBottom: '0.3em'}}>{message.text}</div>
        </div>
      </li><br/>
      </div>
    );
  }
}
