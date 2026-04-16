import { User } from '../user.entity';

export const USER_INTERFACE = Symbol('USER_INTERFACE');
export interface IUser {
  createUser(user: User): Promise<User>;
  getUsers(): Promise<User[]>;
  findByCi(ci: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  login(email: string, password: string): Promise<User | null>;
  resetPassword(user: User, email: string, newPassword: string): Promise<void>;
  restorePassword(user: User, prevPassword: string, newPassword: string): Promise<void>;
}
