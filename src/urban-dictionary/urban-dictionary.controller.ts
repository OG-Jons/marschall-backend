import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UrbanDictionaryService } from './urban-dictionary.service';

@Controller('urban-dictionary')
export class UrbanDictionaryController {
  constructor(
    private readonly urbanDictionaryService: UrbanDictionaryService,
  ) {}

  @Get()
  async getDefinition(@Query('term') term: string): Promise<any[]> {
    return await this.urbanDictionaryService.getDefinition(term);
  }
}
