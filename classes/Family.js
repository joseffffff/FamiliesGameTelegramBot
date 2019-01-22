'use strict';

const MemberCard = require('./MemberCard');

module.exports = class Family {
  
  constructor() {
    this.members = [];
    for (let i = 0; i < 5; i++) {
      this.members.push(new MemberCard(i));
    }
  }

  printCards() {
    return this.members.map(el => el.printCard());
  }

  getRandomCard() {
    const randomMember = Math.floor(Math.random() * (this.members.length)) + 0;
  }
};
