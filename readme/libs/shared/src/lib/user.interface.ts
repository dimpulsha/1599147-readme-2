export interface UserInterface {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarImg: string;
  publication: number;
  friends: number;
  registrationDate: Date;
  passwordHash: string;
}
