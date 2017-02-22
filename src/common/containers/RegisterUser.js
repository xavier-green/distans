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
import Checkbox from 'material-ui/lib/checkbox';
import Snackbar from 'material-ui/lib/snackbar';

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
  <MenuItem key={3} value="Autre" primaryText="Autre"/>,
];

const regions = [
  <MenuItem key={0} value="(00) Hors France" primaryText="(00) Hors France"/>,
  <MenuItem key={1} value="(01) Ain " primaryText="(01) Ain "/>,
  <MenuItem key={2} value="(02) Aisne " primaryText="(02) Aisne "/>,
  <MenuItem key={3} value="(03) Allier " primaryText="(03) Allier "/>,
  <MenuItem key={4} value="(04) Alpes de Haute Provence " primaryText="(04) Alpes de Haute Provence "/>,
  <MenuItem key={5} value="(05) Hautes Alpes " primaryText="(05) Hautes Alpes "/>,
  <MenuItem key={6} value="(06) Alpes Maritimes " primaryText="(06) Alpes Maritimes "/>,
  <MenuItem key={7} value="(07) Ardèche " primaryText="(07) Ardèche "/>,
  <MenuItem key={8} value="(08) Ardennes " primaryText="(08) Ardennes "/>,
  <MenuItem key={9} value="(09) Ariège " primaryText="(09) Ariège "/>,
  <MenuItem key={10} value="(10) Aube " primaryText="(10) Aube "/>,
  <MenuItem key={11} value="(11) Aude " primaryText="(11) Aude "/>,
  <MenuItem key={12} value="(12) Aveyron " primaryText="(12) Aveyron "/>,
  <MenuItem key={13} value="(13) Bouches du Rhône " primaryText="(13) Bouches du Rhône "/>,
  <MenuItem key={14} value="(14) Calvados " primaryText="(14) Calvados "/>,
  <MenuItem key={15} value="(15) Cantal " primaryText="(15) Cantal "/>,
  <MenuItem key={16} value="(16) Charente " primaryText="(16) Charente "/>,
  <MenuItem key={17} value="(17) Charente Maritime " primaryText="(17) Charente Maritime "/>,
  <MenuItem key={18} value="(18) Cher " primaryText="(18) Cher "/>,
  <MenuItem key={19} value="(19) Corrèze " primaryText="(19) Corrèze "/>,
  <MenuItem key={20} value="(2A) Corse du Sud " primaryText="(2A) Corse du Sud "/>,
  <MenuItem key={21} value="(2B) Haute-Corse " primaryText="(2B) Haute-Corse "/>,
  <MenuItem key={22} value="(21) Côte d'Or " primaryText="(21) Côte d'Or "/>,
  <MenuItem key={23} value="(22) Côtes d'Armor " primaryText="(22) Côtes d'Armor "/>,
  <MenuItem key={24} value="(23) Creuse " primaryText="(23) Creuse "/>,
  <MenuItem key={25} value="(24) Dordogne " primaryText="(24) Dordogne "/>,
  <MenuItem key={26} value="(25) Doubs " primaryText="(25) Doubs "/>,
  <MenuItem key={27} value="(26) Drôme " primaryText="(26) Drôme "/>,
  <MenuItem key={28} value="(27) Eure " primaryText="(27) Eure "/>,
  <MenuItem key={29} value="(28) Eure et Loir " primaryText="(28) Eure et Loir "/>,
  <MenuItem key={30} value="(29) Finistère " primaryText="(29) Finistère "/>,
  <MenuItem key={31} value="(30) Gard " primaryText="(30) Gard "/>,
  <MenuItem key={32} value="(31) Haute Garonne " primaryText="(31) Haute Garonne "/>,
  <MenuItem key={33} value="(32) Gers " primaryText="(32) Gers "/>,
  <MenuItem key={34} value="(33) Gironde " primaryText="(33) Gironde "/>,
  <MenuItem key={35} value="(34) Hérault " primaryText="(34) Hérault "/>,
  <MenuItem key={36} value="(35) Ille et Vilaine " primaryText="(35) Ille et Vilaine "/>,
  <MenuItem key={37} value="(36) Indre " primaryText="(36) Indre "/>,
  <MenuItem key={38} value="(37) Indre et Loire " primaryText="(37) Indre et Loire "/>,
  <MenuItem key={39} value="(38) Isère " primaryText="(38) Isère "/>,
  <MenuItem key={40} value="(39) Jura " primaryText="(39) Jura "/>,
  <MenuItem key={41} value="(40) Landes " primaryText="(40) Landes "/>,
  <MenuItem key={42} value="(41) Loir et Cher " primaryText="(41) Loir et Cher "/>,
  <MenuItem key={43} value="(42) Loire " primaryText="(42) Loire "/>,
  <MenuItem key={44} value="(43) Haute Loire " primaryText="(43) Haute Loire "/>,
  <MenuItem key={45} value="(44) Loire Atlantique " primaryText="(44) Loire Atlantique "/>,
  <MenuItem key={46} value="(45) Loiret " primaryText="(45) Loiret "/>,
  <MenuItem key={47} value="(46) Lot " primaryText="(46) Lot "/>,
  <MenuItem key={48} value="(47) Lot et Garonne " primaryText="(47) Lot et Garonne "/>,
  <MenuItem key={49} value="(48) Lozère " primaryText="(48) Lozère "/>,
  <MenuItem key={50} value="(49) Maine et Loire " primaryText="(49) Maine et Loire "/>,
  <MenuItem key={51} value="(50) Manche " primaryText="(50) Manche "/>,
  <MenuItem key={52} value="(51) Marne " primaryText="(51) Marne "/>,
  <MenuItem key={53} value="(52) Haute Marne " primaryText="(52) Haute Marne "/>,
  <MenuItem key={54} value="(53) Mayenne " primaryText="(53) Mayenne "/>,
  <MenuItem key={55} value="(54) Meurthe et Moselle " primaryText="(54) Meurthe et Moselle "/>,
  <MenuItem key={56} value="(55) Meuse " primaryText="(55) Meuse "/>,
  <MenuItem key={57} value="(56) Morbihan " primaryText="(56) Morbihan "/>,
  <MenuItem key={58} value="(57) Moselle " primaryText="(57) Moselle "/>,
  <MenuItem key={59} value="(58) Nièvre " primaryText="(58) Nièvre "/>,
  <MenuItem key={60} value="(59) Nord " primaryText="(59) Nord "/>,
  <MenuItem key={61} value="(60) Oise " primaryText="(60) Oise "/>,
  <MenuItem key={62} value="(61) Orne " primaryText="(61) Orne "/>,
  <MenuItem key={63} value="(62) Pas de Calais " primaryText="(62) Pas de Calais "/>,
  <MenuItem key={64} value="(63) Puy de Dôme " primaryText="(63) Puy de Dôme "/>,
  <MenuItem key={65} value="(64) Pyrénées Atlantiques " primaryText="(64) Pyrénées Atlantiques "/>,
  <MenuItem key={66} value="(65) Hautes Pyrénées " primaryText="(65) Hautes Pyrénées "/>,
  <MenuItem key={67} value="(66) Pyrénées Orientales " primaryText="(66) Pyrénées Orientales "/>,
  <MenuItem key={68} value="(67) Bas Rhin " primaryText="(67) Bas Rhin "/>,
  <MenuItem key={69} value="(68) Haut Rhin " primaryText="(68) Haut Rhin "/>,
  <MenuItem key={70} value="(69) Rhône " primaryText="(69) Rhône "/>,
  <MenuItem key={71} value="(70) Haute Saône " primaryText="(70) Haute Saône "/>,
  <MenuItem key={72} value="(71) Saône et Loire " primaryText="(71) Saône et Loire "/>,
  <MenuItem key={73} value="(72) Sarthe " primaryText="(72) Sarthe "/>,
  <MenuItem key={74} value="(73) Savoie " primaryText="(73) Savoie "/>,
  <MenuItem key={75} value="(74) Haute Savoie " primaryText="(74) Haute Savoie "/>,
  <MenuItem key={76} value="(75) Paris " primaryText="(75) Paris "/>,
  <MenuItem key={77} value="(76) Seine Maritime " primaryText="(76) Seine Maritime "/>,
  <MenuItem key={78} value="(77) Seine et Marne " primaryText="(77) Seine et Marne "/>,
  <MenuItem key={79} value="(78) Yvelines " primaryText="(78) Yvelines "/>,
  <MenuItem key={80} value="(79) Deux Sèvres " primaryText="(79) Deux Sèvres "/>,
  <MenuItem key={81} value="(80) Somme " primaryText="(80) Somme "/>,
  <MenuItem key={82} value="(81) Tarn " primaryText="(81) Tarn "/>,
  <MenuItem key={83} value="(82) Tarn et Garonne " primaryText="(82) Tarn et Garonne "/>,
  <MenuItem key={84} value="(83) Var " primaryText="(83) Var "/>,
  <MenuItem key={85} value="(84) Vaucluse " primaryText="(84) Vaucluse "/>,
  <MenuItem key={86} value="(85) Vendée " primaryText="(85) Vendée "/>,
  <MenuItem key={87} value="(86) Vienne " primaryText="(86) Vienne "/>,
  <MenuItem key={88} value="(87) Haute Vienne " primaryText="(87) Haute Vienne "/>,
  <MenuItem key={89} value="(88) Vosges " primaryText="(88) Vosges "/>,
  <MenuItem key={90} value="(89) Yonne " primaryText="(89) Yonne "/>,
  <MenuItem key={91} value="(90) Territoire de Belfort " primaryText="(90) Territoire de Belfort "/>,
  <MenuItem key={92} value="(91) Essonne " primaryText="(91) Essonne "/>,
  <MenuItem key={93} value="(92) Hauts de Seine " primaryText="(92) Hauts de Seine "/>,
  <MenuItem key={94} value="(93) Seine Saint Denis " primaryText="(93) Seine Saint Denis "/>,
  <MenuItem key={95} value="(94) Val de Marne " primaryText="(94) Val de Marne "/>,
  <MenuItem key={96} value="(95) Val d'Oise " primaryText="(95) Val d'Oise "/>,
  <MenuItem key={97} value="(971) Guadeloupe " primaryText="(971) Guadeloupe "/>,
  <MenuItem key={98} value="(972) Martinique " primaryText="(972) Martinique "/>,
  <MenuItem key={99} value="(973) Guyane " primaryText="(973) Guyane "/>,
  <MenuItem key={100} value="(974) Réunion " primaryText="(974) Réunion "/>,
  <MenuItem key={101} value="(975) Saint Pierre et Miquelon " primaryText="(975) Saint Pierre et Miquelon "/>,
  <MenuItem key={102} value="(976) Mayotte" primaryText="(976) Mayotte"/>
]

