
module.exports = class Games {

	constructor() {
		this.games = [];
	}

	newGame(game) {
		this.games.push(game);
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