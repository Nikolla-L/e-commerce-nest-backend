import {IsNotEmpty} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
	@ApiProperty({default: 'Nick'})
	@IsNotEmpty()
	username: string;

	@ApiProperty({default: 'something123'})
	@IsNotEmpty()
	password: string;
}
