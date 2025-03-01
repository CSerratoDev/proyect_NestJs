import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>){}
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: 'Sabritas Normal 56g',
      price: 29,
      countSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: 'Coca Cola 1L',
      price: 40,
      countSeal: 2,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: 'Chicles 1pz',
      price: 5,
      countSeal: 2,
      provider: uuid(),
    },
  ]
  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto);
    return product;
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const productFound = this.products.filter((product)=>product.productId === id)[0]
    if (!productFound) throw new NotFoundException();
    return productFound;
  }

  findByProvider(id: string){
    const productFound = this.products.filter((product)=>product.provider ===id)
    if (productFound.length === 0) throw new NotFoundException();
    return productFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let product = this.findOne(id);
    this.products = this.products.map((product)=>{
      if(product.productId === id) return {
        ...product,
        ...updateProductDto
      }
      return product;
    })
    return {
      ...product,
      ...updateProductDto,
    }
  }

  remove(id: string) {
    const {productId} = this.findOne(id);
    this.products = this.products.filter((product) => product.productId !== productId)
    return this.products;
  }
}
