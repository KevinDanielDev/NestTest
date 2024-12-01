import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      user.roles = ['cliente']; // Por defecto todos los usuarios son clientes
      await this.userRepository.save(user);
      return user;
    } catch (err) {
      this.handleDbErrors(err);
    }
  }

  private handleDbErrors(err: any): never {
    if (err.code === 'SQLITE_CONSTRAINT')
      throw new BadRequestException('The email is already in use');
    throw new InternalServerErrorException('Internal error, check logs');
  }
}
