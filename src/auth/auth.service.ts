import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
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

  async login(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    }); // Devolvemos solo el email y el password

    if (!user)
      throw new UnauthorizedException('Credential are not valid (email)');
    const matchPasswords = bcrypt.compareSync(password, user.password);
    if (!matchPasswords)
      throw new UnauthorizedException('Credential are not valid (password)');
    return user;
  }

  private handleDbErrors(err: any): never {
    if (err.code === 'SQLITE_CONSTRAINT')
      throw new BadRequestException('The email is already in use');
    throw new InternalServerErrorException('Internal error, check logs');
  }
}
