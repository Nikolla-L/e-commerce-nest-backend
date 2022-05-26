import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Category {
    @Prop({unique: true})
    categoryId: number;

    @Prop({unique: true})
    name: string;

    @Prop({required: true})
    properties: Array<string>;
}

export const CategorySchema = SchemaFactory.createForClass(Category);