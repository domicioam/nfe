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

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.get('/api/notasfiscais', (req, res) => {
  res.send(notas);
});

app.get('/api/destinatarios', (req, res) => {
  res.send(destinatários);
});

app.listen(5000);


