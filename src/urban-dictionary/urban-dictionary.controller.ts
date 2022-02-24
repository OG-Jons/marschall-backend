import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UrbanDictionaryService } from './urban-dictionary.service';

@Controller('urban-dictionary')
export class UrbanDictionaryController {
  private readonly logger = new Logger(UrbanDictionaryController.name);

  constructor(
    private readonly urbanDictionaryService: UrbanDictionaryService,
  ) {}

  @Get()
  async getDefinition(@Query('term') term: string): Promise<any[]> {
    this.logger.log(`Searched for: ${term}`);
    return await this.urbanDictionaryService.getDefinition(term);
  }
}
