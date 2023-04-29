import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserEntity {
    return new UserEntity(this.userService.create(createUserDto));
  }

  @Get()
  findAll(): UserEntity[] {
    const users = this.userService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserEntity {
    return new UserEntity(this.userService.findOne(+id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
