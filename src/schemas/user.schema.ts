import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
    @Prop({unique: true, required: true})
    username: string;

    @Prop()
    firstname: string;
    
    @Prop()
    lastname: string;

    @Prop({unique: true})
    phone: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);