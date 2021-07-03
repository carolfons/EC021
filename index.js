//importando a dependência no arquivo index.js
var restify = require('restify');

//Criando o servidor
var server = restify.createServer({
  name: 'Prática 01'
})

//configurando o servidor para receber requests no formato json
server.use(restify.plugins.bodyParser());

//criando o endpoint
server.get('/hello', function (req, res, next) {
  //função helloWorld que sera executada ao acessar localhost:5000
  res.setHeader('content-type', 'application/json');//aqrquivo do tipo json
  res.charSet('UTF-8');
  res.send('Hello World');
  next();
});

//definindo a porta onde o servidor vai rodar
var port = process.env.PORT || 5000;

//chamando a função que vai subir o servidor 
server.listen(port, function () {
  console.log('%s rodando', server.name)
})
