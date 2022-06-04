import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSoldProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    productId: string;

    
}
