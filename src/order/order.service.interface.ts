import { ResponseData } from 'src/common/type/response.type';
import { User } from 'src/user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';

export interface IOrderService {
  findByUserId(userId: string, loginUser: User): Promise<ResponseData>;
  create(createOrderDto: CreateOrderDto, user: User): Promise<ResponseData>;
}
