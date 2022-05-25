import { Model } from "mongoose";
import { PaginationParams } from "./PaginationParams";
import { CustomValidation } from "./CustomValidator";

export class CustomService extends CustomValidation {

    public async getPaginatedAll(model: Model<any>, pagination: PaginationParams) {
        const result = await model.find().skip(pagination.page).limit(pagination.size).exec();
        const count = await model.count();
        const total = await Math.ceil(count / pagination.size);
        return {result, total, count};
    }

    public async findAndUpdate(id: string, model: Model<any>, dto: any) {
        await this.validateId(id, model);
        return await model.findByIdAndUpdate(id, {...dto}, { useFindAndModify: false }).exec();
    }

    public async findAndDelete(id: string,  model: Model<any>) {
        await this.validateId(id, model);
        return await model.deleteOne({_id: id}).exec();
    }

}