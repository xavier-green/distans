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
import * as actions from '../actions/actions';

var styles = {
  icon : {
    height: '50px',
    width: '50px',
    verticalAlign: 'middle',
    marginRight: '30px'
  }
};

const items = [
  <MenuItem key={1} value={1} primaryText="Never"/>,
  <MenuItem key={2} value={2} primaryText="Every Night"/>,
  <MenuItem key={3} value={3} primaryText="Weeknights"/>,
  <MenuItem key={4} value={4} primaryText="Weekends"/>,
  <MenuItem key={5} value={5} primaryText="Weekly"/>,
];

class Register extends React.Component {

  constructor(props) {
    super(props);
  }

  _handleChange(element,e) {
    // var data = {};
    // this.setState({element:e.target.value});
    // console.log(this.state);
  }

  render() {
    var registerType = this.props.params.type;
    return (
      <div>
        <AppBar
          title="Création de compte"
        />
        <div style={{marginLeft:'15%',marginRight:'15%',marginTop:'50px'}}>
          <Card>
            <CardTitle title="Information obligatoire" subtitle="L'email et le numéro de téléphone ne sont pas obligatoires pour vous créer un compte. Si vous oubliez votre identifiant ou mot de passe sans un email/numéro de secours vous n'aurez aucun moyen de récuperer votre compte" />
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
                  labelStyle={{fontSize:'25px',paddingTop:'15px'}}
                />
                <RadioButton
                  style={{ width: 'auto',paddingLeft:'50px' }}
                  value="Femme"
                  label="Femme"
                  labelStyle={{fontSize:'25px',paddingTop:'15px'}}
                />
              </RadioButtonGroup><br />
              <div style={{display:'flex'}}>
                <Dates color={blue500} style={styles.icon}/>
                <DatePicker hintText="Date de naissance" mode="landscape"/>
              </div>
            </CardText>
            <CardTitle title="Psychologue" subtitle="Veuillez choisir le psychologue le plus adapté à vos besoins. Nous vous garantissons que nous ferons tout notre possible pour vous trouver un psychologue qui vous mettra à l'aise et saura vous aider." />
            <CardText>
            <SelectField
              floatingLabelText="Choisissez une catégorie de psychologue"
            >
              {items}
            </SelectField>
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

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
