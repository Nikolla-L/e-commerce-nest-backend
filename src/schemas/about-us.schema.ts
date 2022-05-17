import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AboutUsDocument = AboutUs & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class AboutUs {
    @Prop({defualt: 'About Us'})
    title: string;

    @Prop()
    description: string;
}

export const AboutUsSchema = SchemaFactory.createForClass(AboutUs);