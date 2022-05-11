import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtTokenService: JwtService) { }

    async validateUserCredentials(username: string, password: string): Promise<any> {
        const user = await this.usersService.findWithUsername(username);

        if(user) {
            const isPasswordMatching = await bcrypt.compare(
                password,
                user.password
            );

            if(isPasswordMatching) {
                const {password, ...result} = user;
                return result;
            }
            return null;
        }
        return null;
    }

    async loginWithCredentials(user: UserDto) {
        const userData = await this.validateUserCredentials(user.username, user.password);
        if(userData) {
            const payload = {username: userData.username, sub: userData._id};
            return {
                access_token: this.jwtTokenService.sign(payload)
            };
        }
        throw new UnauthorizedException('Invalid credentials');
    }
}
