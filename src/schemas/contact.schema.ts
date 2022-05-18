import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})
export class Contact {
    @Prop()
    location: string;

    @Prop()
    phone: string;

    @Prop()
    email: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);