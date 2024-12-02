import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProviderService {
  constructor(private readonly httpService: HttpService) {}

  async getMovies() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`discover/movie`),
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
