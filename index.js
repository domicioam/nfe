const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.get('/api/test', (req, res) => {
  console.log("Here");
  res.send({ hi: 'api' });
});

app.listen(5000);


