import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrbanDictionaryController } from './urban-dictionary/urban-dictionary.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, UrbanDictionaryController],
  providers: [AppService],
})
export class AppModule {}
