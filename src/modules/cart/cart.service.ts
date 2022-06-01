import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncomingHttpHeaders } from 'http';
import { PaginationParams } from 'src/utils/PaginationParams';
import { AuthService } from '../auth/auth.service';
import { Cart, CartDocument } from 'src/schemas/cart.schema';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CustomService } from 'src/utils/CustomService';
import { CartProductSearchDto } from './dto/cart-product-search.dto';

@Injectable()
export class CartService {

  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private service: CustomService,
    private authService: AuthService
  ) { }

  async add(headers: IncomingHttpHeaders, createCartDto: CreateCartDto): Promise<Cart> {
    const userData = await this.authService.getUsersCredentials(headers);

    await this.service.validateId(createCartDto.productId, this.productModel);

    const addedProduct = await new this.cartModel({userId: userData.sub, ...createCartDto});
    return addedProduct.save();
  }

  // TODO -- needs fix, it doesn't search with the name
  async findAll(headers: IncomingHttpHeaders, params: CartProductSearchDto): Promise<any> {
    const userData = await this.authService.getUsersCredentials(headers);
    if(userData) {
      const userId = userData.sub;
      return await this.service.getPaginatedAll(this.cartModel, params, {userId: userId, ...params});
    }
  }

  async findOne(id: string): Promise<Cart> {
    await this.service.validateIdType(id);
    return await this.cartModel.findOne({_id: id}).exec();
  }

  async update(headers: IncomingHttpHeaders, id: string, updateCartDto: UpdateCartDto) {
    await this.service.validateIdType(id);
    const item = await this.findOne(id);
    if(!item) {
      throw new NotFoundException(`Cart item not found with id ${id}`);
    }
    await this.protectCartItem(headers, item);

    return await this.cartModel.findByIdAndUpdate(id, { ...updateCartDto }, { useFindAndModify: false }).exec();
  }

  async remove(headers: IncomingHttpHeaders, id: string) {
    await this.service.validateIdType(id);
    const item = await this.findOne(id);
    if(!item) {
      throw new NotFoundException(`Cart item not found with id ${id}`);
    }
    await this.protectCartItem(headers, item);

    return await this.cartModel.deleteOne({_id: id}).exec();
  }

  async protectCartItem(headers: IncomingHttpHeaders, cartItem: Cart) {
    const userData = await this.authService.getUsersCredentials(headers);
    if(userData) {
      const userId = userData.sub;
      if(userId !== cartItem.userId) {
        throw new BadRequestException('Bad request');
      }
    }
  }

}

