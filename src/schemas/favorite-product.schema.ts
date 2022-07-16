import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavoriteProductDocument = FavoriteProduct & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class FavoriteProduct {
    @Prop({reuqired: true})
    productId: string;

    @Prop({required: true})
    userId: string;
}

export const FavoriteProductSchema = SchemaFactory.createForClass(FavoriteProduct);