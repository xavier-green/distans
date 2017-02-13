import React, { PropTypes } from 'react';
import Avatar from 'react-avatar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

export default class MessageListItem extends React.Component {
  static propTypes = {
    message: PropTypes.object.isRequired
  };
  render() {
  	var listyle = {
      maxWidth:'70%',
      marginRight:'16px',
      marginBottom:'15px',
      borderRadius:'10px'
    }
    var txtStyle = {
      textAlign : 'left',
      height: 'inherit'
    }
    var avatar = null;
    const { message, account } = this.props;
    var avatarFirst = true;
    if (account == 'psy') {
      if (!message.fromPsy) {
        avatar = (<Avatar name={this.props.patient} round={true} size={30} />);
        listyle.float = 'left';
      } else {
        avatar = (<Avatar name={this.props.name} round={true} size={30} style={{float:'right',marginRight:'0px',marginLeft:'16px'}} />);
        listyle.float = 'right';
        txtStyle.textAlign = 'right';
      }
    } else {
      if (message.fromPsy) {
        avatar = (<Avatar value="Psy" round={true} size={30} />);
        listyle.float = 'left';
      } else {
        avatar = (<Avatar name={this.props.name} round={true} size={30} style={{float:'right',marginRight:'0px',marginLeft:'16px'}} />);
        listyle.float = 'right';
        txtStyle.textAlign = 'right';
      }
    }
    var listItem = (
    <Card key={message._id} style={listyle}>
    	<CardHeader
	      title={message.text}
	      subtitle={message.time}
	      avatar={avatar}
	      style={txtStyle}
	      subtitleStyle={{fontSize:"0.7rem"}}
	    />
	 </Card>
    );
    return (
      <div style={{display:'inline-block',width:'100%'}}>
      {listItem}
      <br/>
      </div>
    );
  }
}
