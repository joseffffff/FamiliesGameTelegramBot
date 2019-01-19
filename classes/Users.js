'use strict';

const User = require('./User');

module.exports = class Users {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    if (user instanceof User) {
      if (this.findUserById(user.id) === null) {
        this.users.push(user);
        return true;
      }
    }

    return false;
  }

  findUserById(id) {
    return this.users.find(user => user.id === id);
  }

  // for debug
  userNames() {
    let names = '';

    this.users.forEach(user => {
      names += ' - ' + user.firstname + '\n';
    });

    return names;
  }
};
