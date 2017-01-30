import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import TextField from 'material-ui/lib/text-field';

export default class EditUser extends React.Component {

  render() {

    return (
      <Card>
        <CardTitle title="Clickez pour modifier l'information que vous souhaitez" subtitle="N'oubliez pas de sauvegarder avant de quitter !" />
        <CardText>
          <TextField
            value={this.props.user.username}
            disabled={true}
          /><br />
          <TextField
            value={this.props.user.email || ""}
            hintText={
              this.props.user.email == null ?
              "Entrez un email" :
              ""
            }
            disabled={false}
          /><br />
        </CardText>
      </Card>

    )

  }

}
