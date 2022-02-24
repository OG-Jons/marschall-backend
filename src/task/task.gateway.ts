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
import { Logger, ValidationPipe } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  namespace: 'tasks',
  cors: {
    origin: '*',
  },
})
export class TaskGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly taskService: TaskService) {}

  @WebSocketServer() server: Server;

  private readonly logger = new Logger(TaskGateway.name);

  // TODO: Implement validation
  @SubscribeMessage('createTask')
  create(@MessageBody(new ValidationPipe()) createTaskDto: CreateTaskDto) {
    this.server.emit('newTask', this.taskService.create(createTaskDto));
  }

  @SubscribeMessage('findAllTask')
  findAll() {
    this.logger.log('findAllTask');
    return this.taskService.findAll();
  }

  @SubscribeMessage('findOneTask')
  findOne(@MessageBody() id: number) {
    return this.taskService.findOne(id);
  }

  @SubscribeMessage('updateTask')
  update(@MessageBody() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto.id, updateTaskDto);
  }

  @SubscribeMessage('removeTask')
  remove(@MessageBody() id: number) {
    return this.taskService.remove(id);
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    this.logger.log('identity');
    return data;
  }

  afterInit(): any {
    this.logger.log('Init');
  }

  handleConnection(client: Socket): any {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
