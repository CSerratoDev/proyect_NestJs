import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

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

  // Método findOne actualizado para buscar por ID exacto
  async findOne(id: string) {
    const provider = await this.providerRepository.findOne({
      where: { providerId: id },  // Busca exactamente por ID
    });

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    return provider;
  }

  // Método de actualización mejorado
  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const provider = await this.providerRepository.findOne({
      where: { providerId: id },  // Busca el provider por ID
    });

    if (!provider) {
      throw new BadRequestException(`Provider with ID ${id} not found`);
    }

    // Actualiza las propiedades del provider
    Object.assign(provider, updateProviderDto);
    return this.providerRepository.save(provider);
  }

  // Eliminar un provider
  async remove(id: string) {
    const provider = await this.findOne(id);  // Encuentra el provider
    await this.providerRepository.remove(provider);  // Elimina
    return 'Provider eliminated';
  }
}
