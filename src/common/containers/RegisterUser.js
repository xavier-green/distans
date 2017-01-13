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
      region: null
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

  _regionChange(e, index, value) {
    this.setState({region: value})
  }

  signUp() {
    console.log("state:");
    console.log(this.state);
    this.props.dispatch(actions.signUp(this.state));
  }

  render() {
    var registerType = this.props.params.type;
    return (
      <div>
        <AppBar
          title="Création de compte utilisateur"
        />
        <div style={{marginLeft:'15%',marginRight:'15%',marginTop:'50px'}}>
          <Card>
            <CardTitle title="Information Obligatoire" subtitle="L'email et le numéro de téléphone ne sont pas obligatoires pour vous créer un compte. Cependant, si vous oubliez votre identifiant ou mot de passe sans un email/numéro de secours vous n'aurez aucun moyen de récuperer votre compte" />
            <CardText>
              <UserName color={blue500} style={styles.icon}/>
              <TextField
                floatingLabelText="Nom d'utilisateur"
                underlineStyle={{color:'rgb(0, 188, 212)'}}
                onChange={::this._handleChange.bind(this,'username')}
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
            <CardTitle title="Information Optionnelle" subtitle="Ces informations sont optionnelles. Néanmoins, sachez qu'elles restent parfaitement confidentielles et que sans que acceptiez de dévoiler votre identité elles seront invisibles au psychologues." />
            <CardText>
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
              </RadioButtonGroup>
              <Email color={blue500} style={styles.icon}/>
              <TextField
                floatingLabelText="Email"
                underlineStyle={{color:'rgb(0, 188, 212)'}}
                onChange={::this._handleChange.bind(this,'email')}
              /><br /><br />
              <div style={{display:'flex'}}>
                <Dates color={blue500} style={styles.icon}/>
                <DatePicker hintText="Date de naissance" mode="landscape"/>
              </div>
            </CardText>
            <CardTitle title="Psychologue" subtitle="Veuillez choisir le psychologue le plus adapté à vos besoins. Nous vous garantissons que nous ferons tout notre possible pour vous trouver un psychologue qui vous mettra à l'aise et saura vous aider." />
            <CardText>
            <RadioButtonGroup name="psy_sex" style={{ display: 'flex' }} onChange={::this._handleChange.bind(this,'psy_sex')}>
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

const RegisterConnected = connect()(Register);

export default RegisterConnected;
