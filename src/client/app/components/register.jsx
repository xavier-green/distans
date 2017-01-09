import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import UserName from 'material-ui/svg-icons/action/accessibility';
import PassWord from 'material-ui/svg-icons/action/fingerprint';
import Confirm from 'material-ui/svg-icons/action/lock-outline';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import StarEmpty from 'material-ui/svg-icons/toggle/star-border';
import StarFull from 'material-ui/svg-icons/toggle/star';
import Email from 'material-ui/svg-icons/communication/email';
import Dates from 'material-ui/svg-icons/action/date-range';
import Code from 'material-ui/svg-icons/action/redeem';
import { connect } from 'react-redux';
import { signUp } from '../actions';

var styles = {
  icon : {
    height: '50px',
    width: '50px',
    verticalAlign: 'middle',
    marginRight: '30px'
  },
  nolign: {
    lineHeight: 'normal'
  }
};

class Utilisateur extends React.Component {

  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
  }
  _handleChange(element,e) {
    var data = {};
    data[element] = e.target.value;
    this.props.onEdit(data);
  }

  render() {
    return (
      <Card >
        <CardText>
          <h1>Information Obligatoire</h1>
          <Subheader style={styles.nolign}>
          L'email et le numéro de téléphone ne sont pas obligatoires pour vous créer un compte.
          Si vous oubliez votre identifiant ou mot de passe sans un email/numéro de secours vous n'aurez aucun moyen de récuperer votre compte
          </Subheader>
        </CardText>
        <CardText>
          <UserName color={blue500} style={styles.icon}/>
          <TextField
            floatingLabelText="Nom d'utilisateur"
            underlineStyle={{color:'rgb(0, 188, 212)'}}
            onChange={this._handleChange.bind(this,'username')}
            ref="testref"
          /><br />
          <PassWord color={blue500} style={styles.icon}/>
          <TextField
            floatingLabelText="Mot de passe"
            underlineStyle={{color:'rgb(0, 188, 212)'}}
            type="password"
            onChange={this._handleChange.bind(this,'password')}
          /><br />
          <Confirm color={blue500} style={styles.icon}/>
          <TextField
            floatingLabelText="Confirmation"
            underlineStyle={{color:'rgb(0, 188, 212)'}}
            type="password"
            onChange={this._handleChange.bind(this,'confirmation')}
          /><br />
        </CardText>
      </Card>
    );
  }
}

class Options extends React.Component {

  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
    this._radioChange = this._radioChange.bind(this);
    this._dateChange = this._dateChange.bind(this);
  }

  _handleChange(element,e) {
    var data = {};
    data[element] = e.target.value;
    this.props.onEdit(data);
  }

  _radioChange(ev,val) {
    this.props.onEdit({
      gender: val
    })
  }

  _dateChange(ev,date) {
    var month = parseInt(date.getMonth())+1;
    this.props.onEdit({
      dob: date.getDate()+"-"+month+"-"+date.getFullYear()
    });
  }

  render() {
    return (
      <Card >
        <CardText>
          <h1>Information Optionnelle</h1>
          <Subheader style={styles.nolign}>
            Ces informations sont optionnelles. Néanmoins, sachez qu'elles restent <b> parfaitement confidentielles </b> et que sans que acceptiez
            de dévoiler votre identité elles seront invisibles au psychologues.
          </Subheader>
        </CardText>
        <CardText>
          <Email color={blue500} style={styles.icon}/>
          <TextField
            floatingLabelText="Email"
            underlineStyle={{color:'rgb(0, 188, 212)'}}
            onChange={this._handleChange.bind(this,'email')}
          /><br /><br />
          <RadioButtonGroup name="sex" style={{ display: 'flex' }} onChange={this._radioChange}>
            <RadioButton
              style={{ width: 'auto' }}
              value="Homme"
              label="Homme"
              iconStyle={styles.icon}
              labelStyle={{fontSize:'25px',paddingTop:'15px'}}
              checkedIcon={<StarFull color={blue500}/>}
              uncheckedIcon={<StarEmpty color={blue500}/>}
            />
            <RadioButton
              style={{ width: 'auto',paddingLeft:'50px' }}
              value="Femme"
              label="Femme"
              iconStyle={styles.icon}
              labelStyle={{fontSize:'25px',paddingTop:'15px'}}
              checkedIcon={<StarFull/>}
              uncheckedIcon={<StarEmpty/>}
            />
          </RadioButtonGroup><br />
          <div style={{display:'flex'}}>
            <Dates color={blue500} style={styles.icon}/>
            <DatePicker hintText="Date de naissance" mode="landscape" onChange={this._dateChange}/>
          </div>
        </CardText>
      </Card>
    );
  }
}

class Paiement extends React.Component {

  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(element,e) {
    var data = {};
    data[element] = e.target.value;
    this.props.onEdit(data);
  }

  render() {
    return (
      <Card >
        <CardText>
          <h1>Paiement</h1>
          <Subheader style={styles.nolign}>
            Si vous êtes dans un établissement ou une entreprise partenaire de Distans, veuillez entrer ici le code d'accès qui vous a été fourni. Sinon
            veuillez choisir le plan le plus adapté à vos besoins.
          </Subheader>
        </CardText>
        <CardText>
          <Code color={blue500} style={styles.icon}/>
          <TextField
            floatingLabelText="Code d'accès"
            underlineStyle={{color:'rgb(0, 188, 212)'}}
            onChange={this._handleChange.bind(this,'code')}
          /><br />
        </CardText>
      </Card>
    );
  }
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      username: '',
      password: '',
      confirmation: '',
      email: '',
      gender: '',
      dob: '',
      code: ''
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.finish = this.finish.bind(this);
  }
  finish() {
    console.log("Finished");
    delete this.state['finished'];
    delete this.state['stepIndex'];
    console.log(this.state);
  }
  dataChanged(textData) {
    this.setState(textData);
  }
  handleNext() {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };
  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Utilisateur onEdit={this.dataChanged}/>;
      case 1:
        return <Options onEdit={this.dataChanged}/>;
      case 2:
        return <Paiement onEdit={this.dataChanged}/>;
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div>
      <AppBar
        title="Distans"
      />
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Utilisateur</StepLabel>
          </Step>
          <Step>
            <StepLabel>Options</StepLabel>
          </Step>
          <Step>
            <StepLabel>Paiement</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              <div>{this.getStepContent(stepIndex)}</div>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={stepIndex === 2 ? this.finish : this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   console.log("MAIN CHANGE");
//   console.log(state);
//   return {
//     user: state.user
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (text) => {
      dispatch(signUp(text))
    }
  }
}

const RegisterConnected = connect(
  mapDispatchToProps
)(Register);

export default RegisterConnected;
