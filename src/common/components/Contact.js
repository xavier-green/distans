import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Toggle from 'material-ui/lib/toggle';
import ListItem from 'material-ui/lib/lists/list-item';
import Snackbar from 'material-ui/lib/snackbar';

import * as actions from '../actions/actions';

export default class Contact extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      subject: '',
      message: '',
      email: this.props.user.email || this.props.user.userObject.email || null,
      msgSent: false
    }
  }

  _handleChange(element,e) {
    var data = {};
    data[element] = e.target.value;
    this.setState(data);
  }

  send() {
    let { email,subject,message } = this.state;
    let msgType = 'Type: Psy<br/><br/>';
    if (this.props.user.username) {
      msgType = 'Type: Utilisateur<br/><br/>';
    }
    let beginning = msgType+'From: '+email+'<br/><br/><br/>Message: ';
    this.props.dispatch(actions.contact(email, subject, beginning+message));
    this.setState({msgSent: true, subject: '', message: ''});
  }

  handleRequestClose() {
    this.setState({msgSent: false});
  }

  render() {

    return (
      <div>
      <Card style={{marginTop:'25px'}}>
        <CardTitle title="Contact" subtitle="Pour quelque raison qu'il soit n'hésitez pas à nous envoyer un message." />
        <CardText>
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
              floatingLabelText="Entrez un sujet pour le message"
              value={this.state.subject}
              onChange={::this._handleChange.bind(this,'subject')}
            /><br />
          	<TextField
    		      hintText="Ecrivez votre message"
    		      floatingLabelText="Message"
    		      multiLine={true}
    		      rows={3}
    		      style={{width:'70%'}}
              value={this.state.message}
              onChange={::this._handleChange.bind(this,'message')}
    		    /><br/><br/><br/>
    		    <RaisedButton
                  label="Envoyer le message"
                  primary={true}
                  onClick={::this.send}
                />
          	</CardText>
      </Card>
      <Snackbar
          open={this.state.msgSent}
          message="Message envoyé"
          action="Ok"
          autoHideDuration={3000}
          onActionTouchTap={::this.handleRequestClose}
          onRequestClose={::this.handleRequestClose}
        />
        </div>

    )

  }

}
