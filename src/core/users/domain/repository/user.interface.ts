import { UserDomain } from '../user.domain';

export const USER_INTERFACE = Symbol('USER_INTERFACE');
export interface IUser {
  createUser(user: UserDomain): Promise<UserDomain>;
  getUsers(): Promise<UserDomain[]>;
  findByCi(ci: string): Promise<UserDomain | null>;
  findByUsername(username: string): Promise<UserDomain | null>;
  login(email: string, password: string): Promise<UserDomain | null>;
  resetPassword(user: UserDomain, email: string, newPassword: string): Promise<void>;
  restorePassword(user: UserDomain, prevPassword: string, newPassword: string): Promise<void>;
}
