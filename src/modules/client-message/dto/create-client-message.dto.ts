import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClientMessageDto {
    @ApiProperty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    text: string;
}
