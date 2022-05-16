import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
 
export class PaginationParams {
	@ApiProperty({required: false})
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	page?: number;
	
	@ApiProperty({required: false})
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	size?: number;
}