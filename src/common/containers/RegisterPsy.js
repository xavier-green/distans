import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import UserName from 'material-ui/lib/svg-icons/action/accessibility';
import PassWord from 'material-ui/lib/svg-icons/action/fingerprint';
import Confirm from 'material-ui/lib/svg-icons/action/lock-outline';
import {red500, yellow500, blue500} from 'material-ui/lib/styles/colors';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import Email from 'material-ui/lib/svg-icons/communication/email';
import Dates from 'material-ui/lib/svg-icons/action/date-range';
import Code from 'material-ui/lib/svg-icons/action/redeem';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

var Dropzone = require('react-dropzone');

import { connect } from 'react-redux';
import * as actions from '../actions/authActions';

var styles = {
  icon : {
    height: '50px',
    width: '50px',
    verticalAlign: 'middle',
    marginRight: '30px'
  }
};

const items = [
  <MenuItem key={1} value="Travail" primaryText="Travail"/>,
  <MenuItem key={2} value="Famille" primaryText="Famille"/>,
];

const regions = [
  <MenuItem key={1} value="Région parisienne" primaryText="Région parisienne"/>,
]

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      psy: null,
      region: null,
      files: [],
      bday: null
    }
  }

  _handleChange(element,e) {
    var data = {};
    data[element] = e.target.value;
    this.setState(data);
  }

  _selectChange(e, index, value) {
    this.setState({psy: value})
  }

  _dateChange(e, date) {
    this.setState({bday: date})
  }

  _regionChange(e, index, value) {
    this.setState({region: value})
  }

  signUp() {
    var sendData = this.state;
    sendData.type = 1;
    this.props.dispatch(actions.signUp(this.state));
  }

  onDrop(str, acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length) {
      var files = this.state.files;
      files.push({name:str, file:acceptedFiles[0]})
      this.setState({files})
    }
  }

  render() {
    var registerType = this.props.params.type;
    return (
      <div>
        <AppBar
          title="Création de compte psychologue"
        />
        <div style={{marginLeft:'15%',marginRight:'15%',marginTop:'50px'}}>
          <Card>
            <CardTitle title="Information Obligatoire" subtitle="L'email et le numéro de téléphone ne sont pas obligatoires pour vous créer un compte. Cependant, si vous oubliez votre identifiant ou mot de passe sans un email/numéro de secours vous n'aurez aucun moyen de récuperer votre compte" />
            <CardText>
              <UserName color={blue500} style={styles.icon}/>
              <TextField
                floatingLabelText="Nom et prénom"
                underlineStyle={{color:'rgb(0, 188, 212)'}}
                onChange={::this._handleChange.bind(this,'name')}
                ref="testref"
              /><br />
              <PassWord color={blue500} style={styles.icon}/>
              <TextField
                floatingLabelText="Mot de passe"
                underlineStyle={{color:'rgb(0, 188, 212)'}}
                type="password"
                onChange={::this._handleChange.bind(this,'password')}
              /><br />
              <Confirm color={blue500} style={styles.icon}/>
              <TextField
                floatingLabelText="Confirmation"
                underlineStyle={{color:'rgb(0, 188, 212)'}}
                type="password"
                onChange={::this._handleChange.bind(this,'confirmation')}
              /><br />
            </CardText>
            <CardTitle title="Information Supplémentaire" subtitle="" />
            <CardText>
              <Email color={blue500} style={styles.icon}/>
              <TextField
                floatingLabelText="Email"
                underlineStyle={{color:'rgb(0, 188, 212)'}}
                onChange={::this._handleChange.bind(this,'email')}
              /><br /><br />
              <RadioButtonGroup name="sex" style={{ display: 'flex' }} onChange={::this._handleChange.bind(this,'sex')}>
                <RadioButton
                  style={{ width: 'auto' }}
                  value="Femme"
                  label="Femme"
                />
                <RadioButton
                  style={{ width: 'auto',paddingLeft:'50px' }}
                  value="Homme"
                  label="Homme"
                />
              </RadioButtonGroup><br />
              <div style={{display:'flex'}}>
                <Dates color={blue500} style={styles.icon}/>
                <DatePicker value={this.state.bday} onChange={::this._dateChange} hintText="Date de naissance" mode="landscape"/>
              </div>
              <SelectField
                floatingLabelText="Choisissez une catégorie pour votre problème"
                value={this.state.psy}
                onChange={::this._selectChange}
                style={{width:'70%'}}
              >
                {items}
              </SelectField>
              <SelectField
                floatingLabelText="Choisissez votre région"
                value={this.state.region}
                onChange={::this._regionChange}
                style={{width:'70%'}}
              >
                {regions}
              </SelectField>
            </CardText>
            <CardTitle title="Pièces à joindre" subtitle="Veuillez ajouter une photocopie de votre passeport / carte d'identité et certificat ADELI pour finaliser l'inscription." />
            <CardText>
              <Dropzone onDrop={::this.onDrop.bind(this,'passeport')}>
                <div>Passeport / CI</div>
              </Dropzone>
              <Dropzone onDrop={::this.onDrop.bind(this,'adeli')}>
                <div>ADELI</div>
              </Dropzone>
            </CardText>
          </Card><br/><br/>
            <a onClick={::this.signUp} style={{margin:'0 auto'}}>
              <RaisedButton
                label="S'inscrire"
                primary={true}
              />
            </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      user: state.auth.user
  }
}

const RegisterConnected = connect(mapStateToProps)(Register);

export default RegisterConnected;
