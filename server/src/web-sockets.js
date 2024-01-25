const ws = require('ws');
const dotenv = require('dotenv');

dotenv.config();

const wss = new ws.Server(
  {
    port: process.env.PORT || 3000,
  },
  () => console.log(`Server has started on port ${process.env.PORT}`)
);

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    message = JSON.parse(message);
    switch (message.event) {
      case 'message':
        broadcast(message);
        break;
      case 'connection':
        broadcast(message);
        break;
    }
  });
});

function broadcast(message) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
