import { Module } from '@nestjs/common';
import { UrbanDictionaryService } from './urban-dictionary.service';
import { UrbanDictionaryController } from './urban-dictionary.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [UrbanDictionaryController],
  providers: [UrbanDictionaryService],
})
export class UrbanDictionaryModule {}
