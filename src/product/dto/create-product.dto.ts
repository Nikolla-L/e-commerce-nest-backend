import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;
}
