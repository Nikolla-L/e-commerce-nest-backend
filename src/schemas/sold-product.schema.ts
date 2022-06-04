import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SoldProductDocument = SoldProduct & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'upadated_at' } })
export class SoldProduct {
    @Prop({required: true})
    productId: string;

    @Prop({reuqired: true})
    userId: string;
}

export const soldProductSchema = SchemaFactory.createForClass(SoldProduct);