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
    channels: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    account: PropTypes.string.isRequired
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
    const { channels, messages, account } = this.props;
    const filteredChannels = channels.slice(0, 8);
    const moreChannelsBoolean = channels.length > 8;
    const restOfTheChannels = channels.slice(8);

    var el = null;
    if (account == 'psy') {
      el = (
        <div>
          <Divider />
          <List key="patients">
            Patients
            {filteredChannels.map(channel =>
              <ChannelListItem
                style={{paddingLeft: '0.8em', background: '#2E6DA4', height: '0.7em'}}
                messageCount={messages.length}
                channel={channel}
                key={channel._id}
                onClick={this.props.onClick} />
            )}
          </List>
        </div>
      )
    }

    return  (
      <div>
        <Card style={{width:'25%',float:'left',height:'90vh',marginRight:'15px'}}>
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
            Notifications
            <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
            <ListItem primaryText="Son" leftCheckbox={<Checkbox />} />
          </List>
          {el}
          </CardText>
        </Card>
      </div>
    )
  }
}
