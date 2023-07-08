export interface IRegisterService {
  register: (
    firstname: string,
    lastname: string,
    email: string
  ) => Promise<any>;
}
