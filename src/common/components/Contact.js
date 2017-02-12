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

export default class Contact extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      toggled: false
    }
  }

  handleToggle(event,toggle) {
    this.setState({toggled:toggle})
  }

  render() {

    return (
      <Card style={{marginTop:'25px'}}>
        <CardTitle title="Contact" subtitle="Pour quelque raison qu'il soit n'hésitez pas à nous envoyer un message." />
        <CardText>
        	<TextField
        		style={{width:'70%'}}
	            floatingLabelText="Entrez un sujet pour le message"
          	/><br />
            <TextField
            	style={{width:'70%'}}
	            value={this.props.user.email || ""}
	            hintText={
	              this.props.user.email == null ?
	              "Entrez un email de contact pour recevoir la réponse" :
	              ""
	            }
          	/><br />
          	<TextField
		      hintText="Ecrivez votre message"
		      floatingLabelText="Message"
		      multiLine={true}
		      rows={3}
		      style={{width:'70%'}}
		    /><br/><br/><br/>
		    <RaisedButton
              label="Envoyer le message"
              primary={true}
            />
      	</CardText>
      </Card>

    )

  }

}
