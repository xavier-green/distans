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
          title="DistAns - Création de compte psychologue"
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
                  DistAns vous aide à entrer en contact avec les patients dont la problématique correspond le mieux

à votre domaine de compétences.
                  </div>
                </div>
                <br/><br/><br/><br/>
                <div style={{width:'100%'}}>
                  <div style={{float:'left',width:'5%'}}>
                    <Forward style={{fill:'rgba(13, 92, 167, 0.87)'}} /> 
                  </div>
                  <div style={{float:'left',width:'95%'}}>
                  A votre inscription, vous vous verrez demander une copie de pièce d’identité et certificat ADELI

pour vérifier votre identité et votre formation. Nous supprimons ces éléments de notre base de

données dès vérification de votre identité.
                  </div>
                </div>
                <br/><br/><br/><br/>
                <div style={{width:'100%'}}>
                  <div style={{float:'left',width:'5%'}}>
                    <Forward style={{fill:'rgba(13, 92, 167, 0.87)'}} /> 
                  </div>
                  <div style={{float:'left',width:'95%'}}>
                  En vous connectant, vous vous verrez attribuer des patients, avec qui vous vous engagez à

échanger par écrit (chat en ligne) pour un échange de 50 messages, afin de le mettre en confiance

et vérifier que vous êtes aptes à l’aider. A la fin de cette période d’échange, le chat sera bloqué. Le

patient pourra alors vous demander ou non un rendez-vous. En cas de réponse positive, nous lui

communiquerons votre numéro de téléphone / autre moyen de contact.
                  </div>
                </div>
                <br/><br/><br/><br/>
            </CardText>
            <Link to={`/register/psy`}>
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