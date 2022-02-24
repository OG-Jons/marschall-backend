import { Test, TestingModule } from '@nestjs/testing';
import { UrbanDictionaryService } from './urban-dictionary.service';

describe('UrbanDictionaryService', () => {
  let service: UrbanDictionaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrbanDictionaryService],
    }).compile();

    service = module.get<UrbanDictionaryService>(UrbanDictionaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
