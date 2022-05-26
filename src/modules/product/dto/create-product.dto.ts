import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty, ApiQuery } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    categoryId: number;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({default: 1})
    @IsNumber()
    quantity: number;
}
