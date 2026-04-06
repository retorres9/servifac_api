import { User } from '../user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
export interface UserRepository {
  createUser(user: User): Promise<User>;
  getUsers(): Promise<User[]>;
  findByCi(ci: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  login(email: string, password: string): Promise<User | null>;
  resetPassword(email: string, newPassword: string): Promise<void>;
}
