'use strict'

module.exports = class User {

	constructor(ctx) {

		this.ctx = ctx;
		const from = ctx.from;

		this.username = from.username;
		this.firstname = from.first_name;
		this.id = from.id;
		this.isBot = from.is_bot;
	}

	sendMsg(msg) {
		this.ctx.reply(msg);
	}
}
