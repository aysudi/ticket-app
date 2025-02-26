import moment from "moment";

export class User {
  constructor(fullName, username, email, password, balance, role = "client") {
    this.role = role;
    this.username = username;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.balance = Number(balance) || 0;
    this.profilePictureURL =
      "https://cdn-icons-png.freepik.com/512/13126/13126995.png";
    this.favorites = [];
    this.accountCreationDate = moment().format("L");
    this.totalSpentMoney = 0;
  }
}
