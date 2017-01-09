import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class DialogExampleCustomWidth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      username: ''
    };
    this.handleClose = this.handleClose.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
  }
  handleClose() {
    this.props.onSend(this.state.username);
    this.setState({open: false});
  }
  _handleTextFieldChange(e) {
    this.setState({
      username: e.target.value
    });
  }
  render() {
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Enter username and code"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
        <TextField
          hintText="Username"
          onChange={this._handleTextFieldChange}
        /><br />
        <TextField
          hintText="Code"
        />
        </Dialog>
      </div>
    );
  }
}
