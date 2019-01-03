const express = require('express');
const app = express();

var notas = [
  {
    id: 0,
    modelo: "NFC-e",
    número: "18500",
    dataHoraEmissão: "23/12/2018 20:15:16",
    dataHoraAutorização: "23/12/2018 20:15:16",
    destinatário: "Girlene Medeiros",
    UF: "DF",
    valor: "R$ 80,00",
    status: "Enviada"
  },
  {
    id: 1,
    modelo: "NFC-e",
    número: "18500",
    dataHoraEmissão: "23/12/2018 20:15:16",
    dataHoraAutorização: "23/12/2018 20:15:16",
    destinatário: "Domício Medeiros",
    UF: "DF",
    valor: "R$ 80,00",
    status: "Enviada"
  },
  {
    id: 2,
    modelo: "NFC-e",
    número: "18500",
    dataHoraEmissão: "23/12/2018 20:15:16",
    dataHoraAutorização: "23/12/2018 20:15:16",
    destinatário: "Domício Medeiros",
    UF: "DF",
    valor: "R$ 80,00",
    status: "Enviada"
  },
  {
    id: 3,
    modelo: "NFC-e",
    número: "18500",
    dataHoraEmissão: "23/12/2018 20:15:16",
    dataHoraAutorização: "23/12/2018 20:15:16",
    destinatário: "Domício Medeiros",
    UF: "DF",
    valor: "R$ 80,00",
    status: "Enviada"
  },
  {
    id: 4,
    modelo: "NFC-e",
    número: "18500",
    dataHoraEmissão: "23/12/2018 20:15:16",
    dataHoraAutorização: "23/12/2018 20:15:16",
    destinatário: "Domício Medeiros",
    UF: "DF",
    valor: "R$ 80,00",
    status: "Enviada"
  }, 
  {
    id: 5,
    modelo: "NFC-e",
    número: "18500",
    dataHoraEmissão: "23/12/2018 20:15:16",
    dataHoraAutorização: "23/12/2018 20:15:16",
    destinatário: "Domício Medeiros",
    UF: "DF",
    valor: "R$ 80,00",
    status: "Enviada"
  }
]

var destinatários = [
  {
    id: 0,
    nome: "Domício Medeiros"
  }
];

var produtos = [
  {
    id: 0,
    descrição: "Botijão de Gás P13"
  }
];

// app.get('/', (req, res) => {
//   res.send({ hi: 'there' });
// });

app.get('/api/notasfiscais', (req, res) => {
  res.send(notas);
});

app.get('/api/destinatarios', (req, res) => {
  res.send(destinatários);
});

app.get('/api/produtos', (req, res) => {
  res.send(produtos);
});

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);


