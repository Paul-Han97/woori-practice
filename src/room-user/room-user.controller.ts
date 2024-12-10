import { Controller, Inject } from '@nestjs/common';
import { RoomUserService } from './room-user.service';
import { IRoomUserService } from './room-user.service.interface';

@Controller('room-user')
export class RoomUserController {
  constructor(
    @Inject(RoomUserService)
    private readonly roomUserService: IRoomUserService,
  ) {}
}
