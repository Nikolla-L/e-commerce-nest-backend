import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Cart {
    @Prop({required: true})
    productId: string;

    @Prop({default: 1})
    count: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);