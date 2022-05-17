import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ClientMessageDocument = ClientMessage & Document;

@Schema({ timestamps: {createdAt: 'created_at', updatedAt: 'updated_at' } })
export class ClientMessage {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    text: string;
}

export const ClientMessageSchema = SchemaFactory.createForClass(ClientMessage);