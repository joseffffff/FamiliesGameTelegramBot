'use strict'

module.exports = class User {

	constructor(from) {
		this.username = from.username;
		this.firstname = from.first_name;
		this.id = from.id;
		this.isBot = from.is_bot;
	}
}
