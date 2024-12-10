import { Injectable } from '@nestjs/common';
import { IRoomUserService } from './room-user.service.interface';

@Injectable()
export class RoomUserService implements IRoomUserService {}
