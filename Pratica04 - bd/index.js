//importando a dependência no arquivo index.js
const restify = require('restify');

//Criando o servidor
const server = restify.createServer({
  name: 'Prática 04'
})

const mysql = require('mysql');

const connectionUri = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ec021'
};

//configurando o servidor para receber requests no formato json
server.use(restify.plugins.bodyParser());
//query parameters
server.use(restify.plugins.queryParser());

function inserir(req, res, next) {

  res.setHeader('content-type', 'application/json');
  res.charSet("UTF-8");

  let aluno = {
    nome: req.body.nome,
    curso: req.body.curso,
    nascimento: req.body.nascimento
  };

  //Abrindo a conexão
  let connection = mysql.createConnection(connectionUri);
  //Preparando a query sql
  let strQuery = `INSERT INTO aluno (nome,curso,nascimento) VALUES` +
    `('${aluno.nome}', '${aluno.curso}', '${aluno.nascimento}');`

  console.log(strQuery);

  //Executando a query sql 
  connection.query(strQuery, function (err, rows, fields) {
    if (!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });
  //Fechando a conexão com o banco
  connection.end();
  next();
}


function listar(req, res, next) {

  //Abrindo a conexão
  let connection = mysql.createConnection(connectionUri);
  //Preparando a query sql
  let strQuery = `SELECT id, nome, curso, nascimento FROM aluno;`;

  console.log(strQuery);

  //Executando a query sql    
  connection.query(strQuery, function (err, rows, fields) {
    if (!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });

  //Fechando a conexão com o banco
  connection.end();
  next();
}

function update(req, res, next) {

  res.setHeader('content-type', 'application/json');
  res.charSet("UTF-8");

  let aluno = {
    id: req.body.id,
    nome: req.body.nome,
    curso: req.body.curso,
    nascimento: req.body.nascimento
  };

  //Abrindo a conexão
  let connection = mysql.createConnection(connectionUri);
  //Preparando a query sql
  let strQuery = `UPDATE aluno SET nome=('${aluno.nome}'), curso=('${aluno.curso}'), nascimento=('${aluno.nascimento}') WHERE id=('${aluno.id}')`;

  console.log(strQuery);

  //Executando a query sql    
  connection.query(strQuery, function (err, rows, fields) {
    if (!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });

  //Fechando a conexão com o banco
  connection.end();
  next();
}


function deletar(req, res, next) {
  res.setHeader('content-type', 'application/json');
  let aluno = {
    id: req.body.id,
  };

  //Abrindo a conexão
  let connection = mysql.createConnection(connectionUri);

  //Preparando a query sql
  let strQuery = `DELETE FROM aluno WHERE id=('${aluno.id}')`;
  console.log(strQuery);

  //Executando a query sql    
  connection.query(strQuery, function (err, rows, fields) {
    if (!err) {
      res.json(rows);
    } else {
      res.json(err);
    }
  });

  //Fechando a conexão com o banco
  connection.end();
  next();
}


//criando os endpoints
const prefix = '/aluno'
server.post(prefix + '/inserir', inserir);
server.get(prefix + '/listar', listar);
server.post(prefix + '/update', update);
server.post(prefix + '/delete', deletar);

//definindo a porta onde o servidor vai rodar
const port = process.env.PORT || 5000;

server.listen(port, function () {
  console.log('%s rodando', server.name)
});

