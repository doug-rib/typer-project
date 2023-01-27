var api = {};

var frases = [
	{_id: 0, texto:'A primeira foto do mundo foi capturada ao longo de 8h.', tempo: 12 },
	{_id: 1, texto:'O e-mail foi criado antes da internet.',tempo: 6 },
	{_id: 2, texto:'A primeira página da internet continua online.', tempo: 8 },
	{_id: 3, texto:'Ogivas nucleares ficaram protegidas por anos com a senha 00000000.', tempo: 10 },
	{_id: 4, texto:'Em 1956, um HD de 5 Mb pesava uma tonelada.', tempo: 5 },
	{_id: 5, texto:'A primeira pessoa a programar foi uma mulher: Ada Lovelace.', tempo: 8 },
	{_id: 6, texto:'Um computador tão poderoso quanto o cérebro humano seria capaz de realizar 38.000 trilhões de operações por segundo.', tempo: 17 },
	{_id: 7, texto:'Creeper, escrito por Bob Thomas em 1971, é o primeiro vírus de computador.', tempo: 10 },
	{_id: 8, texto:'Steve Jobs construiu o primeiro computador Apple com peças de reposição de seu antigo empregador.', tempo: 14},
	{_id: 9, texto:'Atualmente, existem mais de 17 bilhões de dispositivos conectados à internet.', tempo: 11},

	];

api.lista = function(req, res) {

	setTimeout(function(){
		if(req.query.id) return res.json(frases[req.query.id]);

		res.json(frases);
	},1500);

};

module.exports = api;
