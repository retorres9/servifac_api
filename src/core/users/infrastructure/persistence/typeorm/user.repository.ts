import { InjectRepository } from "@nestjs/typeorm";
import { IUser } from "@core/users/domain/repository/user.interface";
import { Like, Repository } from "typeorm";
import { UserDomain } from "@core/users/domain/user.domain";
import { BadRequestException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { User } from "./user.entity";

export class UserTypeormRepository implements IUser {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
    async restorePassword(user: UserDomain, prevPassword: string, newPassword: string): Promise<void> {
        const validPreviousPassword = await bcrypt.compare(prevPassword, user.strPassword);
        if (!validPreviousPassword) {
            throw new BadRequestException('Previous password is incorrect');
        }
        const salt = await bcrypt.genSalt();
        const hashedNewPassword = await this.hashPassword(newPassword, salt);
        await this.userRepository.update({ usrId: user.intUserId }, { usrPassword: hashedNewPassword, usrIsAbleToChangePassword: false, usrTempPass: null });
    }
    async findByUsername(username: string): Promise<UserDomain | null> {
        const userEntity: User | null = await this.userRepository.findOne({ where: { usrUsername: username } });
        if (!userEntity) {
            return null;
        }
        return new UserDomain(
            userEntity.usrCi,
            userEntity.usrFirstName,
            userEntity.usrLastName,
            userEntity.usrPassword,
            userEntity.usrRole,
            userEntity.usrEmail,
            userEntity.usrPhone,
            userEntity.usrAddress,
            userEntity.usrCity,
            userEntity.usrUsername,
            userEntity.usrId,
            userEntity.usrTempPass || undefined,
            userEntity.usrIsActive,
            userEntity.usrCreatedAt,
            userEntity.usrUpdatedAt,
            userEntity.usrLastLogin || undefined,
            userEntity.usrIsAbleToChangePassword,
            userEntity.usrLoginAttempts
        );
    }
    
    async createUser(user: UserDomain): Promise<UserDomain> {
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

        const userFound = await this.userRepository.findOne({ where: { usrCi: strCi } });
        if (userFound) {
            throw new BadRequestException('User already exists');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await this.hashPassword(strPassword, salt);
        const newUserEntity = this.userRepository.create({
            usrCi: strCi,
            usrFirstName: strFirstName,
            usrLastName: strLastName,
            usrEmail: strEmail,
            usrPassword: hashedPassword,
            usrAddress: strAddress,
            usrCity: strCity,
            usrPhone: strPhone,
            usrRole: intRole,
            usrIsAbleToChangePassword: false,
            usrUsername: `${strFirstName.toLowerCase().substring(0, 2)}${strLastName.toLowerCase()}`,
        });
        
        const existingUsername: number = await this.userRepository.count({ where: { usrUsername: Like(`${newUserEntity.usrUsername}%`)}});
        if (existingUsername > 0) {
            newUserEntity.usrUsername += existingUsername;
        }
        const savedUser = await this.userRepository.save(newUserEntity);
        console.log('Saved user:', savedUser);
        return new UserDomain(
            savedUser.usrCi,
            savedUser.usrFirstName,
            savedUser.usrLastName,
            savedUser.usrPassword,
            savedUser.usrRole,
            savedUser.usrEmail,
            savedUser.usrPhone,
            savedUser.usrAddress,
            savedUser.usrCity,
            savedUser.usrUsername,
            savedUser.usrId,
            savedUser.usrTempPass || undefined,
            savedUser.usrIsActive,
            savedUser.usrCreatedAt,
            savedUser.usrUpdatedAt,
            savedUser.usrLastLogin || undefined,
            savedUser.usrIsAbleToChangePassword,
            savedUser.usrLoginAttempts
        );

    }
    async getUsers(): Promise<UserDomain[]> {
        const userEntities = await this.userRepository.find();
        return userEntities.map(userEntity => new UserDomain(
            userEntity.usrCi,
            userEntity.usrFirstName,
            userEntity.usrLastName,
            userEntity.usrPassword,
            userEntity.usrRole,
            userEntity.usrEmail,
            userEntity.usrPhone,
            userEntity.usrAddress,
            userEntity.usrCity,
        ));
    }
    async findByCi(ci: string): Promise<UserDomain | null> {
        const userEntity = await this.userRepository.findOne({ where: { usrCi: ci } });
        if (!userEntity) {
            return null;
        }
        return new UserDomain(
            userEntity.usrCi,
            userEntity.usrFirstName,
            userEntity.usrLastName,
            userEntity.usrPassword,
            userEntity.usrRole,
            userEntity.usrEmail,
            userEntity.usrPhone,
            userEntity.usrAddress,
            userEntity.usrCity,
        );

    }
    async login(email: string, password: string): Promise<UserDomain | null> {
        const userFound = await this.userRepository.findOne({ where: [
            { usrEmail: email },
            { usrUsername: email }
        ] });
        console.log('User found:', userFound);
        if (!userFound) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, userFound.usrPassword);
        console.log('Password valid:', isPasswordValid);
        if (!isPasswordValid) {
            if (userFound.usrLoginAttempts >= 5) {
                await this.userRepository.update({ usrId: userFound.usrId }, { usrIsActive: false });
                throw new BadRequestException('Account locked due to too many failed login attempts');
            }
            await this.userRepository.update({ usrId: userFound.usrId }, { usrLoginAttempts: userFound.usrLoginAttempts + 1 });
            return null;
        }
        await this.userRepository.update({ usrId: userFound.usrId }, { usrLastLogin: new Date(), usrLoginAttempts: 0 });

        return new UserDomain(
            userFound.usrCi,
            userFound.usrFirstName,
            userFound.usrLastName,
            userFound.usrPassword,
            userFound.usrRole,
            userFound.usrEmail,
            userFound.usrPhone,
            userFound.usrAddress,
            userFound.usrCity,
            userFound.usrUsername,
            userFound.usrId
        );
    }
    async resetPassword(user: UserDomain, email: string, newPassword: string): Promise<void> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await this.hashPassword(newPassword, salt);
        await this.userRepository.update({ usrId: user.intUserId }, { usrPassword: hashedPassword, usrIsAbleToChangePassword: true });
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}