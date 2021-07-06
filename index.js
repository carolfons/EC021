//importando a dependência no arquivo index.js
const restify = require('restify');

//Criando o servidor
const server = restify.createServer({
  name: 'Prática 02'
})

//configurando o servidor para receber requests no formato json
server.use(restify.plugins.bodyParser());
//query parameters
server.use(restify.plugins.queryParser());

function debug(req) {
  console.log('path:\t' + JSON.stringify(req.params));
  console.log('query:\t' + JSON.stringify(req.query));
  console.log('body:\t' + JSON.stringify(req.body));

}

function debugBody(req) {
  console.log('body:\t' + JSON.stringify(req.body));
}

//função helloWorld que sera executada ao acessar localhost:5000/hello
function helloWorld(req, res, next) {
  res.setHeader('content-type', 'application/json');//aqrquivo do tipo json
  res.charSet('UTF-8');
  let nome = req.body.nome;
  let sobrenome = req.body.sobrenome;
  let endereco = req.body.endereco.cidade + ", " + req.body.endereco.estado
  res.send('Hello ' + nome + ' ' + sobrenome + ' @ ' + endereco);
  next();

}

//lista vazia para armazenamento (substituindo um BD - banco de dados dummy)
const alunos = [];
var contador = 0;

// ====== CRUD ========

//  CREATE
function inserir(req, res, next) {
  res.setHeader('content-type', 'application/json');//aqrquivo do tipo json
  res.charSet('UTF-8');
  debugBody(req);
  //adicionando em um objeto
  let aluno = {
    "id": ++contador,
    "nome": req.body.nome,
    "curso": req.body.curso,
    "nascimento": req.body.nascimento
  }

  //inserindo o objeto no vetor 
  alunos.push(aluno);

  //retornando o objeto
  res.send(aluno);
  next();
}

//  READ
function listar(req, res, next) {
  res.setHeader('content-type', 'application/json');//aqrquivo do tipo json
  res.charSet('UTF-8');
  //retornando alunos
  res.send(alunos);
  next();
}
// UPDATE
function atualizar(req, res, next) {
  res.setHeader('content-type', 'application/json');//aqrquivo do tipo json
  res.charSet('UTF-8');
  var foundIndex;
  let id = req.body.id;
  for (var idx in alunos) {
    //se o id do aluno for igual ao id solicitado
    if (alunos[idx].id == id) {
      foundIndex = idx;
      //atualizando os dados
      alunos[idx].nome = req.body.nome;
      alunos[idx].curso = req.body.curso;
      alunos[idx].nascimento = req.body.nascimento;
    }
  }
  //enviando a resposta apenas do aluno na posição alterada
  res.send(alunos[foundIndex]);
  next();
}

//  DELETE
function excluir(req, res, next) {
  res.setHeader('content-type', 'application/json');//aqrquivo do tipo json
  res.charSet('UTF-8');
  //definindo o id que será excluido
  id = req.body.id;
  //contador
  var excluidos = 0;
  //varrendo o vetor
  for (var idx in alunos) {
    //compara o id
    if (alunos[idx].id == id) {
      alunos.splice(idx, 1);//removendo o aluno do vetor
      excluidos++;
    }
  }
  res.send(excluidos + ' registro(s) excluídos');
  next();
}
//prefixo para endpoint
const prefix = '/aluno'

//criando o endpoint
server.post(prefix + '/inserir', inserir); //chamando a função para inserir aluno
server.get(prefix + '/listar', listar); //chamando a função para listar alunos
server.post(prefix + '/atualizar', atualizar); //chamando a função para atualizar a lista de alunos
server.post(prefix + '/excluir', excluir); //chamando a função para excluir aluno


//definindo a porta onde o servidor vai rodar
const port = process.env.PORT || 5000;

//chamando a função que vai subir o servidor 
server.listen(port, function () {
  console.log('%s rodando', server.name)
})
