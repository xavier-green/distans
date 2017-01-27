import React, { PropTypes } from 'react';
import classnames from 'classnames';
import ListItem from 'material-ui/lib/lists/list-item';

const ChannelListItem = (props) => {
  const { channel: selectedChannel, onClick, channel } = props;
  return (
    <ListItem>
    <a className={classnames({ selected: channel === selectedChannel })}
       style={{ cursor: 'hand', color: 'black'}}
       onClick={() => onClick(channel)}>
      <li style={{textAlign: 'left', cursor: 'pointer', marginLeft: '2em'}}>
        <h5>{channel.utilisateur.name}</h5>
      </li>
    </a>
    </ListItem>
  );
}

ChannelListItem.propTypes = {
  channel: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ChannelListItem;
