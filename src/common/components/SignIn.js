import React from 'react';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';

import { connect } from 'react-redux';
import * as actions from '../actions/authActions';

const items = [
  <MenuItem key={1} value="0" primaryText="Utilisateur"/>,
  <MenuItem key={2} value="1" primaryText="Psychologue"/>,
];

class SignIn extends React.Component {

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
    var registerType = this.props.params.type;
    return (
      <div>
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
        /><br/>
        <TextField
          floatingLabelText="Mot de passe"
          underlineStyle={{color:'rgb(0, 188, 212)'}}
          type="password"
          onChange={::this._handleChange.bind(this,'password')}
        /><br/>
        <a onClick={::this.signUp} style={{margin:'0 auto'}}>
          <RaisedButton
            label="S'inscrire"
            primary={true}
          />
        </a>
      </div>
    );
  }
}

const SignInConnected = connect()(SignIn);

export default SignInConnected;
