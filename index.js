'use strict'

// https://telegraf.js.org/
const Telegraf = require('telegraf');
const constants = require('./constants');

const bot = new Telegraf(constants.API_TOKEN);

// classes
let Games = require('./classes/Games');
let Game = require('./classes/Game');
let User = require('./classes/User');
let Users = require('./classes/Users');

let games = new Games();
let users = new Users();

console.log('Starting bot')

bot.catch((err) => {
  console.log('Ooops', err)
});

bot.command('/start', async (ctx) => {
	console.log(ctx.from)

	if (ctx.chat.type == 'group') {
		ctx.reply('Aquesta comanda serveix per registrar-te com a usuari i només es pot executar des del chat privat amb aquest bot.')
		return;
	}

	const user = new User(ctx);
	const result = users.addUser(user);

	if (result) {
		ctx.reply('Has sigut registrat com a usuari del joc.');
	} else {
		ctx.reply('Hi ha hagut algun problema registrant-te com a usuari del joc.');
	}
});

bot.command('/private', (ctx) => {
	const user = users.findUserById(ctx.from.id)

	if (!user) {
		ctx.reply(`Aquest usuari no està registrat.`)
	}

	user.sendMsg('Holis');
});

bot.command('/startgame', async (ctx) => {
	console.log(ctx.chat)

	if (ctx.chat.type == 'group') {

		const numMembers = await ctx.getChatMembersCount(ctx.chat.id);

		let game = new Game({
			group: ctx.chat,
			id: ctx.chat.id,
			maxMembers: numMembers,
			ctx: ctx
		});

		const result = games.addGame(game);

		if (!result) {
			ctx.reply('Hi ha hagut un problema al crear la partida.')
			return;
		}

		ctx.reply('Teniu 1 minut per registrar-vos al joc amb /register .');

		setTimeout(async () => {
			await ctx.reply('Membres apuntats: ' + game.members.length);
			await ctx.reply(game.getMembersList());
			await ctx.reply('Anem a generar les cartes del joc...');
			await ctx.reply('Es generaran ' + game.families + ' families amb ' + game.familyMembers + ' membres per familia.');
			game.generateCards();
			games.delete(game.id)
		}, 5000); // put 60000 for 1 min
		
	} else {
		ctx.reply('Només es pot jugar al joc si el bot està posat a un grup.')
	}	
});

bot.command('/register', async ctx => {

	const game = games.findGameById(ctx.chat.id);

	if (game == null) {
		ctx.reply('No existeix cap joc iniciat en aquest grup')
		return;
	}

	try {

		const newPlayer = users.findUserById(ctx.from.id)

		if (newPlayer == null) {
			ctx.reply(ctx.from.first_name + ` no se t\'ha pogut afegir al joc, m\'has ` + 
													`de dir /start PER PRIVAT, prèviament, per a que et conegui`);
			return;
		}

		const success = game.addMember(newPlayer);
	
		if (success) {
			console.log('player ' + newPlayer.username + ' added')
		} else {
			console.log('player ' + newPlayer.username + ' NOT added')
		}
	} catch (e) {
		console.error(e)
		ctx.reply('Ja no poden apuntar-se més jugadors.')
	}

})

bot.launch()

console.log('Bot started')

setInterval(() => {
	var lines = process.stdout.getWindowSize()[1];
	for(var i = 0; i < lines; i++) {
			console.log('\r\n'); // clean console
	}
	console.log('------------------------------------------------------------');
	console.log(users.userNames());
	console.log('------------------------------------------------------------');
}, 10000);