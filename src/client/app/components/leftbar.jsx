import React from 'react';
import {render} from 'react-dom';
import AppBar from 'material-ui/AppBar'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

export default class BarComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toggled: true
    }
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(event,toggle) {
    this.setState({toggled:toggle})
  }
  render () {
    return  (
      <div>
        <Card style={{width:'25%',float:'left',height:'90vh',marginRight:'15px'}}>
          <CardText>
            <List>
              <Subheader>Privacy</Subheader>
              <ListItem primaryText="Anonyme" rightToggle={
                <Toggle
                  toggled={this.state.toggled}
                  onToggle={this.handleToggle}
                />
              } />
            </List>
            <Divider />
            <List>
            <Subheader>General</Subheader>
            <ListItem
              primaryText="Profil"
              secondaryText="Accède ici à tous tes paramètres"
            />
            <ListItem
              primaryText="Sessions"
              secondaryText="Recherche et filtre tes dialogues"
            />
            <ListItem
              primaryText="Paiement"
              secondaryText="Gère ton abonnement et codes d'accès"
            />
          </List>
          <Divider />
          <List>
            <Subheader>Notifications</Subheader>
            <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
            <ListItem primaryText="Son" leftCheckbox={<Checkbox />} />
          </List>
          </CardText>
        </Card>
      </div>
    )
  }
}
