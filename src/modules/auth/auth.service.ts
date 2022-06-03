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

    public getUsersCredentials(headers: IncomingHttpHeaders) {
        if(headers.authorization) {
            let token = headers.authorization.split(' ')[1];
            return this.jwtTokenService.verify(token, {secret: jwtConstants.secret});
        } else {
            throw new UnauthorizedException();
        }
    }
}
