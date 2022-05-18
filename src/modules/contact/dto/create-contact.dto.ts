import { IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateContactDto {
    @ApiProperty()
    @IsString()
    location: string;


    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    email: string;
}