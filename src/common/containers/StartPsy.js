import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import AppBar from 'material-ui/lib/app-bar';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import CardTitle from 'material-ui/lib/card/card-title';
import Forward from 'material-ui/lib/svg-icons/content/forward';
import CardMedia from 'material-ui/lib/card/card-media';
import {Link} from 'react-router'

let introImage = '/assets/intro-psy.png';


import { connect } from 'react-redux';
import * as actions from '../actions/authActions';

class Start extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: "0"
    }
  }

  render() {

    return (
      <div>
        <AppBar
          title="DistAns - Création de compte psychologue"
        />
        <div style={{marginTop:'50px',textAlign:'justify'}}>
          <Card style={{width:'70%',margin:'0 auto'}}>
          <CardMedia>
            <img src={introImage} />
          </CardMedia>
          </Card><br/>
          <div style={{display:'block',marginLeft:'auto',marginRight:'auto',width:'88px'}}>
            <Link to={`/register/psy`}>
                <RaisedButton
                  label="Inscription"
                  primary={true}
                />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const StartConnected = connect()(Start);

export default StartConnected;