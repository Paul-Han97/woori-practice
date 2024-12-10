import { Inject } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { IChatService } from './chat.service.interface';

@WebSocketGateway()
export class ChatGateway {
  constructor(
    @Inject(ChatService)
    private readonly chatService: IChatService,
  ) {}
  /* 
  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
    */
}
