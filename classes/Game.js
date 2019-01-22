'use strict';

const Family = require('./Family');

module.exports = class Game {

  constructor(config) {
    this.members = [];
    this.group = config.group;
    this.id = config.id;
    this.maxMembers = config.maxMembers;
    this.minMembers = 1; // ???

    this.chat = config.ctx;

    this.families = 10;
    this.familyMembers = 5;

    this.initialCardsPerMember = 4;

    this.familiesCards = [];
  }

  addMember(newPlayer) {
    if (this.members.length >= this.maxMembers) {
      throw new Error('Full list');
    }

    const members = this.members;

    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      if (member.id === newPlayer.id) {
        return false;
      }
    }

    this.members.push(newPlayer);
    return true;
  }

  getMembersList() {
    let members = '';

    this.members.forEach(member => {
      console.log(member);
      members += '- @' + member.username + ' (' + member.first_name + ')\n';
    });

    if (members === '') {
      throw new Error('No s\'ha apuntat ningú');
    }

    return members;
  }

  generateCards() {


    if (this.members.length < this.minMembers) {
      throw new Error('No s\'han apuntat les suficients persones per jugar al joc, mínim '
                   + this.minMembers + ' jugadors.')
    }

    for (let i = 0; i < this.families; i++) {
      this.familiesCards.push(new Family(this.familyMembers));
    }
  }

  printCards() {
    this.familiesCards.map( el => {
      this.chat.reply(el.printCards());
    });
  }

  startGame() {
    this.dealCards();
  }

  dealCards() {
    //const numberOfCardsToDeal = this.members.length * this.initialCardsPerMember;

    for (let i = 0; i < this.members.length; i++) {
      
      const member = this.members[i];
      
      for (let j = 0; j < 4; j++) {
        this.assignCardToMember(member);
      }
    }
  }

  assignCardToMember(member) {

    const randomFamilyNumber = Math.floor(Math.random() * (this.familiesCards.length)) + 0;

    const randomFamily = this.familiesCards[randomFamilyNumber];

    const randomCard = randomFamily.getRandomCard();
  }
};
