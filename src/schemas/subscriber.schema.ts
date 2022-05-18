import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type SubscriberDocument = Subscriber & Document;

@Schema({timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})
export class Subscriber {
    @Prop()
    email: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);