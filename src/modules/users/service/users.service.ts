import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../providers/prisma';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PasswordService } from '../../../common';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            hotel: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByPseudo(pseudo: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { pseudo },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    if (await this.findByEmail(data.email)) {
      throw new Error('Email already exists');
    }

    if (await this.findByPseudo(data.pseudo)) {
      throw new Error('Pseudo already exists');
    }

    return this.prisma.user.create({
      data: {
        email: data.email,
        pseudo: data.pseudo,
        password: await this.passwordService.hashPassword(data.password),
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
