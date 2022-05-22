import { Model } from "mongoose";
import { PaginationParams } from "./PaginationParams";

export class CustomService {

    public async getPaginatedAll(model: Model<any>, pagination: PaginationParams) {
        const result = await model.find().skip(pagination.page).limit(pagination.size).exec();
        const count = await model.count();
        const total = await Math.ceil(count / pagination.size);
        return {result, total, count};
    }

}