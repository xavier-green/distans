import React, { Component, PropTypes } from 'react';
import {render} from 'react-dom';
import AppBar from 'material-ui/lib/app-bar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import Toggle from 'material-ui/lib/toggle';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';
import ChannelListItem from './ChannelListItem';

export default class BarComponent extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };
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
    const { messages } = this.props;

    return  (
      <div>
        <Card style={{width:'25%',float:'left',height:'90.5vh'}}>
          <CardText>
            <List>
              Privacy
              <ListItem primaryText="Anonyme" rightToggle={
                <Toggle
                  toggled={this.state.toggled}
                  onToggle={this.handleToggle}
                />
              } />
            </List>
            <Divider />
            <List>
            General
            <ListItem
              primaryText="Chat"
              key='chat'
              secondaryText="Venez parler avec votre psychologue"
              onClick={this.props.gotoChat}
            />
            <ListItem
              primaryText="Profil"
              key='profil'
              secondaryText="Accédez ici à tous vos paramètres"
              onClick={this.props.myAccount}
            />
            <ListItem
              primaryText="Contact"
              secondaryText="Contactez nous ou prenez RDV"
              onClick={this.props.gotoContact}
            />
          </List>
          <Divider />
          <List>
            Notifications
            <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
            <ListItem primaryText="Son" leftCheckbox={<Checkbox />} />
          </List>
          </CardText>
        </Card>
      </div>
    )
  }
}
