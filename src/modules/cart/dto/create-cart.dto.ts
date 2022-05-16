import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productId: string;

    
    @ApiProperty()
    @IsNumber()
    count: number;
}
