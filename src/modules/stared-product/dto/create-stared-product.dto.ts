import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStaredProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productId: string;
    
    @ApiProperty()
    @IsNumber()
    starsCount: number;
}
