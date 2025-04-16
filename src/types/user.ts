export interface IUserRegistration{
  email: string,
  password: string,
  name: string,
  surname: string
}
export interface IUserLogIn{
  email: string,
  password: string
}

export interface IUser{
  email: string,
  name: string,
  surname: string
  favorites:string[];
}
