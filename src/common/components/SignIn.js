import React from 'react';
import TextField from 'material-ui/lib/text-field';

import { connect } from 'react-redux';
import * as actions from '../actions/actions';

class SignIn extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var registerType = this.props.params.type;
    return (
      <TextField
        floatingLabelText="Nom d'utilisateur"
        underlineStyle={{color:'rgb(0, 188, 212)'}}
        ref="testref"
      />
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

const SignInConnected = connect(
  mapDispatchToProps
)(SignIn);

export default SignInConnected;
