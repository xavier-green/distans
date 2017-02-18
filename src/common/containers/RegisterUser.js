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
import Stepper from 'react-stepper-horizontal';

var moment = require('moment');

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

class Obligatoire extends React.Component {

  render() {

    return (
      <div>
      <CardTitle title="Information Obligatoire" subtitle="L'email et le numéro de téléphone ne sont pas obligatoires pour vous créer un compte. Cependant, si vous oubliez votre identifiant ou mot de passe sans un email/numéro de secours vous n'aurez aucun moyen de récuperer votre compte" />
      <CardText>
        <UserName color={blue500} style={styles.icon}/>
        <TextField
          floatingLabelText="Nom d'utilisateur"
          underlineStyle={{color:'rgb(0, 188, 212)'}}
          onChange={this.props._handleChange.bind(this,'username')}
          ref="testref"
        /><br />
        <PassWord color={blue500} style={styles.icon}/>
        <TextField
          floatingLabelText="Mot de passe"
          underlineStyle={{color:'rgb(0, 188, 212)'}}
          type="password"
          onChange={this.props._handleChange.bind(this,'password')}
        /><br />
        <Confirm color={blue500} style={styles.icon}/>
        <TextField
          floatingLabelText="Confirmation"
          underlineStyle={{color:'rgb(0, 188, 212)'}}
          type="password"
          onChange={this.props._handleChange.bind(this,'confirmation')}
        /><br />
      </CardText>
      </div>

    )

  }

}

class Optionnel extends React.Component {

  render() {

    return (

      <div>
      <CardTitle title="Information Optionnelle" subtitle="Ces informations sont optionnelles. Néanmoins, sachez qu'elles restent parfaitement confidentielles et que sans que acceptiez de dévoiler votre identité elles seront invisibles au psychologues." />
      <CardText>
        <RadioButtonGroup name="sex" style={{ display: 'flex' }} onChange={this.props._handleChange.bind(this,'sex')}>
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
        </RadioButtonGroup>
        <Email color={blue500} style={styles.icon}/>
        <TextField
          floatingLabelText="Email"
          underlineStyle={{color:'rgb(0, 188, 212)'}}
          onChange={this.props._handleChange.bind(this,'email')}
        /><br /><br />
        <div style={{display:'flex'}}>
          <Dates color={blue500} style={styles.icon}/>
          <DatePicker hintText="Date de naissance" onChange={this.props._dateChange} mode="landscape"/>
        </div>
      </CardText>
      </div>

    )

  }

}

class Psychologue extends React.Component {

  render() {

    return (

      <div>
      <CardTitle title="Psychologue" subtitle="Veuillez choisir le psychologue le plus adapté à vos besoins. Nous vous garantissons que nous ferons tout notre possible pour vous trouver un psychologue qui vous mettra à l'aise et saura vous aider." />
      <CardText>
      <RadioButtonGroup name="psy_sex" style={{ display: 'flex' }} onChange={this.props._handleChange.bind(this,'psy_sex')}>
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
      </RadioButtonGroup>
      <SelectField
        floatingLabelText="Choisissez une catégorie pour votre problème"
        value={this.props.psy}
        onChange={this.props._selectChange}
        style={{width:'70%'}}
      >
        {items}
      </SelectField>
      <SelectField
        floatingLabelText="Choisissez votre région"
        value={this.props.region}
        onChange={this.props._regionChange}
        style={{width:'70%'}}
      >
        {regions}
      </SelectField>
      </CardText>
      </div>

    )

  }

}

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      psy: null,
      region: null,
      step: 0,
      completed: 33
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
    this.setState({dob: moment.parseZone(date).format("DD/MM/YYYY")})
  }

  _regionChange(e, index, value) {
    this.setState({region: value})
  }

  signUp() {
    var sendData = this.state;
    sendData.type = 0;
    this.props.dispatch(actions.signUp(sendData));
  }

  next() {
    this.setState({step:this.state.step+1})
  }

  render() {
    var registerType = this.props.params.type;
    var signupButton = (
      <a onClick={::this.signUp} style={{margin:'0 auto',float:'right'}}>
        <RaisedButton
          label="S'inscrire"
          primary={true}
        />
      </a>
    );
    var nextButton = (
      <a onClick={::this.next} style={{margin:'0 auto',float:'right'}}>
        <RaisedButton
          label="Suivant"
          secondary={true}
        />
      </a>
    );
    var items = [
      <Obligatoire _handleChange={::this._handleChange} />,
      <Optionnel _dateChange={::this._dateChange} _handleChange={::this._handleChange} />,
      <Psychologue region={this.state.region} psy={this.state.psy} _regionChange={::this._regionChange} _selectChange={::this._selectChange} _handleChange={::this._handleChange} />
    ]
    return (
      <div>
        <AppBar
          title="DistAns - Création de compte utilisateur"
        />
        <div style={{marginLeft:'20%',marginRight:'20%',marginTop:'50px'}}>
          <Card>
            <CardText>
              <Stepper steps={ ['Inscription', 'Contact', 'Psychologue'] } activeStep={this.state.step} />
            </CardText>
            {items[this.state.step]}
          </Card><br/><br/>
          {
            this.state.step == 2 ?
            signupButton :
            nextButton
          }
        </div>
      </div>
    );
  }
}

const RegisterConnected = connect()(Register);

export default RegisterConnected;
