import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomUserService } from './room-user.service';
import { CreateRoomUserDto } from './dto/create-room-user.dto';
import { UpdateRoomUserDto } from './dto/update-room-user.dto';

@Controller('room-user')
export class RoomUserController {
  constructor(private readonly roomUserService: RoomUserService) {}
}
