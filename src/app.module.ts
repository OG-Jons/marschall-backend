import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UrbanDictionaryModule } from './urban-dictionary/urban-dictionary.module';

@Module({
  imports: [ConfigModule.forRoot(), UrbanDictionaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
