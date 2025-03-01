import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {v4 as uuid} from "uuid";

@Injectable()
export class EmployeesService {
  
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto)
    return employee;
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({
      employeeId: id
    })
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    })
    if(!employeeToUpdate) throw new NotFoundException();
    this.employeeRepository.save(employeeToUpdate);
    return employeeToUpdate;
  }

  remove(id: string) {
    this.findOne(id)
    this.employeeRepository.delete({
      employeeId: id
    });
    return {
      message: `Empleado con id ${id} eliminado`
    }
  }
}
