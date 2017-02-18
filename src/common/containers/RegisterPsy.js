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
import {red500, yellow500, blue500, green500} from 'material-ui/lib/styles/colors';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import Email from 'material-ui/lib/svg-icons/communication/email';
import Dates from 'material-ui/lib/svg-icons/action/date-range';
import Code from 'material-ui/lib/svg-icons/action/redeem';
import Done from 'material-ui/lib/svg-icons/action/done';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Stepper from 'react-stepper-horizontal';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

var moment = require('moment');

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

class Obligatoire extends React.Component {

  render() {

    return (

      <div>
      <CardTitle title="Information Obligatoire" subtitle="L'email et le numéro de téléphone ne sont pas obligatoires pour vous créer un compte. Cependant, si vous oubliez votre identifiant ou mot de passe sans un email/numéro de secours vous n'aurez aucun moyen de récuperer votre compte" />
      <CardText>
        <UserName color={blue500} style={styles.icon}/>
        <TextField
          floatingLabelText="Nom et prénom"
          underlineStyle={{color:'rgb(0, 188, 212)'}}
          onChange={this.props._handleChange.bind(this,'name')}
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

class Contact extends React.Component {

  render() {

    return (

      <div>
      <CardTitle title="Information Supplémentaire" subtitle="Ces informations sont nécessaires pour permettre de mieux cibler vos patients. De cette manière nous voulons maximiser votre expérience à tous deux." />
      <GridList cols={2}>
        <GridTile key={1}>
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
            /><br /><br/>
            <div style={{display:'flex'}}>
              <Dates color={blue500} style={styles.icon}/>
              <DatePicker value={this.props.bday} onChange={this.props._dateChange} hintText="Date de naissance" mode="landscape"/>
            </div>
            </CardText>
          </GridTile>
          <GridTile key={2}>
            <CardText>
            <SelectField
              floatingLabelText="Choisissez votre spécialité"
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
        </GridTile>
        </GridList><br/><br/>
      </div>

    )

  }

}

class Docs extends React.Component {

  render() {

    var passportDrop = (
      <Dropzone onDrop={this.props.onDrop.bind(this,'passeport')}>
        <div style={{textAlign:'center',marginTop:'44%'}}>Passeport / CI</div>
      </Dropzone>
    );
    var adeliDrop = (
      <Dropzone onDrop={this.props.onDrop.bind(this,'adeli')}>
        <div style={{textAlign:'center',marginTop:'44%'}}>ADELI</div>
      </Dropzone>
    );
    var okPassport = (
      <div><Done color={green500} style={styles.icon}/>Passeport</div>
    );
    var okAdeli = (
      <div><Done color={green500} style={styles.icon}/>Adeli</div>
    );

    return (

      <div>
      <CardTitle title="Pièces à joindre" subtitle="Veuillez ajouter une photocopie de votre passeport / carte d'identité et certificat ADELI pour finaliser l'inscription." />
      <CardText>
        <GridList cols={2} cellHeight={205}>
          <GridTile key={3} style={{marginLeft:'50%'}}>
            {
              this.props.passeport ?
              okPassport :
              passportDrop
            }
          </GridTile>
          <GridTile key={4}>
            {
              this.props.adeli ?
              okAdeli :
              adeliDrop
            }
          </GridTile>
        </GridList>
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
      files: [],
      bday: null,
      step: 0,
      passeport: false,
      adeli: false
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
    this.setState({bday: moment.parseZone(date).format("DD/MM/YYYY")})
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
      var data = {};
      data[str] = true;
      this.setState({files, ...data})
    }
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
      <Contact _handleChange={::this._handleChange} region={this.state.region} psy={this.state.psy} _regionChange={::this._regionChange} _selectChange={::this._selectChange} _dateChange={::this._dateChange} bday={this.state.bday} />,
      <Docs onDrop={::this.onDrop} passeport={this.state.passeport} adeli={this.state.adeli} />
    ]
    return (
      <div>
        <AppBar
          title="DistAns - Création de compte psychologue"
        />
        <div style={{marginLeft:'15%',marginRight:'15%',marginTop:'50px'}}>
          <Card>
            <CardText>
              <Stepper steps={ ['Inscription', 'Contact', 'Documents'] } activeStep={this.state.step} />
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

function mapStateToProps(state) {
  return {
      user: state.auth.user
  }
}

const RegisterConnected = connect(mapStateToProps)(Register);

export default RegisterConnected;
