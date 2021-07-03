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
  console.log('path params: ')
  console.log(req.params);
  console.log('query params: ')
  console.log(req.query);
  console.log('body params: ')
  console.log(req.body);

}

//função helloWorld que sera executada ao acessar localhost:5000
function helloWorld(req, res, next) {
  res.setHeader('content-type', 'application/json');//aqrquivo do tipo json
  res.charSet('UTF-8');
  debug(req);
  let nome = req.body.nome;
  let sobrenome = req.body.sobrenome;
  res.send('Hello ' + nome + ' ' + sobrenome + ' @ ' + new Date());
  next();
}


//criando o endpoint
server.post('/hello', helloWorld)


//definindo a porta onde o servidor vai rodar
const port = process.env.PORT || 5000;

//chamando a função que vai subir o servidor 
server.listen(port, function () {
  console.log('%s rodando', server.name)
})
