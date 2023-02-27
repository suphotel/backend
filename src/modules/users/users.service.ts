import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        pseudo: data.pseudo,
        password: data.password,
        role: 'USER',
      },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
