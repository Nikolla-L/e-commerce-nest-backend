import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateSubscriberDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;
    
}
