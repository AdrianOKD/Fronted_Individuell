export class User {
  constructor(id, username, firstName, lastName) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;
  }
}
