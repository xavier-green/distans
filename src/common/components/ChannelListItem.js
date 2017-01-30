import React, { PropTypes } from 'react';
import classnames from 'classnames';
import ListItem from 'material-ui/lib/lists/list-item';

const ChannelListItem = (props) => {
  const { channel: selectedChannel, onClick, channel } = props;
  return (
    <a className={classnames({ selected: channel === selectedChannel })}
       style={{ cursor: 'pointer', color: 'black'}}
       onClick={() => onClick(channel)}>
       <ListItem>
        <h5>{channel.utilisateur.name}</h5>
        </ListItem>
    </a>
  );
}

ChannelListItem.propTypes = {
  channel: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ChannelListItem;
