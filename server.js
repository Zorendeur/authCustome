const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());

const routes = require('./routes/');

app.use('/', routes);

app.use(express.static('public'));
app.get('/', (req, res) => {
res.sendFile(__dirname + '/public/index.html');
});


app.use((req, res) => res.status(404).send('Route non trouvée.'));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Erreur serveur.');
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
console.log(`Serveur Express en ligne : http://localhost:${PORT}`);
});