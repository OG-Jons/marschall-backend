import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(): { helloWorld: string } {
    this.logger.log('Hello world called');
    const helloWorld = this.appService.getHello();
    return { helloWorld };
  }
}
