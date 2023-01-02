export interface UserInterface {
  _id?: string;
  email: string;
  userName: string;
  avatarImg: string;
  publicationCount?: number;
  friends?: number;
  registrationDate: Date;
  passwordHash: string;
}
