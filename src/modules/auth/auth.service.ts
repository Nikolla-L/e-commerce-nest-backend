import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/config/constants';
import { UsersService } from '../users/users.service';
import { UserDto } from './dto/user.dto';
import { IncomingHttpHeaders } from 'http';


@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, public jwtTokenService: JwtService) { }

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
                access_token: this.jwtTokenService.sign(payload)
            };
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    public getUsersCredentials(headers: IncomingHttpHeaders) {
        let token = headers.authorization.split(' ')[1];
        return this.jwtTokenService.verify(token, {secret: jwtConstants.secret});
    }
}
