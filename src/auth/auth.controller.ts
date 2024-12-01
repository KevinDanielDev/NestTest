import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  // Ruta privada para probar el JWT
  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(@GetUser() user: User) {
    return {
      code: 200,
      user: user,
    };
  }

  @Get('health')
  healthCheck() {
    return {
      code: 200,
      message: 'API is running',
    };
  }
}
