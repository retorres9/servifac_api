import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/core/users/domain/repository/user.repository";
import { Repository } from "typeorm";
import { User } from "src/core/users/domain/user.entity";
import { BadRequestException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserEntity } from "./user.entity";

export class UserTypeormRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
    
    async createUser(user: User): Promise<User> {
        const { 
            strCi, 
            strFirstName, 
            strLastName, 
            strEmail, 
            strPassword,
            strAddress,
            strCity,
            strPhone,
            intRole
         } = user;

        const userFound = await this.userRepository.findOne({ where: { usr_ci: strCi } });
        if (userFound) {
            throw new BadRequestException('User already exists');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await this.hashPassword(strPassword, salt);
        const newUserEntity = this.userRepository.create({
            usr_ci: strCi,
            usr_firstName: strFirstName,
            usr_lastName: strLastName,
            usr_email: strEmail,
            usr_password: hashedPassword,
            usr_address: strAddress,
            usr_city: strCity,
            usr_phone: strPhone,
            usr_role: intRole,
            usr_username: `${strFirstName.substring(0, 2)}${strLastName}`,
        });
        //!TODO: Handle unique constraint violation for usr_username
        const savedUser = await this.userRepository.save(newUserEntity);
        return new User(
            savedUser.usr_ci,
            savedUser.usr_firstName,
            savedUser.usr_lastName,
            savedUser.usr_username,
            savedUser.usr_password,
            savedUser.usr_role,
            savedUser.usr_email,
            savedUser.usr_phone,
            savedUser.usr_address,
            savedUser.usr_city,
        );

    }
    async getUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async findByCi(ci: string): Promise<User | null> {
        const userEntity = await this.userRepository.findOne({ where: { usr_ci: ci } });
        if (!userEntity) {
            return null;
        }
        return new User(
            userEntity.usr_ci,
            userEntity.usr_firstName,
            userEntity.usr_lastName,
            userEntity.usr_username,
            userEntity.usr_password,
            userEntity.usr_role,
            userEntity.usr_email,
            userEntity.usr_phone,
            userEntity.usr_address,
            userEntity.usr_city,
        );

    }
    async login(email: string, password: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async resetPassword(email: string, newPassword: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async signOut(userId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}