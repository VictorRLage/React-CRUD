const express = require("express")
const app = express();
const mysql = require("mysql")
const cors = require('cors');

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '#Gf15533155708',
    database: 'prestadores'

});

app.post('/cadastrar', (req, res) => {
    const nome = req.body.nome
    const email = req.body.email
    const cpf = req.body.cpf
    const senha = req.body.senha

    db.query('INSERT INTO prestador (nome, email, cpf, senha) VALUES (?, ?, ?, ?)', [nome, email, cpf, senha],
        (err, result) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                res.send('Cadastrado no banco')
            }
        })
})

app.get('/buscar', (req, res) => {
    db.query("SELECT * FROM prestador", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

app.delete('/deletar/:email', (req, res) => {
    const email = req.params.email
    db.query('DELETE FROM prestador WHERE email = ?', email,
        (err, result) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                res.send('Usuario deletado do banco')
            }
        })
})

app.put('/altualizar/:emailAtual/:emailNovo',(req, res) =>{
    const emailAtual = req.params.emailAtual
    const emailNovo = req.params.emailNovo
    db.query('UPDATE prestador SET email = ? WHERE email = ?', [emailNovo, emailAtual],
    (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send('Email atualizado com sucesso')
        }
    })
})


app.listen(3001, () => {
    console.log('SERVIDOR INICIADO NA PORTA 3001')
})

