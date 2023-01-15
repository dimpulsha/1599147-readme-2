import { FriendInterface } from "./friend.interface";

export interface UserInterface {
  _id?: string;
  email: string;
  userName: string;
  avatarImg: string;
  publicationCount?: number;
  friendsCount?: number;
  registrationDate: Date;
  passwordHash: string;
  friends?: FriendInterface[];
}
