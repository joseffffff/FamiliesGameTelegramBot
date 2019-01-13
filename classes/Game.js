
module.exports = class Game {

	constructor(config) {
		this.members = [];
		this.group = config.group;
		this.id = config.id;
		this.maxMembers = config.maxMembers;

		this.families = 15;
		this.familyMembers = 5;

		this.cards = [];
	}

	addMember(newPlayer) {

		if (this.members.length >= this.maxMembers) {
			throw 'Full list';
		}

		const members = this.members;

		for (let i = 0; i < members.length; i++) {
			const member = members[i];
			if (member.id == newPlayer.id) {
				return false;
			}	
		}

		this.members.push(newPlayer)
		return true;
	}

	getMembersList() {

		let members = '';

		this.members.forEach(member => {
			console.log(member)
			members += '- @' + member.username + ' (' + member.first_name + ')\n';
		});

		return members;
	}

	generateCards() {
		
	}
}