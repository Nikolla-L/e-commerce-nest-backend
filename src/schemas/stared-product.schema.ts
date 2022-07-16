import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StaredProductDocument = StaredProduct & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class StaredProduct {
    @Prop({required: true})
    productId: string;

    @Prop({required: true})
    userId: string;

    @Prop({default: 0})
    starsCount: number;
}

export const StaredProductSchema = SchemaFactory.createForClass(StaredProduct);