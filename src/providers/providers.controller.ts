import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { UserData } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constanst/roles.constants';
import { apiAuth } from 'src/auth/decorators/api.decorator';
import { ApiTags } from '@nestjs/swagger';

@apiAuth()
@ApiTags("Providers")
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll(@UserData() user: User) {
    if(user.userRoles.includes("Employee")) throw new UnauthorizedException("No estas autorizado, solo Admins y Managers");
    return this.providersService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':name')
  findByName(@Param('name') name: string){
    return this.providersService.findByName(name);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.providersService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
