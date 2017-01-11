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
import StarEmpty from 'material-ui/lib/svg-icons/toggle/star-border';
import StarFull from 'material-ui/lib/svg-icons/toggle/star';
import Email from 'material-ui/lib/svg-icons/communication/email';
import Dates from 'material-ui/lib/svg-icons/action/date-range';
import Code from 'material-ui/lib/svg-icons/action/redeem';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

import { Col, Row } from 'react-bootstrap';

import { connect } from 'react-redux';
import * as actions from '../actions/actions';

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

class Register extends React.Component {

  constructor(props) {
    super(props);
  }

  _handleChange(element,e) {
    var data = {};
    data[element] = e.target.value;
    this.props.onEdit(data);
  }

  render() {
    return (
      <div>
        <AppBar
          title="Création de compte"
        />
        <Row className="show-grid" style={{marginLeft:'22%',marginRight:'22%'}}>
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
          </Card>
        </Row>
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
