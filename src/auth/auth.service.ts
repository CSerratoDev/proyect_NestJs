import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ){}
    registerUser(createUserDto: CreateUserDto){
        createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
       return this.userRepository.save(createUserDto)
    }
    async loginUser(loginUserDto: LoginUserDto){
        const user = await this.userRepository.findOne({
            where: {
                userEmail: loginUserDto.userEmail
            }
        })
        if (!user) {
            throw new UnauthorizedException("User not found");
        }
        const match = await bcrypt.compare(loginUserDto.userPassword, user.userPassword);
        if (!match) {
            throw new UnauthorizedException("You are not authorized");
        }
        const payload = {
            userEmail: user.userEmail,
            userPassword : user.userPassword,
            userRoles: user.userRoles
        }
        const token = this.jwtService.sign(payload);
        return token
    }
    async updateUser(userEmail: string, updateUserDto: UpdateUserDto){
        const newUserData = await this.userRepository.preload({
            userEmail,
            ...updateUserDto
        })
        if (!newUserData) {
            throw new UnauthorizedException("User not found");
        }
        await this.userRepository.save(newUserData)
        return newUserData
    }
}
