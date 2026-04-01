import { User } from '../user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
export interface UserRepository {
  createUser(user: User): Promise<User>;
  getUsers(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  login(email: string, password: string): Promise<User | null>;
  resetPassword(email: string, newPassword: string): Promise<void>;
  signOut(userId: number): Promise<void>;
}
