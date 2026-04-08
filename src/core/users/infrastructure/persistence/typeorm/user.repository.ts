import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/core/users/domain/repository/user.repository";
import { Like, Repository } from "typeorm";
import { User } from "src/core/users/domain/user.entity";
import { BadRequestException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { UserEntity } from "./user.entity";

export class UserTypeormRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
    async findByUsername(username: string): Promise<User | null> {
        const userEntity = await this.userRepository.findOne({ where: { usr_username: username } });
        if (!userEntity) {
            return null;
        }
        return new User(
            userEntity.usr_ci,
            userEntity.usr_firstName,
            userEntity.usr_lastName,
            userEntity.usr_password,
            userEntity.usr_role,
            userEntity.usr_email,
            userEntity.usr_phone,
            userEntity.usr_address,
            userEntity.usr_city,
        );
    }
    
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
            usr_isAbleToChangePassword: false,
            usr_username: `${strFirstName.toLowerCase().substring(0, 2)}${strLastName.toLowerCase()}`,
        });
        
        const existingUsername: number = await this.userRepository.count({ where: { usr_username: Like(`${newUserEntity.usr_username}%`)}});
        if (existingUsername > 0) {
            newUserEntity.usr_username += existingUsername;
        }
        const savedUser = await this.userRepository.save(newUserEntity);
        return new User(
            savedUser.usr_ci,
            savedUser.usr_firstName,
            savedUser.usr_lastName,
            savedUser.usr_password,
            savedUser.usr_role,
            savedUser.usr_email,
            savedUser.usr_phone,
            savedUser.usr_address,
            savedUser.usr_city,
        );

    }
    async getUsers(): Promise<User[]> {
        const userEntities = await this.userRepository.find();
        return userEntities.map(userEntity => new User(
            userEntity.usr_ci,
            userEntity.usr_firstName,
            userEntity.usr_lastName,
            userEntity.usr_password,
            userEntity.usr_role,
            userEntity.usr_email,
            userEntity.usr_phone,
            userEntity.usr_address,
            userEntity.usr_city,
        ));
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
            userEntity.usr_password,
            userEntity.usr_role,
            userEntity.usr_email,
            userEntity.usr_phone,
            userEntity.usr_address,
            userEntity.usr_city,
        );

    }
    async login(email: string, password: string): Promise<User | null> {
        const userFound = await this.userRepository.findOne({ where: { usr_email: email } });
        console.log('User found:', userFound);
        if (!userFound) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, userFound.usr_password);
        console.log('Password valid:', isPasswordValid);
        if (!isPasswordValid) {
            if (userFound.usr_loginAttempts >= 5) {
                await this.userRepository.update({ usr_id: userFound.usr_id }, { usr_isActive: false });
                throw new BadRequestException('Account locked due to too many failed login attempts');
            }
            await this.userRepository.update({ usr_id: userFound.usr_id }, { usr_loginAttempts: userFound.usr_loginAttempts + 1 });
            return null;
        }
        await this.userRepository.update({ usr_id: userFound.usr_id }, { usr_lastLogin: new Date(), usr_loginAttempts: 0 });

        return new User(
            userFound.usr_ci,
            userFound.usr_firstName,
            userFound.usr_lastName,
            userFound.usr_password,
            userFound.usr_role,
            userFound.usr_email,
            userFound.usr_phone,
            userFound.usr_address,
            userFound.usr_city,
        );
    }
    async resetPassword(email: string, newPassword: string): Promise<void> {
        const userFound = await this.userRepository.findOne({ where: { usr_email: email } });
        if (!userFound) {
            throw new BadRequestException('User not found');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await this.hashPassword(newPassword, salt);
        await this.userRepository.update({ usr_id: userFound.usr_id }, { usr_password: hashedPassword, usr_isAbleToChangePassword: true });
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}