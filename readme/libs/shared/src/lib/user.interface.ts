export interface UserInterface {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarImg: string;
  publicationCount: number;
  friends: number;
  registrationDate: Date;
  passwordHash: string;
}
