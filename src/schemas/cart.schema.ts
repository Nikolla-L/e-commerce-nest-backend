import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Cart & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Cart {
    @Prop({required: true})
    productId: any;

    @Prop({default: 1})
    count: number;
}

export const ProductShcema = SchemaFactory.createForClass(Cart);