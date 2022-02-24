import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskGateway } from './task.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  providers: [TaskGateway, TaskService],
  imports: [TypeOrmModule.forFeature([Task])],
})
export class TaskModule {}
