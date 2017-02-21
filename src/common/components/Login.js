import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import AppBar from 'material-ui/lib/app-bar';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import CardTitle from 'material-ui/lib/card/card-title';


import { connect } from 'react-redux';
import * as actions from '../actions/authActions';

const items = [
  <MenuItem key={1} value="0" primaryText="Utilisateur"/>,
  <MenuItem key={2} value="1" primaryText="Psychologue"/>,
];

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: "0"
    }
  }

  _handleChange(element,e) {
    var data = {};
    data[element] = e.target.value;
    this.setState(data);
  }

  _selectChange(e, index, value) {
    this.setState({type: value})
  }

  signUp() {
    this.props.dispatch(actions.signIn(this.state));
  }

  render() {

    return (
      <div>
        <AppBar
          title="DistAns - Connexion"
        />
        <div style={{marginLeft:'30%',marginRight:'30%',marginTop:'50px',textAlign:'center'}}>
          <Card>
          <CardTitle titleStyle={{textAlign:'center',color:'rgba(13, 92, 167, 0.87)',fontFamily:"Short Stack",fontSize:'38px',paddingTop:'20px'}} title="Le concept" />
          <CardText>
            <SelectField
              floatingLabelText="Choisissez une catégorie pour votre problème"
              value={this.state.type}
              onChange={::this._selectChange}
              style={{width:'70%'}}
            >
              {items}
            </SelectField>
            <TextField
              floatingLabelText="Nom d'utilisateur ou email"
              underlineStyle={{color:'rgb(0, 188, 212)'}}
              onChange={::this._handleChange.bind(this,'login')}
              style={{width:'70%'}}
            /><br/>
            <TextField
              floatingLabelText="Mot de passe"
              underlineStyle={{color:'rgb(0, 188, 212)'}}
              type="password"
              onChange={::this._handleChange.bind(this,'password')}
              style={{width:'70%'}}
            /><br/>
          </CardText>
          </Card><br/>
          <a onClick={::this.signUp} style={{margin:'0 auto',float:'right'}}>
            <RaisedButton
              label="Connexion"
              primary={true}
            />
          </a>
        </div>
      </div>
    );
  }
}

const RegisterConnected = connect()(Register);

export default RegisterConnected;
