export interface ILoginForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IUser {
  _id: string;

  firstName: string;
  lastName: string;
  friends: string[];
  email: string;
  bio?: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other' | '';
}
