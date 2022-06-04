import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncomingHttpHeaders } from 'http';
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
      let cartProducts = await this.service.getPaginatedAll(this.cartModel, params, {userId: userId, ...params});
        // let newResult = [];
      if(cartProducts) {
        // let updatedResult = cartProducts.result;
        await cartProducts.result.forEach(async (p, i) => {
          console.log(await this.findOneProduct(p._doc.productId), '------------dddd')
          await Object.assign(p._doc, {product: await this.findOneProduct(p._doc.productId)})
        })
        // newResult = await Array.from(cartProducts.result).map(async cartProduct => {
        //   console.log(await this.findOneProduct(cartProduct._doc.productId), '------------dddd')
        //   // return {
        //   //   ...cartProduct._doc,
        //   //   product:  await this.findOneProduct(cartProduct._doc.productId)
        //   // }
        //   return {...cartProduct._doc, product: await this.findOneProduct(cartProduct._doc.productId)}
        // })
        // await console.log(newResult, '---------------d');
        return await cartProducts;
      }
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

  findOneProduct(id: string) {
    return this.productModel.findOne({_id: id}).exec();
  }

}

