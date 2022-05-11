import {IsNotEmpty} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
	@ApiProperty()
	@IsNotEmpty()
	username: string;

	@ApiProperty()
	@IsNotEmpty()
	password: string;
}
