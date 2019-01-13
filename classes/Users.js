
module.exports = class Users {

	constructor() {
		this.users = [];
	}

	addUser(user) {
		if (user instanceof User) {
			this.users.push(user);
			return true;
		}

		return false;
	}

	findUserById(id) {

		const users = this.user.map((user) => {
			if (user.id == id) {
				return user;
			}
		});

		if (users.length == 0) {
			return null;
		}

		return users[0];
	}
}