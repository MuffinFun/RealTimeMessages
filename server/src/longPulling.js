const express = require('express');
const cors = require('cors');
const events = require('events');
const dotenv = require('dotenv');

const emitter = new events.EventEmitter();

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/get-messages', (req, res) => {
  emitter.once('newMessage', (message) => {
    res.json(message);
  });
});

app.post('/new-messages', (req, res) => {
  const message = req.body;
  emitter.emit('newMessage', message);
  res.status(200);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
