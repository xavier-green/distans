import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import AppBar from 'material-ui/lib/app-bar';


import { connect } from 'react-redux';
import * as actions from '../actions/authActions';

class Register extends React.Component {

  render() {

    return (
      <div>
        <AppBar
          title="Connexion"
        />
        <div style={{marginLeft:'20%',marginRight:'20%',marginTop:'50px'}}>
          <Card>
            <h2 style={{textAlign:'center'}}>Votre compte est actuellement en cours de validation, ce processus peut prendre jusqu'à 48h.</h2>
            <br/>
            <p style={{textAlign:'center'}}>
            Nous vous enverrons un mail dès que vous pourrez vous connecter
            </p>
          </Card>
        </div>
      </div>
    );
  }
}

const RegisterConnected = connect()(Register);

export default RegisterConnected;
