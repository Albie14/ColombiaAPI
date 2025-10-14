const express = require('express');
const path = require('path');

const app = express();
const puerto = 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
})