import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";

export class CustomValidation {

    // validation to check if is valid mongoDB object id
    public async validateIdType(id: string) {
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new BadRequestException('Invalid id');
        };
    }
    
    // validation to check if item exists or is valid mongoDB type id
    public async validateId(id: string, model: Model<any>) {
        await this.validateIdType(id);
        
        const item = await model.findById(id).exec();
        if(!item) {
            throw new NotFoundException(`Not found with id ${id}`);
        }
    }

}