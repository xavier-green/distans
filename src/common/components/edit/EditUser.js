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
import Snackbar from 'material-ui/lib/snackbar';

import * as actions from '../../actions/authActions';

var moment = require('moment');

var styles = {
  icon : {
    height: '50px',
    width: '50px',
    verticalAlign: 'middle',
    marginRight: '30px'
  }
};

export default class EditUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user.userObject.email || null,
      dob: this.props.user.userObject.dob || null,
      sex: this.props.user.userObject.sex || null,
      userSaved: false
    }
  }

  _handleChange(element,e) {
    var data = {};
    data[element] = e.target.value;
    this.setState(data);
  }

  _dateChange(e, date) {
    this.setState({dob: moment.parseZone(date).format("DD/MM/YYYY")})
  }

  save() {
    let { email,dob,sex } = this.state;
    this.props.dispatch(actions.editUser(this.props.user.username, email, dob, sex));
    this.setState({userSaved: true});
  }

  handleRequestClose() {
    this.setState({userSaved: false});
  }

  render() {

    return (
      <div>
      <Card style={{marginTop:'25px'}}>
        <CardTitle title="Clickez pour modifier l'information que vous souhaitez" subtitle="N'oubliez pas de sauvegarder avant de quitter !" />
        <CardText>
          <UserName color={blue500} style={styles.icon}/>
          <TextField
            value={this.props.user.username}
            disabled={true}
          /><br /><br />
          <Email color={blue500} style={styles.icon}/>
          <TextField
            value={this.state.email}
            hintText={
              this.props.user.userObject.email == null ?
              "Entrez un email" :
              ""
            }
            onChange={::this._handleChange.bind(this,'email')}
          /><br /><br />
        <div style={{display:'flex'}}>
          <Dates color={blue500} style={styles.icon}/>
          <DatePicker 
            hintText={
              this.props.user.userObject.dob == null ?
              "Choisissez votre date de naissance" :
              this.props.user.userObject.dob
            }
            onChange={::this._dateChange} 
            mode="landscape"
          />
        </div><br/><br/>
        <RadioButtonGroup defaultSelected={this.props.user.userObject.sex || null} name="sex" style={{ display: 'flex' }} onChange={::this._handleChange.bind(this,'sex')}>
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
        </RadioButtonGroup><br/>
          <a onClick={::this.save} style={{margin:'0 auto',float:'right'}}>
            <RaisedButton
              label="Enregistrer"
              secondary={true}
            />
        </a><br/><br/><br/>
        </CardText>
      </Card>
      <Snackbar
          open={this.state.userSaved}
          message="Votre profil a été mis à jour"
          action="Ok"
          autoHideDuration={3000}
          onActionTouchTap={::this.handleRequestClose}
          onRequestClose={::this.handleRequestClose}
        />
      </div>
    )

  }

}