class Obligatoire extends React.Component {

  render() {

    return (
      <div>
      <CardTitle style={{textAlign:'center'}} title="Information Obligatoire" subtitle="L'email et le numéro de téléphone ne sont pas obligatoires pour vous créer un compte. Cependant, si vous oubliez votre identifiant ou mot de passe sans un email/numéro de secours vous n'aurez aucun moyen de récuperer votre compte" />
      <CardText style={{textAlign:'center'}}>
        <UserName color={blue500} style={styles.icon}/>
        <TextField
          floatingLabelText="Nom d'utilisateur"
          underlineStyle={{color:'rgb(0, 188, 212)'}}
          onChange={this.props._handleChange.bind(this,'username')}
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
      <CardTitle style={{textAlign:'center'}} title="Information Optionnelle" subtitle="Ces informations sont optionnelles. Néanmoins, sachez qu'elles restent parfaitement confidentielles et que sans que acceptiez de dévoiler votre identité elles seront invisibles au psychologues." />
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
      <CardTitle style={{textAlign:'center'}} title="Psychologue" subtitle="Veuillez choisir le psychologue le plus adapté à vos besoins. Nous vous garantissons que nous ferons tout notre possible pour vous trouver un psychologue qui vous mettra à l'aise et saura vous aider." />
      <CardText>
      <Checkbox
        label="J'accepte de chercher un psychologue qui accepte la vidéoconférence"
        onCheck={this.props._handleCheckChange}
        checked={this.props.videoconf}
      /><br/>
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
      completed: 33,
      videoconf: true,
      loadingRegister: false
    }
  }

