import { Test, TestingModule } from '@nestjs/testing';
import { UrbanDictionaryController } from './urban-dictionary.controller';

describe('UrbanDictionaryController', () => {
  let controller: UrbanDictionaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrbanDictionaryController],
    }).compile();

    controller = module.get<UrbanDictionaryController>(
      UrbanDictionaryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should get a list that is 10 items long', async () => {
  //   expect(await controller.getDefinition('test')).toHaveLength(10);
  // });
});
