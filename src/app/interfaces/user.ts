export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  // avatarUrl: string;
  birthdate?: Date;
  gender?: string;
  address?: string;
}

export class User implements IUser {
  constructor (
    public _id = '',
    public fullName = '',
    public email = '',
    public birthdate = undefined,
    public gender = undefined,
    public address = undefined,
  ) { }
}
