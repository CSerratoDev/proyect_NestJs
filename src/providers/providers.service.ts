import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
      @InjectRepository(Provider) private readonly providerRepository: Repository<Provider>
  ){}

  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto); 
  }

  findAll() {
    return this.providerRepository.find();
  }

  async findByName(name: string){
    const provider = await this.providerRepository.findBy({
      providerName: Like(`%${name}%`)
    });
    if(!provider) {
      throw new NotFoundException('The provider does not exist');
    } return provider;
  }

  async findOne(id: string) {
    const provider = await this.providerRepository.findOneBy({providerId: id});
    if (!provider) {
      throw new NotFoundException("Provider not found");
    }
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const product = await this.providerRepository.preload({
      providerId: id,
        ...updateProviderDto,
    });
    if (!product) {
      throw new BadRequestException(`Provider with ID ${id} not found`);
    }
    return this.providerRepository.save(product);
  }

  async remove(id: string) {
    const provider = await this.findOne(id);
    await this.providerRepository.remove(provider)
    return "Provider eliminated"
  }
}
