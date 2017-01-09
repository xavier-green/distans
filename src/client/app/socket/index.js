import {receiveMessage} from '../actions';

export default function listenForSocket(store, socket) {
  socket.on('chat',(data) => {
    console.log("client receives");
    console.log(data);
    store.dispatch(receiveMessage(data.text,data.person));
  });
}
