const express = require('express');
const mysql = require('mysql');
const cors = require('cors');  // Importar a biblioteca CORS
const path = require('path');  // Importar a biblioteca Path

const app = express();

// Middleware CORS para permitir todas as origens
app.use(cors());

// Servir arquivos estáticos, como CSS
app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5715258',
    database: 'Agricultura'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

app.get('/dados', (req, res) => {
    const query = 'SELECT * FROM Saude_Solo';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta MySQL:', err.stack);
            res.status(500).send('Erro no servidor.');
            return;
        }
        res.json(results);
    });
});

app.listen(3013, () => {
    console.log('Servidor rodando na porta 3013');
});
