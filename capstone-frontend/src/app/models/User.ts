export class User {
  userId;
  email;
  phone;
  username;
  status;
  role;

  constructor(data: any) {
    if (data) {
      this.userId = data.userId;
      this.email = data.email;
      this.username = data.username;
      this.status = data.status;
      this.role = data.role;
    }
  }
}
