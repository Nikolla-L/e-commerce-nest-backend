import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { PaginationParams } from "src/utils/PaginationParams";

export class ProductSearchDto extends PaginationParams {
    @ApiProperty({required: false})
	@IsOptional()
    name: string;

    @ApiProperty({required: false})
	@IsOptional()
    categoryId: number;

    @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    minPrice: number;

    @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    maxPrice: number;
}