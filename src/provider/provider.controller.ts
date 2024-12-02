import { Controller, Get } from '@nestjs/common';
import { ProviderService } from './provider.service';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get('movies')
  findAll() {
    return this.providerService.getMovies();
  }
}
