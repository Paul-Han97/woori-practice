import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomService } from './room.service';
import { IRoomService } from './room.service.interface';

@Controller('room')
export class RoomController {
  constructor(
    @Inject(RoomService)
    private readonly roomService: IRoomService,
  ) {}
}
