import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import AppBar from 'material-ui/lib/app-bar';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import CardTitle from 'material-ui/lib/card/card-title';
import Forward from 'material-ui/lib/svg-icons/content/forward';
import {Link} from 'react-router'


import { connect } from 'react-redux';
import * as actions from '../actions/authActions';

class Start extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: "0"
    }
  }

  render() {

    return (
      <div>
        <AppBar
          title="DistAns - Création de compte utilisateur"
        />
        <div style={{marginTop:'50px',textAlign:'justify'}}>
          <Card style={{width:'70%',margin:'0 auto'}}>
          <CardTitle titleStyle={{textAlign:'center',color:'rgba(13, 92, 167, 0.87)',fontFamily:"Short Stack",fontSize:'38px',paddingTop:'20px'}} title="Le concept" />
            <CardText>
                <div style={{width:'100%'}}>
                  <div style={{float:'left',width:'5%'}}>
                    <Forward style={{fill:'rgba(13, 92, 167, 0.87)'}}/> 
                  </div>
                  <div style={{float:'left',width:'95%'}}>
                  DistAns vous aide, en fonction de vos préférences, à être mis en contact avec le

                  psychologue qui vous correspond le mieux. Avant de confirmer un rendez-vous (physique ou par

                  webcam), nous vous proposons un court chat (50 messages) afin d’entrer en contact, briser la

                  glace, comprendre vos besoins et vérifier que vous vous sentez prêt.
                  </div>
                </div>
                <br/><br/><br/><br/>
                <div style={{width:'100%'}}>
                  <div style={{float:'left',width:'5%'}}>
                    <Forward style={{fill:'rgba(13, 92, 167, 0.87)'}} /> 
                  </div>
                  <div style={{float:'left',width:'95%'}}>
                  Une fois ces 50 messages échangés, DistAns vous notifiera et vous demandera si vous souhaitez

                prendre rendez-vous. Si la réponse est positive, nous vous communiquerons le numéro de

                téléphone de votre psychologue.
                  </div>
                </div>
                <br/><br/><br/><br/>
                <div style={{width:'100%'}}>
                  <div style={{float:'left',width:'5%'}}>
                    <Forward style={{fill:'rgba(13, 92, 167, 0.87)'}} /> 
                  </div>
                  <div style={{float:'left',width:'95%'}}>
                  Ainsi, nous n’aurons JAMAIS accès à votre identité (nom, prénom, numéro de téléphone). Votre

                échange avec le psychologue sera également supprimé de notre base de données. Nous vous

                garantissons ainsi un anonymat absolu.
                  </div>
                </div>
                <br/><br/><br/><br/>
            </CardText>
            <Link to={`/register/utilisateur`}>
              <a style={{margin:'0 auto',float:'right',marginRight:'20px',marginBottom:'20px'}}>
                <RaisedButton
                  label="Inscription"
                  primary={true}
                />
              </a>
            </Link>
          </Card><br/>
        </div>
      </div>
    );
  }
}

const StartConnected = connect()(Start);

export default StartConnected;