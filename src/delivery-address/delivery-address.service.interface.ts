import { ResponseData } from "src/common/type/response.type";
import { User } from "src/user/entities/user.entity";
import { CreateDeliveryAddressDto } from "./dto/create-delivery-address.dto";

export interface IDeliveryAddressService {
    create(createDeliveryAddressDto: CreateDeliveryAddressDto, user: User): Promise<ResponseData>;
    getByUserId(userId: string, user: User): Promise<ResponseData>;
    
}