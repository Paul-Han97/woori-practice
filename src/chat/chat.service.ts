import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { IChatService } from './chat.service.interface';

@Injectable()
export class ChatService implements IChatService{

}
