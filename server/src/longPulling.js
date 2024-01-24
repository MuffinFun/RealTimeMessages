const express = require('express');
const cors = require('cors');
const Events = require('events');
const dotenv = require('dotenv');
const { json } = require('stream/consumers');

const emitter = new Events();

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.get('get-message', (req, res) => {
  emitter.on('newMessage', (message) => {
    return res.json(message);
  });
});
app.post('get-message', (req, res) => {
  const message = req.body;
  emitter.emit('newMessage', message);
  res.status(200);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
