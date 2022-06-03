import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Product {
    @Prop()
    name: string;

    @Prop()
    categoryId: number;

    @Prop()
    description: string;

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: Number, default: 0 })
    views: number;

    // @Prop()
    // color: string;

    // @Prop()
    // size: string;

    @Prop({default: 1})
    quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
