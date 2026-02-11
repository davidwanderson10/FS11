// importar o módulo HTTP do Node.js
import http from 'http';

const produtos = [
  {
    titulo: "Tênis X-Cell Lightspeed",
    desconto: "-42% OFF",
    precoAntigo: 399.99,
    precoPix: 218.49,
    parcelas: "ou 3x de R$ 76,66",
    frete: "Frete grátis",
    imagem: "https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/309972/03/sv01/fnd/BRA/fmt/png?sw=480&q=60"
  },
  {
    titulo: "Mochila PUMA Gym Club",
    desconto: "-47% OFF",
    precoAntigo: 399.99,
    precoPix: 199.49,
    parcelas: "ou 3x de R$ 70,00",
    frete: "",
    imagem: "https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/091180/08/fnd/BRA/fmt/png?sw=480&q=60"
  },
  {
    titulo: "Camisa Palmeiras HOME 2026 Torcedor Juvenil",
    desconto: "-30% OFF",
    precoAntigo: 399.99,
    precoPix: 265.99,
    parcelas: "ou 4x de R$ 70,00",
    frete: "Frete grátis",
    imagem: "https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/787224/01/fnd/BRA/fmt/png"
  },
  {
    titulo: "Moletom com Capuz Essentials No. 1 Logo Masculino",
    desconto: "-40% OFF",
    precoAntigo: 249.99,
    precoPix: 149.99,
    parcelas: "ou 2x de R$ 75,00",
    frete: "",
    imagem: "https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/682573/44/fnd/BRA/fmt/png?sw=480&q=60"
  }
]

// criar um servidor HTTP
const server = http.createServer((req, res) => {
    // definir o cabeçalho da resposta
    res.setHeader('Content-Type', 'application/json');
    // enviar a resposta com os dados dos produtos em formato JSON
    res.end(JSON.stringify(produtos));
});

// iniciar o servidor na porta 3000
server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});