  _handleChange(element,e) {
    var data = {};
    data[element] = e.target.value;
    this.setState(data);
  }

  _handleCheckChange(e, checked) {
    this.setState({videoconf: checked})
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
    this.setState({loadingRegister: true})
    this.props.dispatch(actions.signUp(sendData));
  }

  next() {
    this.setState({step:this.state.step+1})
  }

  prev() {
    this.setState({step:this.state.step-1})
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
    var prevButton = (
      <a onClick={::this.prev} style={{margin:'0 auto',float:'left'}}>
        <RaisedButton
          label="Précédent"
          secondary={true}
        />
      </a>
    );
    var items = [
      <Obligatoire _handleChange={::this._handleChange} />,
      <Optionnel _dateChange={::this._dateChange} _handleChange={::this._handleChange} />,
      <Psychologue _handleCheckChange={::this._handleCheckChange} videoconf={this.state.videoconf} region={this.state.region} psy={this.state.psy} _regionChange={::this._regionChange} _selectChange={::this._selectChange} _handleChange={::this._handleChange} />
    ]
    return (
      <div>
        <AppBar
          title="DistAns - Création de compte utilisateur"
        />
        <div style={{marginLeft:'20%',marginRight:'20%',marginTop:'50px'}}>
          <Card style={{backgroundImage:'url("/assets/clouds.png")',backgroundSize:'cover'}}>
            <CardText>
              <Stepper steps={ ['Inscription', 'Contact', 'Psychologue'] } activeStep={this.state.step} />
            </CardText>
            {items[this.state.step]}
          </Card><br/><br/>
          {
            this.state.step > 0 ?
            prevButton :
            null
          }
          {
            this.state.step == 2 ?
            signupButton :
            nextButton
          }
        </div>
        <Snackbar
          open={this.state.loadingRegister}
          message="Création de compte en cours"
          autoHideDuration={120000}
        />
      </div>
    );
  }
}

const RegisterConnected = connect()(Register);

export default RegisterConnected;
