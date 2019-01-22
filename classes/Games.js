'use strict';

const Game = require('./Game');

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
    let exists = false;

    this.games.forEach(element => {});

    return exists;
  }

  findGameById(id) {
    return this.games.find(game => game.id === id);
  }

  delete(id) {
    const game = this.findGameById(id);

    if (!game) {
      return;
    }

    const i = this.games.indexOf(game);

    if (i !== -1) {
      this.games.splice(i);
    }
  }
};
