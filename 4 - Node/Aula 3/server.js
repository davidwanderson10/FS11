import http from 'http';

const livros = [
	{
		"id" : 1,
		"nome" : "David Nogueira",
		"matricula" : "1234",
		"curso" : "Full Stack",
		"cpf" : "12345678900",
		"data_nascimento" : "1991-01-01",
		"email" : "profdavidwanderson@gmail.com",
		"senha" : "123456",
		"status" : "Matriculado"
	},
	{
		"id" : 2,
		"nome" : "Ana Beatriz Souza",
		"matricula" : "2023001",
		"curso" : "Sistemas de Informação",
		"cpf" : "11111111111",
		"data_nascimento" : "2002-03-15",
		"email" : "ana.souza@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 3,
		"nome" : "Bruno Henrique Lima",
		"matricula" : "2023002",
		"curso" : "Engenharia de Software",
		"cpf" : "22222222222",
		"data_nascimento" : "2001-07-22",
		"email" : "bruno.lima@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 4,
		"nome" : "Carla Mendes Oliveira",
		"matricula" : "2023003",
		"curso" : "Ciência da Computação",
		"cpf" : "33333333333",
		"data_nascimento" : "2003-01-09",
		"email" : "carla.oliveira@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 5,
		"nome" : "Diego Ferreira Santos",
		"matricula" : "2023004",
		"curso" : "Administração",
		"cpf" : "44444444444",
		"data_nascimento" : "2000-11-30",
		"email" : "diego.santos@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 6,
		"nome" : "Eduarda Campos Nunes",
		"matricula" : "2023005",
		"curso" : "Direito",
		"cpf" : "55555555555",
		"data_nascimento" : "2002-06-05",
		"email" : "eduarda.nunes@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 7,
		"nome" : "Felipe Araújo Costa",
		"matricula" : "2023006",
		"curso" : "Engenharia Civil",
		"cpf" : "66666666666",
		"data_nascimento" : "1999-09-18",
		"email" : "felipe.costa@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 8,
		"nome" : "Gabriela Souza Rocha",
		"matricula" : "2023007",
		"curso" : "Letras",
		"cpf" : "77777777777",
		"data_nascimento" : "2001-04-25",
		"email" : "gabriela.rocha@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 9,
		"nome" : "Hugo Carvalho Pinto",
		"matricula" : "2023008",
		"curso" : "Matemática",
		"cpf" : "88888888888",
		"data_nascimento" : "2000-02-12",
		"email" : "hugo.pinto@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 10,
		"nome" : "Isabela Moraes Dias",
		"matricula" : "2023009",
		"curso" : "Pedagogia",
		"cpf" : "99999999999",
		"data_nascimento" : "2003-08-03",
		"email" : "isabela.dias@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 11,
		"nome" : "João Pedro Almeida",
		"matricula" : "2023010",
		"curso" : "História",
		"cpf" : "10101010101",
		"data_nascimento" : "2001-10-19",
		"email" : "joao.almeida@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 12,
		"nome" : "Karen Ribeiro Luz",
		"matricula" : "2023011",
		"curso" : "Filosofia",
		"cpf" : "12121212121",
		"data_nascimento" : "2002-01-27",
		"email" : "karen.luz@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 13,
		"nome" : "Lucas Gabriel Pires",
		"matricula" : "2023012",
		"curso" : "Sistemas de Informação",
		"cpf" : "13131313131",
		"data_nascimento" : "2000-05-14",
		"email" : "lucas.pires@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 14,
		"nome" : "Mariana Azevedo Melo",
		"matricula" : "2023013",
		"curso" : "Biblioteconomia",
		"cpf" : "14141414141",
		"data_nascimento" : "1999-12-01",
		"email" : "mariana.melo@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 15,
		"nome" : "Nicolas Faria Torres",
		"matricula" : "2023014",
		"curso" : "Engenharia Elétrica",
		"cpf" : "15151515151",
		"data_nascimento" : "2001-07-08",
		"email" : "nicolas.torres@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 16,
		"nome" : "Olívia Gomes Prado",
		"matricula" : "2023015",
		"curso" : "Psicologia",
		"cpf" : "16161616161",
		"data_nascimento" : "2003-03-21",
		"email" : "olivia.prado@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 17,
		"nome" : "Paulo Ricardo Barros",
		"matricula" : "2023016",
		"curso" : "Economia",
		"cpf" : "17171717171",
		"data_nascimento" : "2000-09-09",
		"email" : "paulo.barros@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 18,
		"nome" : "Queila Fernandes Brito",
		"matricula" : "2023017",
		"curso" : "Serviço Social",
		"cpf" : "18181818181",
		"data_nascimento" : "2002-02-02",
		"email" : "queila.brito@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 19,
		"nome" : "Rafael Teixeira Silva",
		"matricula" : "2023018",
		"curso" : "Ciência da Computação",
		"cpf" : "19191919191",
		"data_nascimento" : "1999-06-30",
		"email" : "rafael.silva@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 20,
		"nome" : "Sara Cristina Paiva",
		"matricula" : "2023019",
		"curso" : "Jornalismo",
		"cpf" : "20202020202",
		"data_nascimento" : "2001-01-05",
		"email" : "sara.paiva@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	},
	{
		"id" : 21,
		"nome" : "Thiago Moreira Cunha",
		"matricula" : "2023020",
		"curso" : "Engenharia de Produção",
		"cpf" : "21212121212",
		"data_nascimento" : "2000-04-11",
		"email" : "thiago.cunha@example.com",
		"senha" : "senha123",
		"status" : "ativo"
	}
]

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(livros));
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});