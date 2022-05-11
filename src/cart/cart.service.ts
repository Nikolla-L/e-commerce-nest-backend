import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from 'src/schemas/cart.schema';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {

  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) { }

  async add(createCartDto: CreateCartDto): Promise<Cart> {
    const addedProduct = await new this.cartModel(createCartDto);
    return addedProduct.save();
  }

  async findAll(): Promise<any> {
    return await this.cartModel.find().exec();
  }

  async findOne(id: string): Promise<Cart> {
    return await this.cartModel.findOne({_id: id}).exec();
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    return await this.cartModel.findByIdAndUpdate(id, { ...updateCartDto }, { useFindAndModify: false }).exec();
  }

  async remove(id: string) {
    return await this.cartModel.deleteOne({_id: id}).exec();
  }
}
