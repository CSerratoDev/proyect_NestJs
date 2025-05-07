import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from '../providers/entities/provider.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Provider) private readonly categoryRepository: Repository<Provider>
  ){}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto);
    return product;
  }

  async findAll(productId : string | null) {
    if(productId) {
      const [products, total] = await this.productRepository.findAndCount({
        where: {
          provider: {
            providerId : productId
          }
        },
        relations: {
          provider: true
        },
        order: {
          productId: 'DESC'
        }
      })
      return {
        products,
        total
      }
    }
    
    const [products, total] = await this.productRepository.findAndCount({
      relations: {
        provider: true
      },
      order: {
        productId: 'DESC'
      }
    })
    return{
      products,
      total
    }
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      productId: id
    })
    if(!product) throw new NotFoundException();
    return product;
  }

  findByProvider(id: string){
    return this.productRepository.findBy({
      provider: {
        providerId: id,
      }
    })
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({  
      productId: id,
      ...updateProductDto
    })
    if(!productToUpdate) throw new NotFoundException();
    this.productRepository.save(productToUpdate);
    return productToUpdate;
  }
  remove(id: string) {
    this.findOne(id)
    this.productRepository.delete({
      productId: id
    });
    return {
      message: `Objeto con id ${id} eliminado`
    }
  }
}
