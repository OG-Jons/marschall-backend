import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Query,
} from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import axios from 'axios';

@Controller('urban-dictionary')
export class UrbanDictionaryController {
  private readonly logger = new Logger(UrbanDictionaryController.name);

  @Get()
  async getDefinition(@Query('term') term: string): Promise<any[]> {
    if (!term) {
      throw new HttpException(
        `Your search term can't be null`,
        HttpStatus.LENGTH_REQUIRED,
      );
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
      params: { term: term },
      headers: {
        'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com',
        'x-rapidapi-key': process.env.URBAN_DICTIONARY_API_KEY,
      },
    };

    this.logger.log(`Searched for: ${term}`);

    return axios
      .request(options)
      .then((response) => response.data.list)
      .catch((error) => {
        throw new HttpException(
          `An error occured: ${error.response.statusText}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
