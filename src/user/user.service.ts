import * as fs from 'fs';
import * as path from 'path';
import {
  ConflictException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces';

@Injectable()
export class UserService {
  private userData: IUser[];

  constructor() {
    fs.promises
      .readFile(path.join(__dirname, '../../userData.json'), 'utf-8')
      .then((data) => {
        this.userData = JSON.parse(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private saveUser() {
    fs.promises.writeFile(
      path.join(__dirname, '../../userData.json'),
      JSON.stringify(this.userData),
    );
  }

  create(dto: CreateUserDto) {
    const existingUser = this.userData.find((user) => user.email === dto.email);
    if (existingUser) throw new ConflictException('user already exists');

    const newUser: IUser = {
      id: this.userData.length + 1,
      firstname: dto.firstname,
      lastname: dto.lastname,
      dateOfBirth: dto.dateOfBirth,
      email: dto.email,
      password: dto.password,
    };
    this.userData.push(newUser); //add new user to userData
    this.saveUser();

    return newUser;
  }

  findAll() {
    return this.userData;
  }

  findOne(id: number) {
    const user = this.userData.find((user) => user.id === id);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  remove(id: number) {
    const userIndex = this.userData.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new NotFoundException('user not found');
    this.userData.splice(userIndex, 1);
    this.saveUser();
  }
}
