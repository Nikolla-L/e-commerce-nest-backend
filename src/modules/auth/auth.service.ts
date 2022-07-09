import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/config/constants';
import { UsersService } from '../users/users.service';
import { UserDto } from './dto/user.dto';
import { IncomingHttpHeaders } from 'http';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class AuthService {

    constructor(
        public usersService: UsersService,
        public jwtTokenService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async validateUserCredentials(username: string, password: string): Promise<any> {
        const user = await this.usersService.findWithUsername(username);

        if(user) {
            const isPasswordMatching = await bcrypt.compare(
                password,
                user.password
            );

            if(isPasswordMatching) {
                return user;
            }
            return null;
        }
        return null;
    }

    async loginWithCredentials(user: UserDto): Promise<any> {
        const userData = await this.validateUserCredentials(user.username, user.password);
        if(userData) {
            const payload = {
                username: userData.username,
                sub: userData._id,
                userId: userData._id
            };
            return {
                username: userData.username,
                userId: userData._id,
                access_token: this.jwtTokenService.sign(payload)
            };
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async logout(request: Request): Promise<any> {
        console.log(request, '---------reuqest')
        // const userData = await this.getUsersCredentials(headers);
        // if(userData) {
        //     return {
        //         refresh_token: this.jwtTokenService.sign(userData, {expiresIn: 0}),
        //         message: 'successfully logged out'
        //     };
        // } else {
        //     return {message: 'already logged out'};
        // }
    }

    async register(createUserDto: CreateUserDto): Promise<any> {
        const emailExists = await this.usersService.findWithEmail(createUserDto.email);

        if(emailExists) {
            throw new BadRequestException('User already exists with this email');
        } 

        const userName = await this.usersService.findWithUsername(createUserDto.username);
        if(userName) {
            throw new BadRequestException('User already exists with this username');
        }

        const user = new this.userModel(createUserDto);
        user.email = createUserDto.email;
        user.password = await bcrypt.hash(createUserDto.password, 10);
        let newUser = await user.save();
        if(newUser) {
            console.log(newUser)
            return await this.loginWithCredentials({
                username: createUserDto.username,
                password: createUserDto.password
            });
        }
    }

    public getUsersCredentials(headers: IncomingHttpHeaders) {
        if(headers.authorization) {
            let token = headers.authorization.split(' ')[1];
            return this.jwtTokenService.verify(token, {secret: jwtConstants.secret});
        } else {
            throw new UnauthorizedException();
        }
    }
}
