import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { IRoomService } from './room.service.interface';

@Injectable()
export class RoomService implements IRoomService {
  
}
