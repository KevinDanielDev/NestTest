import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        roles: ['cliente'], // Por defecto todos los usuarios son clientes
        password: bcrypt.hashSync(password, 10), // Siempre sera un hash diferente
      });
      await this.userRepository.save(user);
      delete user.password; // No devolvemos el password en el response
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
