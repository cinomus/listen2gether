export class UserDataDto {
  username;
  id;
  banned;
  roles;

  constructor(model) {
    this.username = model.username;
    this.id = model._id;
    this.banned = model.banned;
    this.roles = model.roles;
  }
}
