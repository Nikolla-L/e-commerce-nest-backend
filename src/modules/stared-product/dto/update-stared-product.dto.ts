import { PartialType } from '@nestjs/mapped-types';
import { CreateStaredProductDto } from './create-stared-product.dto';

export class UpdateStaredProductDto extends PartialType(CreateStaredProductDto) {}
