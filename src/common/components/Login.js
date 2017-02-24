import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import AppBar from 'material-ui/lib/app-bar';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';


import { connect } from 'react-redux';
import * as actions from '../actions/authActions';
import {Link} from 'react-router'

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
          <Card style={{backgroundImage:'url("/assets/clouds.png")',backgroundSize:'cover'}}>
          <CardText>
            <SelectField
              floatingLabelText="Choisissez votre catégorie"
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
              style={{width:'70%'}}$
            /><br/>
            {
              this.props.loginError !== "" ?
              (<p style={{color:'red'}}>Erreur de nom d'utilisateur ou mot de passe</p>) :
              null
            }
            <br/><br/><br/>
            <a onClick={::this.signUp} style={{margin:'0 auto',float:'right',marginBottom:'20px'}}>
              <RaisedButton
                label="Connexion"
                primary={true}
              />
            </a><br/>
          </CardText>
          </Card><br/>
          <div style={{margin: '0 auto'}}>
            Inscription : <Link to={`/start/utilisateur`}><FlatButton label="utilisateur" secondary={true} /></Link> / <Link to={`/start/psy`}><FlatButton label="psychologue" secondary={true} /></Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      loginError: state.errors.loginError
  }
}

const RegisterConnected = connect(mapStateToProps)(Register);

export default RegisterConnected;
