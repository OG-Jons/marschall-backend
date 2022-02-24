import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrbanDictionaryService {
  constructor(private readonly configService: ConfigService) {}

  async getDefinition(searchTerm: string): Promise<any[]> {
    if (!searchTerm) {
      throw new HttpException(
        `Your search term can't be null`,
        HttpStatus.LENGTH_REQUIRED,
      );
    }

    const options: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
      params: { term: searchTerm },
      headers: {
        'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com',
        'x-rapidapi-key': this.configService.get<string>(
          'URBAN_DICTIONARY_API_KEY',
        ),
      },
    };

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
