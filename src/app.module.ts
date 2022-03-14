import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UrbanDictionaryModule } from './urban-dictionary/urban-dictionary.module';
import { AppLoggerMiddleware } from './middleware/logging/app-logger.middleware';

@Module({
  imports: [ConfigModule.forRoot(), UrbanDictionaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
