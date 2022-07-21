import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { PaginationParams } from "src/utils/PaginationParams";

export class StaredProductSearchDto extends PaginationParams {
    @ApiProperty({required: false})
	@IsOptional()
    name: string;
}