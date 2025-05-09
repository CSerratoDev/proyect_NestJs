import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository <Manager>
  ){}

  create(createManagerDto: CreateManagerDto) {
    return this.managerRepository.save(createManagerDto)
  }

  findAll() {
    return this.managerRepository.find({
      relations: {
        location: true,
      }
    })
  }

  async findOne(id: string) {
    const manager = await this.managerRepository.findOne({
      where: {
         managerId: id
      },
      relations: {
        location: true,
      }
    });
    if (!manager) throw new NotFoundException("Not manager found")
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
        ...updateManagerDto
    })
    if (!managerToUpdate) throw new BadRequestException(`Manager with ID ${id} not found`);
    return this.managerRepository.save(managerToUpdate);
  }

  remove(id: string) {
    this.managerRepository.delete({
      managerId: id
    });
    return {
      message: 'Provider deleted successfully',
    }
  }
}
