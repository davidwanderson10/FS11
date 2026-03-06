# O QUE É O PROTOCOLO HTTP?

O protocolo HTTP define um conjunto de métodos de requisição responsáveis por indicar a ação a ser executada para um dado recurso. Embora esses métodos possam ser descritos como substantivos, eles também são comumente referenciados como HTTP Verbs (Verbos HTTP). Cada um deles implementa uma semântica diferente, mas alguns recursos são compartilhados por um grupo deles, como por exemplo, qualquer método de requisição pode ser do tipo safe, idempotent ou cacheable.  

- GET  
O método GET solicita a representação de um recurso específico. Requisições utilizando o método GET devem retornar apenas dados.

- POST  
O método POST é utilizado para submeter uma entidade a um recurso específico, frequentemente causando uma mudança no estado do recurso ou efeitos colaterais no servidor.

- PUT  
O método PUT substitui todas as atuais representações do recurso de destino pela carga de dados da requisição.

- DELETE  
O método DELETE remove um recurso específico.


  
# CRIANDO API COM NODE.JS:
```js
// importar o módulo HTTP do Node.js
import http from 'http';

// criar um servidor HTTP
const server = http.createServer((req, res) => { // req = requisição do cliente, res = resposta do servidor
    // definir o cabeçalho da resposta
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    // enviar a resposta com os dados dos produtos em formato JSON
    
    if (req.method ==='GET' && req.url === "/masculino") {
       res.end(JSON.stringify(masculino));
    } else {
      if (req.method ==='GET' && req.url === "/feminino") {
         res.end(JSON.stringify(feminino));
      } else {
        res.end(JSON.stringify(estoque));
      }
    }

    // CRIAR ENDPOINT MASCULINO, FEMININO E A MENSAGEM PADRÃO PARA OS DEMAIS ENDPOINTS

});

// iniciar o servidor na porta 3000
server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
```

