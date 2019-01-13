'use strict'

module.exports = class Games {

	constructor() {
		this.games = [];
	}

	addGame(game) {

		if (game instanceof Game) {
			this.games.push(game);
			return true;
		}

		return false;
	}

	alreadyExists(game) {
		let exists = false
		
		this.games.forEach(element => {
			
		});

		return exists;
	}

	findGameById(id) {

		const games = this.games.map((game) => {
			if (game.id == id) {
				return game;
			}
		});

		if (games.length == 0) {
			return null;
		}

		return games[0];
	}

	delete(id) {
		const game = this.findGameById(id);

		if (game == null) {
			return;
		}

		const i = this.games.indexOf(game);

		if (i != -1) {
			this.games.splice(i)
		}
	}
}