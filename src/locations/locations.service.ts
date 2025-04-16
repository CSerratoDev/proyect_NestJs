import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from 'src/managers/entities/manager.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ){}
  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto)
  }

  findAll() {
    return this.locationRepository.find();
  }

  findOne(id: number) {
    const location = this.locationRepository.findOneBy({
      locationId: id,
    });
    if(!location) throw new NotFoundException('location not found')
      return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    await this.managerRepository
    .createQueryBuilder()
    .update()
    .set({ 
      location : () => 'NULL', 
    })
    .where("locationId = :id", {
      id, 
    }).execute();

    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    })
    if (!location) {
      throw new NotFoundException('Location not found for update');
    }
    const savedLocation = await this.locationRepository.save(location);

    if (updateLocationDto.manager) {
      const updatedManager = await this.managerRepository.preload({
        managerId: updateLocationDto.manager,
        location: location,
      });
      if (!updatedManager) {
        throw new NotFoundException('Manager not found for update');
      }
      await this.managerRepository.save(updatedManager);
    }
    return savedLocation;
  }

  remove(id: number) {
    return this.locationRepository.delete({
      locationId: id,
    });
  }
}
