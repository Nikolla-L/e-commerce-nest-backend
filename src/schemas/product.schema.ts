import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Product {
    @Prop()
    name: string;

    @Prop()
    categoryId: string;

    @Prop()
    description: string;

    @Prop({ type: Number, required: true })
    price: number;

    // @Prop()
    // color: string;

    // @Prop()
    // size: string;

    @Prop({default: 1})
    quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
