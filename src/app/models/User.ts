export class User {
  id?: number; // Optional field since it may not be present initially

  username: string;

  password: string;

  email: string;

  role: string;
  active: boolean;

  constructor(
    username: string,
    password: string,
    email: string,
    role: string,
    active: boolean,
    id?: number
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
    this.active = active;
    if (id) {
      this.id = id;
    }
  }
}
