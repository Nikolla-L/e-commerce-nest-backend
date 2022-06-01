import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { PaginationParams } from "src/utils/PaginationParams";

export class CartProductSearchDto extends PaginationParams {
    @ApiProperty({required: false})
	@IsOptional()
    name: string;
}