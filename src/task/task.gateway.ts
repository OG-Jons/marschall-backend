import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  namespace: 'tasks',
  cors: {
    origin: '*',
  },
})
export class TaskGateway implements OnGatewayConnection {
  constructor(private readonly taskService: TaskService) {}

  @WebSocketServer() server: Server;

  private readonly logger = new Logger(TaskGateway.name);

  // TODO: Implement validation
  @SubscribeMessage('createTask')
  create(@MessageBody() createTaskDto: CreateTaskDto) {
    this.server.emit('newTask', this.taskService.create(createTaskDto));
  }

  @SubscribeMessage('findAllTask')
  findAll(@MessageBody() listId: string) {
    this.logger.log(`Find all from list ${listId}`);
    return this.taskService.findAllFromListId(listId);
  }

  @SubscribeMessage('updateTask')
  update(@MessageBody() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto.id, updateTaskDto);
  }

  @SubscribeMessage('removeTask')
  remove(@MessageBody() id: number) {
    return this.taskService.remove(id);
  }

  handleConnection(client: Socket): any {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
