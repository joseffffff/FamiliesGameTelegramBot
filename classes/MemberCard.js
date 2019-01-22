
module.exports = class MemberCard {

	constructor(num) {
		this.id = num;

		const avatars = ['👶🏼', '👨🏿','👩🏽','👴🏼','🧓🏾'];

		this.avatar = avatars[num];

		this.userOwner = null;
	}

	printCard() {
		return this.avatar;
	}

}